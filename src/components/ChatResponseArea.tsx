
import React from 'react';
import ChatMessage from './ChatMessage';
import { ThumbsUp, ThumbsDown, Copy, Share } from 'lucide-react';

interface ChatResponseAreaProps {
  messages: Array<{
    id: string;
    text: string;
    isUser: boolean;
    timestamp?: string;
  }>;
}

const ChatResponseArea: React.FC<ChatResponseAreaProps> = ({ messages }) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col">
      {messages.map((message) => (
        <div key={message.id} className="w-full">
          <ChatMessage 
            message={message.text} 
            isUser={message.isUser} 
            timestamp={message.timestamp} 
          />
          
          {!message.isUser && (
            <div className="flex items-center space-x-2 ml-12 mb-6">
              <button 
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Thumbs Up"
              >
                <ThumbsUp className="h-4 w-4 text-gray-500" />
              </button>
              <button 
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Thumbs Down"
              >
                <ThumbsDown className="h-4 w-4 text-gray-500" />
              </button>
              <button 
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Copy to clipboard"
                onClick={() => handleCopy(message.text)}
              >
                <Copy className="h-4 w-4 text-gray-500" />
              </button>
              <button 
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Share"
              >
                <Share className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatResponseArea;
