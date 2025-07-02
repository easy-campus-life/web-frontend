import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();
  
  // Fonction pour déterminer si un lien est actif
  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header avec logo */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🎓</span>
            <h1 className="text-xl font-bold">EasyCampus</h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm mr-4">Espace Étudiants</span>
            <Link to="/user" className="p-2 hover:bg-blue-600 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation principale (en haut) */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex w-1/3 overflow-x-auto space-x-1">
            <Link 
              to="/" 
              className={`py-3 px-2 font-medium hover:bg-blue-50 border-b-2 ${location.pathname === '/' ? 'border-blue-600 text-blue-600' : 'border-transparent'} flex items-center`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            </Link>
            <Link 
              to="/affluence" 
              className={`py-3 px-2 text-sm font-medium hover:bg-blue-50 border-b-2 ${location.pathname === '/affluence' ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
            >
              Affluence
            </Link>
            <Link 
              to="/chat" 
              className={`py-3 px-2 text-sm font-medium hover:bg-blue-50 border-b-2 ${location.pathname === '/chat' ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
            >
              Chat
            </Link>
            <Link 
              to="/social" 
              className={`py-3 px-2 text-sm font-medium hover:bg-blue-50 border-b-2 ${location.pathname === '/social' ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
            >
              Événements
            </Link>
            <Link 
              to="/mentoring" 
              className={`py-3 px-2 text-sm font-medium hover:bg-blue-50 border-b-2 ${location.pathname === '/mentoring' ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
            >
              Mentorat
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pb-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
