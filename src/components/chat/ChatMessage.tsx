import type { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ChatAvatar } from './ChatAvatar';
import { ProductRecommendationCard } from './ProductRecommendationCard';
import { StyleSuggestionCard } from './StyleSuggestionCard';
import { Skeleton } from '@/components/ui/skeleton';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  const alignmentClass = isUser ? 'items-end' : 'items-start';
  const bubbleClass = isUser
    ? 'bg-primary text-primary-foreground rounded-br-none'
    : 'bg-card text-card-foreground rounded-bl-none';

  return (
    <div className={cn('flex flex-col space-x-2 py-3 animate-subtle-slide-in-up', alignmentClass)}>
      <div className={cn('flex space-x-2', isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row')}>
        <ChatAvatar sender={message.sender} />
        <div className="flex flex-col">
          <div
            className={cn(
              'max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl shadow',
              bubbleClass
            )}
          >
            {message.isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            ) : (
              <>
                {message.type === 'text' && <p className="text-sm whitespace-pre-wrap">{message.text}</p>}
                {message.type === 'product_recommendations' && message.data && (
                  <ProductRecommendationCard data={message.data} />
                )}
                {message.type === 'style_suggestions' && message.data && (
                  <StyleSuggestionCard data={message.data} />
                )}
              </>
            )}
          </div>
          <span className={cn('text-xs text-muted-foreground mt-1', isUser ? 'text-right' : 'text-left')}>
            {format(message.timestamp, 'p')}
          </span>
        </div>
      </div>
    </div>
  );
}
