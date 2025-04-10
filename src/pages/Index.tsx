
import React from 'react';
import NavBar from '@/components/NavBar';
import ChatSidebar from '@/components/ChatSidebar';
import ChatArea from '@/components/ChatArea';

const Index = () => {
  return (
    <div className="h-screen flex flex-col bg-[#F5F5F7]">
      <NavBar />
      <div className="flex-grow flex h-[calc(100vh-56px)]">
        <ChatSidebar />
        <ChatArea />
      </div>
    </div>
  );
};

export default Index;
