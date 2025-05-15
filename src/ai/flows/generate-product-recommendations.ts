
'use server';

/**
 * @fileOverview Recommends products based on user preferences and past behavior,
 * by first fetching relevant products from the catalog using a tool.
 *
 * - generateProductRecommendations - A function that handles the product recommendation process.
 * - GenerateProductRecommendationsInput - The input type for the generateProductRecommendations function.
 * - GenerateProductRecommendationsOutput - The return type for the generateProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { Product } from '@/services/product-catalog-service';
import { fetchProductsFromCatalog } from '@/services/product-catalog-service';

const GenerateProductRecommendationsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('The stated preferences of the user regarding style, fit, colors, and types of items.'),
  pastBehavior: z
    .string()
    .describe(
      'A description of the user\'s past behavior, including previous purchases, items browsed, or brands liked.'
    ),
});
export type GenerateProductRecommendationsInput = z.infer<
  typeof GenerateProductRecommendationsInputSchema
>;

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  price: z.number(),
  imageUrl: z.string().optional(),
});

const GenerateProductRecommendationsOutputSchema = z.object({
  products: z
    .array(z.object({
        name: z.string().describe("Name of the recommended product."),
        rationale: z.string().describe("Brief rationale for why this specific product is recommended based on user input and catalog match."),
        imageUrl: z.string().optional().describe("URL of the product image, if available from the catalog. Omit if not provided by the catalog tool.")
    }))
    .describe('An array of product objects that are recommended from the catalog. Each object includes the product name, rationale, and image URL if available.'),
  overallReasoning: z
    .string()
    .describe(
      'A general explanation of why these products were chosen, summarizing how they align with the user\'s preferences and past behavior after considering the catalog.'
    ),
});
export type GenerateProductRecommendationsOutput = z.infer<
  typeof GenerateProductRecommendationsOutputSchema
>;

// Define the tool for fetching products from the catalog
const getProductCatalogTool = ai.defineTool(
  {
    name: 'getProductCatalogTool',
    description: 'Searches the product catalog based on a query. Use this tool to find products that match user preferences or descriptions before making recommendations. Include product image URLs in the results if available.',
    inputSchema: z.object({
      searchQuery: z.string().describe('A search query describing the types of products to look for, based on user preferences (e.g., "black cotton t-shirt", "comfortable denim jeans", "summer accessories"). Be specific to get relevant results.'),
    }),
    outputSchema: z.array(ProductSchema),
  },
  async (input) => {
    return fetchProductsFromCatalog(input.searchQuery);
  }
);


export async function generateProductRecommendations(
  input: GenerateProductRecommendationsInput
): Promise<GenerateProductRecommendationsOutput> {
  return generateProductRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductRecommendationsPrompt',
  input: {schema: GenerateProductRecommendationsInputSchema},
  output: {schema: GenerateProductRecommendationsOutputSchema},
  tools: [getProductCatalogTool],
  prompt: `You are a personal shopping assistant. Your goal is to recommend products from our store's catalog that best match the user's preferences and past behavior.

User's Stated Preferences:
{{{userPreferences}}}

User's Past Behavior:
{{{pastBehavior}}}

Instructions:
1.  Analyze the user's preferences and past behavior to understand what they are looking for.
2.  Formulate a search query based on this understanding.
3.  Use the 'getProductCatalogTool' with your search query to fetch relevant products from our catalog. This tool will provide product details including name, description, and image URL if available.
4.  Review the products returned by the tool.
5.  Select 2-3 products from the tool's results that are the best match for the user.
6.  For each selected product, provide its name and a brief rationale. Crucially, use the exact 'imageUrl' field from the tool's output for that product. If the tool does not provide an 'imageUrl' for a specific product, then you MUST omit the 'imageUrl' field for that product in your response. Do not invent or guess image URLs.
7.  Provide an overall reasoning for your selections.
8.  VERY IMPORTANT: Only recommend products that are returned by the 'getProductCatalogTool'. Do not invent products or recommend items not found in the catalog search results. For image URLs, you MUST use the exact 'imageUrl' provided by the tool for each product. If the tool does not supply an 'imageUrl' for a product, you must omit the 'imageUrl' in your response for that product. Do not create or guess image URLs. If the tool returns no relevant products, state that you couldn't find suitable items in the catalog based on the current query.

Return the list of product recommendations and reasoning in the requested JSON format.
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
    if (!output) {
        throw new Error("The AI failed to generate product recommendations.");
    }
    // Ensure products array is not empty and names are present if recommendations were made
    if (output.products.length > 0 && !output.products.every(p => p.name)) {
        console.warn("AI recommended products but some names are missing:", output.products);
    }
    return output;
  }
);

