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
import ForumPage from './features/forum/ForumPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifier l'authentification au chargement de l'application
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Route de connexion accessible à tous */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Routes protégées nécessitant une authentification */}
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<HomePage />} />
          <Route path="affluence" element={<AffluencePage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="social" element={<SocialPage />} />
          <Route path="mentoring" element={<MentoringPage />} />
          <Route path="forum" element={<ForumPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
