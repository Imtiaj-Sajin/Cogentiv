import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, PenLine, AtSign, Settings, Sparkles, Moon, Sun, Loader2, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTheme } from '@/context/ThemeContext';
import { getGeminiResponse } from '@/services/mistralService';
import ChatResponseArea from './ChatResponseArea';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/hooks/use-toast';

const ChatArea: React.FC = () => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'tools' | 'chat'>('chat');
  const [messages, setMessages] = useState<Array<{id: string; text: string; isUser: boolean; timestamp?: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

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
      const response = await getGeminiResponse(message);
      const aiResponse = {
        id: uuidv4(),
        text: response?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response. Please try again.",
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
    <div className="flex-grow flex flex-col h-full overflow-hidden bg-transparent">
      {/* Header with glassmorphism */}
      <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 py-3 px-4 flex items-center justify-between">
        <h2 className="text-base font-medium text-white/90">Chat with Cogentiv</h2>
        <div className="flex items-center space-x-1">
          <Popover>
            <PopoverTrigger asChild>
              <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all duration-300 group">
                <Sparkles className="h-4 w-4 text-white/60 group-hover:text-purple-400 transition-colors" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 backdrop-blur-xl bg-[#1a1a2e]/90 border-white/10 text-white shadow-2xl">
              <div className="space-y-2">
                <h3 className="font-medium text-sm">AI Features</h3>
                <p className="text-xs text-white/60">Enhanced features for your AI assistant</p>
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all duration-300 group">
                <Settings className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 backdrop-blur-xl bg-[#1a1a2e]/90 border-white/10 text-white shadow-2xl">
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Settings</h3>
                <p className="text-xs text-white/60">Customize your chat experience</p>
                <div className="pt-2">
                  <label className="text-xs font-medium text-white/60 block mb-2">Theme</label>
                  <ToggleGroup type="single" value={theme} className="justify-start bg-white/5 p-1 rounded-lg">
                    <ToggleGroupItem 
                      value="light" 
                      className="text-xs data-[state=on]:bg-white/20 data-[state=on]:text-white text-white/60 rounded-md px-3"
                      onClick={() => { if (theme !== 'light') toggleTheme(); }}
                    >
                      <Sun className="h-3 w-3 mr-1" />
                      Light
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="dark" 
                      className="text-xs data-[state=on]:bg-white/20 data-[state=on]:text-white text-white/60 rounded-md px-3"
                      onClick={() => { if (theme !== 'dark') toggleTheme(); }}
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
      
      {/* Main Content Area */}
      <div className="flex-grow overflow-auto p-4 flex flex-col">
        {messages.length > 0 ? (
          <div className="w-full max-w-4xl mx-auto animate-fade-in">
            <ChatResponseArea messages={messages} />
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div 
            className={`flex-grow flex flex-col items-center justify-center text-center transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-white bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse-soft">
              Ready to explore?
            </h3>
            <p className="text-white/50 mb-8 text-sm">Ask Cogentiv anything to get started</p>
            
            <div className="w-full max-w-[850px]">
              {/* Tab Switcher */}
              <div 
                className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-6 shadow-2xl transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="flex border-b border-white/10">
                  <button 
                    className={`flex-1 py-4 text-xs font-medium tracking-wider transition-all duration-300 relative ${
                      activeTab === 'tools' 
                        ? 'text-white' 
                        : 'text-white/40 hover:text-white/70'
                    }`}
                    onClick={() => setActiveTab('tools')}
                  >
                    USE TOOLS
                    {activeTab === 'tools' && (
                      <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                    )}
                  </button>
                  <button 
                    className={`flex-1 py-4 text-xs font-medium tracking-wider transition-all duration-300 relative ${
                      activeTab === 'chat' 
                        ? 'text-white' 
                        : 'text-white/40 hover:text-white/70'
                    }`}
                    onClick={() => setActiveTab('chat')}
                  >
                    JUST CHAT
                    {activeTab === 'chat' && (
                      <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                    )}
                  </button>
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-white/50 mb-6">
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
                          delay={0}
                        />
                        <ToolCard 
                          icon="🌐" 
                          title="MULTILINGUAL" 
                          description="Redacta una descripción de empleo Diseñador(a) Web" 
                          onClick={handleToolCardClick}
                          delay={100}
                        />
                        <ToolCard 
                          icon="</>" 
                          title="CODE GENERATION" 
                          description="Help me clean up some data in Python" 
                          onClick={handleToolCardClick}
                          delay={200}
                        />
                      </>
                    ) : (
                      <>
                        <ToolCard 
                          icon="🔍" 
                          title="WEB SEARCH" 
                          description="Search the web for the latest AI research papers" 
                          onClick={handleToolCardClick}
                          delay={0}
                        />
                        <ToolCard 
                          icon="📊" 
                          title="DATA ANALYSIS" 
                          description="Analyze this CSV file and create visualizations" 
                          onClick={handleToolCardClick}
                          delay={100}
                        />
                        <ToolCard 
                          icon="🧩" 
                          title="PLUGINS" 
                          description="Use the weather plugin to check the forecast" 
                          onClick={handleToolCardClick}
                          delay={200}
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
      
      {/* Input Area with glassmorphism */}
      <div 
        className={`p-4 backdrop-blur-xl bg-white/5 border-t border-white/10 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative">
              <Textarea 
                placeholder="Message Cogentiv..." 
                className="w-full rounded-xl border border-white/20 min-h-[56px] resize-none px-4 py-3 pr-14 text-white bg-[#1a1a2e]/80 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 placeholder:text-white/30 transition-all duration-300"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <div className="absolute right-3 bottom-3">
                <button 
                  className={`h-9 w-9 flex items-center justify-center rounded-lg transition-all duration-300 ${
                    message.trim() 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105' 
                      : 'bg-white/10 text-white/40'
                  }`}
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-1 mt-3">
            <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all duration-300 group">
              <PenLine className="h-4 w-4 text-white/40 group-hover:text-white/80 transition-colors" />
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all duration-300 group">
              <AtSign className="h-4 w-4 text-white/40 group-hover:text-white/80 transition-colors" />
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
  delay?: number;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, onClick, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative p-4 cursor-pointer group overflow-hidden rounded-xl transition-all duration-300"
      onClick={() => onClick(description)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Card background with gradient border effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-purple-500/30 transition-all duration-300" />
      
      {/* Hover glow effect */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4 text-2xl transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <div className="text-[10px] font-semibold tracking-widest text-white/40 mb-2 group-hover:text-purple-300/80 transition-colors">
          {title}
        </div>
        <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors leading-relaxed">{description}</div>
      </div>
    </div>
  );
};

export default ChatArea;
