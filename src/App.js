import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './features/home/HomePage';
import AffluencePage from './features/affluence/AffluencePage';
import ChatPage from './features/chat/ChatPage';
import SocialPage from './features/social/SocialPage';
import UserPage from './features/user/UserPage';
import LoginPage from './features/auth/LoginPage';
import ProtectedRoute from './features/auth/ProtectedRoute';
import MentoringPage from './features/mentoring/MentoringPage';

// Admin Dashboard
import ModernMainAdminDashboard from './admin/ModernMainAdminDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier l'authentification au chargement de l'application
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const user = localStorage.getItem('user');
    
    setIsAuthenticated(authStatus);
    
    if (user) {
      try {
        const userData = JSON.parse(user);
        setUserRole(userData.role);
      } catch (error) {
        console.error('Erreur parsing user data:', error);
        // Nettoyer le localStorage si les données sont corrompues
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserRole(null);
      }
    }
    
    setLoading(false);
  }, []);

  // Composant pour protéger les routes admin
  const AdminRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    if (userRole !== 'admin' && userRole !== 'Admin') {
      // Rediriger vers le dashboard utilisateur si connecté mais pas admin
      return <Navigate to="/dashboard" replace />;
    }
    
    return children;
  };

  // Composant de chargement
  const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-600 animate-pulse">Chargement...</p>
      </div>
    </div>
  );

  // Affichage de chargement pendant la vérification d'auth
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Route par défaut - redirection vers dashboard */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* Route de connexion */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage />
            )
          } 
        />
        
        {/* Routes admin protégées */}
        <Route 
          path="/admin/*" 
          element={
            <AdminRoute>
              <ModernMainAdminDashboard />
            </AdminRoute>
          } 
        />
        
        {/* Routes utilisateur protégées */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="affluence" element={<AffluencePage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="social" element={<SocialPage />} />
          <Route path="mentoring" element={<MentoringPage />} />
          <Route path="user" element={<UserPage />} />
        </Route>

        {/* Route 404 - redirection vers dashboard */}
        <Route 
          path="*" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;