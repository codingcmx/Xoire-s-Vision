'use server';

/**
 * @fileOverview Recommends products based on user preferences and past behavior.
 *
 * - generateProductRecommendations - A function that handles the product recommendation process.
 * - GenerateProductRecommendationsInput - The input type for the generateProductRecommendations function.
 * - GenerateProductRecommendationsOutput - The return type for the generateProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductRecommendationsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('The stated preferences of the user regarding style and fit.'),
  pastBehavior: z
    .string()
    .describe(
      'A description of the users past behavior, including previous purchases and items browsed.'
    ),
});
export type GenerateProductRecommendationsInput = z.infer<
  typeof GenerateProductRecommendationsInputSchema
>;

const GenerateProductRecommendationsOutputSchema = z.object({
  products: z
    .array(z.string())
    .describe('An array of product names that are recommended.'),
  reasoning: z
    .string()
    .describe(
      'A brief explanation of why each product was recommended, based on past behavior and stated preferences.'
    ),
});
export type GenerateProductRecommendationsOutput = z.infer<
  typeof GenerateProductRecommendationsOutputSchema
>;

export async function generateProductRecommendations(
  input: GenerateProductRecommendationsInput
): Promise<GenerateProductRecommendationsOutput> {
  return generateProductRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductRecommendationsPrompt',
  input: {schema: GenerateProductRecommendationsInputSchema},
  output: {schema: GenerateProductRecommendationsOutputSchema},
  prompt: `You are a personal shopping assistant, recommending products to users based on their stated preferences and past behavior.

  Preferences: {{{userPreferences}}}
  Past Behavior: {{{pastBehavior}}}

  Based on this information, recommend products to the user. For each product, explain why it was recommended based on the user's preferences and past behavior.  Return the list of product recommendations in the requested JSON format.
  `,
});

const generateProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateProductRecommendationsFlow',
    inputSchema: GenerateProductRecommendationsInputSchema,
    outputSchema: GenerateProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
