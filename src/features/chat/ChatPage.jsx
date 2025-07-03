import React, { useState } from 'react';
import ChatBotModal from '../../components/ChatBotModal';

const ChatPage = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête de la page */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <h1 className="text-3xl font-bold">Assistant de Chat</h1>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-4 py-2 rounded-lg transition flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Aide
          </button>
        </div>
      </div>

      {/* Panneau d'information */}
      {showInfo && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-blue-800">
          <h2 className="font-bold text-lg mb-2">Comment utiliser l'assistant de chat</h2>
          <p className="mb-2">Cet assistant est conçu pour répondre à vos questions concernant la vie étudiante, les cours, et les services du campus.</p>
          <ul className="list-disc pl-5 mb-2">
            <li>Sélectionnez une catégorie pour des réponses plus précises</li>
            <li>Utilisez les questions rapides ou posez votre propre question</li>
            <li>L'assistant apprend de vos interactions pour mieux vous servir</li>
          </ul>
          <button 
            onClick={() => setShowInfo(false)}
            className="text-blue-600 hover:underline mt-2 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            Fermer
          </button>
        </div>
      )}

      {/* Zone principale de chat */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md h-[600px] overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 flex items-center">
            <div className="mr-3 bg-white text-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
              💬
            </div>
            <div>
              <h3 className="font-bold">Assistant de Chat</h3>
              <p className="text-xs opacity-80">Assistant virtuel EasyCampus</p>
            </div>
          </div>
          <ChatBotModal />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
