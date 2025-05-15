import type { StyleSuggestionData } from '@/types/chat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface StyleSuggestionCardProps {
  data: StyleSuggestionData;
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
              <p className="text-sm text-card-foreground">{suggestion}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No specific style suggestions available at this time.</p>
        )}
      </CardContent>
    </Card>
  );
}
