"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ExtractedData {
  name?: string;
  dob?: string;
  income?: string;
  householdSize?: number;
  address?: string;
  immigrationStatus?: string;
}

interface DocumentProcessorProps {
  extractedData: ExtractedData | null;
  isProcessing: boolean;
}

export function DocumentProcessor({ extractedData, isProcessing }: DocumentProcessorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>3. Extracted Information</CardTitle>
      </CardHeader>
      <CardContent>
        {isProcessing ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        ) : extractedData ? (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-muted-foreground">Name</p>
              <p>{extractedData.name || 'Not found'}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Date of Birth</p>
              <p>{extractedData.dob || 'Not found'}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Income</p>
              <p>{extractedData.income || 'Not found'}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Household Size</p>
              <p>{extractedData.householdSize || 'Not found'}</p>
            </div>
            <div className="col-span-2">
              <p className="font-medium text-muted-foreground">Address</p>
              <p>{extractedData.address || 'Not found'}</p>
            </div>
            <div className="col-span-2">
              <p className="font-medium text-muted-foreground">Immigration Status</p>
              <p>{extractedData.immigrationStatus || 'Not found'}</p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            Upload documents and select a question to start processing.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
