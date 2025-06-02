
import type { StyleSuggestionData } from '@/types/chat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import React from 'react';

interface StyleSuggestionCardProps {
  data: StyleSuggestionData;
}

function parseSuggestionWithColors(suggestionText: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const regex = /{color:([^:]+):(#[0-9A-Fa-f]{6}|[a-zA-Z]+)}/g; // Updated regex to accept named colors too
  let match;

  while ((match = regex.exec(suggestionText)) !== null) {
    // Text before the match
    if (match.index > lastIndex) {
      parts.push(suggestionText.substring(lastIndex, match.index));
    }

    const colorName = match[1];
    const colorValue = match[2]; // This can be a HEX code or a named CSS color

    parts.push(
      <span key={`color-${match.index}-${colorName}`} className="inline-flex items-center whitespace-nowrap">
        <span
          className="inline-block w-3 h-3 rounded-sm mr-1 border border-gray-400 align-middle"
          style={{ backgroundColor: colorValue }}
          title={colorName}
        ></span>
        {colorName}
      </span>
    );
    lastIndex = regex.lastIndex;
  }

  // Remaining text after the last match
  if (lastIndex < suggestionText.length) {
    parts.push(suggestionText.substring(lastIndex));
  }
  // If no matches, return the original text as a single element array
  if (parts.length === 0 && suggestionText) {
      parts.push(suggestionText);
  }

  return parts;
}


export function StyleSuggestionCard({ data }: StyleSuggestionCardProps) {
  return (
    <Card className="w-full max-w-md bg-card shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-accent">Style & Color Guidance</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        {data.suggestions.length > 0 ? (
          data.suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start space-x-2">
              <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-card-foreground">
                {parseSuggestionWithColors(suggestion).map((part, i) => (
                  <React.Fragment key={i}>{part}</React.Fragment>
                ))}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No specific style suggestions available at this time.</p>
        )}
      </CardContent>
    </Card>
  );
}

