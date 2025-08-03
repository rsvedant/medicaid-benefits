import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Function to convert a File object to a GoogleGenerativeAI.Part object
async function urlToGenerativePart(url: string, retries = 3, delay = 1000): Promise<Part> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch file from URL: ${url}, status: ${response.status}`);
      }
      const file = await response.blob();
      const base64EncodedData = Buffer.from(await file.arrayBuffer()).toString("base64");
      return {
        inlineData: {
          data: base64EncodedData,
          mimeType: file.type,
        },
      };
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
  throw new Error(`Failed to fetch file from URL after ${retries} retries: ${url}`);
}

export async function POST(req: NextRequest) {
  try {
    const { fileUrls, question } = await req.json();
    console.log("Processing documents with question:", question);

    if (!fileUrls || Object.keys(fileUrls).length === 0) {
      return NextResponse.json({ error: "No file URLs provided." }, { status: 400 });
    }
    if (!question) {
      return NextResponse.json({ error: "No question selected." }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageParts = await Promise.all(
      Object.values(fileUrls).map(url => urlToGenerativePart(url as string))
    );


    const prompt = `
      You are an expert in analyzing documents for determining eligibility for US public benefits like Medicaid and SNAP for the city of San Francisco.
      Your task is to extract key information from the provided documents. The documents may include ID cards, pay stubs, utility bills, immigration papers, etc.
      
      Based on the user's question: "${question}", analyze the following documents and extract the following information in a structured JSON format:
      - name (string): Full name of the primary applicant.
      - dob (string): Date of birth in YYYY-MM-DD format.
      - income (string): A summary of the monthly income. If multiple income sources are found, calculate the total monthly income.
      - householdSize (number): The number of people in the household.
      - address (string): The full residential address.
      - immigrationStatus (string): The applicant's immigration status (e.g., "US Citizen", "Lawful Permanent Resident", "Asylee").

      If any information cannot be found, return null for that field.
      Respond ONLY with the JSON object.
    `;

    const result = await model.generateContent([prompt, ...imageParts]);
    const responseText = result.response.text();
    
    // Clean the response to ensure it's valid JSON
    const jsonText = responseText.replace(/```json\n?|\n?```/g, '').trim();

    const extractedData = JSON.parse(jsonText);

    return NextResponse.json(extractedData);

  } catch (error) {
    console.error("Error processing documents:", error);
    return NextResponse.json({ error: "Failed to process documents." }, { status: 500 });
  }
}
