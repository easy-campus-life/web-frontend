import React, { useState, useRef, useEffect } from 'react';

const ChatBotModal = ({ onClose, inline = false }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour ! Je suis l'assistant virtuel d'EasyCampus. Comment puis-je vous aider aujourd'hui ?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Fonction pour faire défiler automatiquement vers le dernier message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fonction pour générer une réponse automatique basée sur les mots-clés
  const generateBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Réponses basées sur des mots-clés
    if (lowerCaseMessage.includes('horaire') || lowerCaseMessage.includes('heure')) {
      return "Les horaires d'ouverture du campus sont de 8h à 20h du lundi au vendredi, et de 9h à 17h le samedi.";
    } else if (lowerCaseMessage.includes('wifi') || lowerCaseMessage.includes('internet')) {
      return "Le réseau WiFi 'ESTIAM-SECURE' est disponible sur tout le campus. Le mot de passe vous a été communiqué par email.";
    } else if (lowerCaseMessage.includes('examen') || lowerCaseMessage.includes('partiel')) {
      return "Les dates d'examens sont disponibles sur votre espace étudiant. N'hésitez pas à consulter le calendrier académique.";
    } else if (lowerCaseMessage.includes('bibliothèque') || lowerCaseMessage.includes('livre')) {
      return "La bibliothèque est située au 2ème étage du bâtiment principal. Vous pouvez emprunter jusqu'à 5 livres pour une durée de 3 semaines.";
    } else if (lowerCaseMessage.includes('cantine') || lowerCaseMessage.includes('manger') || lowerCaseMessage.includes('repas')) {
      return "La cafétéria est ouverte de 11h30 à 14h30. Vous pouvez consulter le menu de la semaine sur l'application.";
    } else if (lowerCaseMessage.includes('cours') || lowerCaseMessage.includes('absence')) {
      return "Pour signaler une absence, veuillez contacter le secrétariat pédagogique ou utiliser le formulaire dédié sur votre espace étudiant.";
    } else if (lowerCaseMessage.includes('stage') || lowerCaseMessage.includes('alternance')) {
      return "Pour toute question concernant les stages ou l'alternance, veuillez contacter le bureau des carrières au 2ème étage ou par email à carrieres@estiam.fr.";
    } else if (lowerCaseMessage.includes('mentorat') || lowerCaseMessage.includes('mentor')) {
      return "Le programme de mentorat est accessible via l'onglet 'Mentorat' de l'application. Vous pouvez y trouver des mentors disponibles ou proposer votre aide.";
    } else if (lowerCaseMessage.includes('bonjour') || lowerCaseMessage.includes('salut') || lowerCaseMessage.includes('hello')) {
      return "Bonjour ! Comment puis-je vous aider aujourd'hui ?";
    } else if (lowerCaseMessage.includes('merci')) {
      return "Je vous en prie ! N'hésitez pas si vous avez d'autres questions.";
    } else {
      return "Je n'ai pas toutes les informations sur ce sujet. Pourriez-vous reformuler votre question ou contacter l'administration pour plus de détails ?";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage = { id: messages.length + 1, text: inputValue, isBot: false };
    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simuler un délai de réponse du bot
    setTimeout(() => {
      const botResponse = { id: messages.length + 2, text: generateBotResponse(inputValue), isBot: true };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  // Si le composant est utilisé en mode inline (dans le bouton flottant)
  if (inline) {
    return (
      <>
        {/* Corps du chat avec les messages */}
        <div className="p-3 h-64 overflow-y-auto bg-gray-50">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-3 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div 
                className={`rounded-lg px-3 py-2 max-w-xs text-sm ${message.isBot 
                  ? 'bg-blue-100 text-blue-900' 
                  : 'bg-blue-600 text-white'}`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Formulaire d'envoi de message */}
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
            disabled={!inputValue.trim()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </form>
      </>
    );
  }

  // Version complète pour la page chat
  return (
    <div className="h-full flex flex-col">
      {/* Corps du chat avec les messages */}
      <div className="p-4 flex-grow overflow-y-auto bg-gray-50">
        {messages.map((message) => (
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
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Formulaire d'envoi de message */}
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
          disabled={!inputValue.trim()}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatBotModal;