
import React from 'react';
import { User } from 'lucide-react';

const NavBar: React.FC = () => {
  return (
    <nav className="h-14 border-b border-[#e6e6e6] flex items-center justify-between px-4 bg-white">
      <div className="flex items-center">
        <div className="flex items-center mr-10">
          <div className="cohere-logo mr-2"></div>
          <span className="font-medium text-lg text-[#333333]">cohere</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <NavItem label="CHAT" active />
          <NavItem label="DASHBOARD" />
          <NavItem label="PLAYGROUND" />
          <NavItem label="DOCS" />
          <NavItem label="COMMUNITY" />
        </div>
      </div>
      
      <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f5f5f5]">
        <User className="h-5 w-5 text-[#333333]" />
      </button>
    </nav>
  );
};

interface NavItemProps {
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ label, active }) => {
  return (
    <a 
      href="#" 
      className={`relative py-4 text-xs font-medium tracking-wide ${
        active ? 'text-[#333333]' : 'text-[#757575] hover:text-[#333333]'
      }`}
    >
      {label}
      {active && <div className="tab-indicator absolute bottom-0 left-0 w-full"></div>}
    </a>
  );
};

export default NavBar;
