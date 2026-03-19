import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { diagnosis, confidence } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY || "";
    
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is missing" }, { status: 500 });
    }

    const baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash";
    const endpoint = `${baseUrl}:generateContent?key=${apiKey}`;

    const systemInstruction = `You are an expert hematologist and AI diagnostic assistant. A blood smear analysis has yielded the following result:
Diagnosis: ${diagnosis}
Confidence: ${confidence}

Please write a formal, standard clinical laboratory report based on this finding. Ensure it is professional, objective, and clearly structured. 
Do NOT use Markdown formatting (like ** or ##). Use standard capitalization and paragraph spacing.

Include the following sections EXACTLY:
PATIENT DEMOGRAPHICS
(Invent a realistic but clearly dummy mock patient ID, age, and gender)

CLINICAL INDICATION
Routine blood smear analysis using deep learning morphological screening.

FINDINGS & ANALYSIS
(Provide a plausible sophisticated medical description matching the diagnosis '${diagnosis}'. If normal, describe healthy cell morphology. If leukemia, note the presence of typical blasts, anaplasia, or anomalies).

CONCLUSION
(Summarize the primary diagnosis clearly).

RECOMMENDATIONS
(If normal, suggest routine follow-up. If malignant/abnormal, strongly urge immediate hematology consult, bone marrow biopsy, and flow cytometry).`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: systemInstruction }]
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini error payload:", errorData);
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const reportText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to generate report content.";
    
    return NextResponse.json({ report: reportText });
  } catch (error: any) {
    console.error("Report Generation API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate report" },
      { status: 500 }
    );
  }
}
