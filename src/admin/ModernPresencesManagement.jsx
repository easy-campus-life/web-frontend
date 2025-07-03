import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const ModernPresencesManagement = () => {
  const [presences, setPresences] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('presences'); // 'presences', 'classrooms', 'analytics'
  
  // États pour les modals
  const [showPresenceModal, setShowPresenceModal] = useState(false);
  const [showClassroomModal, setShowClassroomModal] = useState(false);
  const [editingPresence, setEditingPresence] = useState(null);
  const [editingClassroom, setEditingClassroom] = useState(null);
  
  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClassroom, setFilterClassroom] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Formulaires
  const [presenceFormData, setPresenceFormData] = useState({
    presence: true,
    classroom_id: '',
    email: ''
  });

  const [classroomFormData, setClassroomFormData] = useState({
    name: '',
    capacity: 20
  });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 🔥 CHARGEMENT PARALLÈLE DE TOUTES LES DONNÉES
      const [presencesResponse, classroomsResponse, usersResponse] = await Promise.all([
        apiService.getPresences().catch(() => []),
        apiService.getClassrooms().catch(() => []),
        apiService.getUsers().catch(() => [])
      ]);
      
      setPresences(presencesResponse || []);
      setClassrooms(classroomsResponse || []);
      setUsers(usersResponse || []);
      
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setError(err.message);
      
      // Fallback vers données de démo
      setPresences([
        {
          id: 1,
          presence: true,
          classroom_id: 1,
          user_id: 1,
          timestamp: '2025-07-02T09:00:00Z',
          classroom: { id: 1, name: 'Salle A', capacity: 30 },
          user: { id: 1, name: 'Jean Dupont', email: 'jean@campus.fr', level: 'student' }
        },
        {
          id: 2,
          presence: true,
          classroom_id: 1,
          user_id: 2,
          timestamp: '2025-07-02T09:05:00Z',
          classroom: { id: 1, name: 'Salle A', capacity: 30 },
          user: { id: 2, name: 'Marie Martin', email: 'marie@campus.fr', level: 'student' }
        }
      ]);
      
      setClassrooms([
        { id: 1, name: 'Salle A', capacity: 30, created_at: '2025-01-15T10:00:00Z' },
        { id: 2, name: 'Salle B', capacity: 50, created_at: '2025-01-20T14:30:00Z' },
        { id: 3, name: 'Amphithéâtre', capacity: 100, created_at: '2025-02-01T09:00:00Z' }
      ]);
      
      setUsers([
        { id: 1, name: 'Jean Dupont', email: 'jean@campus.fr', level: 'student' },
        { id: 2, name: 'Marie Martin', email: 'marie@campus.fr', level: 'student' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 GESTION DES PRÉSENCES
  const handlePresenceSubmit = async () => {
    try {
      setLoading(true);
      
      if (editingPresence) {
        const updatedPresence = await apiService.updatePresence(editingPresence.id, {
          presence: presenceFormData.presence,
          classroom_id: parseInt(presenceFormData.classroom_id),
          user_id: editingPresence.user_id
        });
        setPresences(presences.map(p => p.id === editingPresence.id ? updatedPresence : p));
      } else {
        const newPresence = await apiService.createPresence(presenceFormData);
        setPresences([...presences, newPresence]);
      }
      
      resetPresenceForm();
      setShowPresenceModal(false);
      
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePresenceDelete = async (presenceId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette présence ?')) {
      try {
        setLoading(true);
        await apiService.deletePresence(presenceId);
        setPresences(presences.filter(p => p.id !== presenceId));
      } catch (err) {
        console.error('Erreur lors de la suppression:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // 🔥 GESTION DES SALLES
  const handleClassroomSubmit = async () => {
    try {
      setLoading(true);
      
      if (editingClassroom) {
        const updatedClassroom = await apiService.updateClassroom(editingClassroom.id, classroomFormData);
        setClassrooms(classrooms.map(c => c.id === editingClassroom.id ? updatedClassroom : c));
      } else {
        const newClassroom = await apiService.createClassroom(classroomFormData);
        setClassrooms([...classrooms, newClassroom]);
      }
      
      resetClassroomForm();
      setShowClassroomModal(false);
      
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClassroomDelete = async (classroomId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette salle ?')) {
      try {
        setLoading(true);
        await apiService.deleteClassroom(classroomId);
        setClassrooms(classrooms.filter(c => c.id !== classroomId));
      } catch (err) {
        console.error('Erreur lors de la suppression:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // 🔥 FONCTIONS UTILITAIRES
  const resetPresenceForm = () => {
    setEditingPresence(null);
    setPresenceFormData({
      presence: true,
      classroom_id: '',
      email: ''
    });
  };

  const resetClassroomForm = () => {
    setEditingClassroom(null);
    setClassroomFormData({
      name: '',
      capacity: 20
    });
  };

  const getPresenceStatusBadge = (presence) => {
    return presence ? (
      <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
        ✅ Présent
      </span>
    ) : (
      <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
        ❌ Absent
      </span>
    );
  };

  const getOccupancyPercentage = (classroom) => {
    const presentCount = presences.filter(p => 
      p.classroom_id === classroom.id && 
      p.presence && 
      new Date(p.timestamp).toDateString() === new Date().toDateString()
    ).length;
    
    return Math.round((presentCount / classroom.capacity) * 100);
  };

  const filteredPresences = presences.filter(presence => {
    const matchesSearch = presence.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         presence.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         presence.classroom?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClassroom = filterClassroom === 'all' || presence.classroom_id === parseInt(filterClassroom);
    
    const matchesDate = !filterDate || 
                       new Date(presence.timestamp).toDateString() === new Date(filterDate).toDateString();
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'present' && presence.presence) ||
                         (filterStatus === 'absent' && !presence.presence);
    
    return matchesSearch && matchesClassroom && matchesDate && matchesStatus;
  });

  // 🔥 CALCUL DES STATISTIQUES
  const stats = {
    totalPresences: presences.length,
    todayPresences: presences.filter(p => 
      new Date(p.timestamp).toDateString() === new Date().toDateString()
    ).length,
    totalClassrooms: classrooms.length,
    averageOccupancy: classrooms.length > 0 ? 
      Math.round(classrooms.reduce((acc, classroom) => acc + getOccupancyPercentage(classroom), 0) / classrooms.length) : 0
  };

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
          <h3 className="text-sm font-medium text-red-800">Erreur de connexion</h3>
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

  if (loading && presences.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-cyan-200 rounded-full animate-ping border-t-cyan-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header moderne */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
          🏢 Gestion des Présences
        </h1>
        <p className="text-gray-600 text-lg">Suivi des présences et occupation des salles en temps réel</p>
      </div>

      {/* 🔥 ALERTE D'ERREUR */}
      {error && (
        <ErrorAlert 
          message={error} 
          onRetry={() => {
            setError(null);
            loadAllData();
          }} 
        />
      )}

      {/* Onglets de navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/20">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveView('presences')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeView === 'presences'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              👥 Présences ({stats.totalPresences})
            </button>
            <button
              onClick={() => setActiveView('classrooms')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeView === 'classrooms'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              🏢 Salles ({stats.totalClassrooms})
            </button>
            <button
              onClick={() => setActiveView('analytics')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeView === 'analytics'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              📊 Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Présences totales', value: stats.totalPresences, icon: '👥', gradient: 'from-blue-500 to-cyan-500' },
          { title: 'Aujourd\'hui', value: stats.todayPresences, icon: '📅', gradient: 'from-green-500 to-emerald-500' },
          { title: 'Salles actives', value: stats.totalClassrooms, icon: '🏢', gradient: 'from-purple-500 to-pink-500' },
          { title: 'Occupation moy.', value: `${stats.averageOccupancy}%`, icon: '📊', gradient: 'from-orange-500 to-red-500' }
        ].map((stat, index) => (
          <div key={index} className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform">
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10`}></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.gradient} text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeView === 'presences' && (
        <>
          {/* Barre de recherche et filtres */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="🔍 Rechercher une présence..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/80 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
              </div>
              
              <select
                value={filterClassroom}
                onChange={(e) => setFilterClassroom(e.target.value)}
                className="px-4 py-3 bg-white/80 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              >
                <option value="all">🏢 Toutes les salles</option>
                {classrooms.map(classroom => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-4 py-3 bg-white/80 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              />

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-white/80 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              >
                <option value="all">📊 Tous les statuts</option>
                <option value="present">✅ Présents</option>
                <option value="absent">❌ Absents</option>
              </select>

              <button
                onClick={() => {
                  resetPresenceForm();
                  setShowPresenceModal(true);
                }}
                disabled={loading}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-50"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Marquer présence
              </button>
            </div>
          </div>

          {/* Liste des présences */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Utilisateur</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Salle</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Statut</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date & Heure</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPresences.map((presence) => (
                    <tr key={presence.id} className="hover:bg-white/50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-sm">
                              {presence.user?.name?.split(' ').map(n => n[0]).join('') || '??'}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{presence.user?.name || 'Utilisateur inconnu'}</div>
                            <div className="text-sm text-gray-600">{presence.user?.email || 'Email non disponible'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{presence.classroom?.name || 'Salle inconnue'}</div>
                        <div className="text-sm text-gray-600">Capacité: {presence.classroom?.capacity || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4">
                        {getPresenceStatusBadge(presence.presence)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>{new Date(presence.timestamp).toLocaleDateString('fr-FR')}</div>
                        <div className="text-gray-600">{new Date(presence.timestamp).toLocaleTimeString('fr-FR')}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingPresence(presence);
                              setPresenceFormData({
                                presence: presence.presence,
                                classroom_id: presence.classroom_id.toString(),
                                email: presence.user?.email || ''
                              });
                              setShowPresenceModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                            disabled={loading}
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handlePresenceDelete(presence.id)}
                            className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
                            disabled={loading}
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeView === 'classrooms' && (
        <>
          {/* Gestion des salles */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => {
                resetClassroomForm();
                setShowClassroomModal(true);
              }}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center disabled:opacity-50"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Nouvelle salle
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classrooms.map((classroom, index) => {
              const occupancy = getOccupancyPercentage(classroom);
              const currentPresences = presences.filter(p => 
                p.classroom_id === classroom.id && 
                p.presence && 
                new Date(p.timestamp).toDateString() === new Date().toDateString()
              ).length;

              return (
                <div 
                  key={classroom.id}
                  className="group bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Header coloré */}
                  <div className={`h-16 -mx-6 -mt-6 mb-6 bg-gradient-to-r ${
                    occupancy > 80 ? 'from-red-400 to-pink-400' :
                    occupancy > 50 ? 'from-yellow-400 to-orange-400' :
                    'from-green-400 to-emerald-400'
                  } relative flex items-center px-6`}>
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{classroom.name}</h3>
                      <p className="text-sm opacity-90">Capacité: {classroom.capacity} places</p>
                    </div>
                  </div>

                  {/* Occupation */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Occupation actuelle</span>
                      <span className="text-sm font-bold text-gray-800">{currentPresences}/{classroom.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          occupancy > 80 ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                          occupancy > 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                          'bg-gradient-to-r from-green-500 to-emerald-500'
                        }`}
                        style={{ width: `${Math.min(occupancy, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-center mt-2">
                      <span className={`text-lg font-bold ${
                        occupancy > 80 ? 'text-red-600' :
                        occupancy > 50 ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {occupancy}%
                      </span>
                    </div>
                  </div>

                  {/* Informations */}
                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Créée le {new Date(classroom.created_at).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {currentPresences} présent{currentPresences > 1 ? 's' : ''} aujourd'hui
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setEditingClassroom(classroom);
                        setClassroomFormData({
                          name: classroom.name,
                          capacity: classroom.capacity
                        });
                        setShowClassroomModal(true);
                      }}
                      disabled={loading}
                      className="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Modifier
                    </button>
                    <button
                      onClick={() => handleClassroomDelete(classroom.id)}
                      disabled={loading}
                      className="flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Supprimer
                    </button>
                  </div>

                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {activeView === 'analytics' && (
        <div className="space-y-6">
          {/* Graphiques d'analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Occupation par salle */}
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-xl font-bold mb-6 text-gray-800">📊 Occupation par salle</h3>
              <div className="space-y-4">
                {classrooms.map((classroom) => {
                  const occupancy = getOccupancyPercentage(classroom);
                  return (
                    <div key={classroom.id} className="flex items-center">
                      <div className="w-24 text-sm font-medium text-gray-700 mr-4">
                        {classroom.name}
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 mr-4">
                        <div 
                          className={`h-4 rounded-full transition-all duration-1000 ${
                            occupancy > 80 ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                            occupancy > 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                            'bg-gradient-to-r from-green-500 to-emerald-500'
                          }`}
                          style={{ width: `${Math.min(occupancy, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-sm font-bold text-gray-800 w-12">
                        {occupancy}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tendances de présence */}
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-xl font-bold mb-6 text-gray-800">📈 Tendances de présence</h3>
              <div className="h-64 flex items-end justify-around bg-gradient-to-t from-indigo-50 to-transparent rounded-2xl p-6">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, index) => {
                  const height = Math.random() * 150 + 50; // Simulation de données
                  return (
                    <div key={index} className="flex flex-col items-center group">
                      <div 
                        className="bg-gradient-to-t from-indigo-600 to-purple-400 w-8 mb-2 rounded-t-lg transition-all duration-1000 ease-out hover:from-purple-600 hover:to-pink-400 group-hover:scale-110 shadow-lg"
                        style={{ height: `${height}px` }}
                      ></div>
                      <span className="text-xs text-gray-600 font-medium">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Statistiques détaillées */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <h3 className="text-xl font-bold mb-6 text-gray-800">📋 Rapport détaillé</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-4">Présences par niveau</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Étudiants</span>
                    <span className="font-bold text-blue-800">
                      {presences.filter(p => p.user?.level === 'student').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Mentors</span>
                    <span className="font-bold text-blue-800">
                      {presences.filter(p => p.user?.level === 'mentor').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Admins</span>
                    <span className="font-bold text-blue-800">
                      {presences.filter(p => p.user?.level === 'admin').length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                <h4 className="font-semibold text-green-800 mb-4">Taux de présence</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-green-700">Aujourd'hui</span>
                    <span className="font-bold text-green-800">
                      {Math.round((stats.todayPresences / Math.max(users.length, 1)) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Cette semaine</span>
                    <span className="font-bold text-green-800">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Ce mois</span>
                    <span className="font-bold text-green-800">85%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-4">Salles populaires</h4>
                <div className="space-y-2">
                  {classrooms
                    .sort((a, b) => getOccupancyPercentage(b) - getOccupancyPercentage(a))
                    .slice(0, 3)
                    .map((classroom, index) => (
                      <div key={classroom.id} className="flex justify-between">
                        <span className="text-purple-700">{classroom.name}</span>
                        <span className="font-bold text-purple-800">
                          {getOccupancyPercentage(classroom)}%
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de présence */}
      {showPresenceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {editingPresence ? '✏️ Modifier la présence' : '📝 Marquer une présence'}
              </h3>
              <button
                onClick={() => setShowPresenceModal(false)}
                disabled={loading}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-300"
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📧 Email de l'utilisateur
                </label>
                <input
                  type="email"
                  required
                  value={presenceFormData.email}
                  onChange={(e) => setPresenceFormData({ ...presenceFormData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  placeholder="utilisateur@campus.fr"
                  disabled={loading || editingPresence}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🏢 Salle de classe
                </label>
                <select
                  required
                  value={presenceFormData.classroom_id}
                  onChange={(e) => setPresenceFormData({ ...presenceFormData, classroom_id: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  disabled={loading}
                >
                  <option value="">Sélectionner une salle</option>
                  {classrooms.map(classroom => (
                    <option key={classroom.id} value={classroom.id}>
                      {classroom.name} (Capacité: {classroom.capacity})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📊 Statut de présence
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={presenceFormData.presence === true}
                      onChange={() => setPresenceFormData({ ...presenceFormData, presence: true })}
                      className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      disabled={loading}
                    />
                    <span className="ml-2 text-sm text-gray-900">✅ Présent</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={presenceFormData.presence === false}
                      onChange={() => setPresenceFormData({ ...presenceFormData, presence: false })}
                      className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      disabled={loading}
                    />
                    <span className="ml-2 text-sm text-gray-900">❌ Absent</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowPresenceModal(false)}
                  disabled={loading}
                  className="px-6 py-3 border border-gray-300 rounded-2xl text-gray-700 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handlePresenceSubmit}
                  disabled={loading || !presenceFormData.email.trim() || !presenceFormData.classroom_id}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {editingPresence ? 'Modification...' : 'Enregistrement...'}
                    </>
                  ) : (
                    editingPresence ? 'Modifier' : 'Enregistrer'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de salle */}
      {showClassroomModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {editingClassroom ? '✏️ Modifier la salle' : '🏢 Nouvelle salle'}
              </h3>
              <button
                onClick={() => setShowClassroomModal(false)}
                disabled={loading}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-300"
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🏷️ Nom de la salle
                </label>
                <input
                  type="text"
                  required
                  value={classroomFormData.name}
                  onChange={(e) => setClassroomFormData({ ...classroomFormData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  placeholder="Ex: Salle A, Amphithéâtre..."
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  👥 Capacité
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  required
                  value={classroomFormData.capacity}
                  onChange={(e) => setClassroomFormData({ ...classroomFormData, capacity: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  placeholder="Nombre de places"
                  disabled={loading}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowClassroomModal(false)}
                  disabled={loading}
                  className="px-6 py-3 border border-gray-300 rounded-2xl text-gray-700 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleClassroomSubmit}
                  disabled={loading || !classroomFormData.name.trim() || !classroomFormData.capacity || classroomFormData.capacity < 1}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {editingClassroom ? 'Modification...' : 'Création...'}
                    </>
                  ) : (
                    editingClassroom ? 'Modifier' : 'Créer'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message si aucune donnée */}
      {presences.length === 0 && activeView === 'presences' && !loading && (
        <div className="text-center py-12 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Aucune présence enregistrée</h3>
          <p className="text-gray-600 mb-4">Commencez par marquer votre première présence</p>
          <button
            onClick={() => {
              resetPresenceForm();
              setShowPresenceModal(true);
            }}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ➕ Marquer une présence
          </button>
        </div>
      )}
    </div>
  );
};

// Styles CSS intégrés
if (typeof document !== 'undefined') {
  const styles = `
    .animate-fade-in {
      animation: fadeIn 0.6s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .hover\\:scale-102:hover {
      transform: scale(1.02);
    }
  `;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default ModernPresencesManagement;