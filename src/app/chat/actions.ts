"use server";

import { generateProductRecommendations, type GenerateProductRecommendationsInput, type GenerateProductRecommendationsOutput } from '@/ai/flows/generate-product-recommendations';
import { generateStyleSuggestions, type GenerateStyleSuggestionsInput, type GenerateStyleSuggestionsOutput } from '@/ai/flows/generate-style-suggestions';

export async function getProductRecommendationsAction(
  input: GenerateProductRecommendationsInput
): Promise<GenerateProductRecommendationsOutput> {
  try {
    const recommendations = await generateProductRecommendations(input);
    return recommendations;
  } catch (error) {
    console.error("Error getting product recommendations:", error);
    // Consider returning a structured error object
    throw new Error("Failed to generate product recommendations.");
  }
}

export async function getStyleSuggestionsAction(
  input: GenerateStyleSuggestionsInput
): Promise<GenerateStyleSuggestionsOutput> {
  try {
    const suggestions = await generateStyleSuggestions(input);
    return suggestions;
  } catch (error) {
    console.error("Error getting style suggestions:", error);
    // Consider returning a structured error object
    throw new Error("Failed to generate style suggestions.");
  }
}
