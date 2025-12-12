import React, { useState, useEffect } from 'react';
import { Search, Square, BookText, Plus, MessageSquare, Star, Clock } from 'lucide-react';

const ChatSidebar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`w-64 h-full backdrop-blur-xl bg-[#0d0d14]/80 border-r border-white/10 flex flex-col transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
    >
      {/* New Chat Button */}
      <div className="p-3">
        <button className="w-full h-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02]">
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pb-3">
        <div className="relative group">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white/60 transition-colors" />
          <input 
            type="text" 
            placeholder="Search chats..." 
            className="w-full h-9 rounded-lg bg-white/5 border border-white/10 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          />
        </div>
      </div>

      {/* Section: Recent */}
      <div className="px-3 py-2">
        <div className="flex items-center space-x-2 text-[10px] font-semibold tracking-widest text-white/30 uppercase mb-2">
          <Clock className="h-3 w-3" />
          <span>Recent</span>
        </div>
        <div className="space-y-1">
          <SidebarItem icon={<MessageSquare className="h-4 w-4" />} text="AI Research Discussion" active />
          <SidebarItem icon={<MessageSquare className="h-4 w-4" />} text="Python Code Review" />
          <SidebarItem icon={<MessageSquare className="h-4 w-4" />} text="Marketing Strategy" />
        </div>
      </div>

      {/* Section: Starred */}
      <div className="px-3 py-2">
        <div className="flex items-center space-x-2 text-[10px] font-semibold tracking-widest text-white/30 uppercase mb-2">
          <Star className="h-3 w-3" />
          <span>Starred</span>
        </div>
        <div className="space-y-1">
          <SidebarItem icon={<MessageSquare className="h-4 w-4" />} text="Project Ideas" starred />
          <SidebarItem icon={<MessageSquare className="h-4 w-4" />} text="Learning Notes" starred />
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Bottom Section */}
      <div className="p-3 border-t border-white/10">
        <div className="space-y-1">
          <SidebarItem icon={<BookText className="h-4 w-4" />} text="Documentation" />
          <SidebarItem icon={<Square className="h-4 w-4" />} text="Templates" />
        </div>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  starred?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, active, starred }) => {
  return (
    <button 
      className={`w-full h-9 rounded-lg flex items-center space-x-3 px-3 text-sm transition-all duration-200 group ${
        active 
          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/20' 
          : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      <span className={`${active ? 'text-purple-400' : 'text-white/40 group-hover:text-white/70'} transition-colors`}>
        {icon}
      </span>
      <span className="truncate flex-1 text-left">{text}</span>
      {starred && <Star className="h-3 w-3 text-yellow-500/70 fill-yellow-500/70" />}
    </button>
  );
};

export default ChatSidebar;
