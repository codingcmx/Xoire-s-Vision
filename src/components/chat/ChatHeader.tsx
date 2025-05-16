
import { cn } from '@/lib/utils';

export function ChatHeader() {
  return (
    <header className="bg-primary text-primary-foreground p-4 border-b border-border shadow-sm flex items-center space-x-3">
      {/* Inlined SVG for Bot icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6" // Size class on the SVG element
      >
        {/* Head parts */}
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        {/* Eye paths with animation class */}
        <path d="M15 13v2" className={cn("animate-bot-blink")} />
        <path d="M9 13v2" className={cn("animate-bot-blink")} />
      </svg>
      <h1 className="text-xl font-semibold font-serif">StyleBot-Xoire</h1>
    </header>
  );
}
