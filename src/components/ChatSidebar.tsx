
import React from 'react';
import { Search, Edit, Book } from 'lucide-react';

const ChatSidebar: React.FC = () => {
  return (
    <div className="w-64 h-full border-r border-[#e6e6e6] bg-white flex flex-col">
      <div className="flex items-center p-4 border-b border-[#e6e6e6]">
        <Book className="h-5 w-5 text-[#757575] mr-3" />
        <span className="font-medium text-[#333333]">Chats</span>
        <div className="flex-grow"></div>
        <button className="h-8 w-8 flex items-center justify-center rounded hover:bg-[#f5f5f5]">
          <Search className="h-4 w-4 text-[#757575]" />
        </button>
        <button className="h-8 w-8 flex items-center justify-center rounded hover:bg-[#f5f5f5]">
          <Edit className="h-4 w-4 text-[#757575]" />
        </button>
      </div>
      
      <div className="flex-grow p-4">
        <p className="text-sm text-[#757575] italic">It's quiet here... for now</p>
      </div>
    </div>
  );
};

export default ChatSidebar;
