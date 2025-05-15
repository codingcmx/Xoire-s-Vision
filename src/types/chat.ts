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

export interface ProductRecommendationData extends GenerateProductRecommendationsOutput {}
export interface StyleSuggestionData extends GenerateStyleSuggestionsOutput {}

export type AiFeature = 'product_recommendations' | 'style_suggestions';
