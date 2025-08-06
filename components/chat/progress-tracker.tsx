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
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isLastStep = stepNumber === steps.length;

          const isCompleted =
            stepNumber < currentStep || (isLastStep && currentStep === steps.length);

          const isActive = stepNumber === currentStep && !isLastStep;

          return (
            <div key={step} className="flex items-start w-full">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-black text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? "✔" : stepNumber}
                </div>
                <p
                  className={cn(
                    "text-xs mt-2 text-center w-16 whitespace-nowrap",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {step}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-1 mx-2 transition-all duration-300 mt-4",
                    stepNumber < currentStep ? "bg-green-500" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

