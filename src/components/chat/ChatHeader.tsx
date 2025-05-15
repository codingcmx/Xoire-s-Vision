import { Bot } from 'lucide-react';

export function ChatHeader() {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md flex items-center space-x-2">
      <Bot className="h-7 w-7" />
      <h1 className="text-xl font-semibold">StyleBot</h1>
    </header>
  );
}
