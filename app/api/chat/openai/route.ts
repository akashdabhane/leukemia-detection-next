import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, stream = false } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY || "";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        stream,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`OpenAI API error: ${response.statusText} - ${errorData}`);
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
            if (trimmed === 'data: [DONE]') continue;
            
            try {
              const data = JSON.parse(trimmed.slice(6));
              const content = data.choices[0]?.delta?.content;
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
    return NextResponse.json({ reply: data.choices[0]?.message?.content || "" });
  } catch (error: any) {
    console.error("OpenAI Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to connect to OpenAI" },
      { status: 500 }
    );
  }
}
