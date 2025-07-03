import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [forumTopics, setForumTopics] = useState([
    {
      id: 1,
      title: "Problème avec l'API React Context",
      author: "Alexandre Dupont",
      date: "2025-07-02",
      replies: 8,
      views: 42,
      category: "Développement"
    },
    {
      id: 2,
      title: "Conseils pour stage en cybersécurité",
      author: "Emma Moreau",
      date: "2025-07-01",
      replies: 15,
      views: 87,
      category: "Carrière"
    },
    {
      id: 3,
      title: "Partage de ressources IA et Machine Learning",
      author: "Lucas Bernard",
      date: "2025-07-02",
      replies: 12,
      views: 63,
      category: "Ressources"
    },
    {
      id: 4,
      title: "Organisation d'un meetup DevOps",
      author: "Julie Lefebvre",
      date: "2025-06-30",
      replies: 6,
      views: 28,
      category: "Événements"
    },
    {
      id: 5,
      title: "Problème d'accès à la salle 302",
      author: "Marc Dubois",
      date: "2025-07-02",
      replies: 3,
      views: 19,
      category: "Campus"
    }
  ]);
  
  const [campusNews, setCampusNews] = useState([
    {
      id: 1,
      title: "Ouverture de la nouvelle bibliothèque",
      content: "La nouvelle bibliothèque du campus ouvre ses portes ce lundi.",
      date: "2025-07-02",
      type: "Nouveau",
      badgeColor: "blue"
    },
    {
      id: 2,
      title: "Modification des horaires du restaurant universitaire",
      content: "Le restaurant sera désormais ouvert de 11h30 à 14h30.",
      date: "2025-07-01",
      type: "Info",
      badgeColor: "green"
    },
    {
      id: 3,
      title: "Maintenance réseau prévue",
      content: "Une maintenance du réseau est prévue le 5 juillet de 22h à 2h du matin.",
      date: "2025-07-02",
      type: "Important",
      badgeColor: "yellow"
    },
    {
      id: 4,
      title: "Nouveau partenariat avec Microsoft",
      content: "Accès gratuit à Microsoft Azure pour tous les étudiants.",
      date: "2025-06-30",
      type: "Nouveau",
      badgeColor: "blue"
    },
    {
      id: 5,
      title: "Fermeture exceptionnelle du parking B",
      content: "Le parking B sera fermé le 4 juillet pour travaux.",
      date: "2025-07-01",
      type: "Alerte",
      badgeColor: "red"
    }
  ]);
  
  const [affluenceData, setAffluenceData] = useState({
    cafeteria: { niveau: 'élevée', occupation: '85%', attente: '15 min' },
    bibliotheque: { niveau: 'moyenne', occupation: '60%', places: '45 disponibles' },
    labInfo: { niveau: 'faible', occupation: '30%', places: '28 disponibles' },
    salleEtude: { niveau: 'élevée', occupation: '90%', places: '5 disponibles' }
  });
  
  const [upcomingEvents, setUpcomingEvents] = useState([
    { 
      id: 1, 
      title: 'Hackathon IA', 
      date: '2025-07-15', 
      time: '9h00 - 18h00',
      location: 'Campus Principal - Salle 305',
      participants: 42,
      maxParticipants: 50,
      description: 'Développez une application IA innovante en 24h et gagnez des prix!'
    },
    { 
      id: 2, 
      title: 'Conférence Cybersécurité', 
      date: '2025-07-10',
      time: '14h00 - 16h30',
      location: 'Amphithéâtre B',
      participants: 78,
      maxParticipants: 120,
      description: 'Les experts de la CNIL et de l\'ANSSI présentent les dernières menaces.'
    },
    { 
      id: 3, 
      title: 'Workshop Cloud Native', 
      date: '2025-07-08',
      time: '10h00 - 12h30',
      location: 'Campus Principal - Lab 2',
      participants: 25,
      maxParticipants: 30,
      description: 'Initiation à Kubernetes et aux architectures microservices.'
    },
    { 
      id: 4, 
      title: 'Soirée Networking', 
      date: '2025-07-20',
      time: '18h30 - 21h00',
      location: 'Cafétéria Centrale',
      participants: 35,
      maxParticipants: 100,
      description: 'Rencontrez des professionnels du secteur dans une ambiance décontractée.'
    }
  ]);
  
  const [mentorRequests, setMentorRequests] = useState([
    {
      id: 1,
      student: 'Sophie Martin',
      subject: 'Programmation React',
      urgency: 'Moyenne',
      date: '2025-07-03',
      status: 'En attente'
    },
    {
      id: 2,
      student: 'Thomas Dubois',
      subject: 'Bases de données NoSQL',
      urgency: 'Élevée',
      date: '2025-07-02',
      status: 'En attente'
    },
    {
      id: 3,
      student: 'Camille Leroy',
      subject: 'Sécurité Web',
      urgency: 'Faible',
      date: '2025-07-04',
      status: 'Planifié'
    }
  ]);

  const getCategoryConfig = (category) => {
    const configs = {
      'Développement': { gradient: 'from-blue-500 to-cyan-500', color: 'bg-blue-100 text-blue-800', icon: '💻' },
      'Carrière': { gradient: 'from-green-500 to-emerald-500', color: 'bg-green-100 text-green-800', icon: '🚀' },
      'Ressources': { gradient: 'from-purple-500 to-pink-500', color: 'bg-purple-100 text-purple-800', icon: '📚' },
      'Événements': { gradient: 'from-orange-500 to-red-500', color: 'bg-orange-100 text-orange-800', icon: '🎉' },
      'Campus': { gradient: 'from-indigo-500 to-purple-500', color: 'bg-indigo-100 text-indigo-800', icon: '🏫' }
    };
    return configs[category] || { gradient: 'from-gray-500 to-gray-600', color: 'bg-gray-100 text-gray-800', icon: '💬' };
  };

  const getNewsBadgeColor = (badgeColor) => {
    const colors = {
      'blue': 'bg-blue-100 text-blue-800',
      'green': 'bg-green-100 text-green-800',
      'yellow': 'bg-yellow-100 text-yellow-800',
      'red': 'bg-red-100 text-red-800'
    };
    return colors[badgeColor] || 'bg-gray-100 text-gray-800';
  };

  const getAffluenceColor = (niveau) => {
    switch (niveau) {
      case 'élevée': return 'bg-red-100 text-red-800';
      case 'moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'faible': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header moderne et simple */}
      <div className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Campus ESTIAM
            </h1>
            <p className="text-xl text-gray-600">
              Votre hub étudiant centralisé
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stories Section moderne */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center">
              <span className="mr-3 text-2xl">🔥</span>
              À ne pas manquer
            </h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center group">
              Voir tous les événements
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide">
            {upcomingEvents.map((event, index) => (
              <div key={event.id} className="flex-shrink-0 w-64 group cursor-pointer">
                <div className="h-72 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                    <div className="flex justify-between items-start">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5 text-sm font-medium">
                        {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                      </div>
                      <div className="bg-green-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold">
                        {event.participants}/{event.maxParticipants}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                      <p className="text-sm text-white/90 mb-3 line-clamp-2">{event.description}</p>
                      <div className="flex items-center text-sm text-white/80">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.time}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar avec les cartes de fonctionnalités */}
          <aside className="lg:w-1/3 space-y-6">
            {/* Card Affluence */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                    📊
                  </div>
                  <h3 className="ml-3 text-lg font-bold text-gray-800">Affluence Campus</h3>
                </div>
                <button className="text-blue-600 hover:text-blue-800 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-xl">
                  <span className="font-medium">Cafétéria</span>
                  <span className={`font-bold px-2 py-1 rounded-full text-xs ${getAffluenceColor(affluenceData.cafeteria.niveau)}`}>
                    {affluenceData.cafeteria.occupation}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-xl">
                  <span className="font-medium">Bibliothèque</span>
                  <span className="text-gray-700">{affluenceData.bibliotheque.places}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-xl">
                  <span className="font-medium">Lab Info</span>
                  <span className="text-gray-700">{affluenceData.labInfo.places}</span>
                </div>
              </div>
            </div>

            {/* Card Mentorat */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                    🎓
                  </div>
                  <h3 className="ml-3 text-lg font-bold text-gray-800">Mentorat</h3>
                </div>
                <button className="text-purple-600 hover:text-purple-800 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between p-3 bg-purple-50/50 rounded-xl">
                  <span className="font-medium">En attente</span>
                  <span className="font-bold text-purple-600">{mentorRequests.filter(req => req.status === 'En attente').length}</span>
                </div>
                <div className="text-gray-600">
                  <div><strong>Sujets populaires:</strong> React, NoSQL, Sécurité</div>
                </div>
              </div>
            </div>

            {/* Card Événements */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                    🎉
                  </div>
                  <h3 className="ml-3 text-lg font-bold text-gray-800">Événements</h3>
                </div>
                <button className="text-green-600 hover:text-green-800 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-green-50/50 rounded-xl">
                  <div className="font-medium">Prochain: {upcomingEvents[0]?.title}</div>
                  <div className="text-gray-600">{new Date(upcomingEvents[0]?.date).toLocaleDateString('fr-FR')}</div>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Total événements</span>
                  <span className="font-bold">{upcomingEvents.length}</span>
                </div>
              </div>
            </div>

            {/* Actualités Campus */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                    📢
                  </div>
                  <h3 className="ml-3 text-lg font-bold text-gray-800">Actualités</h3>
                </div>
              </div>
              
              <div className="space-y-3">
                {campusNews.slice(0, 3).map((news) => (
                  <div key={news.id} className="border-l-4 border-orange-500 pl-3 py-2">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-medium text-gray-900 text-sm">{news.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ml-2 ${getNewsBadgeColor(news.badgeColor)}`}>
                        {news.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{news.content}</p>
                    <span className="text-xs text-gray-500">{new Date(news.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
          
          {/* Contenu principal */}
          <main className="lg:w-2/3">
            {/* Header des discussions */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mr-3">
                  💬
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Discussions Récentes
                </h2>
              </div>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm font-semibold px-6 py-3 rounded-2xl flex items-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Voir tout
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Liste des discussions */}
            <div className="space-y-4">
              {forumTopics.slice(0, 5).map((topic, index) => {
                const categoryConfig = getCategoryConfig(topic.category);
                
                return (
                  <div key={topic.id} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 transform">
                    <div className="block p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg text-gray-900 hover:text-purple-600 transition-colors duration-200 flex-1 pr-4">
                          {topic.title}
                        </h3>
                        <div className={`bg-gradient-to-r ${categoryConfig.gradient} text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-lg`}>
                          <span>{categoryConfig.icon}</span>
                          <span>{topic.category}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${categoryConfig.gradient} flex items-center justify-center text-white font-bold text-sm mr-3 shadow-lg`}>
                          {topic.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{topic.author}</p>
                          <p className="text-xs text-gray-500">{new Date(topic.date).toLocaleDateString('fr-FR', { 
                            day: 'numeric', 
                            month: 'long',
                            year: 'numeric'
                          })}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-200">
                        <div className="flex space-x-6">
                          <span className="flex items-center bg-purple-50/50 px-3 py-1.5 rounded-xl">
                            <svg className="w-4 h-4 mr-1.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="font-medium">{topic.replies}</span>
                          </span>
                          <span className="flex items-center bg-blue-50/50 px-3 py-1.5 rounded-xl">
                            <svg className="w-4 h-4 mr-1.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span className="font-medium">{topic.views}</span>
                          </span>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">
                          Participer →
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Bouton créer une discussion */}
              <div className="mt-8 text-center">
                <button className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Créer une discussion</span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* CSS réduit */}
      <style jsx>{`
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default HomePage;