import React, { useState } from 'react';

const PostCard = ({ post, index = 0 }) => {
  const [showComments, setShowComments] = useState(false);
  const [reaction, setReaction] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Gérer les réactions
  const handleReaction = (type) => {
    setReaction(reaction === type ? null : type);
  };

  // Configuration des réactions
  const reactions = [
    {
      type: 'helpful',
      icon: '👍',
      label: 'Utile',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200'
    },
    {
      type: 'interesting',
      icon: '💡',
      label: 'Intéressant',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200'
    },
    {
      type: 'question',
      icon: '❓',
      label: 'Question',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      borderColor: 'border-yellow-200'
    },
    {
      type: 'love',
      icon: '❤️',
      label: 'J\'adore',
      color: 'from-pink-500 to-red-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700',
      borderColor: 'border-pink-200'
    }
  ];

  // Configuration des statuts
  const getStatusConfig = (status) => {
    const configs = {
      resolved: {
        gradient: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-50',
        textColor: 'text-green-800',
        icon: '✅',
        label: 'Résolu'
      },
      urgent: {
        gradient: 'from-red-500 to-pink-500',
        bgColor: 'bg-red-50',
        textColor: 'text-red-800',
        icon: '🚨',
        label: 'Urgent'
      },
      pending: {
        gradient: 'from-orange-500 to-yellow-500',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-800',
        icon: '⏳',
        label: 'En attente'
      },
      discussion: {
        gradient: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-800',
        icon: '💬',
        label: 'Discussion'
      }
    };
    return configs[status] || configs.discussion;
  };

  // Couleur d'avatar basée sur le rôle
  const getAvatarConfig = (role) => {
    const configs = {
      'Étudiant': { gradient: 'from-blue-500 to-cyan-500', icon: '🎓' },
      'Professeur': { gradient: 'from-purple-500 to-pink-500', icon: '👨‍🏫' },
      'Administration': { gradient: 'from-green-500 to-emerald-500', icon: '🏢' },
      'Mentor': { gradient: 'from-orange-500 to-red-500', icon: '🎯' },
      'Alumni': { gradient: 'from-indigo-500 to-purple-500', icon: '🌟' }
    };
    return configs[role] || configs['Étudiant'];
  };

  const statusConfig = getStatusConfig(post.status);
  const avatarConfig = getAvatarConfig(post.author.role);
  const shouldTruncate = post.content && post.content.length > 300;
  const displayContent = shouldTruncate && !isExpanded 
    ? post.content.substring(0, 300) + '...' 
    : post.content;

  return (
    <div 
      className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform relative overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Effet de brillance */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Header du post avec gradient coloré */}
      <div className={`h-2 bg-gradient-to-r ${statusConfig.gradient}`}></div>
      
      <div className="p-6 relative z-10">
        {/* En-tête du post avec l'auteur */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className={`w-12 h-12 bg-gradient-to-r ${avatarConfig.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-sm mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {post.author.name.charAt(0)}{post.author.name.split(' ')[1]?.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-gray-800">{post.author.name}</h3>
                <span className="text-lg">{avatarConfig.icon}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`${statusConfig.bgColor} ${statusConfig.textColor} text-xs font-semibold px-2 py-1 rounded-full`}>
                  {post.author.role}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(post.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
          
          {/* Statut du post */}
          {post.status && (
            <div className={`${statusConfig.bgColor} ${statusConfig.textColor} px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1 border ${statusConfig.borderColor || 'border-gray-200'}`}>
              <span>{statusConfig.icon}</span>
              <span>{statusConfig.label}</span>
            </div>
          )}
        </div>
        
        {/* Contenu du post */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {post.title}
          </h2>
          <div className="text-gray-700 leading-relaxed">
            <p>{displayContent}</p>
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-300"
              >
                {isExpanded ? 'Voir moins' : 'Voir plus'}
              </button>
            )}
          </div>
          
          {/* Image si présente */}
          {post.image && (
            <div className="mt-4 group/image">
              <img 
                src={post.image} 
                alt={post.title} 
                className="rounded-2xl w-full h-auto max-h-96 object-cover shadow-lg group-hover/image:scale-105 transition-transform duration-500"
              />
            </div>
          )}
        </div>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, tagIndex) => (
              <span 
                key={tagIndex} 
                className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200 hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Réactions modernes */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {reactions.map((reactionItem) => {
              const isActive = reaction === reactionItem.type;
              
              return (
                <button 
                  key={reactionItem.type}
                  onClick={() => handleReaction(reactionItem.type)}
                  className={`group/reaction flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive 
                      ? `bg-gradient-to-r ${reactionItem.color} text-white shadow-lg` 
                      : `${reactionItem.bgColor} ${reactionItem.textColor} hover:shadow-md border ${reactionItem.borderColor}`
                  }`}
                >
                  <span className="text-base mr-1.5 group-hover/reaction:scale-125 transition-transform duration-300">
                    {reactionItem.icon}
                  </span>
                  <span className="hidden sm:inline">{reactionItem.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* Actions supplémentaires */}
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Réaction sélectionnée - feedback visuel */}
        {reaction && (
          <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✨</span>
              <span className="text-sm text-green-800 font-medium">
                Vous avez réagi avec "{reactions.find(r => r.type === reaction)?.label}" !
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Styles CSS intégrés */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PostCard;