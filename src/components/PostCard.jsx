import React, { useState } from 'react';

const PostCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [reaction, setReaction] = useState(null);
  
  // Gérer les réactions (pas de likes/commentaires comme demandé)
  const handleReaction = (type) => {
    setReaction(reaction === type ? null : type);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      {/* En-tête du post avec l'auteur */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-medium mr-3">
          {post.author.name.charAt(0)}{post.author.name.split(' ')[1]?.charAt(0)}
        </div>
        <div>
          <h3 className="font-medium">{post.author.name}</h3>
          <p className="text-xs text-gray-500">{post.author.role} • {new Date(post.date).toLocaleDateString()}</p>
        </div>
      </div>
      
      {/* Contenu du post */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-700">{post.content}</p>
        
        {/* Image si présente */}
        {post.image && (
          <div className="mt-3">
            <img 
              src={post.image} 
              alt={post.title} 
              className="rounded-lg w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}
      </div>
      
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Réactions (pas de likes/commentaires comme demandé) */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex space-x-2">
          <button 
            onClick={() => handleReaction('helpful')}
            className={`flex items-center px-2 py-1 rounded-md ${reaction === 'helpful' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
            </svg>
            Utile
          </button>
          <button 
            onClick={() => handleReaction('interesting')}
            className={`flex items-center px-2 py-1 rounded-md ${reaction === 'interesting' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            Intéressant
          </button>
          <button 
            onClick={() => handleReaction('question')}
            className={`flex items-center px-2 py-1 rounded-md ${reaction === 'question' ? 'bg-yellow-100 text-yellow-700' : 'hover:bg-gray-100'}`}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Question
          </button>
        </div>
        
        {/* Statut du post */}
        {post.status && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            post.status === 'resolved' ? 'bg-green-100 text-green-800' : 
            post.status === 'urgent' ? 'bg-red-100 text-red-800' : 
            'bg-gray-100 text-gray-800'
          }`}>
            {post.status === 'resolved' ? 'Résolu' : 
             post.status === 'urgent' ? 'Urgent' : 
             post.status}
          </span>
        )}
      </div>
    </div>
  );
};

export default PostCard;
