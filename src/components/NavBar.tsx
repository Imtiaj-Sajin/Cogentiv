
import React from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar: React.FC = () => {
  return (
    <nav className="h-14 border-b border-border flex items-center justify-between px-4 bg-white">
      <div className="flex items-center">
        <div className="flex items-center mr-8">
          <div className="w-6 h-6 rounded-sm bg-primary mr-2"></div>
          <span className="font-medium text-lg">cohere</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <NavItem label="CHAT" active />
          <NavItem label="DASHBOARD" />
          <NavItem label="PLAYGROUND" />
          <NavItem label="DOCS" />
          <NavItem label="COMMUNITY" />
        </div>
      </div>
      
      <Button variant="ghost" size="icon" className="rounded-full">
        <User className="h-5 w-5" />
      </Button>
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
      className={`text-xs font-medium tracking-wide ${
        active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {label}
    </a>
  );
};

export default NavBar;
