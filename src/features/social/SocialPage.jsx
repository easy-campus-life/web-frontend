import React, { useState } from 'react';

const SocialPage = () => {
  const [filter, setFilter] = useState('all');
  const [joinedEvents, setJoinedEvents] = useState(new Set());

  const events = [
    {
      id: 1,
      title: 'Soirée d\'intégration',
      date: '15 Septembre 2025',
      time: '20:00',
      location: 'Campus Principal',
      description: 'Venez rencontrer les nouveaux étudiants lors de notre soirée d\'intégration annuelle.',
      attendees: 156,
      category: 'social',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop',
      tags: ['Intégration', 'Soirée', 'Networking']
    },
    {
      id: 2,
      title: 'Hackathon Innovation',
      date: '22 Septembre 2025',
      time: '09:00',
      location: 'Bâtiment Technologie',
      description: '48 heures pour créer une solution innovante en équipe.',
      attendees: 87,
      category: 'tech',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=200&fit=crop',
      tags: ['Tech', 'Innovation', 'Compétition']
    },
    {
      id: 3,
      title: 'Conférence IA & Éthique',
      date: '30 Septembre 2025',
      time: '14:00',
      location: 'Amphithéâtre Central',
      description: 'Discussion sur les implications éthiques de l\'intelligence artificielle.',
      attendees: 42,
      category: 'academic',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop',
      tags: ['IA', 'Éthique', 'Conférence']
    }
  ];

  const getCategoryConfig = (category) => {
    const configs = {
      social: {
        gradient: 'from-pink-500 to-rose-500',
        bgColor: 'bg-pink-50',
        textColor: 'text-pink-700',
        icon: '🎉'
      },
      tech: {
        gradient: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        icon: '💻'
      },
      academic: {
        gradient: 'from-purple-500 to-indigo-500',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-700',
        icon: '🎓'
      }
    };
    return configs[category] || configs.social;
  };

  const handleJoinEvent = (eventId) => {
    const newJoinedEvents = new Set(joinedEvents);
    if (newJoinedEvents.has(eventId)) {
      newJoinedEvents.delete(eventId);
    } else {
      newJoinedEvents.add(eventId);
    }
    setJoinedEvents(newJoinedEvents);
  };

  const filteredEvents = filter === 'all' ? events : events.filter(event => event.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Effets de fond */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-bounce-slow"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header moderne */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Événements Campus
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez et participez aux événements qui façonnent la vie étudiante d'ESTIAM
          </p>
        </div>

        {/* Filtres et bouton de création */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'Tous', icon: '🌟' },
              { key: 'social', label: 'Social', icon: '🎉' },
              { key: 'tech', label: 'Tech', icon: '💻' },
              { key: 'academic', label: 'Académique', icon: '🎓' }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-4 py-2 rounded-2xl font-medium text-sm transition-all duration-300 hover:scale-105 ${
                  filter === filterOption.key
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90 border border-white/20'
                }`}
              >
                <span className="mr-2">{filterOption.icon}</span>
                {filterOption.label}
              </button>
            ))}
          </div>

          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Créer un événement</span>
          </button>
        </div>

        {/* Grille d'événements */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, index) => {
            const categoryConfig = getCategoryConfig(event.category);
            const isJoined = joinedEvents.has(event.id);
            
            return (
              <div 
                key={event.id} 
                className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 transform animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Effet de brillance */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Image d'en-tête avec overlay gradient */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${categoryConfig.gradient} opacity-60`}></div>
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <span className={`${categoryConfig.bgColor} ${categoryConfig.textColor} px-3 py-1 rounded-full text-xs font-bold flex items-center`}>
                      <span className="mr-1">{categoryConfig.icon}</span>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
                    {event.attendees} participants
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6 relative z-10">
                  <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {event.title}
                  </h2>
                  
                  {/* Informations date/lieu */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span className="text-sm font-medium">{event.date} à {event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span className="text-sm font-medium">{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">{event.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-6">
                    {event.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Boutons d'action */}
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleJoinEvent(event.id)}
                      className={`flex-1 font-semibold py-3 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                        isJoined
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-xl'
                      }`}
                    >
                      {isJoined ? (
                        <span className="flex items-center justify-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Inscrit
                        </span>
                      ) : (
                        'Participer'
                      )}
                    </button>
                    <button className="bg-white/70 backdrop-blur-sm border border-white/30 hover:bg-white/90 text-gray-700 font-medium py-3 px-4 rounded-2xl transition-all duration-300 hover:scale-105">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message si aucun événement */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📅</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun événement trouvé</h3>
            <p className="text-gray-500">Essayez de changer les filtres ou créez votre propre événement !</p>
          </div>
        )}
      </div>

      {/* Styles CSS intégrés */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        /* Responsive design amélioré */
        @media (max-width: 640px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
        
        /* Amélioration de l'accessibilité */
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-bounce-slow {
            animation: none;
          }
          
          .transition-all {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

export default SocialPage;