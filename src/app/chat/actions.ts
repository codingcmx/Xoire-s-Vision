
"use server";

import { generateProductRecommendations, type GenerateProductRecommendationsInput, type GenerateProductRecommendationsOutput } from '@/ai/flows/generate-product-recommendations';
import { generateStyleSuggestions, type GenerateStyleSuggestionsInput, type GenerateStyleSuggestionsOutput } from '@/ai/flows/generate-style-suggestions';

export interface ActionError {
  error: {
    message: string;
    details?: any;
  };
}

export async function getProductRecommendationsAction(
  input: GenerateProductRecommendationsInput
): Promise<GenerateProductRecommendationsOutput | ActionError> {
  try {
    const recommendations = await generateProductRecommendations(input);
    return recommendations;
  } catch (error: any) {
    console.error("Error getting product recommendations:", error);
    return { error: { message: error.message || "Failed to generate product recommendations." } };
  }
}

export async function getStyleSuggestionsAction(
  input: GenerateStyleSuggestionsInput
): Promise<GenerateStyleSuggestionsOutput | ActionError> {
  try {
    const suggestions = await generateStyleSuggestions(input);
    return suggestions;
  } catch (error: any) {
    console.error("Error getting style suggestions:", error);
    return { error: { message: error.message || "Failed to generate style suggestions." } };
  }
}
