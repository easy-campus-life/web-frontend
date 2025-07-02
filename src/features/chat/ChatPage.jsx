import React from 'react';
import ChatBotModal from '../../components/ChatBotModal';

const ChatPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Chat Assistant</h1>
      <div className="bg-white rounded-lg shadow-md max-w-2xl mx-auto h-[600px] overflow-hidden">
        <ChatBotModal />
      </div>
    </div>
  );
};

export default ChatPage;
