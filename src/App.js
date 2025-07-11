import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './features/home/HomePage';
import AffluencePage from './features/affluence/AffluencePage';
import ChatPage from './features/chat/ChatPage';
import SocialPage from './features/social/SocialPage';
import EventDetailPage from './features/social/EventDetailPage';
import UserPage from './features/user/UserPage';
import LoginPage from './features/auth/LoginPage';
import ProtectedRoute from './features/auth/ProtectedRoute';
import MentoringPage from './features/mentoring/MentoringPage';
import MentoringDetailPage from './features/mentoring/MentoringDetailPage';
import ModernMainAdminDashboard from './admin/ModernMainAdminDashboard';
// Forum page supprimée

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Route d'authentification accessible à tous */}
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
            <Route path="social/event/:eventId" element={<EventDetailPage />} />
            <Route path="mentoring" element={<MentoringPage />} />
            <Route path="mentoring/session/:mentoringId" element={<MentoringDetailPage />} />
            {/* Route forum supprimée */}
            <Route path="user" element={<UserPage />} />
            <Route path="admin" element={<ModernMainAdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
