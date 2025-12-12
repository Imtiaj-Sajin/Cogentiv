import React from 'react';
import NavBar from '@/components/NavBar';
import ChatSidebar from '@/components/ChatSidebar';
import ChatArea from '@/components/ChatArea';
import MeshGradient from '@/components/MeshGradient';

const Index = () => {
  return (
    <div className="h-screen flex flex-col bg-[#0a0a0f] dark:bg-[#0a0a0f] relative overflow-hidden">
      {/* Mesh Gradient Background */}
      <MeshGradient />
      
      {/* Content Layer */}
      <div className="relative z-10 flex flex-col h-full">
        <NavBar />
        <div className="flex-grow flex h-[calc(100vh-56px)]">
          <ChatSidebar />
          <ChatArea />
        </div>
      </div>
    </div>
  );
};

export default Index;
