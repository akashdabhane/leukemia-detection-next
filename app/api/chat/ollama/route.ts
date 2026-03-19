import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, model = "llama3", stream = false } = await req.json(); // You can change 'llama3' to the model you have pulled in Ollama

    // Calling the local Ollama API
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        prompt: prompt,
        stream: stream,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    if (stream) {
      return new Response(response.body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      });
    }

    const data = await response.json();
    
    return NextResponse.json({ reply: data.response });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to connect to local Ollama instance. Is Ollama running?" },
      { status: 500 }
    );
  }
}
