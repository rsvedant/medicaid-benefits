"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuestionSelectorProps {
  onQuestionSelect: (question: string) => void;
  disabled: boolean;
}

const questions = [
  "Do I qualify for Medicaid?",
  "Do I qualify for SNAP?",
  "Do I qualify for both?",
];

export function QuestionSelector({ onQuestionSelect, disabled }: QuestionSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>2. Select a Question</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        {questions.map((question) => (
          <Button
            key={question}
            variant="outline"
            onClick={() => onQuestionSelect(question)}
            disabled={disabled}
          >
            {question}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
