
import React from 'react';
import { ArrowRight, PenLine, AtSign } from 'lucide-react';

const ChatArea: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col h-full overflow-hidden bg-white">
      <div className="border-b border-[#e6e6e6] p-4">
        <h2 className="text-base font-medium text-[#333333]">Chat with Cohere</h2>
      </div>
      
      <div className="flex-grow overflow-auto p-4 flex flex-col items-center justify-center text-center">
        <h3 className="text-xl font-medium mb-4 text-[#333333]">Try a prompt in Chat mode</h3>
        
        <div className="w-full max-w-3xl">
          <div className="border border-[#e6e6e6] rounded-lg overflow-hidden mb-6">
            <div className="flex">
              <button className="flex-1 py-3 text-xs font-medium text-[#757575] border-b border-[#e6e6e6]">
                USE TOOLS
              </button>
              <button className="flex-1 py-3 text-xs font-medium text-[#333333] border-b-2 border-[#f26d5b]">
                JUST CHAT
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-[#757575] mb-6">
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
      
      <div className="p-4 border-t border-[#e6e6e6]">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <textarea 
              placeholder="Message..." 
              className="w-full rounded-lg border border-[#e6e6e6] min-h-[80px] resize-none px-4 py-3 pr-12 text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#8b5cf6]"
            ></textarea>
            <div className="absolute right-3 bottom-3">
              <button className="h-8 w-8 flex items-center justify-center text-[#757575] hover:text-[#333333]">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-1 mt-2">
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#f5f5f5]">
              <PenLine className="h-4 w-4 text-[#757575]" />
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#f5f5f5]">
              <AtSign className="h-4 w-4 text-[#757575]" />
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
    <div className="bg-[#f8f9fa] rounded-lg p-4 hover:bg-[#f1f3f5] cursor-pointer transition-colors border border-[#e6e6e6]">
      <div className="mb-4 text-lg">{icon}</div>
      <div className="text-xs font-semibold tracking-wide text-[#757575] mb-2">
        {title}
      </div>
      <div className="text-sm text-[#333333]">{description}</div>
    </div>
  );
};

export default ChatArea;
