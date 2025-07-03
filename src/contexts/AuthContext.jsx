import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/apiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('AuthContext: Initialisation...');
    // Vérifier si un token existe au chargement
    const token = localStorage.getItem('token');
    console.log('AuthContext: Token trouvé:', !!token);
    
    if (token) {
      setIsAuthenticated(true);
      // Essayer de récupérer l'email depuis le localStorage ou une autre source
      const savedUser = localStorage.getItem('user');
      console.log('AuthContext: User sauvegardé trouvé:', savedUser);
      
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          console.log('AuthContext: User restauré depuis localStorage:', userData);
        } catch (error) {
          console.error('AuthContext: Erreur lors de la restauration de l\'utilisateur:', error);
        }
      } else {
        console.log('AuthContext: Aucun user sauvegardé trouvé');
      }
    } else {
      console.log('AuthContext: Aucun token trouvé');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await apiService.login({ email, password });
      
      if (response.access_token) {
        const userData = { email };
        setIsAuthenticated(true);
        setUser(userData);
        // Sauvegarder l'utilisateur dans localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('User connecté et sauvegardé:', userData);
        return { success: true };
      } else {
        throw new Error('Token non reçu');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return { 
        success: false, 
        error: error.message || 'Erreur de connexion' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const fetchUserInfo = async () => {
    try {
      const userInfo = await apiService.getCurrentUser();
      setUser(userInfo);
    } catch (error) {
      console.error('Erreur lors de la récupération des informations utilisateur:', error);
      // Si l'API échoue, on peut déconnecter l'utilisateur
      logout();
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    fetchUserInfo
  };

  // Debug: Log quand l'utilisateur change
  useEffect(() => {
    console.log('AuthContext: État mis à jour - user:', user, 'isAuthenticated:', isAuthenticated, 'loading:', loading);
  }, [user, isAuthenticated, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 