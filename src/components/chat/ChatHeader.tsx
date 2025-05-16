import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ChatHeader() {
  return (
    <header className="bg-primary text-primary-foreground p-4 border-b border-border shadow-sm flex items-center space-x-3">
      <Bot className={cn("h-6 w-6", "animate-bot-blink")} />
      <h1 className="text-xl font-semibold font-serif">StyleBot-Xoire</h1>
    </header>
  );
}
