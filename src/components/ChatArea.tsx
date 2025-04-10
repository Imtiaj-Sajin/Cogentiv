
import React from 'react';
import { ArrowRight, PenLine, AtSign, Settings, Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const ChatArea: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col h-full overflow-hidden bg-white border-r border-[#EAECEF]">
      <div className="border-b border-[#EAECEF] py-3 px-4 flex items-center justify-between">
        <h2 className="text-base font-medium text-[#111827]">Chat with Cohere</h2>
        <div className="flex items-center space-x-1">
          <button className="h-8 w-8 flex items-center justify-center rounded hover:bg-[#F9FAFB]">
            <Sparkles className="h-4 w-4 text-[#6B7280]" />
          </button>
          <button className="h-8 w-8 flex items-center justify-center rounded hover:bg-[#F9FAFB]">
            <Settings className="h-4 w-4 text-[#6B7280]" />
          </button>
        </div>
      </div>
      
      <div className="flex-grow overflow-auto p-4 flex flex-col items-center justify-center text-center bg-white">
        <h3 className="text-xl font-medium mb-6 text-[#111827]">Try a prompt in Chat mode</h3>
        
        <div className="w-full max-w-[800px]">
          <div className="border border-[#EAECEF] rounded-lg overflow-hidden mb-6">
            <div className="flex">
              <button className="flex-1 py-3 text-xs font-medium text-[#6B7280] hover:text-[#111827]">
                USE TOOLS
              </button>
              <button className="flex-1 py-3 text-xs font-medium text-[#111827] border-b-2 border-[#FF6A71] tab-button">
                JUST CHAT
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-[#6B7280] mb-6">
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
      </div>
      
      <div className="p-4 border-t border-[#EAECEF]">
        <div className=" mx-auto">
          <div className="relative">
            <Textarea 
              placeholder="Message..." 
              className="w-full rounded-xl border border-[#666666] min-h-[56px] resize-none px-4 py-3 pr-12 text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#7557E9]"
            />
            <div className="absolute right-3 bottom-3">
              <button className="h-8 w-8 flex items-center justify-center text-[#6B7280] hover:text-[#111827]">
                <ArrowRight className="h-5 w-5" />
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
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description }) => {
  return (
    <div className="tool-card p-4 cursor-pointer transition-colors border border-[#EAECEF] rounded-lg">
      <div className="mb-4 text-lg">{icon}</div>
      <div className="text-xs font-semibold tracking-wide text-[#6B7280] mb-2">
        {title}
      </div>
      <div className="text-sm text-[#111827]">{description}</div>
    </div>
  );
};

export default ChatArea;
