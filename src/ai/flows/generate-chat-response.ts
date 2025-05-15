
'use server';
/**
 * @fileOverview A Genkit flow for generating general conversational responses for StyleBot.
 *
 * - generateChatResponse - A function that takes user input and returns a conversational AI response.
 * - GenerateChatResponseInput - The input type for the generateChatResponse function.
 * - GenerateChatResponseOutput - The return type for the generateChatResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const GenerateChatResponseInputSchema = z.object({
  userInput: z.string().describe("The user's message to StyleBot."),
  chatHistory: z.array(z.object({
    sender: z.enum(['user', 'bot', 'ai']),
    text: z.string().optional(), // Make text optional as some messages might be cards
  })).optional().describe("Previous messages in the conversation, for context."),
});

export type GenerateChatResponseInput = z.infer<typeof GenerateChatResponseInputSchema>;

// Define the output schema
const GenerateChatResponseOutputSchema = z.object({
  aiResponse: z.string().describe('The AI-generated conversational response from StyleBot.'),
});

export type GenerateChatResponseOutput = z.infer<typeof GenerateChatResponseOutputSchema>;

// Exported function to call the flow
export async function generateChatResponse(
  input: GenerateChatResponseInput
): Promise<GenerateChatResponseOutput> {
  return generateChatResponseFlow(input);
}

// Define the prompt
const generateChatResponsePrompt = ai.definePrompt({
  name: 'generateChatResponsePrompt',
  input: {schema: GenerateChatResponseInputSchema},
  output: {schema: GenerateChatResponseOutputSchema},
  prompt: `You are StyleBot, a friendly and knowledgeable AI personal shopping assistant.
Your goal is to have a natural, helpful conversation with the user.

You can help with:
- Product recommendations (users can say "recommend products" or similar).
- Style and color advice (users can say "give me style advice" or similar).
- Answering Frequently Asked Questions (FAQs).

Current conversation:
{{#if chatHistory}}
{{#each chatHistory}}
{{#if text}}
{{sender}}: {{{text}}}
{{/if}}
{{/each}}
{{/if}}
user: {{{userInput}}}
ai:

Based on the user's message, provide a helpful and conversational response.
- If the user seems to be asking for one of your specific capabilities (product recommendations, style advice, FAQs), you can acknowledge that and gently guide them, but primarily focus on responding to their current message. For example, if they say "I'm looking for a new dress," you could say "Finding a new dress can be exciting! Are you looking for recommendations for a specific occasion, or perhaps some style advice on what kind of dress might suit you?"
- If their message is more general, engage naturally.
- Keep your responses relatively concise.
- Be polite and engaging.
`,
});

// Define the flow
const generateChatResponseFlow = ai.defineFlow(
  {
    name: 'generateChatResponseFlow',
    inputSchema: GenerateChatResponseInputSchema,
    outputSchema: GenerateChatResponseOutputSchema,
  },
  async input => {
    // Filter out messages without text for the AI prompt context
    const filteredChatHistory = input.chatHistory?.filter(m => m.text && m.text.trim() !== '');

    const {output} = await generateChatResponsePrompt({
        userInput: input.userInput,
        chatHistory: filteredChatHistory
    });
    if (!output?.aiResponse) {
      // Fallback response if AI fails to generate a proper one
      return { aiResponse: "I'm sorry, I'm having a little trouble understanding. Could you please rephrase that?" };
    }
    return output;
  }
);
