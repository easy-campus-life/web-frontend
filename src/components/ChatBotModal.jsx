import React, { useState, useRef, useEffect } from 'react';

const ChatBotModal = ({ onClose, inline = false }) => {
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
  const [suggestions, setSuggestions] = useState([
    "📚 Horaires bibliothèque",
    "🍽️ Menu cafétéria",
    "📡 Connexion WiFi",
    "📅 Calendrier examens"
  ]);
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
    
    const responses = {
      horaire: {
        text: "📅 Les horaires d'ouverture du campus sont de 8h à 20h du lundi au vendredi, et de 9h à 17h le samedi. La bibliothèque ferme à 22h en semaine.",
        suggestions: ["📚 Services bibliothèque", "🏢 Plan du campus", "🚗 Horaires parking"]
      },
      wifi: {
        text: "📡 Le réseau WiFi 'ESTIAM-SECURE' est disponible sur tout le campus. Identifiants : votre email étudiant + mot de passe communiqué par email. Support IT : ext. 2345",
        suggestions: ["💻 Problèmes de connexion", "🔒 Changer mot de passe", "📱 Config mobile"]
      },
      examen: {
        text: "📝 Les dates d'examens sont disponibles sur votre espace étudiant dans l'onglet 'Calendrier'. Rattrapage possible sur demande motivée au secrétariat pédagogique.",
        suggestions: ["📋 Modalités examens", "🏥 Certificat médical", "📧 Contact secrétariat"]
      },
      bibliotheque: {
        text: "📚 Bibliothèque située au 2ème étage du bâtiment principal. Emprunt : 5 livres max pour 3 semaines. Renouvellement possible via l'app ou sur place.",
        suggestions: ["🔍 Recherche catalogue", "📖 Réserver une salle", "⏰ Horaires étendus"]
      },
      cantine: {
        text: "🍽️ Cafétéria ouverte de 11h30 à 14h30. Menu de la semaine mis à jour chaque lundi. Paiement par carte étudiante ou CB. Tarif préférentiel étudiants !",
        suggestions: ["🥗 Menu végétarien", "💳 Recharger carte", "🕐 Horaires spéciaux"]
      },
      cours: {
        text: "📚 Pour signaler une absence : formulaire en ligne sur votre espace étudiant ou email au secrétariat. Justificatif obligatoire sous 48h pour les absences >3h.",
        suggestions: ["📧 Contact professeur", "🏥 Absence maladie", "📋 Rattrapages"]
      },
      stage: {
        text: "💼 Bureau des carrières au 2ème étage pour stages/alternance. Email : carrieres@estiam.fr. Conventions disponibles en ligne. Suivi personnalisé avec nos conseillers !",
        suggestions: ["📄 Télécharger convention", "🤝 Offres partenaires", "💡 Conseils CV"]
      },
      mentorat: {
        text: "🎓 Programme de mentorat accessible via l'onglet 'Mentorat'. Trouvez un mentor dans votre domaine ou proposez votre aide. Sessions virtuelles ou en présentiel.",
        suggestions: ["👨‍🏫 Devenir mentor", "🔍 Trouver un mentor", "📅 Planifier session"]
      },
      bonjour: {
        text: "👋 Bonjour ! Ravi de vous aider ! Je suis là pour répondre à toutes vos questions sur la vie étudiante à ESTIAM. Que puis-je faire pour vous ?",
        suggestions: ["📚 Infos cours", "🏢 Services campus", "🎯 Aide technique", "🤝 Contacts utiles"]
      },
      merci: {
        text: "😊 Avec plaisir ! C'est toujours un bonheur d'aider nos étudiants. N'hésitez pas à revenir si vous avez d'autres questions !",
        suggestions: ["❓ Autre question", "📞 Contact humain", "💬 Feedback", "🔄 Recommencer"]
      }
    };

    // Recherche de mots-clés
    for (const [key, response] of Object.entries(responses)) {
      if (lowerCaseMessage.includes(key) || 
          (key === 'wifi' && lowerCaseMessage.includes('internet')) ||
          (key === 'cantine' && (lowerCaseMessage.includes('manger') || lowerCaseMessage.includes('repas'))) ||
          (key === 'bonjour' && (lowerCaseMessage.includes('salut') || lowerCaseMessage.includes('hello'))) ||
          (key === 'stage' && lowerCaseMessage.includes('alternance')) ||
          (key === 'bibliotheque' && lowerCaseMessage.includes('livre')) ||
          (key === 'cours' && lowerCaseMessage.includes('absence')) ||
          (key === 'examen' && lowerCaseMessage.includes('partiel'))) {
        
        setSuggestions(response.suggestions);
        return response.text;
      }
    }

    // Réponse par défaut
    setSuggestions([
      "📚 Infos académiques",
      "🏢 Services campus", 
      "💻 Support technique",
      "📞 Contact direct"
    ]);
    
    return "🤔 Je n'ai pas toutes les informations sur ce sujet. Pourriez-vous reformuler votre question ou essayer une des suggestions ci-dessous ? Pour une aide personnalisée, contactez l'administration ! 📞";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage = { 
      id: messages.length + 1, 
      text: inputValue, 
      isBot: false,
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simuler un délai de réponse du bot avec animation de frappe
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = { 
        id: messages.length + 2, 
        text: generateBotResponse(inputValue), 
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500 + Math.random() * 1000); // Délai variable pour plus de réalisme
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    // Auto-submit après un court délai
    setTimeout(() => {
      const event = { preventDefault: () => {} };
      handleSubmit(event);
    }, 300);
  };

  // Animation de frappe du bot
  const TypingIndicator = () => (
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
  );

  // Si le composant est utilisé en mode inline (dans le bouton flottant)
  if (inline) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
              🤖
            </div>
            <div>
              <h3 className="font-semibold">Assistant ESTIAM</h3>
              <p className="text-xs text-blue-100">En ligne • Répond instantanément</p>
            </div>
          </div>
        </div>

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
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="p-3 border-t border-white/20 bg-white/30 backdrop-blur-sm">
            <div className="flex flex-wrap gap-1">
              {suggestions.slice(0, 2).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs bg-white/50 hover:bg-white/70 text-blue-700 px-2 py-1 rounded-full transition-all duration-300 hover:scale-105 border border-blue-200/50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        
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
      </div>
    );
  }

  // Version complète pour la page chat
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Effets de fond */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-bounce-slow"></div>

      {/* Header moderne */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white p-6 shadow-2xl relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              🤖
            </div>
            <div>
              <h2 className="text-xl font-bold">Assistant Virtuel ESTIAM</h2>
              <p className="text-blue-100 text-sm">🟢 En ligne • Réponse instantanée</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Corps du chat avec les messages */}
      <div className="flex-grow overflow-y-auto p-6 relative z-10">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-6 flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
          >
            <div className={`flex items-start space-x-3 max-w-2xl ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
              {message.isBot && (
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg">
                  🤖
                </div>
              )}
              <div 
                className={`rounded-3xl px-6 py-4 shadow-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${message.isBot 
                  ? 'bg-white/80 text-gray-800 border-white/20' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-300/20'}`}
              >
                <p className="leading-relaxed">{message.text}</p>
                <div className={`text-xs mt-2 ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                  {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions rapides */}
      {suggestions.length > 0 && (
        <div className="px-6 py-4 border-t border-white/20 bg-white/30 backdrop-blur-xl relative z-10">
          <p className="text-sm text-gray-600 mb-3 font-medium">💡 Suggestions rapides :</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-white/60 hover:bg-white/80 text-blue-700 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm border border-blue-200/50 hover:shadow-xl"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Formulaire d'envoi de message */}
      <form onSubmit={handleSubmit} className="p-6 bg-white/40 backdrop-blur-xl border-t border-white/20 relative z-10">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Posez votre question sur la vie étudiante..."
            className="flex-grow bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg"
          />
          <button 
            type="submit" 
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            disabled={!inputValue.trim() || isTyping}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
            <span className="font-semibold">Envoyer</span>
          </button>
        </div>
      </form>

      {/* Styles CSS intégrés */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ChatBotModal;