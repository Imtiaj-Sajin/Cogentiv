
import React from 'react';
import { Search, Square, BookText } from 'lucide-react';

const ChatSidebar: React.FC = () => {
  return (
    <div className="w-[280px] border-r border-[#EAECEF] bg-white flex flex-col">
      <div className="flex items-center p-4 border-b border-[#EAECEF]">
        <BookText className="h-5 w-5 text-[#6B7280] mr-3" />
        <span className="font-medium text-[#111827]">Chats</span>
        <div className="flex-grow"></div>
        <button className="h-8 w-8 flex items-center justify-center rounded hover:bg-[#F9FAFB]">
          <Search className="h-4 w-4 text-[#6B7280]" />
        </button>
        <button className="h-8 w-8 flex items-center justify-center rounded hover:bg-[#F9FAFB]">
          <Square className="h-4 w-4 text-[#6B7280]" />
        </button>
      </div>
      
      <div className="flex-grow p-4">
        <p className="text-sm text-[#6B7280] italic">It's quiet here... for now</p>
      </div>
    </div>
  );
};

export default ChatSidebar;
