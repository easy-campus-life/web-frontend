import React from 'react';
import { Link } from 'react-router-dom';

const FeaturePreviewCard = ({
  title,
  icon,
  iconBgColor,
  iconTextColor,
  to,
  previewData,
  alertType,
  alertText,
  gradient = 'from-blue-500 to-cyan-500',
  index = 0
}) => {
  const getAlertConfig = (type) => {
    const configs = {
      info: {
        gradient: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-800',
        borderColor: 'border-blue-200',
        icon: '💡'
      },
      warning: {
        gradient: 'from-orange-500 to-yellow-500',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-800',
        borderColor: 'border-orange-200',
        icon: '⚠️'
      },
      success: {
        gradient: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-50',
        textColor: 'text-green-800',
        borderColor: 'border-green-200',
        icon: '✅'
      },
      danger: {
        gradient: 'from-red-500 to-pink-500',
        bgColor: 'bg-red-50',
        textColor: 'text-red-800',
        borderColor: 'border-red-200',
        icon: '🚨'
      },
      default: {
        gradient: 'from-gray-500 to-gray-600',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-800',
        borderColor: 'border-gray-200',
        icon: 'ℹ️'
      }
    };
    return configs[type] || configs.default;
  };

  const alertConfig = getAlertConfig(alertType);

  return (
    <Link 
      to={to} 
      className="group block animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform relative overflow-hidden">
        {/* Effet de brillance */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {/* Header avec icône moderne */}
        <div className="flex items-center mb-6 relative z-10">
          <div className={`relative p-4 rounded-2xl mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r ${gradient}`}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {icon}
            </svg>
            {/* Effet de halo */}
            <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-30 group-hover:scale-125 transition-all duration-500 blur-lg -z-10`}></div>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
            {title}
          </h2>
        </div>
        
        {/* Contenu de prévisualisation */}
        <div className="mb-6 relative z-10">
          <div className="text-gray-700 leading-relaxed">
            {typeof previewData === 'string' ? (
              <p>{previewData}</p>
            ) : (
              previewData
            )}
          </div>
        </div>
        
        {/* Alerte ou notification moderne */}
        {alertText && (
          <div className={`relative z-10 p-4 rounded-2xl border ${alertConfig.bgColor} ${alertConfig.borderColor} ${alertConfig.textColor} transition-all duration-300 hover:scale-105`}>
            <div className="flex items-center">
              <span className="text-lg mr-3">{alertConfig.icon}</span>
              <div className="flex-1">
                <span className="text-sm font-semibold">{alertText}</span>
              </div>
              {/* Pulse indicator pour les alertes importantes */}
              {(alertType === 'warning' || alertType === 'danger') && (
                <div className={`w-2 h-2 bg-gradient-to-r ${alertConfig.gradient} rounded-full animate-pulse ml-2`}></div>
              )}
            </div>
          </div>
        )}
        
        {/* Footer avec indicateur de navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 relative z-10">
          <span className="text-sm text-gray-500 font-medium">Cliquer pour ouvrir</span>
          <div className="flex items-center text-blue-600 group-hover:text-blue-800 transition-colors duration-300">
            <span className="text-sm font-semibold mr-1">Voir plus</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
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
    </Link>
  );
};

export default FeaturePreviewCard;