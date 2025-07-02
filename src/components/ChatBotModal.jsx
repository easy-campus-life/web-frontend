import React, { useState, useRef, useEffect } from 'react';

const ChatBotModal = ({ onClose, inline = false }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour ! Je suis l'assistant virtuel d'EasyCampus. Comment puis-je vous aider aujourd'hui ?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { id: messages.length + 1, text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: inputValue })
      });

      const data = await res.json();
      const botMessage = {
        id: messages.length + 2,
        text: data.response || "Je n'ai pas pu obtenir de réponse.",
        isBot: true
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: "Erreur serveur. Veuillez réessayer plus tard.",
        isBot: true
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error("Erreur API :", error);
    } finally {
      setLoading(false);
    }
  };

  const renderMessages = () =>
    messages.map((message) => (
      <div
        key={message.id}
        className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
      >
        <div
          className={`rounded-lg px-4 py-2 max-w-xs ${message.isBot
            ? 'bg-blue-100 text-blue-900'
            : 'bg-blue-600 text-white'}`}
        >
          {message.text}
        </div>
      </div>
    ));

  if (inline) {
    return (
      <>
        <div className="p-3 h-64 overflow-y-auto bg-gray-50">
          {renderMessages()}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="border-t p-2 flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-grow border rounded-l-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded-r-lg hover:bg-blue-700 transition duration-300"
            disabled={!inputValue.trim() || loading}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex-grow overflow-y-auto bg-gray-50">
        {renderMessages()}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Tapez votre message..."
          className="flex-grow border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300"
          disabled={!inputValue.trim() || loading}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatBotModal;
