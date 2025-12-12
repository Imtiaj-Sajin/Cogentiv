import React from 'react';
import { User } from 'lucide-react';

const NavBar: React.FC = () => {
  return (
    <nav className="h-14 backdrop-blur-xl bg-white/5 border-b border-white/10 flex items-center justify-between px-4 relative z-20">
      <div className="flex items-center space-x-3">
        {/* Animated Logo */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-40 group-hover:opacity-70 transition duration-500" />
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">C</span>
          </div>
        </div>
        <span className="text-white font-semibold text-lg tracking-tight">Cogentiv</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="h-9 px-4 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
          Playground
        </button>
        <button className="h-9 px-4 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
          Docs
        </button>
        <div className="w-px h-5 bg-white/10 mx-2" />
        <button className="h-9 w-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300 group">
          <User className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
