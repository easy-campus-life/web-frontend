import React, { useState, useEffect } from 'react';

// Simulation du composant ChatBotModal pour cet exemple
const ChatBotModal = ({ inline }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Bonjour ! Je suis l'assistant virtuel d'EasyCampus 🎓 Comment puis-je vous aider aujourd'hui ?", 
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { 
      id: messages.length + 1, 
      text: inputValue, 
      isBot: false,
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botResponse = { 
        id: messages.length + 2, 
        text: "Merci pour votre message ! Je traite votre demande...", 
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
      {/* Corps du chat avec les messages */}
      <div className="p-4 h-72 overflow-y-auto bg-gradient-to-b from-white/50 to-blue-50/30 backdrop-blur-sm">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-3 flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
          >
            <div className={`flex items-start space-x-2 max-w-xs ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
              {message.isBot && (
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  🤖
                </div>
              )}
              <div 
                className={`rounded-2xl px-3 py-2 text-sm shadow-lg backdrop-blur-sm border ${message.isBot 
                  ? 'bg-white/90 text-gray-800 border-white/20' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-300/20'}`}
              >
                {message.text}
                <div className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                  {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="mb-4 flex justify-start">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/20">
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-gray-500 ml-2">Assistant virtuel écrit...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div className="p-3 border-t border-white/20 bg-white/30 backdrop-blur-sm">
        <div className="flex flex-wrap gap-1">
          {["📚 Horaires bibliothèque", "🍽️ Menu cafétéria"].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputValue(suggestion)}
              className="text-xs bg-white/50 hover:bg-white/70 text-blue-700 px-2 py-1 rounded-full transition-all duration-300 hover:scale-105 border border-blue-200/50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      
      {/* Formulaire d'envoi de message */}
      <form onSubmit={handleSubmit} className="p-3 bg-white/40 backdrop-blur-sm border-t border-white/20">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Posez votre question..."
            className="flex-grow bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
          <button 
            type="submit" 
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-2 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!inputValue.trim() || isTyping}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </div>
      </form>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  // Simulation de notifications périodiques
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      if (!isOpen && Math.random() > 0.7) {
        setHasNotification(true);
        setTimeout(() => setHasNotification(false), 5000);
      }
    }, 30000);

    return () => clearInterval(notificationInterval);
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setHasNotification(false);
  };

  const goToChatPage = () => {
    setIsOpen(false);
    // Navigation vers la page chat - remplacer par navigate('/chat')
    console.log('Navigation vers /chat');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-500 transform">
      {/* Modal de chat flottant modernisé */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 mb-2 w-96 animate-slide-up">
          <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header du chat flottant */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 animate-pulse">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Assistant ESTIAM</h3>
                    <p className="text-xs text-blue-100">🟢 En ligne • Réponse instantanée</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={goToChatPage}
                    className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 group"
                    title="Ouvrir en plein écran"
                  >
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </button>
                  <button
                    onClick={toggleChat}
                    className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 group"
                    title="Fermer"
                  >
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Contenu du chat */}
            <ChatBotModal inline={true} />
          </div>
        </div>
      )}

      {/* Notification toast */}
      {hasNotification && !isOpen && (
        <div className="absolute bottom-20 right-0 mb-2 animate-bounce-in">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-2xl shadow-lg max-w-xs">
            <div className="flex items-center">
              <span className="mr-2">💬</span>
              <p className="text-sm font-medium">Besoin d'aide ? Je suis là !</p>
            </div>
          </div>
        </div>
      )}

      {/* Bouton principal modernisé mais plus petit */}
      <button
        onClick={toggleChat}
        className={`relative bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white rounded-xl p-3 shadow-2xl flex items-center justify-center transition-all duration-500 transform hover:scale-110 group ${
          isOpen ? 'rotate-180' : 'hover:rotate-12'
        }`}
        aria-label="Assistant virtuel"
      >
        {/* Effet de halo */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-xl opacity-0 group-hover:opacity-75 group-hover:scale-150 transition-all duration-500 blur-lg -z-10"></div>
        
        {/* Notification badge */}
        {hasNotification && !isOpen && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-ping">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        )}
        
        {/* Icône principale - Robot */}
        <div className="relative z-10">
          {isOpen ? (
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H9L3 7V9H21ZM3 10V15C3 16.1 3.9 17 5 17H19C20.1 17 21 16.1 21 15V10H3ZM7.5 13.5C7.5 14.3 6.8 15 6 15S4.5 14.3 4.5 13.5C4.5 12.7 5.2 12 6 12S7.5 12.7 7.5 13.5ZM19.5 13.5C19.5 14.3 18.8 15 18 15S16.5 14.3 16.5 13.5C16.5 12.7 17.2 12 18 12S19.5 12.7 19.5 13.5ZM16 18H8V20H16V18Z"/>
            </svg>
          )}
        </div>
        
        {/* Particules animées */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1 left-1 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
          <div className="absolute bottom-2 right-1 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse"></div>
          <div className="absolute top-3 right-2 w-0.5 h-0.5 bg-white/20 rounded-full animate-bounce"></div>
        </div>
      </button>

      {/* Texte d'aide (visible uniquement au survol) */}
      {!isOpen && (
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gray-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-sm font-medium whitespace-nowrap">
            🤖 Assistant virtuel • Cliquez ici !
            <div className="absolute top-full right-4 -mt-1 w-2 h-2 bg-gray-900/90 rotate-45"></div>
          </div>
        </div>
      )}

      {/* Styles CSS intégrés */}
      <style jsx>{`
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes bounce-in {
          0% { 
            opacity: 0; 
            transform: translateX(20px) scale(0.8); 
          }
          50% { 
            opacity: 1; 
            transform: translateX(-5px) scale(1.05); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
        
        /* Responsive design */
        @media (max-width: 640px) {
          .w-96 {
            width: calc(100vw - 3rem);
            max-width: 380px;
          }
        }
        
        /* Accessibilité */
        @media (prefers-reduced-motion: reduce) {
          .animate-slide-up,
          .animate-bounce-in {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingChatBot;