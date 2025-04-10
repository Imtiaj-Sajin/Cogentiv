
import React from 'react';
import NavBar from '@/components/NavBar';
import ChatSidebar from '@/components/ChatSidebar';
import ChatArea from '@/components/ChatArea';

const Index = () => {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex overflow-hidden">
        <ChatSidebar />
        <ChatArea />
      </div>
    </div>
  );
};

export default Index;
