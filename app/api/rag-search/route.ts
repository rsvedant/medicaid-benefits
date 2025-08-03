import { NextRequest, NextResponse } from "next/server";
import { searchRAG } from "@/lib/rag";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required." }, { status: 400 });
    }

    const searchResults = await searchRAG(query);

    return NextResponse.json(searchResults);
  } catch (error) {
    console.error("Error in RAG search:", error);
    return NextResponse.json({ error: "Failed to perform RAG search." }, { status: 500 });
  }
}
