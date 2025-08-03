import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

interface SearchResult {
  content: string;
  source: string;
  hierarchy: string;
  similarity: number;
  metadata: {
    filename: string;
    chunkIndex: number;
  };
}

class PineconeVectorStore {
  private index = pinecone.index('medicaid-rag');
  private embedModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

  async search(query: string, topK: number = 15): Promise<SearchResult[]> {
    try {
      // Generate embedding for the search query
      const queryResult = await this.embedModel.embedContent(query);
      const queryEmbedding = queryResult.embedding.values;

      // Search Pinecone vector database
      const searchResults = await this.index.query({
        vector: queryEmbedding,
        topK,
        includeMetadata: true,
        includeValues: false
      });

      // Transform Pinecone results to SearchResult format
      const results: SearchResult[] = searchResults.matches
        .filter(match => match.metadata && match.score !== undefined)
        .map(match => ({
          content: match.metadata!.content as string,
          source: match.metadata!.source as string,
          hierarchy: match.metadata!.hierarchy as string,
          similarity: match.score!,
          metadata: {
            filename: match.metadata!.filename as string,
            chunkIndex: match.metadata!.chunkIndex as number
          }
        }));

      // Sort by hierarchy priority when similarities are close
      results.sort((a, b) => {
        const hierarchyPriority: { [key: string]: number } = { 
          federal: 3, 
          california: 2, 
          "sf-local": 1 
        };
        
        const priorityA = hierarchyPriority[a.hierarchy] || 0;
        const priorityB = hierarchyPriority[b.hierarchy] || 0;
        const priorityDiff = priorityB - priorityA;
        
        // If similarity difference is small (< 0.1), prioritize by hierarchy
        if (Math.abs(a.similarity - b.similarity) < 0.1) {
          return priorityDiff;
        }
        
        // Otherwise, sort by similarity score
        return b.similarity - a.similarity;
      });

      return results;
    } catch (error) {
      console.error("Error searching Pinecone:", error);
      throw new Error("Failed to search vector database");
    }
  }
}

// Singleton instance - no initialization needed!
const vectorStore = new PineconeVectorStore();

/**
 * Search the RAG knowledge base for relevant content
 * @param query - The search query string
 * @returns Promise<SearchResult[]> - Array of relevant document chunks
 */
export async function searchRAG(query: string): Promise<{ results: SearchResult[] }> {
  try {
    return { results: await vectorStore.search(query, 15) } ;
  } catch (error) {
    console.error("Error in RAG search:", error);
    throw new Error("Failed to perform RAG search");
  }
}

export type { SearchResult };