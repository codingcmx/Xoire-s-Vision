
import { config } from 'dotenv';
config();

// Ensure this is imported if your flows use any services
// that might need environment variables or specific initialization.
// For example, if product-catalog-service needed an API key from .env

import '@/ai/flows/generate-product-recommendations.ts';
import '@/ai/flows/generate-style-suggestions.ts';
import '@/ai/flows/generate-chat-response.ts'; // Added new flow
// Potentially import other flows or tools as needed
