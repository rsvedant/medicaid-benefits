import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Federal Poverty Level for 2025 (Annual Income)
const FPL_2025 = {
  1: 15060,
  2: 20440,
  3: 25820,
  4: 31200,
  5: 36580,
  6: 41960,
  7: 47340,
  8: 52720,
};

// Function to get the FPL for a given household size
const getFPL = (householdSize: number) => {
  const size = Math.min(Math.max(householdSize, 1), 8);
  const perPersonAddition = 5380;
  if (size <= 8) {
      return FPL_2025[size as keyof typeof FPL_2025];
  } else {
      return FPL_2025[8] + (size - 8) * perPersonAddition;
  }
};

export async function POST(req: NextRequest) {
  try {
    const { extractedData, ragResults, question } = await req.json();

    if (!extractedData || !ragResults || !question) {
      return NextResponse.json({ error: "Missing required data for analysis." }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const contextDocuments = ragResults.map((doc: any) => `Source: ${doc.source}\nContent: ${doc.content}`).join("\n\n---\n\n");

    const prompt = `
      You are an expert eligibility worker for US public benefits, specializing in Medicaid and SNAP. Your task is to provide a comprehensive eligibility determination based on the user's data and relevant regulations.

      **Date of Analysis:** August 2, 2025
      **2025 Federal Poverty Levels (FPL) for Annual Income:**
      - 1 person: $${getFPL(1)}
      - 2 people: $${getFPL(2)}
      - 3 people: $${getFPL(3)}
      - 4 people: $${getFPL(4)}
      - For each additional person, add $5,380.

      **User's Question:** "${question}"

      **User's Extracted Data:**
      \`\`\`json
      ${JSON.stringify(extractedData, null, 2)}
      \`\`\`

      **Relevant Regulatory Information (from knowledge base):**
      ---
      ${contextDocuments}
      ---

      **Analysis Instructions:**
      1.  **Cross-reference:** Carefully compare the user's data with the provided regulatory information.
      2.  **Prioritize Sources:** Use the hierarchy of regulations: Federal (H.R.1, CFR) > State (California) > Local (San Francisco). Cite the most specific and relevant source (e.g., "42 CFR § 435.119").
      3.  **Calculate Income Eligibility:** Based on the user's income and household size, determine if they meet the income thresholds (e.g., 138% FPL for Medicaid adults, 200% for SNAP, etc.). Show your calculations.
      4.  **Check Other Requirements:** Evaluate residency, immigration status, and any other relevant factors based on the provided context.
      5.  **Synthesize Findings:** Generate a final determination and a detailed breakdown.

      **Output Format:**
      Respond with ONLY a single, valid JSON object that strictly follows this structure:
      \`\`\`json
      {
        "determination": "Eligible" | "Not Eligible" | "Need More Info",
        "reasoning": "A detailed, step-by-step explanation of the determination, citing specific regulations and calculations.",
        "requirements": {
          "met": ["A list of all met requirements with citations, e.g., 'Income is below 138% FPL (42 CFR § 435.119).'"],
          "missing": ["A list of all missing or unmet requirements with citations."]
        },
        "nextSteps": ["A list of concrete next steps for the user."],
        "missingDocs": ["A list of specific documents the user still needs to provide, if any."]
      }
      \`\`\`
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    const jsonText = responseText.replace(/```json\n?|\n?```/g, '').trim();

    try {
        const analysisResult = JSON.parse(jsonText);
        return NextResponse.json(analysisResult);
    } catch (parseError) {
        console.error("Failed to parse LLM response as JSON:", parseError);
        console.error("Raw LLM response:", responseText);
        // Fallback to sending the raw text if JSON parsing fails, so we can debug it
        return NextResponse.json({ error: "The analysis model returned an invalid format.", rawResponse: responseText }, { status: 500 });
    }

  } catch (error) {
    console.error("Error during eligibility analysis:", error);
    return NextResponse.json({ error: "Failed to analyze eligibility." }, { status: 500 });
  }
}
