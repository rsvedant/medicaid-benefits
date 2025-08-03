"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';

interface FileUploaderProps {
  onFilesChange: (files: File[]) => void;
  disabled: boolean;
}

export function FileUploader({ onFilesChange, disabled }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles];
    setFiles(newFiles);
    onFilesChange(newFiles);
  }, [files, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    disabled,
  });

  const removeFile = (fileName: string) => {
    const newFiles = files.filter(file => file.name !== fileName);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>1. Upload Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
          } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
          {isDragActive ? (
            <p className="mt-4 text-primary">Drop the files here ...</p>
          ) : (
            <p className="mt-4 text-muted-foreground">
              Drag & drop some files here, or click to select files
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            PDF, JPG, PNG accepted. (e.g., ID cards, pay stubs, utility bills)
          </p>
        </div>
        {files.length > 0 && (
          <ScrollArea className="h-40 mt-4 border rounded-md">
            <div className="p-4 space-y-2">
              <h4 className="font-medium">Uploaded Files:</h4>
              {files.map(file => (
                <div key={file.name} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <FileIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium truncate">{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(file.name)}
                    disabled={disabled}
                    className="h-6 w-6"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
