import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';

const AffluencePage = () => {
  const [refreshTime, setRefreshTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [error, setError] = useState(null);
  const [selectedView, setSelectedView] = useState('grid'); // 'grid' or 'list'

  // Chargement des données des salles de classe depuis l'API
  const fetchClassrooms = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getClassrooms();
      
      // Pour chaque salle, récupérer son taux d'occupation
      const classroomsWithOccupancy = await Promise.all(data.map(async (classroom) => {
        try {
          const occupancyData = await apiService.getClassroomOccupancy(classroom.id);
          return {
            ...classroom,
            occupation: occupancyData.occupancy_percentage,
            status: occupancyData.occupancy_percentage > 70 ? 'high' : 
                   occupancyData.occupancy_percentage > 40 ? 'medium' : 'low',
            availableSeats: occupancyData.available_seats,
            totalSeats: occupancyData.total_seats || occupancyData.available_seats + Math.round((occupancyData.occupancy_percentage / 100) * occupancyData.available_seats)
          };
        } catch (err) {
          console.error(`Erreur lors de la récupération de l'occupation pour la salle ${classroom.id}:`, err);
          return {
            ...classroom,
            occupation: 0,
            status: 'unknown',
            availableSeats: 0,
            totalSeats: 0
          };
        }
      }));
      
      setClassrooms(classroomsWithOccupancy);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des salles de classe:', err);
      setError('Impossible de charger les données des salles. Utilisation des données simulées.');
    } finally {
      setRefreshTime(new Date());
      setIsLoading(false);
    }
  };

  // Mise à jour des données toutes les minutes
  useEffect(() => {
    fetchClassrooms(); // Chargement initial
    
    const interval = setInterval(() => {
      fetchClassrooms();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Données simulées d'affluence (à utiliser en cas d'erreur API)
  const mockLocations = [
    {
      id: 1,
      name: 'Bibliothèque',
      occupation: 75,
      status: 'high',
      availableSeats: 12,
      totalSeats: 48,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      hours: '8h - 20h',
      details: 'Niveau sonore modéré, prises électriques disponibles',
      type: 'Étude'
    },
    {
      id: 2,
      name: 'Cafétéria',
      occupation: 45,
      status: 'medium',
      availableSeats: 35,
      totalSeats: 80,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      hours: '7h30 - 18h',
      details: 'Service de restauration jusqu\'à 14h30',
      type: 'Restauration'
    },
    {
      id: 3,
      name: 'Salle d\'étude',
      occupation: 30,
      status: 'low',
      availableSeats: 28,
      totalSeats: 40,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      hours: '8h - 22h',
      details: 'Silence requis, réservation possible',
      type: 'Étude'
    },
    {
      id: 4,
      name: 'Lab Informatique',
      occupation: 60,
      status: 'medium',
      availableSeats: 15,
      totalSeats: 40,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      hours: '9h - 19h',
      details: 'Postes équipés de logiciels spécialisés',
      type: 'Informatique'
    }
  ];

  // Fonction pour déterminer la couleur en fonction du statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Fonction pour déterminer la couleur du gradient en fonction du statut
  const getStatusGradient = (status) => {
    switch (status) {
      case 'low':
        return 'from-green-400 to-emerald-500';
      case 'medium':
        return 'from-yellow-400 to-orange-500';
      case 'high':
        return 'from-red-400 to-pink-500';
      default:
        return 'from-slate-400 to-slate-500';
    }
  };

  // Fonction pour obtenir l'icône de statut
  const getStatusIcon = (status) => {
    switch (status) {
      case 'low':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'medium':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'high':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const locations = error ? mockLocations : (classrooms.length > 0 ? classrooms : mockLocations);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Affluence Campus</h1>
              <p className="text-slate-600 mt-1">Surveillez l'occupation des espaces en temps réel</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Statistiques d'affluence</h2>
              <p className="text-slate-600">Dernière mise à jour : {refreshTime.toLocaleTimeString('fr-FR')}</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => setSelectedView('grid')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedView === 'grid'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedView('list')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedView === 'list'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
              
              {/* Refresh Button */}
              <button 
                onClick={() => fetchClassrooms()}
                disabled={isLoading}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-all duration-300 ${
                  isLoading 
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {isLoading ? (
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                {isLoading ? 'Actualisation...' : 'Actualiser'}
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm text-slate-600">Faible affluence</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-sm text-slate-600">Affluence modérée</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-sm text-slate-600">Forte affluence</span>
            </div>
          </div>
        </div>

        {/* Rooms Grid/List */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden animate-pulse">
                <div className="h-48 bg-slate-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={selectedView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {locations.map(location => (
              <div key={location.id} className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                {/* Header with gradient bar */}
                <div className={`h-1 bg-gradient-to-r ${getStatusGradient(location.status)}`}></div>
                
                <div className="p-6">
                  {/* Room Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${getStatusColor(location.status)} rounded-xl flex items-center justify-center border`}>
                        {location.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">{location.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-slate-500">{location.type}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-sm text-slate-500">{location.hours}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(location.status)}`}>
                      {getStatusIcon(location.status)}
                      <span>
                        {location.status === 'low' ? 'Disponible' : 
                         location.status === 'medium' ? 'Modéré' : 'Occupé'}
                      </span>
                    </div>
                  </div>

                  {/* Occupancy Visualization */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-slate-700">Taux d'occupation</span>
                      <span className={`text-lg font-bold ${
                        location.status === 'high' ? 'text-red-600' : 
                        location.status === 'medium' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {location.occupation}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-3 mb-3">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r ${getStatusGradient(location.status)} transition-all duration-500`} 
                        style={{ width: `${location.occupation}%` }}
                      ></div>
                    </div>
                    
                    {/* Seats Info */}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">
                        {location.availableSeats} places disponibles
                      </span>
                      <span className="text-slate-500">
                        {location.totalSeats - location.availableSeats} occupées
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600">{location.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Réserver un espace</h2>
                <p className="text-sm text-slate-600">Réservez une salle d'étude à l'avance</p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">Planifiez votre temps d'étude en réservant un espace de travail selon vos besoins</p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02]">
              Voir les disponibilités
            </button>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Signaler un problème</h2>
                <p className="text-sm text-slate-600">Propreté, équipement défectueux...</p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">Aidez-nous à maintenir la qualité des espaces en signalant les problèmes rencontrés</p>
            <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02]">
              Faire un signalement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffluencePage;
