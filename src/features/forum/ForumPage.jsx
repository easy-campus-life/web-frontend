import React, { useState, useEffect } from 'react';
import PostCard from '../../components/PostCard';

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Simuler le chargement des posts depuis l'API
  useEffect(() => {
    // Données simulées
    const mockPosts = [
      {
        id: 1,
        title: "Problème avec l'accès VPN",
        content: "Bonjour à tous, j'ai des difficultés à me connecter au VPN de l'école depuis hier. Est-ce que quelqu'un d'autre rencontre le même problème ?",
        date: "2025-07-01T10:30:00",
        author: {
          name: "Thomas Martin",
          role: "Étudiant B3"
        },
        tags: ["technique", "réseau", "vpn"],
        status: "urgent"
      },
      {
        id: 2,
        title: "Recherche groupe pour projet IA",
        content: "Je cherche 2-3 personnes motivées pour former un groupe de projet sur l'intelligence artificielle appliquée à la santé. J'ai déjà quelques idées intéressantes !",
        date: "2025-06-29T15:45:00",
        author: {
          name: "Sophie Dubois",
          role: "Étudiante M1"
        },
        tags: ["projet", "ia", "santé", "groupe"],
        status: null,
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        id: 3,
        title: "Ressources pour apprendre React Native",
        content: "Quelles sont les meilleures ressources pour apprendre React Native en autodidacte ? Je cherche des tutoriels, livres ou cours en ligne de qualité.",
        date: "2025-06-28T09:15:00",
        author: {
          name: "Lucas Bernard",
          role: "Étudiant B2"
        },
        tags: ["formation", "mobile", "react"],
        status: "resolved"
      },
      {
        id: 4,
        title: "Annonce : Nouveau matériel dans le lab",
        content: "Bonjour à tous ! Je suis heureux de vous annoncer que nous avons reçu de nouveaux équipements dans le laboratoire d'informatique : 10 casques VR Oculus Quest 3 et 5 stations de travail avec GPU RTX 4090. Ils seront disponibles à partir de lundi prochain.",
        date: "2025-06-27T14:00:00",
        author: {
          name: "Prof. Moreau",
          role: "Responsable Lab"
        },
        tags: ["annonce", "équipement", "vr"],
        status: null
      }
    ];
    
    // Simuler un délai de chargement
    setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 800);
  }, []);
  
  const categories = [
    { id: 'all', name: 'Tous les posts' },
    { id: 'technique', name: 'Technique' },
    { id: 'projet', name: 'Projets' },
    { id: 'annonce', name: 'Annonces' },
    { id: 'formation', name: 'Formation' }
  ];
  
  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.tags.includes(activeCategory));
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Forum ÉSTIAM</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Nouveau post
        </button>
      </div>
      
      {/* Filtres par catégorie */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Liste des posts */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun post trouvé</h3>
          <p className="mt-1 text-gray-500">Aucun post ne correspond à cette catégorie.</p>
        </div>
      )}
    </div>
  );
};

export default ForumPage;
