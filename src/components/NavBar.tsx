
import React from 'react';
import { User } from 'lucide-react';

const NavBar: React.FC = () => {
  return (
    <nav className="h-14 border-b border-[#EAECEF] flex items-center justify-between px-4 bg-white">
      <div className="flex items-center">
        <div className="flex items-center mr-10">
          <div className="cohere-logo mr-2"></div>
          <span className="font-medium text-lg text-[#111827]">cohere</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <NavItem label="CHAT" active />
          <NavItem label="DASHBOARD" />
          <NavItem label="PLAYGROUND" />
          <NavItem label="DOCS" />
          <NavItem label="COMMUNITY" />
        </div>
      </div>
      
      <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F9FAFB]">
        <User className="h-5 w-5 text-[#111827]" />
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
      className={`tab-button relative h-14 flex items-center px-1 text-xs font-medium tracking-wide ${
        active ? 'active-tab' : 'inactive-tab'
      }`}
    >
      {label}
      {active && <div className="tab-underline"></div>}
    </a>
  );
};

export default NavBar;
