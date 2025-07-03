import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import FloatingChatBot from '../components/FloatingChatBot';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  
  // Récupérer le rôle de l'utilisateur au chargement
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setUserRole(userData.role);
      } catch (error) {
        console.error('Erreur parsing user data:', error);
      }
    }
  }, []);
  
  // Fonction pour déconnecter l'utilisateur
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Vérifier si l'utilisateur est admin
  const isAdmin = userRole === 'admin' || userRole === 'Admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Effets de fond animés */}
      <div className="fixed inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5"></div>
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-bounce-slow"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Header moderne avec navigation intégrée */}
      <header className="relative z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo + Navigation section */}
            <div className="flex items-center space-x-8">
                          {/* Logo section moderne - maintenant un lien */}
            <Link to="/" className="flex items-center space-x-4 group/logo-link">
                <div className="relative group">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-blue-500/25 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover/logo-link:scale-110 group-hover/logo-link:rotate-3">
                    🎓
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 group-hover:scale-125 group-hover/logo-link:opacity-30 group-hover/logo-link:scale-125 transition-all duration-500 blur-lg -z-10"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent group-hover/logo-link:scale-105 transition-transform duration-300">
                    EasyCampus
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">
                    {isAdmin ? 'Interface Étudiante' : 'Espace Étudiants'}
                  </p>
                </div>
              </Link>

              {/* Navigation intégrée - sans Accueil */}
              <nav className="hidden lg:flex items-center space-x-1">
                {/* Affluence */}
                <Link 
                  to="/affluence"
                  className={`group relative py-2 px-4 font-medium transition-all duration-300 flex items-center space-x-2 rounded-xl ${
                    location.pathname.startsWith('/affluence')
                      ? 'text-blue-600 bg-blue-50 shadow-md' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                  style={{ animationDelay: '0ms' }}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">📊</span>
                  <span className="text-sm">Affluence</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl"></div>
                </Link>

                {/* Événements */}
                <Link 
                  to="/social"
                  className={`group relative py-2 px-4 font-medium transition-all duration-300 flex items-center space-x-2 rounded-xl ${
                    location.pathname.startsWith('/social')
                      ? 'text-blue-600 bg-blue-50 shadow-md' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                  style={{ animationDelay: '100ms' }}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">🎉</span>
                  <span className="text-sm">Événements</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl"></div>
                </Link>

                {/* Mentorat */}
                <Link 
                  to="/mentoring"
                  className={`group relative py-2 px-4 font-medium transition-all duration-300 flex items-center space-x-2 rounded-xl ${
                    location.pathname.startsWith('/mentoring')
                      ? 'text-blue-600 bg-blue-50 shadow-md' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                  style={{ animationDelay: '200ms' }}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">🎓</span>
                  <span className="text-sm">Mentorat</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl"></div>
                </Link>

                {/* Chat */}
                <Link 
                  to="/chat"
                  className={`group relative py-2 px-4 font-medium transition-all duration-300 flex items-center space-x-2 rounded-xl ${
                    location.pathname.startsWith('/chat')
                      ? 'text-blue-600 bg-blue-50 shadow-md' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                  style={{ animationDelay: '300ms' }}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">💭</span>
                  <span className="text-sm">Chat</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl"></div>
                </Link>
              </nav>
            </div>

            {/* Actions section moderne */}
            <div className="flex items-center space-x-4">
              {/* Bouton Admin - visible seulement pour les admins */}
              {isAdmin && (
                <Link 
                  to="/admin"
                  className="group relative bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  title="Dashboard Admin"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Admin</span>
                </Link>
              )}

              {/* Bouton Déconnexion */}
              <button 
                onClick={handleLogout}
                className="group relative bg-gradient-to-r from-gray-500 to-gray-600 hover:from-red-500 hover:to-red-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                title="Se déconnecter"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation mobile */}
      <nav className="lg:hidden relative z-40 bg-white/60 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {/* Accueil */}
            <Link 
              to="/"
              className={`group relative py-4 px-6 font-medium transition-all duration-300 flex items-center space-x-2 rounded-t-2xl ${
                location.pathname === '/'
                  ? 'text-blue-600 bg-gradient-to-t from-blue-50 to-transparent border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
              }`}
              style={{ animationDelay: '0ms' }}
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">🏠</span>
              <span className="hidden sm:block">Accueil</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-t-2xl"></div>
            </Link>

            {/* Affluence */}
            <Link 
              to="/affluence"
              className={`group relative py-4 px-6 font-medium transition-all duration-300 flex items-center space-x-2 rounded-t-2xl ${
                location.pathname.startsWith('/affluence')
                  ? 'text-blue-600 bg-gradient-to-t from-blue-50 to-transparent border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
              }`}
              style={{ animationDelay: '100ms' }}
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">📊</span>
              <span className="hidden sm:block">Affluence</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-t-2xl"></div>
            </Link>

            {/* Événements */}
            <Link 
              to="/social"
              className={`group relative py-4 px-6 font-medium transition-all duration-300 flex items-center space-x-2 rounded-t-2xl ${
                location.pathname.startsWith('/social')
                  ? 'text-blue-600 bg-gradient-to-t from-blue-50 to-transparent border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
              }`}
              style={{ animationDelay: '200ms' }}
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">🎉</span>
              <span className="hidden sm:block">Événements</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-t-2xl"></div>
            </Link>

            {/* Mentorat */}
            <Link 
              to="/mentoring"
              className={`group relative py-4 px-6 font-medium transition-all duration-300 flex items-center space-x-2 rounded-t-2xl ${
                location.pathname.startsWith('/mentoring')
                  ? 'text-blue-600 bg-gradient-to-t from-blue-50 to-transparent border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
              }`}
              style={{ animationDelay: '300ms' }}
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">🎓</span>
              <span className="hidden sm:block">Mentorat</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-t-2xl"></div>
            </Link>

            {/* Chat */}
            <Link 
              to="/chat"
              className={`group relative py-4 px-6 font-medium transition-all duration-300 flex items-center space-x-2 rounded-t-2xl ${
                location.pathname.startsWith('/chat')
                  ? 'text-blue-600 bg-gradient-to-t from-blue-50 to-transparent border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
              }`}
              style={{ animationDelay: '400ms' }}
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">💭</span>
              <span className="hidden sm:block">Chat</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-t-2xl"></div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content avec glassmorphism */}
      <main className="relative z-10 flex-grow pb-6">
        <div className="container mx-auto px-6 py-8">
          <div className="min-h-[calc(100vh-200px)]">
            <Outlet />
          </div>
        </div>
      </main>
      
      {/* Chat Assistant flottant modernisé */}
      <FloatingChatBot />

      {/* Styles CSS intégrés */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
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

export default MainLayout;