
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, PenLine, AtSign, Settings, Sparkles, Moon, Sun, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Toggle, toggleVariants } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTheme } from '@/context/ThemeContext';
import { getMistralResponse } from '@/services/mistralService';
import ChatResponseArea from './ChatResponseArea';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/hooks/use-toast';

const ChatArea: React.FC = () => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'tools' | 'chat'>('chat');
  const [messages, setMessages] = useState<Array<{id: string; text: string; isUser: boolean; timestamp?: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToolCardClick = (description: string) => {
    setMessage(description);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = {
      id: uuidv4(),
      text: message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    
    try {
      const response = await getMistralResponse(message);
      const aiResponse = {
        id: uuidv4(),
        text: response[0]?.generated_text || "I couldn't generate a response. Please try again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting response:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
      
      setMessages((prev) => [...prev, {
        id: uuidv4(),
        text: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-grow flex flex-col h-full overflow-hidden bg-white dark:bg-[#111827] border-r border-[#EAECEF] dark:border-[#2D3748]">
      <div className="border-b border-[#EAECEF] dark:border-[#2D3748] py-3 px-4 flex items-center justify-between">
        <h2 className="text-base font-medium text-[#111827] dark:text-white">Chat with Cogentiv</h2>
        <div className="flex items-center space-x-1">
          <Popover>
            <PopoverTrigger asChild>
              <button className="h-8 w-8 flex items-center justify-center rounded hover:bg-[#F9FAFB] dark:hover:bg-[#1F2937]">
                <Sparkles className="h-4 w-4 text-[#6B7280] dark:text-[#9CA3AF]" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 bg-white dark:bg-[#1F2937] border-[#EAECEF] dark:border-[#2D3748]">
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-[#111827] dark:text-white">AI Features</h3>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">Enhanced features for your AI assistant</p>
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <button className="h-8 w-8 flex items-center justify-center rounded hover:bg-[#F9FAFB] dark:hover:bg-[#1F2937]">
                <Settings className="h-4 w-4 text-[#6B7280] dark:text-[#9CA3AF]" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 bg-white dark:bg-[#1F2937] border-[#EAECEF] dark:border-[#2D3748]">
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-[#111827] dark:text-white">Settings</h3>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">Customize your chat experience</p>
                <div className="pt-2">
                  <label className="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF] block mb-1">Theme</label>
                  <ToggleGroup type="single" value={theme}>
                    <ToggleGroupItem 
                      value="light" 
                      className="text-xs"
                      onClick={() => {
                        if (theme !== 'light') toggleTheme();
                      }}
                    >
                      <Sun className="h-3 w-3 mr-1" />
                      Light
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="dark" 
                      className="text-xs"
                      onClick={() => {
                        if (theme !== 'dark') toggleTheme();
                      }}
                    >
                      <Moon className="h-3 w-3 mr-1" />
                      Dark
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="flex-grow overflow-auto p-4 flex flex-col bg-white dark:bg-[#111827]">
        {messages.length > 0 ? (
          <div className="w-full max-w-4xl mx-auto">
            <ChatResponseArea messages={messages} />
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-medium mb-6 text-[#111827] dark:text-white">Try a prompt in Chat mode</h3>
            
            <div className="w-full max-w-[800px]">
              <div className="border border-[#EAECEF] dark:border-[#2D3748] rounded-lg overflow-hidden mb-6">
                <div className="flex">
                  <button 
                    className={`flex-1 py-3 text-xs font-medium ${
                      activeTab === 'tools' 
                        ? 'text-[#111827] dark:text-white border-b-2 border-[#FF6A71] tab-button' 
                        : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white'
                    }`}
                    onClick={() => setActiveTab('tools')}
                  >
                    USE TOOLS
                  </button>
                  <button 
                    className={`flex-1 py-3 text-xs font-medium ${
                      activeTab === 'chat' 
                        ? 'text-[#111827] dark:text-white border-b-2 border-[#FF6A71] tab-button' 
                        : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white'
                    }`}
                    onClick={() => setActiveTab('chat')}
                  >
                    JUST CHAT
                  </button>
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-6">
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
        )}
      </div>
      
      <div className="p-4 border-t border-[#EAECEF] dark:border-[#2D3748] bg-white dark:bg-[#111827]">
        <div className="mx-auto">
          <div className="relative">
            <Textarea 
              placeholder="Message..." 
              className="w-full rounded-xl border border-[#666666] dark:border-[#4B5563] min-h-[56px] resize-none px-4 py-3 pr-12 text-[#111827] dark:text-white bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-1 focus:ring-[#7557E9]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <div className="absolute right-3 bottom-3">
              <button 
                className="h-8 w-8 flex items-center justify-center text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
                onClick={handleSendMessage}
                disabled={!message.trim() || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-[#7557E9]" />
                ) : (
                  <ArrowRight className={`h-5 w-5 ${message.trim() ? 'text-[#7557E9]' : ''}`} />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-1 mt-2">
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#F9FAFB] dark:hover:bg-[#1F2937]">
              <PenLine className="h-4 w-4 text-[#6B7280] dark:text-[#9CA3AF]" />
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#F9FAFB] dark:hover:bg-[#1F2937]">
              <AtSign className="h-4 w-4 text-[#6B7280] dark:text-[#9CA3AF]" />
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
      className="tool-card p-4 cursor-pointer transition-colors border border-[#EAECEF] dark:border-[#2D3748] rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#1F2937] bg-white dark:bg-[#1F2937]"
      onClick={() => onClick(description)}
    >
      <div className="mb-4 text-lg">{icon}</div>
      <div className="text-xs font-semibold tracking-wide text-[#6B7280] dark:text-[#9CA3AF] mb-2">
        {title}
      </div>
      <div className="text-sm text-[#111827] dark:text-white">{description}</div>
    </div>
  );
};

export default ChatArea;
