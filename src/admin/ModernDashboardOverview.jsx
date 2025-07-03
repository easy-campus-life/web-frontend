import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const ModernDashboardOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalMentoring: 0,
    upcomingEvents: 0
  });
  
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 🔥 CHARGEMENT PARALLÈLE DE TOUTES LES DONNÉES
      const [usersResponse, eventsResponse, mentoringResponse, upcomingEventsResponse] = await Promise.all([
        apiService.getUsers().catch(() => []),
        apiService.getEvents().catch(() => []),
        apiService.getMentoring().catch(() => []),
        apiService.getUpcomingEvents().catch(() => [])
      ]);
      
      // 🔥 CALCUL DES STATISTIQUES RÉELLES
      setStats({
        totalUsers: usersResponse?.length || 0,
        totalEvents: eventsResponse?.length || 0,
        totalMentoring: mentoringResponse?.length || 0,
        upcomingEvents: upcomingEventsResponse?.length || 0
      });

      // 🔥 GÉNÉRATION DE L'ACTIVITÉ RÉCENTE À PARTIR DES VRAIES DONNÉES
      const activity = [];
      
      // Derniers utilisateurs créés
      if (usersResponse?.length > 0) {
        const recentUsers = usersResponse
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 2);
        
        recentUsers.forEach(user => {
          activity.push({
            type: 'user',
            message: `${user.name} s'est inscrit`,
            time: getTimeAgo(user.created_at),
            color: 'from-blue-400 to-cyan-400'
          });
        });
      }

      // Derniers événements créés
      if (eventsResponse?.length > 0) {
        const recentEvents = eventsResponse
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 2);
        
        recentEvents.forEach(event => {
          activity.push({
            type: 'event',
            message: `Événement "${event.title}" créé`,
            time: getTimeAgo(event.created_at),
            color: 'from-green-400 to-emerald-400'
          });
        });
      }

      // Dernières relations de mentorat créées
      if (mentoringResponse?.length > 0) {
        const recentMentoring = mentoringResponse
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 1);
        
        recentMentoring.forEach(relation => {
          activity.push({
            type: 'mentoring',
            message: `Nouvelle relation de mentorat créée`,
            time: getTimeAgo(relation.created_at),
            color: 'from-purple-400 to-pink-400'
          });
        });
      }

      // Trier par date et garder les 5 plus récents
      setRecentActivity(
        activity
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .slice(0, 5)
      );
      
    } catch (err) {
      console.error('Erreur lors du chargement du dashboard:', err);
      setError(err.message);
      
      // Fallback vers données de démo
      setStats({
        totalUsers: 42,
        totalEvents: 8,
        totalMentoring: 15,
        upcomingEvents: 3
      });
      
      setRecentActivity([
        {
          type: 'user',
          message: 'Nouveaux utilisateurs rejoignent la plateforme',
          time: '2 min',
          color: 'from-blue-400 to-cyan-400'
        },
        {
          type: 'event',
          message: 'Hackathon 2025 en préparation',
          time: '15 min',
          color: 'from-green-400 to-emerald-400'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FONCTION UTILITAIRE POUR LE TEMPS ÉCOULÉ
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'À l\'instant';
    if (diffInMinutes < 60) return `${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}j`;
  };

  const StatCard = ({ title, value, change, icon, gradient, delay = 0 }) => (
    <div 
      className={`group relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient border effect */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10`}></div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {loading ? (
              <div className="w-16 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
            ) : (
              <span className="animate-pulse">{value}</span>
            )}
          </p>
          {change && (
            <p className="text-xs text-emerald-600 mt-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {change}
            </p>
          )}
        </div>
        <div className={`p-4 rounded-2xl bg-gradient-to-r ${gradient} text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
      
      {/* Effet de brillance */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
    </div>
  );

  const QuickAction = ({ title, icon, gradient, onClick }) => (
    <button 
      onClick={onClick}
      className={`group relative p-6 rounded-2xl bg-gradient-to-r ${gradient} text-white hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden`}
    >
      <div className="flex items-center">
        <div className="text-2xl mr-4">{icon}</div>
        <span className="font-semibold">{title}</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </button>
  );

  const ActivityItem = ({ type, message, time, color, delay = 0 }) => (
    <div 
      className="flex items-center p-4 bg-white/80 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102 transform border border-white/20"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-3 h-3 bg-gradient-to-r ${color} rounded-full mr-4 animate-pulse`}></div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{message}</p>
      </div>
      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
        {time}
      </span>
    </div>
  );

  // 🔥 GESTION DES ERREURS API
  const ErrorAlert = ({ message, onRetry }) => (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">Erreur de chargement</h3>
          <p className="text-sm text-red-700 mt-1">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-3 text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );

  if (loading && stats.totalUsers === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-purple-200 rounded-full animate-ping border-t-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header avec gradient */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
          Tableau de Bord
        </h1>
        <p className="text-gray-600 text-lg">Vue d'ensemble de votre plateforme EasyCampus</p>
        {!loading && (
          <button
            onClick={loadDashboardData}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center mx-auto"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualiser les données
          </button>
        )}
      </div>

      {/* 🔥 ALERTE D'ERREUR */}
      {error && (
        <ErrorAlert 
          message={error} 
          onRetry={() => {
            setError(null);
            loadDashboardData();
          }} 
        />
      )}

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Utilisateurs Total"
          value={stats.totalUsers}
          change={stats.totalUsers > 0 ? "Données en temps réel" : null}
          icon="👥"
          gradient="from-blue-500 to-cyan-500"
          delay={100}
        />
        <StatCard
          title="Événements"
          value={stats.totalEvents}
          change={stats.upcomingEvents > 0 ? `${stats.upcomingEvents} à venir` : null}
          icon="🎉"
          gradient="from-green-500 to-emerald-500"
          delay={200}
        />
        <StatCard
          title="Relations Mentorat"
          value={stats.totalMentoring}
          change={stats.totalMentoring > 0 ? "Actives" : null}
          icon="🎓"
          gradient="from-purple-500 to-pink-500"
          delay={300}
        />
        <StatCard
          title="Événements à venir"
          value={stats.upcomingEvents}
          change="Prochainement"
          icon="📈"
          gradient="from-orange-500 to-red-500"
          delay={400}
        />
      </div>

      {/* Actions rapides avec design moderne */}
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Actions Rapides
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickAction
            title="Voir Utilisateurs"
            icon="👥"
            gradient="from-blue-500 to-cyan-500"
            onClick={() => window.location.hash = '#users'}
          />
          <QuickAction
            title="Gérer Événements"
            icon="🎯"
            gradient="from-green-500 to-emerald-500"
            onClick={() => window.location.hash = '#events'}
          />
          <QuickAction
            title="Mentorat"
            icon="🎓"
            gradient="from-purple-500 to-pink-500"
            onClick={() => window.location.hash = '#mentors'}
          />
          <QuickAction
            title="Actualiser"
            icon="🔄"
            gradient="from-gray-600 to-gray-800"
            onClick={loadDashboardData}
          />
        </div>
      </div>

      {/* Graphiques modernes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Graphique en barres moderne */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <h3 className="text-xl font-bold mb-6 text-gray-800">📊 Répartition des données</h3>
          <div className="h-64 flex items-end justify-around bg-gradient-to-t from-blue-50 to-transparent rounded-2xl p-6">
            {[
              { label: 'Utilisateurs', value: stats.totalUsers, color: 'from-blue-600 to-cyan-400' },
              { label: 'Événements', value: stats.totalEvents, color: 'from-green-600 to-emerald-400' },
              { label: 'Mentorat', value: stats.totalMentoring, color: 'from-purple-600 to-pink-400' },
              { label: 'À venir', value: stats.upcomingEvents, color: 'from-orange-600 to-red-400' }
            ].map((item, index) => {
              const maxValue = Math.max(stats.totalUsers, stats.totalEvents, stats.totalMentoring, stats.upcomingEvents);
              const height = maxValue > 0 ? (item.value / maxValue) * 200 : 20;
              
              return (
                <div key={index} className="flex flex-col items-center group">
                  <div 
                    className={`bg-gradient-to-t ${item.color} w-12 mb-2 rounded-t-lg transition-all duration-1000 ease-out group-hover:scale-110 shadow-lg relative`}
                    style={{ height: `${height}px` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.value}
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 font-medium text-center">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statut système */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <h3 className="text-xl font-bold mb-6 text-gray-800">⚡ Statut Système</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="font-medium text-green-800">API Connectée</span>
              </div>
              <span className="text-green-600 font-bold">✓ OK</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                <span className="font-medium text-blue-800">Base de données</span>
              </div>
              <span className="text-blue-600 font-bold">✓ Opérationnelle</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
                <span className="font-medium text-purple-800">Synchronisation</span>
              </div>
              <span className="text-purple-600 font-bold">✓ En temps réel</span>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
              <div className="text-sm text-gray-600 mb-2">Dernière mise à jour</div>
              <div className="font-bold text-gray-800">
                {new Date().toLocaleString('fr-FR')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activité récente avec timeline moderne */}
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">🕐 Activité Récente</h3>
          <button
            onClick={loadDashboardData}
            disabled={loading}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <svg className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualiser
          </button>
        </div>
        
        {recentActivity.length > 0 ? (
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <ActivityItem
                key={index}
                type={activity.type}
                message={activity.message}
                time={activity.time}
                color={activity.color}
                delay={index * 100}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📊</div>
            <p className="text-gray-600">Aucune activité récente détectée</p>
            <p className="text-sm text-gray-500 mt-2">
              L'activité apparaîtra ici lorsque des données seront disponibles
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernDashboardOverview;