
// Use server directive.
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized style suggestions based on user input.
 *
 * - `generateStyleSuggestions`: A function that takes user input (skin tone, preferences, etc.) and returns style suggestions.
 * - `GenerateStyleSuggestionsInput`: The input type for the `generateStyleSuggestions` function.
 * - `GenerateStyleSuggestionsOutput`: The output type for the `generateStyleSuggestions` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const GenerateStyleSuggestionsInputSchema = z.object({
  skinTone: z.string().describe('The user\'s skin tone (e.g., fair, medium, dark).'),
  preferences: z.string().describe('The user\'s style preferences (e.g., modern, classic, bohemian).'),
  currentTrends: z.string().optional().describe('Current fashion trends the user wants to consider.'),
});

export type GenerateStyleSuggestionsInput = z.infer<typeof GenerateStyleSuggestionsInputSchema>;

// Define the output schema
const GenerateStyleSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of personalized style suggestions, potentially including relevant emojis.'),
});

export type GenerateStyleSuggestionsOutput = z.infer<typeof GenerateStyleSuggestionsOutputSchema>;

// Exported function to call the flow
export async function generateStyleSuggestions(
  input: GenerateStyleSuggestionsInput
): Promise<GenerateStyleSuggestionsOutput> {
  return generateStyleSuggestionsFlow(input);
}

// Define the prompt
const generateStyleSuggestionsPrompt = ai.definePrompt({
  name: 'generateStyleSuggestionsPrompt',
  input: {schema: GenerateStyleSuggestionsInputSchema},
  output: {schema: GenerateStyleSuggestionsOutputSchema},
  prompt: `You are a personal stylist. Based on the user's skin tone, style preferences, and current trends, provide personalized style suggestions.
Make your suggestions engaging by including relevant emojis where appropriate (e.g., ✨, 🎨, 👍, 👗, 👖, 👠, 💄).

Skin Tone: {{{skinTone}}}
Preferences: {{{preferences}}}
Current Trends: {{{currentTrends}}}

Suggestions:`, // The AI will fill this field in
});

// Define the flow
const generateStyleSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateStyleSuggestionsFlow',
    inputSchema: GenerateStyleSuggestionsInputSchema,
    outputSchema: GenerateStyleSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await generateStyleSuggestionsPrompt(input);
    return output!;
  }
);

