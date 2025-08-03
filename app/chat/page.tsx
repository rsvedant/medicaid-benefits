"use client";

import { useState } from 'react';
import { FileUploader } from '@/components/chat/file-uploader';
import { QuestionSelector } from '@/components/chat/question-selector';
import { ProgressTracker } from '@/components/chat/progress-tracker';
import { DocumentProcessor } from '@/components/chat/document-processor';
import { ResultsDisplay, AnalysisResult } from '@/components/chat/results-display';
import { Button } from '@/components/ui/button';

// Mock data and functions - replace with actual implementation
const mockExtractedData = {
  name: "Jane Doe",
  dob: "1990-01-15",
  income: "$1,200/month",
  householdSize: 1,
  address: "123 Main St, San Francisco, CA 94102",
  immigrationStatus: "Lawful Permanent Resident",
};

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

export default function ChatPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
    if (newFiles.length > 0 && currentStep < 2) {
      setCurrentStep(2);
    } else if (newFiles.length === 0) {
      setCurrentStep(1);
    }
  };

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
  };

  const handleStartAnalysis = async () => {
    if (!selectedQuestion || files.length === 0) {
      // TODO: Show an error message
      return;
    }
    setIsLoading(true);
    setAnalysisResult(null);
    
    // Simulate processing steps
    for (let i = 3; i <= 8; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 700));
      if (i === 3) { // Document Processing
        setExtractedData(mockExtractedData);
      }
    }

    setAnalysisResult(mockAnalysisResult);
    setIsLoading(false);
  };

  const handleReset = () => {
    setFiles([]);
    setSelectedQuestion(null);
    setCurrentStep(1);
    setIsLoading(false);
    setExtractedData(null);
    setAnalysisResult(null);
  };

  const isAnalysisDisabled = files.length === 0 || !selectedQuestion || isLoading;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Medicaid & SNAP Eligibility Analyzer</h1>
        <p className="text-center text-muted-foreground mb-8">
          Upload your documents and select a question to analyze your potential eligibility.
        </p>

        <ProgressTracker currentStep={currentStep} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="space-y-8">
            <FileUploader onFilesChange={handleFileChange} disabled={isLoading} />
            <QuestionSelector onQuestionSelect={handleQuestionSelect} disabled={isLoading} />
          </div>
          <div className="space-y-8">
            <DocumentProcessor extractedData={extractedData} isProcessing={currentStep >= 3 && isLoading} />
            <ResultsDisplay result={analysisResult} isLoading={isLoading && currentStep >= 8} />
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
  );
}
