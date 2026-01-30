import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/apiService';

const HomePage = () => {
  // État pour les données dynamiques des mentors
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
  

  
  // Fonction pour obtenir une image en fonction de la catégorie de l'événement
  const getEventImage = (category, title) => {
    // Images par défaut pour chaque catégorie
    const categoryImages = {
      'Musique': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'Culture': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'Gastronomie': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'Sport': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'Marché': 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'Cinéma': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'Écologie': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'Gaming': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'Exposition': 'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'Fête nationale': 'https://images.unsplash.com/photo-1551803091-e20673f15770?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'Atelier': 'https://images.unsplash.com/photo-1544928147-79a2dbc1f669?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'Technologie': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'Art': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'Littérature': 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'Business': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'Five': 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'Jeux de Société': 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    };
    
    // Images spécifiques pour certains mots-clés dans le titre
    if (title.toLowerCase().includes('festival')) {
      return 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';
    } else if (title.toLowerCase().includes('vélo')) {
      return 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';
    } else if (title.toLowerCase().includes('marathon')) {
      return 'https://images.unsplash.com/photo-1530947443747-bcb41920bdaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';
    }
    
    // Retourne l'image de la catégorie ou une image par défaut si la catégorie n'existe pas
    return categoryImages[category] || 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';
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
          // Utiliser uniquement les mentors de l'API
          setMentors(apiMentors.slice(0, 6)); // Limiter à 6 mentors
        }
      } catch (err) {
        console.error('Erreur lors du chargement des mentors:', err);
        
        // En cas d'erreur, afficher un message d'erreur et laisser la liste vide
        console.error('Impossible de charger les mentors depuis l\'API');
        setMentors([]);
      } finally {
        setLoadingMentors(false);
      }
    };
    
    fetchMentors();
  }, []);
  
  // Charger les données des événements depuis l'API
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Utiliser getEvents pour avoir les mêmes événements que sur la page des événements
        const data = await apiService.getEvents();
        
        if (data && data.length > 0) {
          // Tri des événements par date pour afficher les plus proches
          const sortedEvents = [...data].sort((a, b) => {
            const dateA = new Date(a.date_start || '2099-01-01');
            const dateB = new Date(b.date_start || '2099-01-01');
            return dateA - dateB;
          });
          
          // Limiter à 5 événements
          setUpcomingEvents(sortedEvents.slice(0, 5));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
      }
    };
    
    fetchEvents();
  }, []);
  
  // Charger les données d'affluence depuis l'API
  useEffect(() => {
    const fetchAffluenceData = async () => {
      try {
        const data = await apiService.getAffluenceData();
        if (data) {
          setAffluenceData(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données d\'affluence:', error);
      }
    };
    
    fetchAffluenceData();
  }, []);
  
  const [affluenceData, setAffluenceData] = useState({});

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header moderne avec image et dégradé */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        {/* Image en arrière-plan avec transparence */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Campus background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Forme ondulée en bas */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-6 py-36 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-8">
              Ton campus, ta vie étudiante
            </h1>
            <p className="text-2xl text-white/90 mb-16">
              Tout ce dont tu as besoin pour réussir et t'épanouir à l'ESTIAM
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
            <Link to="/social" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center group">
              Voir tous les événements
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide">
            {upcomingEvents.map((event, index) => (
              <Link to={`/social/event/${event.id}`} key={event.id} className="flex-shrink-0 w-64 group cursor-pointer">
                <div className="h-72 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  {/* Image de l'événement */}
                  <img 
                    src={event.image_url || getEventImage(event.category, event.title)} 
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                  
                  <div className="absolute inset-0 flex flex-col justify-between p-6 text-white z-20">
                    <div className="flex justify-between items-start">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5 text-sm font-medium">
                        {/* Format de date adapté au nouveau format JSON */}
                        {event.date_start && 
                          new Date(event.date_start).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                      </div>
                      <div className="bg-green-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold">
                        {event.attendance || '0+'}
                      </div>
                    </div>
                    
                    <div>
                      <div className="bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium inline-block mb-2">
                        {event.category}
                      </div>
                      <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                      <p className="text-sm text-white/90 mb-3 line-clamp-2">{event.description}</p>
                      <div className="flex items-center text-sm text-white/80">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.place || 'Lieu à confirmer'}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Section affluence - Maintenant à gauche */}
          <aside className="lg:w-1/3">
            {/* Titre de la section affluence */}
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white mr-3">
                📊
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Affluence Campus
              </h2>
            </div>

            {/* Card Affluence */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Statistiques d'affluence en temps réel</h3>
                <div className="text-xs text-gray-500">
                  Dernière mise à jour : {new Date().toLocaleTimeString('fr-FR')}
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {/* Salle M */}
                <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-300 to-green-500"></div>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold mr-2">M</div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Occupation</span>
                        <span className="text-green-600 font-bold">{affluenceData?.salleM?.occupation || '2.5%'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: affluenceData?.salleM?.occupation || '2.5%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{affluenceData?.salleM?.places || 'undefined places disponibles'}</div>
                </div>
                
                {/* Salle L */}
                <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-300 to-green-500"></div>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold mr-2">L</div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Occupation</span>
                        <span className="text-green-600 font-bold">{affluenceData?.salleL?.occupation || '15%'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: affluenceData?.salleL?.occupation || '15%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{affluenceData?.salleL?.places || 'undefined places disponibles'}</div>
                </div>
                
                {/* Salle H */}
                <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-300 to-green-500"></div>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold mr-2">H</div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Occupation</span>
                        <span className="text-green-600 font-bold">{affluenceData?.salleH?.occupation || '5%'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: affluenceData?.salleH?.occupation || '5%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{affluenceData?.salleH?.places || 'undefined places disponibles'}</div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Link to="/affluence" className="text-blue-600 hover:text-blue-800 transition-colors text-sm flex items-center justify-center">
                  Voir toutes les salles
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </aside>

          {/* Contenu principal - Section des mentors - Maintenant à droite avec hauteur augmentée */}
          <main className="lg:w-2/3">
            {/* Header des mentors */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mr-3">
                  🎓
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Trouver un mentor
                </h2>
              </div>
              <Link to="/mentoring" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm font-semibold px-6 py-3 rounded-2xl flex items-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Voir tout
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Liste des mentors avec hauteur augmentée */}
            {loadingMentors ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mentors.map((mentor, index) => (
                  <Link 
                    to="/mentoring"
                    key={index} 
                    className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-4 h-40"
                  >
                    <div className={`h-20 w-20 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-semibold ${getBackgroundColor(mentor.id)}`}>
                      {getInitials(mentor.name)}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">{mentor.name}</h3>
                      <p className="text-gray-600">Niveau: {mentor.level}</p>
                      <p className="text-gray-600">{mentor.specialty}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-yellow-500 mr-1 text-lg">★</span>
                        <span className="font-medium">{mentor.rating}</span>
                      </div>
                    </div>
                  </Link>
                ))}
                
                {mentors.length === 0 && (
                  <div className="col-span-full bg-white/80 backdrop-blur-xl rounded-3xl p-6 text-center shadow-xl border border-white/20">
                    <p className="text-gray-500">Aucun mentor disponible pour le moment.</p>
                    <Link to="/mentoring" className="text-purple-600 font-medium mt-2 inline-block">Voir toutes les options de mentorat</Link>
                  </div>
                )}
              </div>
            )}
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