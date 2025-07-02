import React, { useState } from 'react';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Bonjour ! Comment puis-je vous aider ?', sender: 'assistant', time: '10:00' },
    { id: 2, text: 'Je cherche des informations sur les horaires de la bibliothèque', sender: 'user', time: '10:01' },
    { id: 3, text: 'La bibliothèque est ouverte de 8h à 22h du lundi au vendredi, et de 9h à 18h le week-end.', sender: 'assistant', time: '10:01' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Chat Assistant</h1>
      <div className="bg-white rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>
                <span className={`text-xs ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'} block text-right`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="border-t p-4 flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition duration-300"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
