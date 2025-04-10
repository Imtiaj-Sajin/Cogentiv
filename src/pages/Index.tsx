
import React from 'react';
import NavBar from '@/components/NavBar';
import ChatSidebar from '@/components/ChatSidebar';
import ChatArea from '@/components/ChatArea';

const Index = () => {
  return (
    <div className="h-screen flex flex-col bg-[#f7f7f7]">
      <NavBar />
      <div className="flex-grow flex overflow-hidden shadow-sm max-w-[1440px] mx-auto w-full bg-white rounded-lg my-2">
        <ChatSidebar />
        <ChatArea />
      </div>
    </div>
  );
};

export default Index;
