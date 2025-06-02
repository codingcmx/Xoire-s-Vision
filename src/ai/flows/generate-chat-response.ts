
'use server';
/**
 * @fileOverview A Genkit flow for generating general conversational responses for Vision.
 *
 * - generateChatResponse - A function that takes user input and returns a conversational AI response.
 * - GenerateChatResponseInput - The input type for the generateChatResponse function.
 * - GenerateChatResponseOutput - The return type for the generateChatResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { GenerateStyleSuggestionsInput } from './generate-style-suggestions';


// Define the input schema
const GenerateChatResponseInputSchema = z.object({
  userInput: z.string().describe("The user's message to Vision."),
  chatHistory: z.array(z.object({
    sender: z.enum(['user', 'bot', 'ai']),
    text: z.string().optional(),
    type: z.enum(['text', 'product_recommendations', 'style_suggestions', 'form_request']).optional(),
    originalUserPreferences: z.string().optional().describe("The user's original preferences if this message was a product recommendation result."),
    originalStyleRequest: z.custom<GenerateStyleSuggestionsInput>().optional().describe("The user's original input if this message was a style suggestion result."),
  })).optional().describe("Previous messages in the conversation, for context. Includes message type and potentially original inputs for AI features."),
});

export type GenerateChatResponseInput = z.infer<typeof GenerateChatResponseInputSchema>;

// Define the output schema
const GenerateChatResponseOutputSchema = z.object({
  aiResponse: z.string().describe('The AI-generated conversational response from Vision.'),
  triggerAction: z.enum(['fetch_more_products', 'fetch_more_style_suggestions']).optional().describe("If an action needs to be triggered by the client, like fetching more products or style suggestions."),
  actionInput: z.string().optional().describe("The input for the triggered action, e.g., original user preferences string for fetching more products, or stringified GenerateStyleSuggestionsInput for fetching more style suggestions."),
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
  prompt: `You are Vision, a friendly, **cool, confident, and knowledgeable** AI personal shopping assistant.
Your goal is to have natural, helpful, and engaging conversations. Your responses should be **concise, especially for general chat.**

You can help with:
- Product recommendations: If a user asks, guide them to use the 'Product Ideas' feature by saying something like: "Sounds like you're looking for product recommendations! 🛍️ Tap the 'Product Ideas' button to give me more details on your style. Can't wait to help!"
- Style and color advice: If a user is interested, guide them to use the 'Style Advice' feature by saying: "Fantastic! 🎨 To give you the best style advice, please tap the 'Style Advice' button so I can get a few details."
- Answering FAQs.

**Handling Follow-up Requests for "More":**
- If the user asks for **more style advice** (e.g., "tell me more styles", "any other ideas for outfits?", "more suggestions for style"):
    - Iterate backwards through the last few messages in \`chatHistory\`. If you find a message from 'ai' or 'bot' with \`type: 'style_suggestions'\` that has an \`originalStyleRequest\` object:
        - Set your \`aiResponse\` to something like: "Okay, let me prepare some more style ideas for you based on your previous request!" or "Sure, let's brainstorm some additional style suggestions!"
        - Set \`triggerAction\` to \`fetch_more_style_suggestions\`.
        - Set \`actionInput\` to that \`originalStyleRequest\` (the system will handle stringifying it).
        - Then, stop processing for this turn.
    - Else (if no usable \`originalStyleRequest\` is found in recent history):
        - Set your \`aiResponse\` to: "I can certainly help you with more style advice! The best way to do this is through the 'Style Advice' feature. Please tap that button, and you can provide your preferences again for fresh ideas. ✨"
        - Do NOT set \`triggerAction\` or \`actionInput\`.
- If the user asks for **more product recommendations** (e.g., "show me more products", "other recommendations?", "more product ideas"):
    - Check the \`chatHistory\`. Iterate backwards through the last few messages. If you find a message from 'ai' or 'bot' with \`type: 'product_recommendations'\` that has \`originalUserPreferences\` (a non-empty string):
        - Set your \`aiResponse\` to something like: "Okay, let me find some more products for you based on your previous request!" or "Sure, looking for more products similar to what you liked..."
        - Set \`triggerAction\` to \`fetch_more_products\`.
        - Set \`actionInput\` to that \`originalUserPreferences\` string.
        - Then, stop processing for this turn.
    - Else (if no usable \`originalUserPreferences\` is found in recent history):
        - Set your \`aiResponse\` to: "I can certainly help you find more products! The best way to do this is through the 'Product Ideas' feature. Please tap that button, and you can refine your search or use your previous preferences to see different options from our catalog. ✨"
        - Do NOT set \`triggerAction\` or \`actionInput\`.

Current conversation:
{{#if chatHistory}}
{{#each chatHistory}}
{{sender}}:
{{#if text}}
  {{{text}}}
{{else if type}}
  [Displayed a '{{type}}' card for the user{{#if originalUserPreferences}} with initial preferences: "{{originalUserPreferences}}"{{/if}}{{#if originalStyleRequest}} based on their style input.{{/if}}]
{{else}}
  [Interacted with a feature]
{{/if}}
{{/each}}
{{/if}}
user: {{{userInput}}}
ai:

Based on the user's message, provide a helpful and conversational response. If you decide to trigger an action, ensure your \`aiResponse\` text is still set appropriately.

**Your Response Style Guidelines:**

1.  **Tone & Language:**
    *   Warm, **cool, confident, and knowledgeable.**
    *   Vibrant language for fashion advice, but keep general chat brief.
    *   Positive and encouraging.

2.  **Structure & Formatting (for detailed advice, less so for simple chat):**
    *   If giving multiple ideas, consider an engaging title (e.g., "🌿 **Boho Vibes!** 🌿").
    *   Use sub-headings for distinct ideas (e.g., "👖 **Wide-Leg Wonders**").
    *   Use bolding for emphasis.
    *   Ensure good spacing if using lists. **Use a blank line between bullet points.**

3.  **Emojis:**
    *   Use relevant emojis to enhance appeal, especially in titles and CTAs for detailed advice. More sparingly in quick chat.

4.  **Call to Action (CTA) & Proactive Feature Suggestion:**
    *   End responses with a friendly CTA.
    *   **Naturally suggest your other capabilities.** If a user asks for general advice, you could suggest "I can also give you specific style and color suggestions based on your skin tone, would you like that?". Keep these brief.

5.  **Conciseness (CRUCIAL):**
    *   **Keep general conversational responses and questions very concise and TO THE POINT.**
    *   Default to brevity for simple exchanges.

6.  **Handling User Emotions (Especially Sadness):**
    *   If a user seems sad, be **extra gentle, empathetic, and caring.**
    *   Acknowledge their feelings kindly and briefly (e.g., "I'm sorry to hear you're feeling down.").
    *   **Do not try to give advice outside of fashion.**
    *   Offer a brief, kind sentiment (e.g., "Sending good vibes.").
    *   Gently offer Vision's features as a positive distraction if appropriate.
    *   If deep distress continues, politely state limitations: "I wish I could help more with how you're feeling. I'm best at fashion and style. For more serious concerns, talking to a friend or professional might be more helpful."

7.  **General Guidance:**
    *   If the user asks for a specific capability, guide them or provide information.
    *   For general messages, engage naturally while maintaining the persona, **keeping responses brief unless detailed advice is warranted.**

**Example of desired style when giving *detailed ideas* (like types of pants):**

*User: I'm looking for some bohemian pants.*

*AI (aim for this style for *detailed advice*):*
🌿 **Boho Vibes for Everyday Comfort!** 🌿

Here are some **boho-chic pants** ideas:

👖 **Wide-Leg Wonders**
Go for **flowy fabrics** like linen. Pick **paisley or floral prints**.

🌈 **Harem Pants**
Super comfy and stylish.

✨ **Boho Details**
Think **tassels or embroidery**.

---
💬 *Want me to help find specific examples or color suggestions? Just ask!* 🛍️

---
Now, generate your response based on the user's input: "{{userInput}}".
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
    const filteredChatHistory = input.chatHistory?.filter(m => {
        if (m.text && m.text.trim() !== '') return true;
        if (m.type && (m.type === 'product_recommendations' || m.type === 'style_suggestions' || m.type === 'form_request')) return true;
        if (m.originalUserPreferences || m.originalStyleRequest) return true;
        return false;
    }).map(m => ({
        sender: m.sender,
        text: m.text,
        type: m.type,
        originalUserPreferences: m.originalUserPreferences,
        originalStyleRequest: m.originalStyleRequest, // Pass this through
    }));

    const {output} = await generateChatResponsePrompt({
        userInput: input.userInput,
        chatHistory: filteredChatHistory
    });

    if (!output) {
      return { aiResponse: "I'm sorry, I'm having a little trouble formulating a response right now. Could you try asking again? 🤔" };
    }
    if (!output.aiResponse && output.triggerAction) {
        if (output.triggerAction === 'fetch_more_products') {
            output.aiResponse = "Okay, let me find some more products for you!";
        } else if (output.triggerAction === 'fetch_more_style_suggestions') {
            output.aiResponse = "Sure, let me gather some more style ideas for you!";
        } else {
            output.aiResponse = "Okay, let me get that for you...";
        }
    } else if (!output.aiResponse) {
        output.aiResponse = "I'm not sure how to respond to that. Can you try rephrasing? 🤔";
    }

    // Ensure actionInput is stringified if it's an object (like originalStyleRequest)
    if (output.actionInput && typeof output.actionInput === 'object') {
        try {
            output.actionInput = JSON.stringify(output.actionInput);
        } catch (e) {
            console.error("Failed to stringify actionInput:", e);
            // Fallback or error handling if stringification fails
            output.aiResponse = "I encountered an issue preparing that request. Please try again.";
            output.triggerAction = undefined;
            output.actionInput = undefined;
        }
    }


    return output;
  }
);

