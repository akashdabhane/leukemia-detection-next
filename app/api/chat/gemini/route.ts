import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, stream = false } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY || "";
    
    // Select the appropriate endpoint based on streaming requirement
    const baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash";
    const endpoint = stream 
      ? `${baseUrl}:streamGenerateContent?alt=sse&key=${apiKey}`
      : `${baseUrl}:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Gemini API error: ${response.statusText} - ${errorData}`);
    }

    if (stream && response.body) {
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      let buffer = "";

      const transformStream = new TransformStream({
        transform(chunk, controller) {
          buffer += decoder.decode(chunk, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || "";
          
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith('data: ')) continue;
            
            try {
              const data = JSON.parse(trimmed.slice(6));
              const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
              if (content) {
                controller.enqueue(encoder.encode(JSON.stringify({ response: content }) + '\n'));
              }
            } catch (e) {
              // Ignore parse errors on partial chunks
            }
          }
        },
      });

      return new Response(response.body.pipeThrough(transformStream), {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Gemini Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to connect to Gemini" },
      { status: 500 }
    );
  }
}