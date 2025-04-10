
import React from 'react';
import { FileText, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatSidebar: React.FC = () => {
  return (
    <div className="w-64 h-full border-r border-border bg-white flex flex-col">
      <div className="flex items-center p-4 border-b border-border">
        <FileText className="h-5 w-5 text-muted-foreground mr-3" />
        <span className="font-medium">Chats</span>
        <div className="flex-grow"></div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Search className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Plus className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
      
      <div className="flex-grow p-4">
        <p className="text-sm text-muted-foreground italic">It's quiet here... for now</p>
      </div>
    </div>
  );
};

export default ChatSidebar;
