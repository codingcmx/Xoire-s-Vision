
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
  occasion: z.string().optional().describe("The specific occasion the user is dressing for (e.g., wedding, casual outing, work, your wear today)."),
  currentTrends: z.string().optional().describe('Current fashion trends the user wants to consider.'),
  previousSuggestions: z.array(z.string()).optional().describe("An array of style suggestions already provided to the user in previous turns for the same request, to help generate distinct new ideas."),
});

export type GenerateStyleSuggestionsInput = z.infer<typeof GenerateStyleSuggestionsInputSchema>;

// Define the output schema
const GenerateStyleSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of personalized style suggestions. Each suggestion should be concise. Use bullet points if a single suggestion contains multiple distinct ideas. Include relevant emojis. If suggesting a color, try to embed its HEX code like {color:COLOR_NAME:HEX_CODE}.'),
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
  prompt: `You are a personal stylist. Based on the user's skin tone, style preferences, gender, occasion (if provided), and current trends, provide personalized style suggestions.
Tailor your advice based on the provided gender.
If an occasion is specified (e.g., 'wedding guest', 'beach vacation', 'office party'), ensure your suggestions are appropriate for that context.

When you suggest a specific color, please try to include its HEX code directly in the text using the format {color:COLOR_NAME:HEX_CODE}.
For example:
- 'a {color:Light Blue:#ADD8E6} shirt'
- '{color:Classic Red:#FF0000} lipstick'
- 'pair it with {color:Forest Green:#228B22} accessories'
If you are unsure of a HEX code or it's a general color term (e.g., 'neutral tones', 'pastels'), just use the color name as usual without the special formatting. This formatting helps display a color swatch to the user.

Make your suggestions engaging by including relevant emojis where appropriate (e.g., ✨, 🎨, 👍, 👗, 👖, 👠, 💄, 👔, 👟).
Each suggestion in the array should be a concise piece of advice. If a single piece of advice involves multiple distinct points, consider formatting it as a mini bullet list within that string.

**For 'female' gender:**
*   Consider suggesting complementary **lipstick shades** that would pair well with the recommended outfits or color palettes (e.g., 'A {color:Dusty Rose:#DCAE96} lipstick would be lovely.').
*   Where appropriate and fitting for the overall style/occasion (e.g., not for very casual or sporty looks unless specifically requested), suggest **earring styles** (e.g., studs, hoops, chandelier) that would enhance the look. Be mindful to suggest earrings only when they genuinely add to the ensemble.

{{#if previousSuggestions}}
You have already provided the following suggestions to the user for this request:
{{#each previousSuggestions}}
- "{{this}}"
{{/each}}
Please provide **NEW and DISTINCT** suggestions that build upon or offer alternatives to these, if possible.
{{/if}}

Skin Tone: {{{skinTone}}}
Preferences: {{{preferences}}}
Gender: {{{gender}}}
{{#if occasion}}Occasion: {{{occasion}}}{{/if}}
{{#if currentTrends}}Current Trends: {{{currentTrends}}}{{/if}}

Provide 2-3 new, distinct style suggestions.
If you cannot generate any genuinely new and distinct suggestions beyond what might have been previously provided, return a single suggestion in the array like: "I've shared my best new ideas for you based on your preferences!"

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
    if (!output || !output.suggestions) {
        return { suggestions: ["Sorry, I'm having a bit of trouble coming up with style ideas right now. Please try again shortly!"] };
    }
    return output;
  }
);

