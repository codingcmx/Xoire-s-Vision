
"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal, ShoppingBag, Palette, HelpCircle, Headset, PhoneForwarded } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatControlsProps {
  onSendMessage: (text: string, type?: 'text' | 'command', commandData?: any) => void;
  isSending: boolean;
  onTriggerFeature: (feature: 'product_recommendations' | 'style_suggestions' | 'faq_list' | 'contact_info' | 'escalate') => void;
}

export function ChatControls({ onSendMessage, isSending, onTriggerFeature }: ChatControlsProps) {
  const [inputValue, setInputValue] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const actionButtons = [
    { feature: 'product_recommendations', label: 'Product Ideas', icon: ShoppingBag, hint: 'Get product recommendations' },
    { feature: 'style_suggestions', label: 'Style Advice', icon: Palette, hint: 'Get style & color advice' },
    { feature: 'faq_list', label: 'FAQs', icon: HelpCircle, hint: 'View Frequently Asked Questions' },
    { feature: 'contact_info', label: 'Contact Us', icon: PhoneForwarded, hint: 'Get customer service contact info' },
    { feature: 'escalate', label: 'Escalate', icon: Headset, hint: 'Escalate to a human agent' },
  ] as const;

  return (
    <TooltipProvider>
      <div className="bg-card border-t p-4 shadow- ऊपर">
        {isClient ? (
          <>
            <div className="flex items-center space-x-2 mb-3">
              {actionButtons.map(({ feature, label, icon: Icon, hint }) => (
                <Tooltip key={feature}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onTriggerFeature(feature)}
                      aria-label={label}
                      className="text-muted-foreground hover:text-primary-foreground hover:bg-primary hover:border-primary"
                    >
                      <Icon className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{hint}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isSending}
                className="flex-grow text-sm"
              />
              <Button onClick={handleSend} disabled={isSending || !inputValue.trim()} aria-label="Send message">
                <SendHorizonal className="h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          // Placeholder or skeleton for initial render if desired, or just nothing until client mounts
          <div className="space-y-3">
            <div className="flex items-center space-x-2 h-[40px]">
              {/* Placeholder for action buttons */}
            </div>
            <div className="flex items-center space-x-2 h-[40px]">
              {/* Placeholder for input and send button */}
            </div>
          </div>
        )}
        <div className="text-center mt-2">
          <p className="text-xs text-muted-foreground/80">
            Powered by Xoire
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
}
