"use client";

import { cn } from "@/lib/utils";

interface ProgressTrackerProps {
  currentStep: number;
}

const steps = [
  "Upload Docs",
  "Select Question",
  "Process Docs",
  "Search RAG",
  "Validate Data",
  "Analyze",
  "Check Completeness",
  "Done",
];

export function ProgressTracker({ currentStep }: ProgressTrackerProps) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepIndex = index + 1;
          const isActive = stepIndex <= currentStep;
          const isCompleted = stepIndex < currentStep;

          return (
            <div key={step} className="flex-1 flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                    isCompleted && "bg-green-500 text-white"
                  )}
                >
                  {isCompleted ? '✔' : stepIndex}
                </div>
                <p className={cn(
                  "text-xs mt-2 text-center",
                  isActive ? "text-primary-foreground" : "text-muted-foreground"
                )}>
                  {step}
                </p>
              </div>
              {stepIndex < steps.length && (
                <div className={cn(
                  "flex-1 h-1 transition-all",
                  isCompleted ? "bg-green-500" : "bg-muted"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
