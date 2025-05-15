
import type { GenerateProductRecommendationsOutput } from '@/ai/flows/generate-product-recommendations';
import type { GenerateStyleSuggestionsOutput } from '@/ai/flows/generate-style-suggestions';

export type MessageSender = 'user' | 'bot' | 'ai';

export interface Message {
  id: string;
  sender: MessageSender;
  text?: string;
  timestamp: Date;
  type: 'text' | 'product_recommendations' | 'style_suggestions' | 'form_request';
  data?: any; // To store AI results or form schemas
  isLoading?: boolean;
}

// Updated to reflect the new structure from generate-product-recommendations.ts
export interface ProductRecommendationData {
  products: Array<{
    name: string;
    rationale: string;
    imageUrl?: string; 
  }>;
  overallReasoning: string;
}
export interface StyleSuggestionData extends GenerateStyleSuggestionsOutput {}

export type AiFeature = 'product_recommendations' | 'style_suggestions';

