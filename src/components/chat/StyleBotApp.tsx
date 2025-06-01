
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import type { Message, AiFeature, MessageSender } from '@/types/chat';
import type { GenerateProductRecommendationsInput, GenerateProductRecommendationsOutput } from '@/ai/flows/generate-product-recommendations';
import type { GenerateStyleSuggestionsInput, GenerateStyleSuggestionsOutput } from '@/ai/flows/generate-style-suggestions';
import type { GenerateChatResponseInput, GenerateChatResponseOutput } from '@/ai/flows/generate-chat-response';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatControls } from './ChatControls';
import { faqs, contactInfo } from '@/lib/faq';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ProductRecForm, StyleGuideForm } from './AiFeatureForms';
import { getProductRecommendationsAction, getStyleSuggestionsAction, getChatResponseAction, type ActionError } from '@/app/chat/actions';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '../ui/button';

export default function StyleBotApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAiForm, setShowAiForm] = useState<AiFeature | null>(null);
  const [showFaqList, setShowFaqList] = useState(false);
  const { toast } = useToast();

  const addMessage = useCallback((sender: Message['sender'], text?: string, type: Message['type'] = 'text', data?: any, isLoadingFlag?: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString() + Math.random().toString(), // Simple unique ID
      sender,
      text,
      timestamp: new Date(),
      type,
      data,
      isLoading: isLoadingFlag,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    return newMessage.id;
  }, []);
  
  const updateMessage = useCallback((messageId: string, updates: Partial<Message>) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => msg.id === messageId ? { ...msg, ...updates, isLoading: false } : msg)
    );
  }, []);


  useEffect(() => {
    addMessage('bot', "Hello! I'm Vision. How can I help you today? You can ask for product recommendations, style advice, or see FAQs.");
  }, [addMessage]);

  const handleFaqSearch = (userInput: string): string | null => {
    const lowerInput = userInput.toLowerCase();
    for (const faq of faqs) {
      if (faq.keywords.some(keyword => lowerInput.includes(keyword.toLowerCase()))) {
        return faq.answer;
      }
    }
    return null;
  };

  const handleSendMessage = async (text: string) => {
    addMessage('user', text);
    setIsLoading(true);

    const faqAnswer = handleFaqSearch(text);

    if (faqAnswer) {
      setTimeout(() => addMessage('bot', faqAnswer), 500);
      setIsLoading(false);
    } else {
      const loadingMsgId = addMessage('bot', undefined, 'text', undefined, true);
      try {
        const chatHistoryForContext = messages
          .slice(-5)
          .map(m => ({ 
            sender: m.sender as 'user' | 'bot' | 'ai', // Ensure correct enum type
            text: m.text || (m.type !== 'text' ? `[${m.type.replace(/_/g, ' ')} displayed]` : '') 
          }));
        
        const result = await getChatResponseAction({ userInput: text, chatHistory: chatHistoryForContext });
        if ((result as ActionError).error) {
          const errorResult = result as ActionError;
          console.error(errorResult.error.message);
          updateMessage(loadingMsgId, { text: `Sorry, I had a little trouble with that. ${errorResult.error.message}`, type: 'text' });
          toast({ title: "Error", description: errorResult.error.message, variant: "destructive" });
        } else {
          const chatResponse = result as GenerateChatResponseOutput;
          updateMessage(loadingMsgId, { text: chatResponse.aiResponse });
        }
      } catch (error: any) {
        console.error("Client-side error calling getChatResponseAction:", error);
        const errorMessage = error.message || "An unexpected error occurred.";
        updateMessage(loadingMsgId, { text: `Sorry, I couldn't process that right now. ${errorMessage}`, type: 'text' });
        toast({ title: "Error", description: errorMessage, variant: "destructive" });
      }
      setIsLoading(false);
    }
  };

  const handleTriggerFeature = (feature: 'product_recommendations' | 'style_suggestions' | 'faq_list' | 'contact_info' | 'escalate') => {
    switch (feature) {
      case 'product_recommendations':
      case 'style_suggestions':
        setShowAiForm(feature);
        break;
      case 'faq_list':
        setShowFaqList(true);
        break;
      case 'contact_info':
        addMessage('bot', `You can reach us via:\nEmail: ${contactInfo.email}\nPhone: ${contactInfo.phone}\nHours: ${contactInfo.hours}`);
        break;
      case 'escalate':
        addMessage('bot', "I'm transferring you to a human agent. Please wait a moment...");
        break;
    }
  };

  const handleProductRecSubmit = async (data: GenerateProductRecommendationsInput) => {
    setShowAiForm(null);
    addMessage('user', "Okay, here are my preferences for product recommendations."); 
    const loadingMsgId = addMessage('ai', undefined, 'product_recommendations', undefined, true);
    setIsLoading(true);
    try {
      const result = await getProductRecommendationsAction(data);
      if ((result as ActionError).error) {
        const errorResult = result as ActionError;
        console.error(errorResult.error.message);
        updateMessage(loadingMsgId, { text: `Sorry, I couldn't get product recommendations. ${errorResult.error.message}`, type: 'text' });
        toast({ title: "Error", description: errorResult.error.message, variant: "destructive" });
      } else {
        updateMessage(loadingMsgId, { data: result as GenerateProductRecommendationsOutput });
        // Follow-up message from the bot
        setTimeout(() => {
            addMessage('bot', "Hope you like these product ideas! ✨ Would you also be interested in some personalized style and color advice to complement them? I can help with that too!");
        }, 600); // Small delay to ensure recommendation card renders first
      }
    } catch (error: any) { 
      console.error("Client-side error calling getProductRecommendationsAction:", error);
      const errorMessage = error.message || "An unexpected error occurred while fetching recommendations.";
      updateMessage(loadingMsgId, { text: `Sorry, I couldn't get product recommendations right now. ${errorMessage}`, type: 'text' });
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    }
    setIsLoading(false);
  };

  const handleStyleGuideSubmit = async (data: GenerateStyleSuggestionsInput) => {
    setShowAiForm(null);
    addMessage('user', "Great, here's my info for style advice."); 
    const loadingMsgId = addMessage('ai', undefined, 'style_suggestions', undefined, true);
    setIsLoading(true);
    try {
      const result = await getStyleSuggestionsAction(data);
      if ((result as ActionError).error) {
        const errorResult = result as ActionError;
        console.error(errorResult.error.message);
        updateMessage(loadingMsgId, { text: `Sorry, I couldn't get style suggestions. ${errorResult.error.message}`, type: 'text' });
        toast({ title: "Error", description: errorResult.error.message, variant: "destructive" });
      } else {
        updateMessage(loadingMsgId, { data: result as GenerateStyleSuggestionsOutput });
      }
    } catch (error: any) { 
      console.error("Client-side error calling getStyleSuggestionsAction:", error);
      const errorMessage = error.message || "An unexpected error occurred while fetching style suggestions.";
      updateMessage(loadingMsgId, { text: `Sorry, I couldn't get style suggestions right now. ${errorMessage}`, type: 'text' });
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    }
    setIsLoading(false);
  };


  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <ChatHeader />
      <MessageList messages={messages} />
      <ChatControls onSendMessage={handleSendMessage} isSending={isLoading} onTriggerFeature={handleTriggerFeature} />

      <Dialog open={!!showAiForm} onOpenChange={() => setShowAiForm(null)}>
        <DialogContent className="sm:max-w-[425px] bg-card">
          <DialogHeader>
            <DialogTitle className="text-primary">
              {showAiForm === 'product_recommendations' ? 'Product Recommendations' : 'Style & Color Guidance'}
            </DialogTitle>
            <DialogDescription>
              {showAiForm === 'product_recommendations' 
                ? 'Tell us about your preferences so we can find products you might like.'
                : 'Help us understand your style so we can offer personalized advice.'}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] py-1 pr-3">
            <div className="p-4"> {/* Changed py-4 to p-4 for horizontal padding */}
              {showAiForm === 'product_recommendations' && <ProductRecForm onSubmit={handleProductRecSubmit} isSubmitting={isLoading} />}
              {showAiForm === 'style_suggestions' && <StyleGuideForm onSubmit={handleStyleGuideSubmit} isSubmitting={isLoading} />}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={showFaqList} onOpenChange={setShowFaqList}>
        <DialogContent className="max-w-lg bg-card">
          <DialogHeader>
            <DialogTitle className="text-primary">Frequently Asked Questions</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] p-1">
            <div className="space-y-4 py-4 pr-4">
            {faqs.map(faq => (
              <div key={faq.id} className="border-b pb-2">
                <h3 className="font-semibold text-card-foreground">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

