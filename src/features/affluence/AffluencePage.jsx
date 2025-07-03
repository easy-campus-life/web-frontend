import React, { useState, useEffect } from 'react';

const AffluencePage = () => {
  const [realTimeData, setRealTimeData] = useState({
    bibliotheque: {
      occupation: 75,
      capacite: 120,
      niveau: 'élevée',
      attente: '10 min',
      tendance: 'stable',
      placesDisponibles: 30,
      derniereMiseAJour: new Date()
    },
    cafeteria: {
      occupation: 45,
      capacite: 80,
      niveau: 'moyenne',
      attente: '5 min',
      tendance: 'baisse',
      placesDisponibles: 44,
      derniereMiseAJour: new Date()
    },
    salleEtude: {
      occupation: 30,
      capacite: 50,
      niveau: 'faible',
      attente: '0 min',
      tendance: 'hausse',
      placesDisponibles: 35,
      derniereMiseAJour: new Date()
    },
    labInformatique: {
      occupation: 65,
      capacite: 40,
      niveau: 'moyenne',
      attente: '8 min',
      tendance: 'stable',
      placesDisponibles: 14,
      derniereMiseAJour: new Date()
    },
    gymnase: {
      occupation: 20,
      capacite: 60,
      niveau: 'faible',
      attente: '0 min',
      tendance: 'stable',
      placesDisponibles: 48,
      derniereMiseAJour: new Date()
    },
    parkingA: {
      occupation: 85,
      capacite: 200,
      niveau: 'élevée',
      attente: '15 min',
      tendance: 'hausse',
      placesDisponibles: 30,
      derniereMiseAJour: new Date()
    }
  });

  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulation de données en temps réel
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setRealTimeData(prev => {
        const newData = { ...prev };
        
        Object.keys(newData).forEach(key => {
          const current = newData[key];
          const variation = Math.floor(Math.random() * 10) - 5; // -5 à +5
          const newOccupation = Math.max(0, Math.min(100, current.occupation + variation));
          const newPlacesDisponibles = Math.max(0, current.capacite - Math.floor((newOccupation / 100) * current.capacite));
          
          newData[key] = {
            ...current,
            occupation: newOccupation,
            placesDisponibles: newPlacesDisponibles,
            niveau: newOccupation > 70 ? 'élevée' : newOccupation > 40 ? 'moyenne' : 'faible',
            attente: newOccupation > 80 ? '15 min' : newOccupation > 60 ? '8 min' : newOccupation > 30 ? '5 min' : '0 min',
            tendance: variation > 2 ? 'hausse' : variation < -2 ? 'baisse' : 'stable',
            derniereMiseAJour: new Date()
          };
        });
        
        return newData;
      });
    }, 15000); // Mise à jour toutes les 15 secondes

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getNiveauConfig = (niveau) => {
    switch (niveau) {
      case 'élevée':
        return {
          gradient: 'from-red-500 to-pink-500',
          bgColor: 'bg-red-50',
          textColor: 'text-red-800',
          borderColor: 'border-red-200',
          icon: '🔴',
          label: 'Affluence élevée'
        };
      case 'moyenne':
        return {
          gradient: 'from-orange-500 to-yellow-500',
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-800',
          borderColor: 'border-orange-200',
          icon: '🟡',
          label: 'Affluence modérée'
        };
      case 'faible':
        return {
          gradient: 'from-green-500 to-emerald-500',
          bgColor: 'bg-green-50',
          textColor: 'text-green-800',
          borderColor: 'border-green-200',
          icon: '🟢',
          label: 'Affluence faible'
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200',
          icon: '⚪',
          label: 'Données indisponibles'
        };
    }
  };

  const getTendanceIcon = (tendance) => {
    switch (tendance) {
      case 'hausse': return '📈';
      case 'baisse': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getLieux = () => [
    { 
      key: 'bibliotheque', 
      nom: 'Bibliothèque Centrale', 
      icon: '📚',
      description: 'Espace de travail silencieux avec accès wifi'
    },
    { 
      key: 'cafeteria', 
      nom: 'Cafétéria', 
      icon: '🍽️',
      description: 'Restaurant universitaire et espace détente'
    },
    { 
      key: 'salleEtude', 
      nom: 'Salles d\'Étude', 
      icon: '📖',
      description: 'Espaces de travail en groupe'
    },
    { 
      key: 'labInformatique', 
      nom: 'Lab Informatique', 
      icon: '💻',
      description: 'Ordinateurs et équipements tech'
    },
    { 
      key: 'gymnase', 
      nom: 'Gymnase', 
      icon: '🏃',
      description: 'Installations sportives'
    },
    { 
      key: 'parkingA', 
      nom: 'Parking A', 
      icon: '🚗',
      description: 'Stationnement principal'
    }
  ];

  const getRecommandations = () => {
    const lieux = getLieux();
    const recommendations = [];

    lieux.forEach(lieu => {
      const data = realTimeData[lieu.key];
      if (data.niveau === 'faible') {
        recommendations.push({
          lieu: lieu.nom,
          icon: lieu.icon,
          message: `Idéal maintenant - ${data.placesDisponibles} places disponibles`,
          type: 'success'
        });
      } else if (data.niveau === 'élevée') {
        recommendations.push({
          lieu: lieu.nom,
          icon: lieu.icon,
          message: `Éviter si possible - Attente ${data.attente}`,
          type: 'warning'
        });
      }
    });

    return recommendations.slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Effets de fond animés */}
      <div className="fixed inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5"></div>
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-bounce-slow"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header moderne */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4 animate-fade-in">
            📊 Affluence Campus
          </h1>
          <p className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Consultez l'occupation en temps réel et optimisez vos déplacements
          </p>
        </div>

        {/* Contrôles */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 mb-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm font-medium text-gray-700">
                  {autoRefresh ? 'Données en temps réel' : 'Actualisation pausée'}
                </span>
              </div>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  autoRefresh 
                    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {autoRefresh ? 'Pause' : 'Reprendre'}
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Période:</span>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-white/80 border border-white/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                <option value="today">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recommandations intelligentes */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 mb-8 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white mr-3">
              🎯
            </div>
            <h2 className="text-xl font-bold text-gray-800">Recommandations</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getRecommandations().map((rec, index) => (
              <div 
                key={index}
                className={`p-4 rounded-2xl border ${
                  rec.type === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-orange-50 border-orange-200 text-orange-800'
                }`}
              >
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-2">{rec.icon}</span>
                  <span className="font-semibold text-sm">{rec.lieu}</span>
                </div>
                <p className="text-xs">{rec.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Grille des lieux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getLieux().map((lieu, index) => {
            const data = realTimeData[lieu.key];
            const config = getNiveauConfig(data.niveau);
            
            return (
              <div 
                key={lieu.key}
                className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform relative overflow-hidden animate-fade-in"
                style={{ animationDelay: `${800 + index * 100}ms` }}
              >
                {/* Effet de brillance */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Header coloré */}
                <div className={`h-20 bg-gradient-to-r ${config.gradient} relative`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-4 left-4 text-3xl">{lieu.icon}</div>
                  <div className="absolute top-4 right-4">
                    <div className={`${config.bgColor} ${config.textColor} px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1`}>
                      <span>{config.icon}</span>
                      <span>{config.label}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-bold text-white text-lg">{lieu.nom}</h3>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-6">{lieu.description}</p>

                  {/* Statistiques principales */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-600">Occupation</span>
                      <span className="text-2xl font-bold text-gray-800">{data.occupation}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                      <div 
                        className={`h-4 rounded-full transition-all duration-1000 bg-gradient-to-r ${config.gradient}`}
                        style={{ width: `${data.occupation}%` }}
                      ></div>
                    </div>
                    
                    <div className="text-center">
                      <span className="text-sm text-gray-600">
                        {data.placesDisponibles} places sur {data.capacite}
                      </span>
                    </div>
                  </div>

                  {/* Informations détaillées */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm font-medium text-gray-600">Temps d'attente</span>
                      <span className="font-bold text-gray-800">{data.attente}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm font-medium text-gray-600">Tendance</span>
                      <div className="flex items-center space-x-1">
                        <span>{getTendanceIcon(data.tendance)}</span>
                        <span className="font-bold text-gray-800 capitalize">{data.tendance}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer avec dernière mise à jour */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Dernière MAJ</span>
                      <span>{data.derniereMiseAJour.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Graphique de tendances */}
        <div className="mt-12 bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 animate-fade-in" style={{ animationDelay: '1200ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mr-3">
                📈
              </div>
              <h2 className="text-xl font-bold text-gray-800">Tendances d'occupation</h2>
            </div>
            <div className="text-sm text-gray-600">
              Données simulées pour la période sélectionnée
            </div>
          </div>

          <div className="h-64 flex items-end justify-around bg-gradient-to-t from-blue-50 to-transparent rounded-2xl p-6">
            {getLieux().slice(0, 4).map((lieu, index) => {
              const data = realTimeData[lieu.key];
              const height = (data.occupation / 100) * 200;
              const config = getNiveauConfig(data.niveau);
              
              return (
                <div key={lieu.key} className="flex flex-col items-center group">
                  <div 
                    className={`bg-gradient-to-t ${config.gradient} w-12 mb-2 rounded-t-lg transition-all duration-1000 ease-out group-hover:scale-110 shadow-lg relative`}
                    style={{ height: `${height}px` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {data.occupation}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg mb-1">{lieu.icon}</div>
                    <span className="text-xs text-gray-600 font-medium">
                      {lieu.nom.split(' ')[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Styles CSS intégrés */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AffluencePage;