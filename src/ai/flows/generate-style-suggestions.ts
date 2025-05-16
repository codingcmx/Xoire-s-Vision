
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
  skinTone: z.string().describe("The user's skin tone (e.g., fair, medium, dark)."),
  preferences: z.string().describe("The user's style preferences (e.g., modern, classic, bohemian)."),
  gender: z.enum(['male', 'female', 'other']).describe("The user's gender identity, to help tailor suggestions (e.g., male, female, other)."),
  currentTrends: z.string().optional().describe('Current fashion trends the user wants to consider.'),
});

export type GenerateStyleSuggestionsInput = z.infer<typeof GenerateStyleSuggestionsInputSchema>;

// Define the output schema
const GenerateStyleSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of personalized style suggestions. Each suggestion should be concise. Use bullet points if a single suggestion contains multiple distinct ideas. Include relevant emojis.'),
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
  prompt: `You are a personal stylist. Based on the user's skin tone, style preferences, gender, and current trends, provide personalized style suggestions.
Tailor your advice based on the provided gender (e.g., suggesting different clothing items or styles typically associated with 'male', 'female', or offering more neutral/versatile options for 'other', while always respecting the user's overall style preferences).
Make your suggestions engaging by including relevant emojis where appropriate (e.g., ✨, 🎨, 👍, 👗, 👖, 👠, 💄, 👔, 👟).
Each suggestion in the array should be a concise piece of advice. If a single piece of advice involves multiple distinct points, consider formatting it as a mini bullet list within that string.

Skin Tone: {{{skinTone}}}
Preferences: {{{preferences}}}
Gender: {{{gender}}}
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

