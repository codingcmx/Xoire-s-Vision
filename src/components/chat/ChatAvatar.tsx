import type { MessageSender } from '@/types/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Bot } from 'lucide-react';

interface ChatAvatarProps {
  sender: MessageSender;
}

export function ChatAvatar({ sender }: ChatAvatarProps) {
  if (sender === 'user') {
    return (
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-secondary text-secondary-foreground">
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar className="h-8 w-8">
      <AvatarFallback className="bg-primary text-primary-foreground">
        <Bot className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  );
}
