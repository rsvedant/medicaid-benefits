"use client";

import { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { FileUploader } from '@/components/chat/file-uploader';
import { QuestionSelector } from '@/components/chat/question-selector';
import { ProgressTracker } from '@/components/chat/progress-tracker';
import { DocumentProcessor } from '@/components/chat/document-processor';
import { ResultsDisplay, AnalysisResult } from '@/components/chat/results-display';
import { Button } from '@/components/ui/button';
import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui";

// Mock data and functions - replace with actual implementation
const mockAnalysisResult: AnalysisResult = {
  determination: "Eligible",
  reasoning: "The applicant's reported monthly income of $1,200 is below the 138% Federal Poverty Level threshold for a household of one ($1,732/month). The applicant is a Lawful Permanent Resident, which meets the immigration status requirements.",
  requirements: {
    met: [
      "Income requirement for Medicaid (under 138% FPL).",
      "Residency requirement (California).",
      "Immigration status (LPR)."
    ],
    missing: [],
  },
  nextSteps: [
    "Submit an official application through the Covered California website.",
    "Provide proof of income and residency as listed in the missing documents section.",
  ],
  missingDocs: ["Pay stubs for the last 30 days", "Utility bill with current address"],
};

const requiredDocIds = ['id_card', 'pay_stub', 'utility_bill', 'immigration_doc'];

export default function ChatPage() {

  const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (newFiles: { [key: string]: File | null }) => {
    setFiles(newFiles);
    const uploadedFiles = Object.values(newFiles).filter(Boolean);
    if (uploadedFiles.length > 0 && currentStep < 2) {
      setCurrentStep(2);
    } else if (uploadedFiles.length === 0) {
      setCurrentStep(1);
    }
  };

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
  };

  const handleStartAnalysis = async () => {
    const uploadedFiles = Object.values(files).filter(Boolean) as File[];
    const allDocsUploaded = requiredDocIds.every(docId => files[docId]);

    if (!allDocsUploaded) {
      setError("Please upload all required documents.");
      return;
    }
    
    if (!selectedQuestion) {
      setError("Please select a question.");
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);
    setExtractedData(null);
    setError(null);
    setCurrentStep(3); // Start processing

    try {
      const uploadedFileUrls: { [key: string]: string } = {};
      for (const docId in files) {
        const file = files[docId];
        if (file) {
          const response = await fetch(
            `/api/upload?filename=${file.name}`,
            {
              method: 'POST',
              body: file,
            },
          );
          const newBlob = await response.json();
          if (!response.ok) {
            throw new Error(newBlob.error || 'File upload failed.');
          }
          uploadedFileUrls[docId] = newBlob.url;
        }
      }

      const response = await fetch('/api/process-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileUrls: uploadedFileUrls,
          question: selectedQuestion
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process documents.");
      }

      const data = await response.json();
      setExtractedData(data);
      setCurrentStep(4); // Move to next step (RAG search)

      // Perform RAG search
      const ragQuery = `Eligibility for ${selectedQuestion} based on: ${JSON.stringify(data)}`;
      const ragResponse = await fetch('/api/rag-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: ragQuery }),
      });

      console.log(ragResponse)

      if (!ragResponse.ok) {
        throw new Error("RAG search failed.");
      }

      const ragResults = await ragResponse.json();
      console.log("RAG Search Results:", ragResults);
      setCurrentStep(5); // Move to analysis step

      // Final Analysis
      const analysisResponse = await fetch('/api/analyze-eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          extractedData: data,
          ragResults: ragResults.results,
          question: selectedQuestion,
        }),
      });

      if (!analysisResponse.ok) {
        const errorData = await analysisResponse.json();
        throw new Error(errorData.error || "Eligibility analysis failed.");
      }

      const finalResult = await analysisResponse.json();
      
      setCurrentStep(6); // Data validation
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentStep(7); // Synthesizing
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentStep(8); // Finalizing

      setAnalysisResult(finalResult);

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setCurrentStep(1); // Reset on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFiles({});
    setSelectedQuestion(null);
    setCurrentStep(1);
    setIsLoading(false);
    setExtractedData(null);
    setAnalysisResult(null);
    setError(null);
  };

  const allDocsUploaded = requiredDocIds.every(docId => files[docId]);
  const isAnalysisDisabled = !allDocsUploaded || !selectedQuestion || isLoading;

  return (
    <div>
      <RedirectToSignIn />

      <SignedIn>
        <div className="container mx-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">Medicaid & SNAP Eligibility Analyzer</h1>
            <p className="text-center text-muted-foreground mb-8">
              Upload your documents and select a question to analyze your potential eligibility.
            </p>

            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-4 text-center">
                {error}
              </div>
            )}

            <ProgressTracker currentStep={currentStep} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="space-y-8">
                <FileUploader files={files} onFilesChange={handleFileChange} disabled={isLoading} />
              </div>
              <div className="space-y-8">
                <QuestionSelector onQuestionSelect={handleQuestionSelect} disabled={isLoading} />
                <DocumentProcessor extractedData={extractedData} isProcessing={currentStep === 3 && isLoading} />
                
              </div>
              <div>
                <ResultsDisplay 
                  result={analysisResult} 
                  isLoading={isLoading && currentStep > 3} 
                  // isLoading={true}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Button onClick={handleStartAnalysis} disabled={isAnalysisDisabled} size="lg">
                {isLoading ? 'Analyzing...' : 'Start Analysis'}
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg" disabled={isLoading}>
                Reset
              </Button>
            </div>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
