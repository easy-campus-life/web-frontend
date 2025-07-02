import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Bienvenue sur EasyCampus</h1>
      <p className="text-center text-gray-600 mb-8">La plateforme dédiée aux étudiants en informatique</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/affluence" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Affluence</h2>
          </div>
          <p className="text-gray-600">Consultez l'affluence en temps réel dans les différents espaces du campus.</p>
        </Link>
        
        <Link to="/chat" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Chat Assistant</h2>
          </div>
          <p className="text-gray-600">Posez vos questions à notre assistant virtuel pour obtenir des informations rapidement.</p>
        </Link>
        
        <Link to="/mentoring" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Mentorat Technique</h2>
          </div>
          <p className="text-gray-600">Trouvez de l'aide sur vos projets de programmation ou partagez vos compétences techniques.</p>
        </Link>
        
        <Link to="/social" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Événements Campus</h2>
          </div>
          <p className="text-gray-600">Découvrez les événements à venir et rejoignez la communauté étudiante.</p>
        </Link>
        
        <Link to="/user" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Profil Utilisateur</h2>
          </div>
          <p className="text-gray-600">Gérez votre profil et vos informations personnelles.</p>
        </Link>
      </div>
      
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Actualités du campus</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded mr-2 mt-1">Nouveau</span>
            <div>
              <p className="font-medium">Ouverture de la nouvelle bibliothèque</p>
              <p className="text-sm text-gray-600">La nouvelle bibliothèque du campus ouvre ses portes ce lundi.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded mr-2 mt-1">Info</span>
            <div>
              <p className="font-medium">Modification des horaires du restaurant universitaire</p>
              <p className="text-sm text-gray-600">Le restaurant sera désormais ouvert de 11h30 à 14h30.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
