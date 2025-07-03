import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';

const AffluencePage = () => {
  const [refreshTime, setRefreshTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [error, setError] = useState(null);

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
            occupation: `${occupancyData.occupancy_percentage}%`,
            status: occupancyData.occupancy_percentage > 70 ? 'high' : 
                   occupancyData.occupancy_percentage > 40 ? 'medium' : 'low',
            places: `${occupancyData.available_places} places disponibles`
          };
        } catch (err) {
          console.error(`Erreur lors de la récupération de l'occupation pour la salle ${classroom.id}:`, err);
          return {
            ...classroom,
            occupation: 'N/A',
            status: 'unknown',
            places: 'Information non disponible'
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
      occupation: '75%',
      status: 'high',
      places: '12 places disponibles',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      hours: '8h - 20h',
      details: 'Niveau sonore modéré, prises électriques disponibles'
    },
    {
      id: 2,
      name: 'Cafétéria',
      occupation: '45%',
      status: 'medium',
      places: '35 places disponibles',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      hours: '7h30 - 18h',
      details: 'Service de restauration jusqu\'à 14h30'
    },
    {
      id: 3,
      name: 'Salle d\'étude',
      occupation: '30%',
      status: 'low',
      places: '28 places disponibles',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      hours: '8h - 22h',
      details: 'Silence requis, réservation possible'
    },
    {
      id: 4,
      name: 'Lab Informatique',
      occupation: '60%',
      status: 'medium',
      places: '15 places disponibles',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      hours: '9h - 19h',
      details: 'Postes équipés de logiciels spécialisés'
    }
  ];

  // Fonction pour déterminer la couleur en fonction du statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Fonction pour déterminer la couleur du gradient en fonction du statut
  const getStatusGradient = (status) => {
    switch (status) {
      case 'low':
        return 'from-green-400 to-green-600';
      case 'medium':
        return 'from-yellow-400 to-yellow-600';
      case 'high':
        return 'from-red-400 to-red-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h1 className="text-3xl font-bold">Affluence Campus</h1>
        </div>
        <button 
          onClick={() => fetchClassrooms()}
          className="flex items-center bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
          Actualiser
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Statistiques d'affluence en temps réel</h2>
          <p className="text-sm text-gray-500">Dernière mise à jour : {refreshTime.toLocaleTimeString()}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(error ? mockLocations : (classrooms.length > 0 ? classrooms : mockLocations)).map(location => (
            <div key={location.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className={`h-2 bg-gradient-to-r ${getStatusGradient(location.status)}`}></div>
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(location.status)} mr-3`}>
                    {location.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{location.name}</h3>
                    <p className="text-sm text-gray-500">{location.hours}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Occupation</span>
                  <span className={`text-sm font-bold ${location.status === 'high' ? 'text-red-600' : location.status === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                    {location.occupation}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                  <div 
                    className={`h-2.5 rounded-full bg-gradient-to-r ${getStatusGradient(location.status)}`} 
                    style={{ width: location.occupation }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{location.places}</span>
                  <span className="text-gray-500">{location.details}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* La section d'évolution de l'affluence a été supprimée */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Réserver un espace</h2>
          <p className="text-gray-600 mb-4">Réservez une salle d'étude ou un espace de travail à l'avance</p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all">
            Voir les disponibilités
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Signaler un problème</h2>
          <p className="text-gray-600 mb-4">Signalez un problème dans un espace (propreté, équipement défectueux...)</p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all">
            Faire un signalement
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffluencePage;
