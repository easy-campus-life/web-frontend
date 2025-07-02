import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeaturePreviewCard from '../../components/FeaturePreviewCard';

const HomePage = () => {
  // État pour les données dynamiques des fonctionnalités
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
      title: "Conseils pour stage en cybersecurité",
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
  
  // Simuler des mises à jour en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      // Simuler des changements d'affluence aléatoires
      const levels = ['faible', 'moyenne', 'élevée'];
      const getRandomOccupation = (niveau) => {
        switch(niveau) {
          case 'faible': return `${Math.floor(Math.random() * 30 + 10)}%`;
          case 'moyenne': return `${Math.floor(Math.random() * 20 + 50)}%`;
          case 'élevée': return `${Math.floor(Math.random() * 15 + 75)}%`;
          default: return '50%';
        }
      };
      
      const getRandomPlaces = (niveau, total) => {
        switch(niveau) {
          case 'faible': return `${Math.floor(total * 0.7)} disponibles`;
          case 'moyenne': return `${Math.floor(total * 0.4)} disponibles`;
          case 'élevée': return `${Math.floor(total * 0.1)} disponibles`;
          default: return `${Math.floor(total * 0.5)} disponibles`;
        }
      };
      
      const getRandomAttente = (niveau) => {
        switch(niveau) {
          case 'faible': return '5 min';
          case 'moyenne': return '10 min';
          case 'élevée': return `${Math.floor(Math.random() * 10 + 15)} min`;
          default: return '10 min';
        }
      };
      
      const cafetNiveau = levels[Math.floor(Math.random() * 3)];
      const biblioNiveau = levels[Math.floor(Math.random() * 3)];
      const labNiveau = levels[Math.floor(Math.random() * 3)];
      const salleNiveau = levels[Math.floor(Math.random() * 3)];
      
      setAffluenceData({
        cafeteria: { 
          niveau: cafetNiveau, 
          occupation: getRandomOccupation(cafetNiveau),
          attente: getRandomAttente(cafetNiveau)
        },
        bibliotheque: { 
          niveau: biblioNiveau, 
          occupation: getRandomOccupation(biblioNiveau),
          places: getRandomPlaces(biblioNiveau, 120)
        },
        labInfo: { 
          niveau: labNiveau, 
          occupation: getRandomOccupation(labNiveau),
          places: getRandomPlaces(labNiveau, 40)
        },
        salleEtude: { 
          niveau: salleNiveau, 
          occupation: getRandomOccupation(salleNiveau),
          places: getRandomPlaces(salleNiveau, 50)
        }
      });
    }, 30000); // Mise à jour toutes les 30 secondes
    
    return () => clearInterval(interval);
  }, []);
  
  // Générer des alertes basées sur les données
  const getAffluenceAlert = () => {
    if (affluenceData.cafeteria.niveau === 'élevée') {
      return { type: 'warning', text: `Cafétéria très fréquentée (${affluenceData.cafeteria.occupation}) - Attente: ${affluenceData.cafeteria.attente}` };
    } else if (affluenceData.bibliotheque.niveau === 'élevée') {
      return { type: 'warning', text: `Bibliothèque presque complète - ${affluenceData.bibliotheque.places}` };
    } else if (affluenceData.salleEtude.niveau === 'élevée') {
      return { type: 'warning', text: `Salles d'étude occupées à ${affluenceData.salleEtude.occupation}` };
    } else if (affluenceData.labInfo.niveau === 'faible') {
      return { type: 'success', text: `Laboratoire informatique disponible - ${affluenceData.labInfo.places}` };
    }
    return null;
  };
  
  const getEventsAlert = () => {
    const today = new Date();
    const nextEvent = upcomingEvents.find(event => new Date(event.date) > today);
    
    if (nextEvent) {
      const daysUntil = Math.ceil((new Date(nextEvent.date) - today) / (1000 * 60 * 60 * 24));
      if (daysUntil <= 3) {
        return { type: 'info', text: `${nextEvent.title} dans ${daysUntil} jour${daysUntil > 1 ? 's' : ''}` };
      }
    }
    return null;
  };
  
  const getMentorAlert = () => {
    const pendingRequests = mentorRequests.filter(req => req.status === 'En attente').length;
    const urgentRequests = mentorRequests.filter(req => req.urgency === 'Élevée' && req.status === 'En attente').length;
    
    if (urgentRequests > 0) {
      return { type: 'warning', text: `${urgentRequests} demande${urgentRequests > 1 ? 's' : ''} urgente${urgentRequests > 1 ? 's' : ''}` };
    } else if (pendingRequests > 0) {
      return { type: 'info', text: `${pendingRequests} demande${pendingRequests > 1 ? 's' : ''} en attente` };
    }
    return null;
  };
  
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Ton campus, ta vie étudiante
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Tout ce dont tu as besoin pour réussir et t'épanouir à l'ÉSTIAM
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/forum" className="bg-white text-purple-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                Rejoindre les discussions
              </Link>
              <Link to="/social" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 font-medium px-6 py-3 rounded-full transition-all">
                Découvrir les événements
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto -mb-1">
            <path fill="#f9fafb" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Stories Section - Horizontal Scrolling Events */}
      <div className="container mx-auto px-4 py-8 overflow-hidden">
        <h2 className="text-xl font-semibold mb-4 px-2">À ne pas manquer 🔥</h2>
        <div className="flex overflow-x-auto pb-4 gap-4 px-2 scrollbar-hide">
          {upcomingEvents.map(event => (
            <div key={event.id} className="flex-shrink-0 w-36 md:w-44">
              <div className="bg-gradient-to-b from-blue-500 to-purple-600 h-48 md:h-56 rounded-xl relative overflow-hidden shadow-md">
                <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <p className="font-bold truncate">{event.title}</p>
                  <p className="text-xs text-white/80">{new Date(event.date).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
                  {event.participants}/{event.maxParticipants}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col md:flex-row gap-6">
        {/* Aside avec les cartes de fonctionnalités */}
        <aside className="md:w-1/3 lg:w-1/4 space-y-6">
        <FeaturePreviewCard
          title="Affluence"
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
          iconBgColor="bg-blue-100"
          iconTextColor="text-blue-600"
          to="/affluence"
          previewData={
            <div className="space-y-1 text-sm">
              <div><span className="font-semibold">Cafétéria:</span> {affluenceData.cafeteria.occupation} ({affluenceData.cafeteria.niveau})</div>
              <div><span className="font-semibold">Bibliothèque:</span> {affluenceData.bibliotheque.occupation} - {affluenceData.bibliotheque.places}</div>
              <div><span className="font-semibold">Lab Info:</span> {affluenceData.labInfo.places}</div>
              <div><span className="font-semibold">Salles d'étude:</span> {affluenceData.salleEtude.places}</div>
            </div>
          }
          alertType={getAffluenceAlert()?.type}
          alertText={getAffluenceAlert()?.text}
        />
        

        
        <FeaturePreviewCard
          title="Mentorat Technique"
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
          iconBgColor="bg-red-100"
          iconTextColor="text-red-600"
          to="/mentoring"
          previewData={
            <div className="space-y-1 text-sm">
              <div><span className="font-semibold">Demandes en attente:</span> {mentorRequests.filter(req => req.status === 'En attente').length}</div>
              <div><span className="font-semibold">Sujets populaires:</span> React, NoSQL, Sécurité</div>
              <div><span className="font-semibold">Prochaine session:</span> {mentorRequests.find(req => req.status === 'Planifié')?.date}</div>
            </div>
          }
          alertType={getMentorAlert()?.type}
          alertText={getMentorAlert()?.text}
        />
        
        <FeaturePreviewCard
          title="Événements Campus"
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
          iconBgColor="bg-blue-100"
          iconTextColor="text-blue-600"
          to="/social"
          previewData={
            <div className="space-y-1 text-sm">
              <div><span className="font-semibold">Prochain événement:</span> {upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date))[0].title}</div>
              <div><span className="font-semibold">Date:</span> {new Date(upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date))[0].date).toLocaleDateString('fr-FR')}</div>
              <div><span className="font-semibold">Total:</span> {upcomingEvents.length} événements à venir</div>
              <div><span className="font-semibold">Participants:</span> {upcomingEvents.reduce((sum, event) => sum + event.participants, 0)} inscrits</div>
            </div>
          }
          alertType={getEventsAlert()?.type}
          alertText={getEventsAlert()?.text}
        />
        
        <FeaturePreviewCard
          title="Forum Étudiants"
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />}
          iconBgColor="bg-purple-100"
          iconTextColor="text-purple-600"
          to="/forum"
          previewData={
            <div className="space-y-1 text-sm">
              <div><span className="font-semibold">Sujets récents:</span> {forumTopics.filter(topic => topic.date === "2025-07-02").length} aujourd'hui</div>
              <div><span className="font-semibold">Plus actif:</span> {forumTopics.sort((a, b) => b.replies - a.replies)[0].title.substring(0, 20)}...</div>
              <div><span className="font-semibold">Catégories populaires:</span> Développement, Carrière</div>
              <div><span className="font-semibold">Total:</span> {forumTopics.reduce((sum, topic) => sum + topic.replies, 0)} réponses</div>
            </div>
          }
          alertType="info"
          alertText={`${forumTopics.filter(topic => topic.date === "2025-07-02").length} nouveaux sujets aujourd'hui`}
        />

        </aside>
        
        {/* Contenu principal */}
        <main className="md:w-2/3 lg:w-3/4">
          {/* En-tête de section */}
          <div className="flex justify-between items-center mb-4 px-2">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
              </svg>
              <h2 className="text-2xl font-bold">Discussions</h2>
            </div>
            <Link to="/forum" className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-full flex items-center transition-colors">
              Voir tout
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          
          {/* Liste des discussions */}
          <div className="space-y-3">
            {forumTopics.slice(0, 5).map(topic => (
              <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <Link to="/forum" className="block">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">{topic.title}</h3>
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded-full">{topic.category}</span>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-medium text-sm mr-2">
                        {topic.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{topic.author}</p>
                        <p className="text-xs text-gray-500">{new Date(topic.date).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mt-2 pt-2 border-t border-gray-100">
                      <div className="flex space-x-4">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                          </svg>
                          {topic.replies}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                          {topic.views}
                        </span>
                      </div>
                      <div>
                        <span className="text-purple-600 font-medium hover:underline">Participer</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            
            {/* Bouton créer une discussion */}
            <div className="mt-4 text-center">
              <Link to="/forum/new" className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Créer une discussion
              </Link>
            </div>
          </div>
        </main>
        </div>
      </div>
    </div>
  );
};


export default HomePage;
