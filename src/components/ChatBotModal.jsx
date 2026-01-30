import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

const ChatBotModal = ({ onClose, inline = false }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Bonjour ! Je suis **Maeva** 🤖, l'assistant virtuel d'EasyCampus. Je peux vous aider avec :\n\n• 📚 **Informations sur les cours**\n• 🎓 **Questions sur le mentorat**\n• 📊 **Statistiques d'affluence**\n• 🎉 **Événements du campus**\n• 💬 **Support général**\n\nComment puis-je vous aider aujourd'hui ?", 
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!inline) {
      inputRef.current?.focus();
    }
  }, [inline]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage = { 
      id: messages.length + 1, 
      text: inputValue, 
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);
    setIsTyping(true);

    try {
      const res = await fetch("https://ia-assistant-k4e5.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: inputValue })
      });

      const data = await res.json();
      
      // Simuler un délai de frappe pour plus de naturel
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: data.response || "Je n'ai pas pu obtenir de réponse. Pouvez-vous reformuler votre question ?",
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        setLoading(false);
      }, 1000 + Math.random() * 2000); // Délai aléatoire entre 1-3 secondes

    } catch (error) {
      setTimeout(() => {
        const errorMessage = {
          id: messages.length + 2,
          text: "Désolé, je rencontre des difficultés techniques. Veuillez réessayer dans quelques instants. 🔧",
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
        setLoading(false);
      }, 1000);
      console.error("Erreur API :", error);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderTypingIndicator = () => (
    <div className="mb-4 flex justify-start">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-lg border border-white/50 max-w-xs">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="text-sm text-slate-600">Maeva tape...</span>
        </div>
      </div>
    </div>
  );

  const renderMessages = () =>
    messages.map((message, index) => (
      <div 
        key={message.id} 
        className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className={`max-w-xs lg:max-w-md ${message.isBot ? 'order-1' : 'order-2'}`}>
          <div className={`rounded-2xl px-4 py-3 shadow-lg border ${
            message.isBot 
              ? 'bg-white/80 backdrop-blur-xl border-white/50 text-slate-800' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
          }`}>
            <div className="text-sm leading-relaxed">
              <ReactMarkdown
                components={{
                  a: ({ href, children }) => {
                    const isInternal = href.startsWith('/');
                    return isInternal ? (
                      <Link 
                        to={href} 
                        className={`underline hover:opacity-80 transition-opacity ${
                          message.isBot ? 'text-blue-600' : 'text-white'
                        }`}
                        onClick={onClose}
                      >
                        {children}
                      </Link>
                    ) : (
                      <a 
                        href={href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`underline hover:opacity-80 transition-opacity ${
                          message.isBot ? 'text-blue-600' : 'text-white'
                        }`}
                      >
                        {children}
                      </a>
                    );
                  },
                  strong: ({ children }) => (
                    <strong className={`font-semibold ${
                      message.isBot ? 'text-slate-900' : 'text-white'
                    }`}>
                      {children}
                    </strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-sm leading-relaxed">
                      {children}
                    </li>
                  )
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
          </div>
          <div className={`text-xs text-slate-500 mt-1 ${message.isBot ? 'text-left' : 'text-right'}`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
        
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-2 ${message.isBot ? 'order-2 bg-gradient-to-br from-blue-400 to-purple-600' : 'order-1 bg-gradient-to-br from-slate-400 to-slate-600'}`}>
          {message.isBot ? (
            <span className="text-white text-sm">🤖</span>
          ) : (
            <span className="text-white text-sm">👤</span>
          )}
        </div>
      </div>
    ));

  if (inline) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-white/50 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">🤖</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">Maeva - Assistant EasyCampus</h3>
              <p className="text-white/80 text-xs">En ligne • Prêt à vous aider</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="p-4 h-64 overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50">
          {renderMessages()}
          {isTyping && renderTypingIndicator()}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-white/50 p-3 bg-white/50 backdrop-blur-sm">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tapez votre message..."
              className="flex-1 px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || loading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 text-white px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🤖</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Maeva - Assistant EasyCampus</h2>
              <p className="text-white/80 text-sm">En ligne • Prêt à vous aider</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {renderMessages()}
          {isTyping && renderTypingIndicator()}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/50 p-6 bg-white/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-1 px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || loading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="hidden sm:inline">Envoyer</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBotModal;
