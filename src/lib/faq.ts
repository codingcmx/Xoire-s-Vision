export interface FAQ {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 'faq1',
    keywords: ['shipping', 'delivery', 'ship my order'],
    question: "What are your shipping options?",
    answer: "We offer standard shipping (5-7 business days) and express shipping (2-3 business days). Shipping costs vary based on location and order size.",
  },
  {
    id: 'faq2',
    keywords: ['return policy', 'return item', 'exchange'],
    question: "What is your return policy?",
    answer: "You can return most items within 30 days of purchase for a full refund or exchange. Items must be in new, unused condition with original tags. Some exclusions apply.",
  },
  {
    id: 'faq3',
    keywords: ['contact', 'support', 'customer service', 'phone number', 'email'],
    question: "How can I contact customer support?",
    answer: "You can reach our customer support team via email at support@stylebot.com or by phone at 1-800-STYLEBOT (1-800-789-5326) during business hours (Monday-Friday, 9 AM - 5 PM EST).",
  },
  {
    id: 'faq4',
    keywords: ['payment', 'payment methods', 'credit card', 'paypal'],
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover) and PayPal.",
  },
  {
    id: 'faq5',
    keywords: ['size', 'sizing chart', 'fit guide'],
    question: "Do you have a sizing chart?",
    answer: "Yes, you can find our comprehensive sizing chart on each product page and also under the 'Help' section on our website.",
  },
];

export const contactInfo = {
  email: "support@stylebot.com",
  phone: "1-800-STYLEBOT (1-800-789-5326)",
  hours: "Monday-Friday, 9 AM - 5 PM EST",
};
