import React, { useState } from 'react';

import ModernSidebar from './ModernAdminSidebar';
import ModernDashboardOverview from './ModernDashboardOverview';
import ModernUsersManagement from './ModernUsersManagement';
import ModernEventsManagement from './ModernEventsManagement';
import ModernMentorsManagement from './ModernMentorsManagement';
import ModernPresencesManagement from './ModernPresencesManagement';

const ModernMainAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getPageTitle = (activeTab) => {
    const titles = {
      dashboard: 'Tableau de Bord',
      users: 'Gestion des Utilisateurs', 
      events: 'Gestion des Événements',
      mentors: 'Gestion des Mentors',
      presences: 'Gestion des Présences',
      analytics: 'Analytics',
      settings: 'Paramètres'
    };
    return titles[activeTab] || 'Dashboard';
  };

  const getPageDescription = (activeTab) => {
    const descriptions = {
      dashboard: 'Vue d\'ensemble de votre plateforme EasyCampus',
      users: 'Gérez les utilisateurs, leurs rôles et permissions',
      events: 'Créez et gérez les événements du campus',
      mentors: 'Organisez le programme de mentorat et suivez les sessions',
      presences: 'Suivi des présences et occupation des salles en temps réel',
      analytics: 'Analysez les performances et l\'engagement',
      settings: 'Configurez les paramètres de la plateforme'
    };
    return descriptions[activeTab] || '';
  };

  const PlaceholderPage = ({ title, icon, description, gradient }) => (
    <div className="flex items-center justify-center min-h-[600px]">
      <div className="text-center p-12 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-500">
        <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-r ${gradient} rounded-3xl flex items-center justify-center text-4xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500`}>
          {icon}
        </div>
        <h2 className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-4`}>
          {title}
        </h2>
        <p className="text-gray-600 text-lg mb-6">{description}</p>
        <div className="p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl border border-purple-100">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
              🚀
            </div>
            <p className="text-sm text-gray-700 font-semibold">
              Interface en cours de développement pour le hackathon
            </p>
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <p>✨ Design moderne et intuitif</p>
            <p>🎯 Optimisé pour l'expérience utilisateur</p>
            <p>⚡ Performance et accessibilité</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ModernDashboardOverview />;
      case 'users':
        return <ModernUsersManagement />;
      case 'events':
        return <ModernEventsManagement />;
      case 'mentors':
        return <ModernMentorsManagement />;
      case 'presences':
        return <ModernPresencesManagement />;
      case 'analytics':
        return <PlaceholderPage 
          title="Analytics Avancées" 
          icon="📈" 
          description="Analysez les performances avec des graphiques interactifs et des insights détaillés"
          gradient="from-teal-500 to-cyan-600"
        />;
      case 'settings':
        return <PlaceholderPage 
          title="Paramètres" 
          icon="⚙️" 
          description="Configurez votre plateforme avec des options avancées de personnalisation"
          gradient="from-gray-600 to-gray-800"
        />;
      default:
        return <ModernDashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Effets de fond animés */}
      <div className="fixed inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10"></div>
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-bounce-slow"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      
      {/* Sidebar */}
      <ModernSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Header moderne */}
        <header className="bg-white/30 backdrop-blur-xl border-b border-white/20 shadow-lg">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-8 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-full animate-pulse"></div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      {getPageTitle(activeTab)}
                    </h1>
                    <p className="text-gray-600">{getPageDescription(activeTab)}</p>
                  </div>
                </div>
              </div>
              
              {/* Actions du header */}
              <div className="flex items-center space-x-4">
                {/* Notification */}
                <button className="relative p-3 bg-white/60 backdrop-blur-xl rounded-xl hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl group">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5-5-5h5v-12" />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </button>
                
                {/* Recherche rapide */}
                <button className="p-3 bg-white/60 backdrop-blur-xl rounded-xl hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl group">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                
                {/* Mode sombre */}
                <button className="p-3 bg-white/60 backdrop-blur-xl rounded-xl hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl group">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-yellow-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                  </svg>
                </button>
                
                {/* Profile dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-xl rounded-xl hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">AD</span>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-800">Admin User</p>
                      <p className="text-xs text-gray-500">Administrateur</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                {/* Dropdown menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="p-2">
                      <a href="/dashboard" className="flex items-center px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 rounded-xl transition-colors font-medium">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour au site
                      </a>
                      <hr className="my-2 border-gray-200" />
                      <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 rounded-xl transition-colors">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Mon Profil
                      </button>
                      <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 rounded-xl transition-colors">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Paramètres
                      </button>
                      <hr className="my-2 border-gray-200" />
                      <button 
                        onClick={() => {
                          localStorage.removeItem('isAuthenticated');
                          localStorage.removeItem('user');
                          localStorage.removeItem('token');
                          window.location.href = '/login';
                        }}
                        className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Déconnexion
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </main>

        {/* Footer moderne */}
        <footer className="bg-white/20 backdrop-blur-xl border-t border-white/20 px-8 py-4">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>© 2025 EasyCampus</span>
              <span className="text-gray-400">|</span>
              <span>Version 1.0.0</span>
              <span className="text-gray-400">|</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span>Système opérationnel</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>Hackathon 2025</span>
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🚀</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Styles CSS personnalisés pour les animations
if (typeof document !== 'undefined') {
  const styles = `
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes gradient-x {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .animate-fade-in {
      animation: fade-in 0.6s ease-out;
    }
    
    .animate-bounce-slow {
      animation: bounce-slow 3s ease-in-out infinite;
    }
    
    .animate-gradient-x {
      animation: gradient-x 15s ease infinite;
      background-size: 200% 200%;
    }
    
    .animate-spin-slow {
      animation: spin-slow 3s linear infinite;
    }
    
    .hover\\:scale-102:hover {
      transform: scale(1.02);
    }
    
    .line-clamp-1 {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    
    .line-clamp-2 {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    .line-clamp-3 {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  `;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default ModernMainAdminDashboard;