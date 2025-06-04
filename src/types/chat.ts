
import type { GenerateProductRecommendationsInput, GenerateProductRecommendationsOutput } from '@/ai/flows/generate-product-recommendations';
import type { GenerateStyleSuggestionsInput, GenerateStyleSuggestionsOutput } from '@/ai/flows/generate-style-suggestions';

export type MessageSender = 'user' | 'bot' | 'ai';

export interface Message {
  id: string;
  sender: MessageSender;
  text?: string;
  timestamp: Date;
  type: 'text' | 'product_recommendations' | 'style_suggestions' | 'form_request';
  data?: any; // To store AI results or form schemas
  originalInput?: GenerateProductRecommendationsInput | GenerateStyleSuggestionsInput; // To store the input that generated AI card results
  isLoading?: boolean;
}

export interface ProductRecommendationData {
  products: Array<{
    name: string;
    rationale: string;
    productUrl?: string; // Changed from imageUrl to productUrl
  }>;
  overallReasoning: string;
}
export interface StyleSuggestionData extends GenerateStyleSuggestionsOutput {}

export type AiFeature = 'product_recommendations' | 'style_suggestions';
