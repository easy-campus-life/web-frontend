import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';

const UserPage = () => {
  const [userData, setUserData] = useState(null); // Utiliser l'utilisateur par défaut dès le début
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fonction pour obtenir les initiales à partir du nom
  const getInitials = (name) => {
    if (!name) return 'XX';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Récupération des données utilisateur depuis l'API
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Vérifier si le token est disponible
        const token = localStorage.getItem('token');
        console.log('Token disponible:', !!token);
        
        // Si pas de token, utiliser l'endpoint /users/1 à la place
        let data;
        if (!token) {
          console.log('Pas de token, utilisation de l\'endpoint /users/1');
          data = await apiService.getUser(1);
        } else {
          console.log('Utilisation de l\'endpoint /auth/me');
          data = await apiService.getCurrentUser();
        }
        
        console.log('Données utilisateur reçues:', data);
        setUserData(data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des données utilisateur:', err);
        setError('Impossible de charger les données utilisateur: ' + (err.message || 'Erreur inconnue'));
        
        // En cas d'erreur, essayer de charger un utilisateur par défaut
        try {
          console.log('Tentative de récupération d\'un utilisateur par défaut');
          const defaultUser = await apiService.getUser(1);
          console.log('Utilisateur par défaut récupéré:', defaultUser);
          setUserData(defaultUser);
          setError(null);
        } catch (fallbackErr) {
          console.error('Échec de la récupération de l\'utilisateur par défaut:', fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  // Affichage de chargement
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse"></div>
          <div className="px-6 py-4 relative">
            <div className="absolute -top-16 left-6 w-32 h-32 bg-gray-300 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
            <div className="ml-40 pb-4">
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/5 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Affichage d'erreur
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-red-700 font-medium hover:underline mt-2 inline-block"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // Si pas de données utilisateur
  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
          <p>Aucune donnée utilisateur disponible.</p>
        </div>
      </div>
    );
  }

  // Formater la date de création
  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Obtenir les initiales du nom
  const initials = getInitials(userData.name);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* En-tête du profil avec image et informations de base */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        {/* Bannière de profil avec dégradé */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        <div className="px-6 py-4 relative">
          {/* Avatar de profil qui chevauche la bannière */}
          <div className="absolute -top-16 left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <span className="text-4xl font-bold text-white">{initials}</span>
          </div>
          
          <div className="ml-40 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-gray-600">Niveau: {userData.level}</p>
                <p className="text-sm text-gray-500 mt-1">Membre depuis {formatDate(userData.created_at)}</p>
              </div>
              
              <button 
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('isAuthenticated');
                  window.location.href = '/login';
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full text-sm transition duration-300 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Déconnexion
              </button>
            </div>
            
            {/* Informations utilisateur */}
            <div className="mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Informations personnelles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Nom</p>
                    <p className="text-gray-700 font-medium">{userData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-700 font-medium">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Niveau</p>
                    <p className="text-gray-700 font-medium">{userData.level}</p>
                  </div>
                  {/* ID utilisateur supprimé */}
                  <div>
                    <p className="text-sm text-gray-500">Date d'inscription</p>
                    <p className="text-gray-700 font-medium">{formatDate(userData.created_at)}</p>
                  </div>
                  {userData.updated_at && (
                    <div>
                      <p className="text-sm text-gray-500">Dernière mise à jour</p>
                      <p className="text-gray-700 font-medium">{formatDate(userData.updated_at)}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
