import React, { useState } from 'react';

const ModernAdminSidebar = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    {
      id: 'dashboard',
      name: 'Tableau de bord',
      icon: '📊',
      gradient: 'from-blue-500 to-cyan-500',
      shadowColor: 'shadow-blue-500/25',
      description: 'Vue d\'ensemble'
    },
    {
      id: 'users',
      name: 'Utilisateurs',
      icon: '👥',
      gradient: 'from-purple-500 to-pink-500',
      shadowColor: 'shadow-purple-500/25',
      description: 'Gestion des comptes'
    },
    {
      id: 'events',
      name: 'Événements',
      icon: '🎉',
      gradient: 'from-green-500 to-emerald-500',
      shadowColor: 'shadow-green-500/25',
      description: 'Organisation campus'
    },
    {
      id: 'mentors',
      name: 'Mentors',
      icon: '🎓',
      gradient: 'from-orange-500 to-red-500',
      shadowColor: 'shadow-orange-500/25',
      description: 'Programme mentorat'
    },
    {
      id: 'presences',
      name: 'Présences',
      icon: '🏢',
      gradient: 'from-indigo-500 to-purple-600',
      shadowColor: 'shadow-indigo-500/25',
      description: 'Suivi des présences'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: '📈',
      gradient: 'from-teal-500 to-cyan-600',
      shadowColor: 'shadow-teal-500/25',
      description: 'Données & insights'
    },
    {
      id: 'settings',
      name: 'Paramètres',
      icon: '⚙️',
      gradient: 'from-gray-600 to-gray-800',
      shadowColor: 'shadow-gray-500/25',
      description: 'Configuration'
    }
  ];

  return (
    <div className={`bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white transition-all duration-500 ease-in-out ${isCollapsed ? 'w-20' : 'w-80'} min-h-screen relative overflow-hidden group`}>
      {/* Effets de fond animés avancés */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-pink-400/5"></div>
      
      {/* Particules flottantes */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400/30 rounded-full animate-ping"></div>
      <div className="absolute top-32 right-8 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 left-6 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-bounce"></div>
      
      {/* Bordure lumineuse supérieure améliorée */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-600 to-pink-500 animate-gradient-x"></div>
      
      <div className="relative z-10 p-6">
        {/* Logo et toggle améliorés */}
        <div className="flex items-center justify-between mb-10">
          <div className={`flex items-center transition-all duration-500 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="relative group/logo">
              <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-3xl shadow-2xl shadow-blue-500/30 transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:rotate-3">
                🎓
              </div>
              {/* Effet de halo */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover/logo:opacity-30 group-hover/logo:scale-125 transition-all duration-500 blur-lg -z-10"></div>
            </div>
            {!isCollapsed && (
              <div className="ml-4 transition-all duration-500 opacity-100">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  EasyCampus
                </h1>
                <p className="text-xs text-slate-400 font-medium tracking-wider">ADMINISTRATION</p>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-500 backdrop-blur-sm group/toggle border border-white/10 hover:border-white/30"
          >
            <svg className={`w-5 h-5 transition-all duration-500 group-hover/toggle:scale-110 ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Navigation améliorée */}
        <nav className="space-y-4">
          {menuItems.map((item, index) => (
            <div key={item.id} className="relative">
              <button
                onClick={() => setActiveTab(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`group/item w-full flex items-center transition-all duration-500 hover:scale-105 transform ${
                  activeTab === item.id
                    ? `bg-gradient-to-r ${item.gradient} shadow-xl ${item.shadowColor} border border-white/20`
                    : 'hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20'
                } ${isCollapsed ? 'px-4 py-5 justify-center' : 'px-5 py-4'} rounded-2xl relative overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Effet de brillance amélioré */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover/item:translate-x-full transition-transform duration-1000"></div>
                
                {/* Icône avec effet 3D */}
                <div className={`relative transition-all duration-500 ${isCollapsed ? '' : 'mr-4'} group-hover/item:scale-110`}>
                  <div className="text-3xl filter drop-shadow-lg">
                    {item.icon}
                  </div>
                  {activeTab === item.id && (
                    <div className="absolute inset-0 bg-white/20 rounded-lg blur-md animate-pulse"></div>
                  )}
                </div>
                
                {!isCollapsed && (
                  <div className="flex-1 text-left">
                    <span className="font-semibold text-white group-hover/item:text-white transition-colors duration-300 text-lg">
                      {item.name}
                    </span>
                    <p className="text-xs text-slate-300 mt-1 opacity-75 group-hover/item:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </p>
                  </div>
                )}
                
                {activeTab === item.id && (
                  <div className="absolute right-4 flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
                  </div>
                )}
                
                {/* Tooltip pour mode collapsed */}
                {isCollapsed && hoveredItem === item.id && (
                  <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-xl text-white px-4 py-2 rounded-xl shadow-2xl border border-white/10 z-50 whitespace-nowrap">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-300">{item.description}</div>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45 border-l border-b border-white/10"></div>
                  </div>
                )}
              </button>
            </div>
          ))}
        </nav>

        {/* Statistiques rapides (nouveau) */}
        {!isCollapsed && (
          <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Statut Système
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Uptime</span>
                <span className="text-green-400 font-medium">99.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Utilisateurs actifs</span>
                <span className="text-cyan-400 font-medium">234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Présences aujourd'hui</span>
                <span className="text-indigo-400 font-medium">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Événements ce mois</span>
                <span className="text-purple-400 font-medium">12</span>
              </div>
            </div>
          </div>
        )}

        {/* Profile section améliorée */}
        <div className={`absolute bottom-6 left-6 right-6 transition-all duration-500 ${isCollapsed ? 'left-4 right-4' : ''}`}>
          <div className="border-t border-white/20 pt-6">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''} group/profile cursor-pointer hover:bg-white/5 p-3 rounded-xl transition-all duration-300`}>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover/profile:scale-110 transition-transform duration-300">
                  <span className="text-sm font-bold">AD</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
              </div>
              {!isCollapsed && (
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <p className="text-xs text-slate-400">Administrateur • En ligne</p>
                </div>
              )}
              {!isCollapsed && (
                <div className="opacity-0 group-hover/profile:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </div>
              )}
            </div>
            
            {!isCollapsed && (
              <div className="mt-4 space-y-2">
                <button className="w-full text-left text-sm text-slate-400 hover:text-white transition-colors duration-300 flex items-center p-2 rounded-lg hover:bg-white/5">
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Mon Profil
                </button>
                <button className="w-full text-left text-sm text-slate-400 hover:text-red-400 transition-colors duration-300 flex items-center p-2 rounded-lg hover:bg-red-500/10">
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Styles CSS intégrés */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-x {
          background-size: 400% 400%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default ModernAdminSidebar;