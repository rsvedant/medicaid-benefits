import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";
import pdf from "pdf-parse";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface Document {
  source: string;
  content: string;
  embedding: number[];
}

// Simple in-memory vector store
let vectorStore: Document[] = [];
let isInitialized = false;

// Function to chunk text
function chunkText(text: string, chunkSize = 1000, overlap = 100): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += chunkSize - overlap) {
    chunks.push(text.substring(i, i + chunkSize));
  }
  return chunks;
}

// Function to get embedding for a text chunk
async function getEmbedding(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

// Function to calculate cosine similarity
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }
  return dotProduct / (magnitudeA * magnitudeB);
}

// Initialize the vector store by loading, chunking, and embedding documents
export async function initializeRAG() {
  if (isInitialized) return;

  console.log("Initializing RAG system...");
  const docsPath = path.join(process.cwd(), "public", "docs");
  const docHierarchy = ["federal", "california", "sf-local"];
  let documents: { source: string; content: string }[] = [];

  for (const dir of docHierarchy) {
    try {
      const dirPath = path.join(docsPath, dir);
      const files = await fs.readdir(dirPath);
      for (const file of files) {
        if (path.extname(file).toLowerCase() === ".pdf") {
          const filePath = path.join(dirPath, file);
          const dataBuffer = await fs.readFile(filePath);
          const data = await pdf(dataBuffer);
          documents.push({ source: `${dir}/${file}`, content: data.text });
        }
      }
    } catch (error) {
        console.warn(`Could not read documents from ${dir}:`, error);
    }
  }

  for (const doc of documents) {
    const chunks = chunkText(doc.content);
    for (const chunk of chunks) {
      try {
        const embedding = await getEmbedding(chunk);
        vectorStore.push({
          source: doc.source,
          content: chunk,
          embedding: embedding,
        });
      } catch (error) {
        console.error(`Failed to create embedding for chunk from ${doc.source}:`, error);
      }
    }
  }

  console.log(`RAG system initialized. Vector store contains ${vectorStore.length} chunks.`);
  isInitialized = true;
}

// Search the vector store for relevant documents
export async function searchRAG(query: string, topK = 5): Promise<{ results: Document[] }> {
  if (!isInitialized) {
    await initializeRAG();
  }

  const queryEmbedding = await getEmbedding(query);

  const similarities = vectorStore.map(doc => ({
    ...doc,
    similarity: cosineSimilarity(queryEmbedding, doc.embedding),
  }));

  similarities.sort((a, b) => b.similarity - a.similarity);

  return { results: similarities.slice(0, topK) };
}