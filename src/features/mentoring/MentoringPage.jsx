import React, { useState, useEffect } from 'react';

// Simulation des services API (remplacer par les vrais imports)
const usersService = {
  getUsers: async (params = {}) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      {
        id: 1,
        name: 'Emma Moreau',
        email: 'emma.moreau@estiam.fr',
        level: 'E5',
        created_at: '2025-01-01T00:00:00Z',
        updated_at: '2025-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'Thomas Dupont',
        email: 'thomas.dupont@estiam.fr',
        level: 'E2',
        created_at: '2025-01-01T00:00:00Z',
        updated_at: '2025-01-01T00:00:00Z'
      },
      {
        id: 3,
        name: 'Sophie Martin',
        email: 'sophie.martin@estiam.fr',
        level: 'E4',
        created_at: '2025-01-01T00:00:00Z',
        updated_at: '2025-01-01T00:00:00Z'
      },
      {
        id: 4,
        name: 'Lucas Bernard',
        email: 'lucas.bernard@estiam.fr',
        level: 'E3',
        created_at: '2025-01-01T00:00:00Z',
        updated_at: '2025-01-01T00:00:00Z'
      },
      {
        id: 5,
        name: 'Julie Lefebvre',
        email: 'julie.lefebvre@estiam.fr',
        level: 'E4',
        created_at: '2025-01-01T00:00:00Z',
        updated_at: '2025-01-01T00:00:00Z'
      }
    ];
  }
};

const mentoringService = {
  createMentoringRelation: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: Date.now(),
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  },
  
  getUserMentoring: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  },
  
  getUserSponsors: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  }
};

const authService = {
  getCurrentUser: async () => {
    return {
      id: 999,
      name: 'Utilisateur Connecté',
      email: 'user@estiam.fr',
      level: 'E3'
    };
  }
};

const MentoringPage = () => {
  const [mentors, setMentors] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState({
    subject: '',
    description: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Configuration des niveaux d'études
  const levelConfigs = {
    'E1': { 
      gradient: 'from-green-500 to-emerald-500', 
      bgColor: 'bg-green-50', 
      textColor: 'text-green-700',
      icon: '🎯',
      description: 'Première année'
    },
    'E2': { 
      gradient: 'from-blue-500 to-cyan-500', 
      bgColor: 'bg-blue-50', 
      textColor: 'text-blue-700',
      icon: '📚',
      description: 'Deuxième année'
    },
    'E3': { 
      gradient: 'from-purple-500 to-pink-500', 
      bgColor: 'bg-purple-50', 
      textColor: 'text-purple-700',
      icon: '🎓',
      description: 'Troisième année'
    },
    'E4': { 
      gradient: 'from-orange-500 to-red-500', 
      bgColor: 'bg-orange-50', 
      textColor: 'text-orange-700',
      icon: '🏆',
      description: 'Quatrième année'
    },
    'E5': { 
      gradient: 'from-red-500 to-pink-500', 
      bgColor: 'bg-red-50', 
      textColor: 'text-red-700',
      icon: '👑',
      description: 'Cinquième année'
    }
  };

  // Spécialités par niveau (simulation - dans la vraie app, ces données viendraient de l'API)
  const specialtyData = {
    1: {
      specialty: 'Développement Web & Mobile',
      department: 'Front-end moderne (React, Vue, Tailwind)',
      bio: 'Étudiante en E5 Développement Web & Mobile, spécialisée en technologies front-end modernes.',
      tags: ['React', 'Vue.js', 'Tailwind', 'JavaScript', 'UX/UI'],
      sessions: 47,
      rating: 4.8,
      availability: 'Lundi, Mercredi'
    },
    2: {
      specialty: 'Développement Web',
      department: 'Développement web, mobile, logiciels métiers',
      bio: 'Étudiant en E2, je maîtrise les bases du développement web et mobile.',
      tags: ['HTML/CSS', 'PHP', 'JavaScript', 'MySQL', 'Git'],
      sessions: 23,
      rating: 4.6,
      availability: 'Mardi, Jeudi'
    },
    3: {
      specialty: 'Cybersécurité & Réseaux',
      department: 'Réseaux, cybersécurité, serveurs, virtualisation',
      bio: 'Étudiante en E4 Cybersécurité & Réseaux, expérience en pentesting.',
      tags: ['Cybersécurité', 'Réseaux', 'Linux', 'Pentesting', 'Docker'],
      sessions: 31,
      rating: 4.9,
      availability: 'Mercredi, Vendredi'
    },
    4: {
      specialty: 'No-Code / Low-Code',
      department: 'Bubble, Webflow, Zapier, Airtable, Make',
      bio: 'Étudiant en E3 spécialisé dans la création d\'applications sans code.',
      tags: ['No-Code', 'Bubble', 'Webflow', 'Zapier', 'Automation'],
      sessions: 19,
      rating: 4.5,
      availability: 'Lundi, Mercredi'
    },
    5: {
      specialty: 'UX/UI Design',
      department: 'UX/UI Design et développement front-end',
      bio: 'Étudiante en E4 passionnée par la création d\'interfaces utilisateur intuitives.',
      tags: ['UX Design', 'UI Design', 'Figma', 'Prototyping', 'HTML/CSS'],
      sessions: 28,
      rating: 4.8,
      availability: 'Mardi, Jeudi'
    }
  };

  // Charger les données initiales
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Charger l'utilisateur connecté et la liste des mentors potentiels
      const [userResponse, mentorsResponse] = await Promise.all([
        authService.getCurrentUser(),
        usersService.getUsers({ limit: 100 }) // Charger tous les utilisateurs
      ]);

      setCurrentUser(userResponse);
      
      // Filtrer pour ne garder que les mentors potentiels (exclure l'utilisateur connecté)
      const potentialMentors = mentorsResponse.filter(user => user.id !== userResponse.id);
      setMentors(potentialMentors);

    } catch (err) {
      setError(err.message);
      console.error('Erreur lors du chargement des données:', err);
    } finally {
      setLoading(false);
    }
  };

  const getLevelConfig = (level) => {
    return levelConfigs[level] || levelConfigs.E1;
  };

  const getMentorData = (mentorId) => {
    return specialtyData[mentorId] || {
      specialty: 'Informatique Générale',
      department: 'Aide générale en informatique',
      bio: 'Étudiant passionné par l\'informatique, prêt à partager ses connaissances.',
      tags: ['Informatique', 'Aide', 'Soutien'],
      sessions: Math.floor(Math.random() * 50) + 1,
      rating: (4 + Math.random()).toFixed(1),
      availability: 'À définir'
    };
  };

  const handleMentorSelect = (mentor) => {
    setSelectedMentor(mentor);
    setShowBookingForm(false);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = async () => {
    if (!currentUser || !selectedMentor || !bookingData.subject.trim()) {
      return;
    }

    try {
      setLoading(true);
      
      const mentoringData = {
        mentor_id: selectedMentor.id,
        sponsored_id: currentUser.id,
        subject: bookingData.subject.trim(),
        description: bookingData.description.trim() || 'Demande de mentorat'
      };

      await mentoringService.createMentoringRelation(mentoringData);
      
      setBookingSuccess(true);
      setShowBookingForm(false);
      setBookingData({ subject: '', description: '' });
      
    } catch (err) {
      console.error('Erreur lors de la réservation:', err);
      setError('Erreur lors de la création de la relation de mentorat');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  // Filtrer les mentors
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getMentorData(mentor.id).specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || mentor.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const levels = ['all', 'E1', 'E2', 'E3', 'E4', 'E5'];

  if (loading && mentors.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-700 font-medium">Chargement des mentors...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Effets de fond */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-bounce-slow"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header moderne */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Mentorat ESTIAM
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Connectez-vous avec d'autres étudiants de l'ESTIAM pour recevoir de l'aide sur vos projets ou partager vos compétences dans votre spécialité informatique
          </p>
          {currentUser && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className={`w-3 h-3 ${getLevelConfig(currentUser.level).bgColor} rounded-full mr-2`}></div>
              <span className="text-sm text-gray-600">
                Connecté en tant que <strong>{currentUser.name}</strong> ({currentUser.level})
              </span>
            </div>
          )}
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-2xl mb-8">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Erreur: {error}</span>
            </div>
          </div>
        )}

        {/* Barre de recherche et filtres */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              type="text"
              placeholder="Rechercher par nom, email ou spécialité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="flex gap-2">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`px-4 py-2 rounded-2xl font-medium text-sm transition-all duration-300 hover:scale-105 ${
                  filterLevel === level
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90 border border-white/20'
                }`}
              >
                {level === 'all' ? 'Tous' : level}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Liste des mentors */}
          <div className="lg:w-1/3">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6">
              <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Mentors disponibles ({filteredMentors.length})
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredMentors.map((mentor, index) => {
                  const levelConfig = getLevelConfig(mentor.level);
                  const mentorData = getMentorData(mentor.id);
                  
                  return (
                    <div 
                      key={mentor.id}
                      className={`group p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 animate-fade-in ${
                        selectedMentor?.id === mentor.id 
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 shadow-lg' 
                          : 'bg-white/60 hover:bg-white/80 border border-white/30 hover:shadow-lg'
                      }`}
                      onClick={() => handleMentorSelect(mentor)}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg">
                            {mentor.name.charAt(0)}{mentor.name.split(' ')[1]?.charAt(0)}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${levelConfig.bgColor} rounded-full flex items-center justify-center text-xs`}>
                            {levelConfig.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {mentor.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-1">{mentor.level}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-yellow-500">★</span>
                              <span className="text-sm ml-1 font-medium">{mentorData.rating}</span>
                            </div>
                            <span className="text-xs text-gray-500">{mentorData.sessions} sessions</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {filteredMentors.length === 0 && !loading && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">Aucun mentor trouvé</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Détails du mentor sélectionné */}
          <div className="lg:w-2/3">
            {selectedMentor ? (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 animate-fade-in">
                {/* Header du profil */}
                <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
                  <div className="relative mr-6 mb-4 md:mb-0">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-4 ring-white">
                      {selectedMentor.name.charAt(0)}{selectedMentor.name.split(' ')[1]?.charAt(0)}
                    </div>
                    <div className={`absolute -bottom-2 -right-2 px-3 py-1 ${getLevelConfig(selectedMentor.level).bgColor} ${getLevelConfig(selectedMentor.level).textColor} rounded-full text-xs font-bold flex items-center`}>
                      <span className="mr-1">{getLevelConfig(selectedMentor.level).icon}</span>
                      {selectedMentor.level}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      {selectedMentor.name}
                    </h2>
                    <p className="text-gray-600 mb-2">{selectedMentor.email}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-lg">★</span>
                        <span className="ml-1 font-bold">{getMentorData(selectedMentor.id).rating}/5</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                        </svg>
                        <span className="text-sm font-medium">{getMentorData(selectedMentor.id).sessions} sessions</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Biographie */}
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    À propos
                  </h3>
                  <p className="text-gray-700 leading-relaxed bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl">
                    {getMentorData(selectedMentor.id).bio}
                  </p>
                </div>

                {/* Compétences et disponibilité */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-bold mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                      </svg>
                      Compétences
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {getMentorData(selectedMentor.id).tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Disponibilité
                    </h3>
                    <p className="text-gray-700 bg-green-50 px-3 py-2 rounded-xl">
                      {getMentorData(selectedMentor.id).availability}
                    </p>
                  </div>
                </div>

                {/* Message de succès */}
                {bookingSuccess && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 px-6 py-4 rounded-2xl mb-6 animate-fade-in">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <div>
                        <strong className="font-bold">Demande de mentorat envoyée ! 🎉</strong>
                        <p className="text-sm mt-1">Votre demande de mentorat avec {selectedMentor.name} a été créée. Vous recevrez bientôt une réponse.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bouton de demande de mentorat */}
                {!bookingSuccess && (
                  <button
                    onClick={() => setShowBookingForm(!showBookingForm)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    {showBookingForm ? 'Annuler la demande' : 'Demander un mentorat'}
                  </button>
                )}

                {/* Formulaire de demande de mentorat */}
                {showBookingForm && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 animate-fade-in">
                    <h3 className="font-bold text-lg mb-6 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      Demander un mentorat avec {selectedMentor.name}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Sujet du mentorat *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                          placeholder="Ex: Aide sur React, Orientation de carrière..."
                          value={bookingData.subject}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Description (optionnel)
                        </label>
                        <textarea
                          name="description"
                          rows={4}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                          placeholder="Décrivez brièvement ce sur quoi vous aimeriez être accompagné..."
                          value={bookingData.description}
                          onChange={handleInputChange}
                        />
                      </div>
                      <button
                        onClick={handleBookingSubmit}
                        disabled={!bookingData.subject.trim() || loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Envoi en cours...
                          </span>
                        ) : (
                          'Envoyer la demande'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 flex flex-col items-center justify-center h-96">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Sélectionnez un mentor</h3>
                <p className="text-gray-500 text-center">Choisissez un mentor dans la liste pour voir ses détails et créer une relation de mentorat</p>
              </div>
            )}
          </div>
        </div>
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
        
        /* Scrollbar personnalisée */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
        
        /* Accessibilité */
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-bounce-slow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default MentoringPage;