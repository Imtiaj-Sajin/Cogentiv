
import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3 ${isUser ? 'ml-3 mr-0 bg-[#7557E9]' : 'bg-gray-200 dark:bg-gray-700'}`}>
          {isUser ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-gray-700 dark:text-gray-300" />}
        </div>
        <div className={`relative py-2 px-4 rounded-lg ${
          isUser 
            ? 'bg-[#7557E9] text-white' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message}</p>
          {timestamp && (
            <span className="block mt-1 text-xs opacity-70">{timestamp}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
