"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuestionSelectorProps {
  onQuestionSelect: (question: string) => void;
  disabled: boolean;
}

const questions = [
  {
    display: "Do I qualify for Medicaid?",
    prompt: "Do I qualify for Medicaid based on the information provided and in compliance with The Big Beautiful Bill? Background: I live in the city of San Francisco."
  },
  {
    display: "Do I qualify for SNAP?",
    prompt: "Do I qualify for SNAP based on the information provided and in compliance with The Big Beautiful Bill? Background: I live in the city of San Francisco."
  },
  {
    display: "Do I qualify for both?",
    prompt: "Do I qualify for Medicaid and SNAP based on the information provided and in compliance with The Big Beautiful Bill? Background: I live in the city of San Francisco."
  },
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
            key={question.prompt}
            variant="outline"
            onClick={() => onQuestionSelect(question.prompt)}
            disabled={disabled}
          >
            {question.display}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
