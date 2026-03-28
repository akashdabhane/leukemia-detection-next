import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import Prescription from "@/models/Prescription";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await req.json();
    const apiKey = process.env.GEMINI_API_KEY || "";
    
    // Construct the prompt context from user input
    const promptContext = JSON.stringify(data, null, 2);

    const promptText = `
You are an AI medical assistant. Your task is to analyze the provided patient data and suggest possible conditions, basic medicine suggestions, dosages, and precautions.
IMPORTANT: Do NOT provide a final diagnosis. This is an AI suggestion.

Patient Data:
${promptContext}

Provide your response STRICTLY as a JSON object with the following structure:
{
  "conditions": ["Possible condition 1", "Possible condition 2"],
  "medicines": [
    {
      "name": "Medicine name",
      "dosage": "Suggested dosage",
      "purpose": "Why this is given"
    }
  ],
  "precautions": ["Precaution 1", "Precaution 2"],
  "whenToConsult": "When the patient should see a doctor."
}
`;

    const baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
    const url = `${baseUrl}?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: promptText }]
          }
        ],
        generationConfig: {
            responseMimeType: "application/json"
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error data:", errorData);
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const json = await response.json();
    const replyText = json.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!replyText) {
      throw new Error("No response generated from AI.");
    }
    
    // Parse the JSON response
    const parsedResponse = JSON.parse(replyText);

    // Persist prescription history
    try {
      await connectToDatabase();
      await Prescription.create({
        userId: (session.user as any).id,
        input: data,
        result: parsedResponse,
      });
    } catch (dbErr) {
      console.error("Failed to save prescription history", dbErr);
      // Do not fail the response to the user if history saving fails.
    }

    return NextResponse.json({ success: true, data: parsedResponse });
  } catch (error: any) {
    console.error("Prescription API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate prescription suggestion" },
      { status: 500 }
    );
  }
}
