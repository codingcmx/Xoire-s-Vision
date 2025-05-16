import { Bot } from 'lucide-react';

export function ChatHeader() {
  return (
    <header className="bg-card text-card-foreground p-4 border-b border-border shadow-sm flex items-center space-x-3">
      <Bot className="h-6 w-6 text-primary" />
      <h1 className="text-xl font-semibold">StyleBot-Xoire</h1>
    </header>
  );
}
