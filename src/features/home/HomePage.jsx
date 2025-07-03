import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeaturePreviewCard from '../../components/FeaturePreviewCard';
import apiService from '../../services/apiService';

const HomePage = () => {
  // État pour les données dynamiques des fonctionnalités
  const [mentors, setMentors] = useState([]);
  const [loadingMentors, setLoadingMentors] = useState(true);
  
  
  // Fonction pour générer les initiales à partir d'un nom
  const getInitials = (name) => {
    if (!name) return 'XX';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Fonction pour générer une couleur de fond basée sur l'ID
  const getBackgroundColor = (id) => {
    const colors = [
      'bg-blue-200 text-blue-800',
      'bg-green-200 text-green-800',
      'bg-purple-200 text-purple-800',
      'bg-yellow-200 text-yellow-800',
      'bg-red-200 text-red-800',
      'bg-indigo-200 text-indigo-800',
      'bg-pink-200 text-pink-800'
    ];
    return colors[id % colors.length];
  };
  
  // Charger les données des mentors
  useEffect(() => {
    const fetchMentors = async () => {
      setLoadingMentors(true);
      try {
        const data = await apiService.getMentoringSessions();
        
        // Conversion des données de l'API au format attendu
        const mentorsMap = new Map();
        
        data.forEach(session => {
          const mentor = session.mentor;
          
          if (!mentorsMap.has(mentor.id)) {
            mentorsMap.set(mentor.id, {
              id: mentor.id,
              name: mentor.name,
              level: mentor.level,
              specialty: session.subject || 'Non spécifié',
              // Ajout d'un rating pour chaque mentor (entre 4.0 et 5.0)
              rating: (4 + Math.random()).toFixed(1)
            });
          }
        });
        
        // Récupérer les mentors depuis l'API
        const apiMentors = Array.from(mentorsMap.values());
        
        // Si nous avons au moins 3 mentors de l'API, les utiliser
        if (apiMentors.length >= 3) {
          setMentors(apiMentors.slice(0, 6)); // Limiter à 6 mentors
        } else {
          // Sinon, compléter avec des mentors par défaut pour avoir au moins 3 mentors
          const defaultMentors = [
            {
              id: 101,
              name: 'Sophie Dubois',
              level: 'Expert',
              specialty: 'Développement Web Frontend',
              rating: '4.8'
            },
            {
              id: 102,
              name: 'Thomas Martin',
              level: 'Avancé',
              specialty: 'Intelligence Artificielle',
              rating: '4.5'
            },
            {
              id: 103,
              name: 'Emma Laurent',
              level: 'Expert',
              specialty: 'Cybersécurité',
              rating: '4.9'
            },
            {
              id: 104,
              name: 'Lucas Bernard',
              level: 'Intermédiaire',
              specialty: 'Développement Mobile',
              rating: '4.6'
            },
            {
              id: 105,
              name: 'Camille Moreau',
              level: 'Expert',
              specialty: 'Data Science',
              rating: '4.7'
            },
            {
              id: 106,
              name: 'Alexandre Petit',
              level: 'Avancé',
              specialty: 'DevOps',
              rating: '4.4'
            }
          ];
          
          // Combiner les mentors de l'API avec les mentors par défaut
          const combinedMentors = [...apiMentors];
          
          // Ajouter des mentors par défaut jusqu'à avoir au moins 3 mentors
          for (let i = 0; combinedMentors.length < 3 && i < defaultMentors.length; i++) {
            combinedMentors.push(defaultMentors[i]);
          }
          
          setMentors(combinedMentors.slice(0, 6)); // Limiter à 6 mentors
        }
      } catch (err) {
        console.error('Erreur lors du chargement des mentors:', err);
        
        // En cas d'erreur, afficher 6 mentors par défaut
        const defaultMentors = [
          {
            id: 101,
            name: 'Sophie Dubois',
            level: 'Expert',
            specialty: 'Développement Web Frontend',
            rating: '4.8'
          },
          {
            id: 102,
            name: 'Thomas Martin',
            level: 'Avancé',
            specialty: 'Intelligence Artificielle',
            rating: '4.5'
          },
          {
            id: 103,
            name: 'Emma Laurent',
            level: 'Expert',
            specialty: 'Cybersécurité',
            rating: '4.9'
          },
          {
            id: 104,
            name: 'Lucas Bernard',
            level: 'Intermédiaire',
            specialty: 'Développement Mobile',
            rating: '4.6'
          },
          {
            id: 105,
            name: 'Camille Moreau',
            level: 'Expert',
            specialty: 'Data Science',
            rating: '4.7'
          },
          {
            id: 106,
            name: 'Alexandre Petit',
            level: 'Avancé',
            specialty: 'DevOps',
            rating: '4.4'
          }
        ];
        
        setMentors(defaultMentors);
      } finally {
        setLoadingMentors(false);
      }
    };
    
    fetchMentors();
  }, []);
  
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
    cafeteria: { niveau: 'moyenne', occupation: '50%', attente: '5 min' },
    bibliotheque: { niveau: 'moyenne', occupation: '50%', places: '50 disponibles' },
    labInfo: { niveau: 'faible', occupation: '30%', places: '30 disponibles' },
    salleEtude: { niveau: 'moyenne', occupation: '50%', places: '20 disponibles' }
  });
  
  // Charger les données d'affluence depuis l'API
  useEffect(() => {
    const fetchAffluenceData = async () => {
      try {
        const overview = await apiService.getAffluenceOverview();
        const realTime = await apiService.getRealTimeAffluence();
        
        // Mise à jour des données d'affluence avec les données de l'API
        if (overview && realTime) {
          setAffluenceData({
            cafeteria: realTime.cafeteria || affluenceData.cafeteria,
            bibliotheque: realTime.bibliotheque || affluenceData.bibliotheque,
            labInfo: realTime.labInfo || affluenceData.labInfo,
            salleEtude: realTime.salleEtude || affluenceData.salleEtude
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données d\'affluence:', error);
      }
    };
    
    fetchAffluenceData();
    
    // Rafraîchir les données toutes les 5 minutes
    const interval = setInterval(fetchAffluenceData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  
  // Charger les données des événements depuis l'API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Utiliser getEvents pour avoir les mêmes événements que sur la page des événements
        const data = await apiService.getEvents();
        
        // Ajouter les 3 événements supplémentaires avec les mêmes propriétés que celles utilisées dans l'API
        const additionalEvents = [
          {
            id: 5,
            title: 'Soirée d\'intégration',
            date: '2025-09-15',
            time: '20h00',
            place: 'Campus Principal', // Utilisation de 'place' au lieu de 'location' pour correspondre à l'API
            attendance: 156, // Utilisation de 'attendance' au lieu de 'participants' pour correspondre à l'API
            max_attendance: 200, // Utilisation de 'max_attendance' au lieu de 'maxParticipants' pour correspondre à l'API
            description: 'Venez rencontrer les nouveaux étudiants lors de notre soirée d\'intégration annuelle.',
            category: 'Social',
            date_start: '2025-09-15T20:00:00',
            date_end: '2025-09-15T23:59:00'
          },
          {
            id: 6,
            title: 'Hackathon Innovation',
            date: '2025-09-22',
            time: '09h00',
            place: 'Bâtiment Technologie',
            attendance: 87,
            max_attendance: 100,
            description: '48 heures pour créer une solution innovante en équipe.',
            category: 'Tech',
            date_start: '2025-09-22T09:00:00',
            date_end: '2025-09-24T09:00:00'
          },
          {
            id: 7,
            title: 'Conférence IA & Éthique',
            date: '2025-09-30',
            time: '14h00',
            place: 'Amphithéâtre Central',
            attendance: 42,
            max_attendance: 120,
            description: 'Discussion sur les implications éthiques de l\'intelligence artificielle.',
            category: 'Conférence',
            date_start: '2025-09-30T14:00:00',
            date_end: '2025-09-30T16:00:00'
          }
        ];
        
        // Combiner les données de l'API avec les événements supplémentaires
        const combinedEvents = [...data, ...additionalEvents];
        
        // Limiter l'affichage à 7 événements pour la page d'accueil
        setUpcomingEvents(combinedEvents.slice(0, 7));
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
        
        // En cas d'erreur, afficher au moins les 3 événements supplémentaires
        const additionalEvents = [
          {
            id: 5,
            title: 'Soirée d\'intégration',
            date: '2025-09-15',
            time: '20h00',
            place: 'Campus Principal',
            attendance: 156,
            max_attendance: 200,
            description: 'Venez rencontrer les nouveaux étudiants lors de notre soirée d\'intégration annuelle.',
            category: 'Social',
            date_start: '2025-09-15T20:00:00',
            date_end: '2025-09-15T23:59:00'
          },
          {
            id: 6,
            title: 'Hackathon Innovation',
            date: '2025-09-22',
            time: '09h00',
            place: 'Bâtiment Technologie',
            attendance: 87,
            max_attendance: 100,
            description: '48 heures pour créer une solution innovante en équipe.',
            category: 'Tech',
            date_start: '2025-09-22T09:00:00',
            date_end: '2025-09-24T09:00:00'
          },
          {
            id: 7,
            title: 'Conférence IA & Éthique',
            date: '2025-09-30',
            time: '14h00',
            place: 'Amphithéâtre Central',
            attendance: 42,
            max_attendance: 120,
            description: 'Discussion sur les implications éthiques de l\'intelligence artificielle.',
            category: 'Conférence',
            date_start: '2025-09-30T14:00:00',
            date_end: '2025-09-30T16:00:00'
          }
        ];
        
        setUpcomingEvents(additionalEvents);
      }
    };
    
    fetchEvents();
  }, []);
  
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
  
  // Charger les données des demandes de mentorat si l'API est disponible
  useEffect(() => {
    const fetchMentorRequests = async () => {
      try {
        // Vérifier si la méthode existe dans l'API
        if (apiService.getMentorRequests) {
          const data = await apiService.getMentorRequests();
          setMentorRequests(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des demandes de mentorat:', error);
      }
    };
    
    fetchMentorRequests();
  }, []);
  
  // Mise à jour périodique des données d'affluence en temps réel
  useEffect(() => {
    const fetchRealTimeData = async () => {
      try {
        const realTimeData = await apiService.getRealTimeAffluence();
        if (realTimeData) {
          setAffluenceData(prevData => ({
            ...prevData,
            ...realTimeData
          }));
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour des données d\'affluence en temps réel:', error);
      }
    };
    
    // Mise à jour toutes les 30 secondes
    const interval = setInterval(fetchRealTimeData, 30000);
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
    const nextEvent = upcomingEvents.find(event => new Date(event.date_start) > today);
    
    if (nextEvent) {
      const daysUntil = Math.ceil((new Date(nextEvent.date_start) - today) / (1000 * 60 * 60 * 24));
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
              <Link to="/affluence" className="bg-white text-purple-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                Regarder les salles disponibles
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
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-xl font-semibold">À ne pas manquer 🔥</h2>
          <Link to="/social" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full flex items-center transition-colors">
            Voir tout
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        <div className="flex overflow-x-auto pb-4 gap-4 px-2 scrollbar-hide">
          {upcomingEvents.map(event => (
            <Link to={`/social/event/${event.id}`} key={event.id} className="flex-shrink-0 w-36 md:w-44 cursor-pointer transition-transform hover:scale-105">
              <div className="bg-gradient-to-b from-blue-500 to-purple-600 h-48 md:h-56 rounded-xl relative overflow-hidden shadow-md">
                <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <p className="font-bold truncate">{event.title}</p>
                  <p className="text-xs text-white/80">{new Date(event.date_start).toLocaleDateString('fr-FR')}</p>
                  <p className="text-xs text-white/80">{event.place}</p>
                </div>
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
                  {event.category}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Section Trouver un mentor - Placée juste après les événements */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-2xl font-bold">Trouver un mentor</h2>
          <Link to="/mentoring" className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-full flex items-center transition-colors">
            Voir tout
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        
        {loadingMentors ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mentors.map(mentor => (
              <Link 
                key={mentor.id} 
                to="/mentoring"
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow p-4 flex items-center gap-4"
              >
                <div className={`h-16 w-16 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-semibold ${getBackgroundColor(mentor.id)}`}>
                  {getInitials(mentor.name)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{mentor.name}</h3>
                  <p className="text-gray-600">Niveau: {mentor.level}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-sm font-medium">{mentor.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
            
            {mentors.length === 0 && (
              <div className="col-span-full bg-gray-50 rounded-xl p-6 text-center">
                <p className="text-gray-500">Aucun mentor disponible pour le moment.</p>
                <Link to="/mentoring" className="text-purple-600 font-medium mt-2 inline-block">Voir toutes les options de mentorat</Link>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* La section forum a été supprimée */}
    </div>
  );
};


export default HomePage;
