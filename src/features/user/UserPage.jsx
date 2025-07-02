import React, { useState } from 'react';

const UserPage = () => {
  // Données simulées pour le profil utilisateur
  const [userData, setUserData] = useState({
    name: "Jean Dupont",
    initials: "JD",
    program: "Bachelor Développement Web & Full Stack",
    level: "Bachelor (Bac+3)",
    specialty: "Développement Web & Full Stack",
    campus: "ÉSTIAM Paris",
    bio: "Passionné de développement web et d'UX/UI design. Je cherche à créer des expériences numériques qui ont un impact positif.",
    joinDate: "Septembre 2023",
    profileImage: null, // Pas d'image pour l'instant, on utilise les initiales
    badges: [
      { id: 1, name: "Mentor", icon: "👨‍🏫", color: "bg-blue-100 text-blue-800", description: "A aidé plus de 5 étudiants" },
      { id: 2, name: "Contributeur", icon: "🌟", color: "bg-yellow-100 text-yellow-800", description: "A publié plus de 10 discussions" },
      { id: 3, name: "Expert React", icon: "⚛️", color: "bg-cyan-100 text-cyan-800", description: "Compétence validée par les professeurs" },
      { id: 4, name: "Hackathon", icon: "🏆", color: "bg-purple-100 text-purple-800", description: "A participé au hackathon 2024" },
    ],
    skills: [
      { id: 1, name: "React", level: 90 },
      { id: 2, name: "JavaScript", level: 85 },
      { id: 3, name: "Node.js", level: 75 },
      { id: 4, name: "UI/UX Design", level: 70 },
      { id: 5, name: "Python", level: 60 },
      { id: 6, name: "MongoDB", level: 65 },
    ],
    interests: [
      "Développement Web", "Intelligence Artificielle", "UX/UI Design", "Cybersécurité", "Open Source"
    ],
    stats: {
      forumPosts: 24,
      events: 7,
      mentoringSessions: 5,
      projectsCompleted: 12
    }
  });
  
  // État pour gérer les onglets actifs - compétences comme onglet par défaut
  const [activeTab, setActiveTab] = useState('skills');
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* En-tête du profil avec image et informations de base */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        {/* Bannière de profil avec dégradé */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        <div className="px-6 py-4 relative">
          {/* Avatar de profil qui chevauche la bannière */}
          <div className="absolute -top-16 left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <span className="text-4xl font-bold text-white">{userData.initials}</span>
          </div>
          
          <div className="ml-40 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-gray-600">{userData.program}</p>
                <p className="text-sm text-gray-500 mt-1">Membre depuis {userData.joinDate}</p>
              </div>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full text-sm transition duration-300 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
                Modifier le profil
              </button>
            </div>
            
            <p className="text-gray-700 mt-3">{userData.bio}</p>
            
            {/* Badges de l'utilisateur */}
            <div className="flex flex-wrap gap-2 mt-4">
              {userData.badges.map(badge => (
                <span 
                  key={badge.id} 
                  className={`${badge.color} text-xs font-medium px-2.5 py-1 rounded-full flex items-center`}
                  title={badge.description}
                >
                  <span className="mr-1">{badge.icon}</span>
                  {badge.name}
                </span>
              ))}
            </div>
            
            {/* Onglets de navigation */}
            <div className="border-b border-gray-200 mt-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('skills')}
                  className={`${activeTab === 'skills' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  Compétences
                </button>
                <button
                  onClick={() => setActiveTab('interests')}
                  className={`${activeTab === 'interests' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  Centres d'intérêt
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`${activeTab === 'projects' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                  Projets
                </button>
              </nav>
            </div>
            
            {/* Contenu des onglets */}
            <div className="py-4">
              {/* Onglet Compétences */}
              {activeTab === 'skills' && (
                <div className="space-y-3">
                  <h2 className="text-lg font-bold mb-2">Compétences</h2>
                  {userData.skills.map(skill => (
                    <div key={skill.id} className="w-full">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm font-medium text-gray-700">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Onglet Centres d'intérêt */}
              {activeTab === 'interests' && (
                <div>
                  <h2 className="text-lg font-bold mb-2">Centres d'intérêt</h2>
                  <div className="flex flex-wrap gap-2">
                    {userData.interests.map(interest => (
                      <span 
                        key={interest} 
                        className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1.5 rounded-full flex items-center"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Onglet Projets */}
              {activeTab === 'projects' && (
                <div>
                  <h2 className="text-lg font-bold mb-2">Mes projets</h2>
                  <p className="text-gray-500 italic">Aucun projet n'a encore été ajouté.</p>
                </div>
              )}            
            </div>
          </div>
        </div>
      </div>
      
      {/* Statistiques de l'utilisateur */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="px-6 py-4">
          <h2 className="text-lg font-bold mb-4">Statistiques</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600">{userData.stats.forumPosts}</div>
              <div className="text-sm text-gray-600 mt-1">Publications forum</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-600">{userData.stats.events}</div>
              <div className="text-sm text-gray-600 mt-1">Événements</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600">{userData.stats.mentoringSessions}</div>
              <div className="text-sm text-gray-600 mt-1">Sessions mentorat</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-yellow-600">{userData.stats.projectsCompleted}</div>
              <div className="text-sm text-gray-600 mt-1">Projets terminés</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
