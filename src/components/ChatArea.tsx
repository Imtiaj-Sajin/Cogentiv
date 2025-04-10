
import React from 'react';
import { Send, RefreshCw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ChatArea: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col h-full overflow-hidden bg-white">
      <div className="border-b border-border p-4">
        <h2 className="text-base font-medium">Chat with Cohere</h2>
      </div>
      
      <div className="flex-grow overflow-auto p-4 flex flex-col items-center justify-center text-center">
        <h3 className="text-xl font-medium mb-4">Try a prompt in Chat mode</h3>
        
        <div className="w-full max-w-3xl">
          <Tabs defaultValue="just-chat" className="mb-4">
            <TabsList className="w-full">
              <TabsTrigger value="use-tools" className="flex-1">USE TOOLS</TabsTrigger>
              <TabsTrigger value="just-chat" className="flex-1">JUST CHAT</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-6">
              Use Command A without any access to external sources.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ToolCard 
                icon="💡" 
                title="ENGLISH TO FRENCH" 
                description="Create a business plan for a marketing agency in French" 
              />
              
              <ToolCard 
                icon="🌐" 
                title="MULTILINGUAL" 
                description="Redacta una descripción de empleo Diseñador(a) Web" 
              />
              
              <ToolCard 
                icon="</>" 
                title="CODE GENERATION" 
                description="Help me clean up some data in Python" 
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <textarea 
              placeholder="Message..." 
              className="w-full rounded-lg border border-border min-h-[80px] resize-none px-4 py-3 pr-12"
            ></textarea>
            <div className="absolute right-3 bottom-3">
              <Button size="icon" variant="ghost" className="rounded-full">
                <Send className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-1 mt-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Settings className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ToolCardProps {
  icon: string;
  title: string;
  description: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-secondary rounded-lg p-4 hover:bg-secondary/80 cursor-pointer transition-colors">
      <div className="mb-4 text-lg">{icon}</div>
      <div className="text-xs font-semibold tracking-wide text-muted-foreground mb-2">
        {title}
      </div>
      <div className="text-sm">{description}</div>
    </div>
  );
};

export default ChatArea;
