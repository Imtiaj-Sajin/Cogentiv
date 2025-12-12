import React from 'react';
import ChatMessage from './ChatMessage';
import { ThumbsUp, ThumbsDown, Copy, Share, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp?: string;
}

interface ChatResponseAreaProps {
  messages: Message[];
}

const ChatResponseArea: React.FC<ChatResponseAreaProps> = ({ messages }) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      {messages.map((msg, index) => (
        <div 
          key={msg.id} 
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <ChatMessage 
            message={msg.text} 
            isUser={msg.isUser} 
            timestamp={msg.timestamp}
          />
          
          {!msg.isUser && (
            <div className="flex items-center space-x-1 mt-3 ml-12">
              <ActionButton 
                icon={<ThumbsUp className="h-3.5 w-3.5" />} 
                tooltip="Helpful"
                onClick={() => toast({ title: "Feedback recorded", description: "Thanks for your feedback!" })}
              />
              <ActionButton 
                icon={<ThumbsDown className="h-3.5 w-3.5" />} 
                tooltip="Not helpful"
                onClick={() => toast({ title: "Feedback recorded", description: "Thanks for your feedback!" })}
              />
              <ActionButton 
                icon={<Copy className="h-3.5 w-3.5" />} 
                tooltip="Copy"
                onClick={() => handleCopy(msg.text)}
              />
              <ActionButton 
                icon={<RotateCcw className="h-3.5 w-3.5" />} 
                tooltip="Regenerate"
                onClick={() => toast({ title: "Regenerating...", description: "This feature is coming soon!" })}
              />
              <ActionButton 
                icon={<Share className="h-3.5 w-3.5" />} 
                tooltip="Share"
                onClick={() => toast({ title: "Share", description: "Sharing is coming soon!" })}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

interface ActionButtonProps {
  icon: React.ReactNode;
  tooltip: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, tooltip, onClick }) => {
  return (
    <button 
      className="h-8 w-8 flex items-center justify-center rounded-lg text-white/30 hover:text-white/70 hover:bg-white/10 transition-all duration-200 group relative"
      onClick={onClick}
      title={tooltip}
    >
      {icon}
    </button>
  );
};

export default ChatResponseArea;
