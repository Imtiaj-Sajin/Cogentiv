
import React, { useState } from 'react';
import { ArrowRight, PenLine, AtSign, Settings, Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Toggle, toggleVariants } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const ChatArea: React.FC = () => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'tools' | 'chat'>('chat');
  
  const handleToolCardClick = (description: string) => {
    setMessage(description);
  };

  const handleSendMessage = () => {
    // Here you would handle sending the message to the backend
    console.log('Sending message:', message);
    // For now, just clear the input
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-grow flex flex-col h-full overflow-hidden bg-white border-r border-[#EAECEF]">
      <div className="border-b border-[#EAECEF] py-3 px-4 flex items-center justify-between">
        <h2 className="text-base font-medium text-[#111827]">Chat with Cohere</h2>
        <div className="flex items-center space-x-1">
          <Popover>
            <PopoverTrigger asChild>
              <button className="h-8 w-8 flex items-center justify-center rounded hover:bg-[#F9FAFB]">
                <Sparkles className="h-4 w-4 text-[#6B7280]" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-2">
                <h3 className="font-medium text-sm">AI Features</h3>
                <p className="text-xs text-[#6B7280]">Enhanced features for your AI assistant</p>
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <button className="h-8 w-8 flex items-center justify-center rounded hover:bg-[#F9FAFB]">
                <Settings className="h-4 w-4 text-[#6B7280]" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Settings</h3>
                <p className="text-xs text-[#6B7280]">Customize your chat experience</p>
                <div className="pt-2">
                  <label className="text-xs font-medium text-[#6B7280] block mb-1">Theme</label>
                  <ToggleGroup type="single" value="light">
                    <ToggleGroupItem value="light" className="text-xs">Light</ToggleGroupItem>
                    <ToggleGroupItem value="dark" className="text-xs">Dark</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="flex-grow overflow-auto p-4 flex flex-col items-center justify-center text-center bg-white">
        <h3 className="text-xl font-medium mb-6 text-[#111827]">Try a prompt in Chat mode</h3>
        
        <div className="w-full max-w-[800px]">
          <div className="border border-[#EAECEF] rounded-lg overflow-hidden mb-6">
            <div className="flex">
              <button 
                className={`flex-1 py-3 text-xs font-medium ${
                  activeTab === 'tools' 
                    ? 'text-[#111827] border-b-2 border-[#FF6A71] tab-button' 
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
                onClick={() => setActiveTab('tools')}
              >
                USE TOOLS
              </button>
              <button 
                className={`flex-1 py-3 text-xs font-medium ${
                  activeTab === 'chat' 
                    ? 'text-[#111827] border-b-2 border-[#FF6A71] tab-button' 
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
                onClick={() => setActiveTab('chat')}
              >
                JUST CHAT
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-[#6B7280] mb-6">
                {activeTab === 'chat' 
                  ? 'Use Command A without any access to external sources.'
                  : 'Access various tools to enhance your experience.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeTab === 'chat' ? (
                  <>
                    <ToolCard 
                      icon="💡" 
                      title="ENGLISH TO FRENCH" 
                      description="Create a business plan for a marketing agency in French" 
                      onClick={handleToolCardClick}
                    />
                    
                    <ToolCard 
                      icon="🌐" 
                      title="MULTILINGUAL" 
                      description="Redacta una descripción de empleo Diseñador(a) Web" 
                      onClick={handleToolCardClick}
                    />
                    
                    <ToolCard 
                      icon="</>" 
                      title="CODE GENERATION" 
                      description="Help me clean up some data in Python" 
                      onClick={handleToolCardClick}
                    />
                  </>
                ) : (
                  <>
                    <ToolCard 
                      icon="🔍" 
                      title="WEB SEARCH" 
                      description="Search the web for the latest AI research papers" 
                      onClick={handleToolCardClick}
                    />
                    
                    <ToolCard 
                      icon="📊" 
                      title="DATA ANALYSIS" 
                      description="Analyze this CSV file and create visualizations" 
                      onClick={handleToolCardClick}
                    />
                    
                    <ToolCard 
                      icon="🧩" 
                      title="PLUGINS" 
                      description="Use the weather plugin to check the forecast" 
                      onClick={handleToolCardClick}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-[#EAECEF]">
        <div className="mx-auto">
          <div className="relative">
            <Textarea 
              placeholder="Message..." 
              className="w-full rounded-xl border border-[#666666] min-h-[56px] resize-none px-4 py-3 pr-12 text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#7557E9]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute right-3 bottom-3">
              <button 
                className="h-8 w-8 flex items-center justify-center text-[#6B7280] hover:text-[#111827]"
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                <ArrowRight className={`h-5 w-5 ${message.trim() ? 'text-[#7557E9]' : ''}`} />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-1 mt-2">
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#F9FAFB]">
              <PenLine className="h-4 w-4 text-[#6B7280]" />
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#F9FAFB]">
              <AtSign className="h-4 w-4 text-[#6B7280]" />
            </button>
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
  onClick: (description: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, onClick }) => {
  return (
    <div 
      className="tool-card p-4 cursor-pointer transition-colors border border-[#EAECEF] rounded-lg hover:bg-[#F9FAFB]"
      onClick={() => onClick(description)}
    >
      <div className="mb-4 text-lg">{icon}</div>
      <div className="text-xs font-semibold tracking-wide text-[#6B7280] mb-2">
        {title}
      </div>
      <div className="text-sm text-[#111827]">{description}</div>
    </div>
  );
};

export default ChatArea;
