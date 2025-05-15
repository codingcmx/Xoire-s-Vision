
"use server";

import { generateProductRecommendations, type GenerateProductRecommendationsInput, type GenerateProductRecommendationsOutput } from '@/ai/flows/generate-product-recommendations';
import { generateStyleSuggestions, type GenerateStyleSuggestionsInput, type GenerateStyleSuggestionsOutput } from '@/ai/flows/generate-style-suggestions';
import { generateChatResponse, type GenerateChatResponseInput, type GenerateChatResponseOutput } from '@/ai/flows/generate-chat-response';

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

export async function getChatResponseAction(
  input: GenerateChatResponseInput
): Promise<GenerateChatResponseOutput | ActionError> {
  try {
    const response = await generateChatResponse(input);
    return response;
  } catch (error: any) {
    console.error("Error getting chat response:", error);
    return { error: { message: error.message || "Failed to generate chat response." } };
  }
}
