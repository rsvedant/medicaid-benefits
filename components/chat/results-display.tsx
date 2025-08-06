"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface AnalysisResult {
  determination: "Eligible" | "Not Eligible" | "Need More Info";
  reasoning: string;
  requirements: {
    met: string[];
    missing: string[];
  };
  nextSteps: string[];
  missingDocs: string[];
}

interface ResultsDisplayProps {
  result: AnalysisResult | null;
  isLoading: boolean;
}

export function ResultsDisplay({ result, isLoading }: ResultsDisplayProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>5. Eligibility Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Analyzing your eligibility...</p>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return null;
  }

  const getStatusIcon = () => {
    switch (result.determination) {
      case "Eligible":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "Not Eligible":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "Need More Info":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getAlertVariant = () => {
    switch (result.determination) {
      case "Eligible":
        return "default";
      case "Not Eligible":
        return "destructive";
      case "Need More Info":
        return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>5. Eligibility Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">

          <AccordionItem value="eligibility">
            <AccordionTrigger>Eligibility</AccordionTrigger>
            <AccordionContent>
              <Alert variant={getAlertVariant()}>
                <div className="flex items-center gap-2">
                  {getStatusIcon()}
                  <AlertTitle className="text-lg font-bold">{result.determination}</AlertTitle>
                </div>
                <AlertDescription className="mt-2">{result.reasoning}</AlertDescription>
              </Alert>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="met">
            <AccordionTrigger>Requirements Met</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {result.requirements.met.map((req, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">{req}</p>
                  </div>
                ))}
                {result.requirements.met.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No requirements met based on provided information.
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="missing">
            <AccordionTrigger>Missing Requirements</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {result.requirements.missing.map((req, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">{req}</p>
                  </div>
                ))}
                {result.requirements.missing.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    All requirements appear to be met.
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="nextSteps">
            <AccordionTrigger>Next Steps</AccordionTrigger>
            <AccordionContent>
              {result.nextSteps.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {result.nextSteps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No additional steps at this time.</p>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="docs">
            <AccordionTrigger>Missing Documents</AccordionTrigger>
            <AccordionContent className="overflow-x-scroll">
              {result.missingDocs.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.missingDocs.map((doc, i) => (
                    <Badge key={i} variant="outline">
                      {doc}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No missing documents.</p>
              )}
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </CardContent>
    </Card>
  );
}
