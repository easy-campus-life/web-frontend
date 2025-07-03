import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const ModernUsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    level: 'E1', // 🔥 CORRECTION : Utilise E1 par défaut
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 🔥 VRAIE INTÉGRATION API
      const response = await apiService.getUsers();
      setUsers(response || []);
      
    } catch (err) {
      console.error('Erreur lors du chargement des utilisateurs:', err);
      setError(err.message);
      
      // Fallback vers données de démo en cas d'erreur
      setUsers([
        { id: 1, name: 'Jean Dupont', email: 'jean.dupont@campus.fr', level: 'student', created_at: '2024-09-01T10:00:00Z' },
        { id: 2, name: 'Marie Martin', email: 'marie.martin@campus.fr', level: 'student', created_at: '2024-09-05T14:30:00Z' },
        { id: 3, name: 'Pierre Durand', email: 'pierre.durand@campus.fr', level: 'mentor', created_at: '2024-08-15T09:15:00Z' },
        { id: 4, name: 'Sophie Lemoine', email: 'sophie.lemoine@campus.fr', level: 'admin', created_at: '2024-07-20T16:45:00Z' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      if (editingUser) {
        // 🔥 MISE À JOUR UTILISATEUR
        const updatedUser = await apiService.updateUser(editingUser.id, formData);
        setUsers(users.map(user => 
          user.id === editingUser.id ? updatedUser : user
        ));
      } else {
        // 🔥 CRÉATION UTILISATEUR
        const newUser = await apiService.createUser(formData);
        setUsers([...users, newUser]);
      }
      
      resetForm();
      setShowModal(false);
      
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        setLoading(true);
        
        // 🔥 SUPPRESSION UTILISATEUR
        await apiService.deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
        
      } catch (err) {
        console.error('Erreur lors de la suppression:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '', // Ne pas préremplir le mot de passe
      level: user.level,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      level: 'E1', // 🔥 CORRECTION : E1 par défaut
    });
  };

  const getRoleBadge = (level) => {
    const roleConfig = {
      E1: { label: 'E1 - Première année', gradient: 'from-green-400 to-emerald-400', icon: '🌱' },
      E2: { label: 'E2 - Deuxième année', gradient: 'from-blue-400 to-cyan-400', icon: '📚' },
      E3: { label: 'E3 - Troisième année', gradient: 'from-purple-400 to-indigo-400', icon: '🎓' },
      E4: { label: 'E4 - Quatrième année', gradient: 'from-orange-400 to-yellow-400', icon: '💼' },
      E5: { label: 'E5 - Cinquième année', gradient: 'from-red-400 to-pink-400', icon: '👑' },
      admin: { label: 'Admin', gradient: 'from-gray-400 to-gray-600', icon: '⚙️' },
      mentor: { label: 'Mentor', gradient: 'from-teal-400 to-cyan-400', icon: '🎯' }
    };
    
    const config = roleConfig[level] || { label: level, gradient: 'from-gray-400 to-gray-600', icon: '👤' };
    return (
      <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${config.gradient} text-white shadow-md`}>
        <span className="mr-1">{config.icon}</span>
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (createdAt) => {
    const isNew = new Date(createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 jours
    
    if (isNew) {
      return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">🆕 Nouveau</span>;
    }
    
    return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">✅ Actif</span>;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.level === filterRole;
    return matchesSearch && matchesRole;
  });

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

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-blue-200 rounded-full animate-ping border-t-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header moderne */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
          👥 Gestion des Utilisateurs
        </h1>
        <p className="text-gray-600 text-lg">{filteredUsers.length} utilisateurs trouvés sur {users.length} au total</p>
      </div>

      {/* 🔥 ALERTE D'ERREUR */}
      {error && (
        <ErrorAlert 
          message={error} 
          onRetry={() => {
            setError(null);
            loadUsers();
          }} 
        />
      )}

      {/* Barre de recherche et filtres modernes */}
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Recherche avec icône */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="🔍 Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/80 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
            />
          </div>
          
          {/* Filtre par rôle */}
          <div className="relative">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="appearance-none bg-white/80 border border-white/30 rounded-2xl px-6 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm transition-all duration-300"
            >
              <option value="all">🌐 Tous les niveaux</option>
              <option value="E1">🌱 E1 - Première année</option>
              <option value="E2">📚 E2 - Deuxième année</option>
              <option value="E3">🎓 E3 - Troisième année</option>
              <option value="E4">💼 E4 - Quatrième année</option>
              <option value="E5">👑 E5 - Cinquième année</option>
              <option value="admin">⚙️ Administrateurs</option>
              <option value="mentor">🎯 Mentors</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Bouton d'ajout */}
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            )}
            Ajouter
          </button>
          
          {/* Bouton de rafraîchissement */}
          <button
            onClick={loadUsers}
            disabled={loading}
            className="bg-white/80 hover:bg-white border border-white/30 text-gray-700 px-4 py-3 rounded-2xl transition-all duration-300 hover:shadow-lg flex items-center disabled:opacity-50"
          >
            <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards des utilisateurs en grid moderne */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => (
          <div 
            key={user.id} 
            className="group bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform relative overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Avatar et infos principales */}
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">
                  {user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || '??'}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex justify-between items-center mb-4">
              {getRoleBadge(user.level)}
              {getStatusBadge(user.created_at)}
            </div>

            {/* Informations supplémentaires */}
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Inscrit le {new Date(user.created_at).toLocaleDateString('fr-FR')}
              </div>
              {user.updated_at && user.updated_at !== user.created_at && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Modifié le {new Date(user.updated_at).toLocaleDateString('fr-FR')}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => handleEdit(user)}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-xl transition-colors duration-300 disabled:opacity-50"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Modifier
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-xl transition-colors duration-300 disabled:opacity-50"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Message si aucun utilisateur */}
      {filteredUsers.length === 0 && !loading && (
        <div className="text-center py-12 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Aucun utilisateur trouvé</h3>
          <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
        </div>
      )}

      {/* Modal moderne */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl border border-white/20 transform transition-all duration-300 scale-100">
            {/* Header du modal */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {editingUser ? '✏️ Modifier' : '➕ Nouvel utilisateur'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-300 disabled:opacity-50"
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Formulaire */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  👤 Nom complet
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  placeholder="Jean Dupont"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📧 Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  placeholder="jean@campus.fr"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🔒 Mot de passe {editingUser && '(laisser vide pour ne pas changer)'}
                </label>
                <input
                  type="password"
                  required={!editingUser}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🏷️ Niveau
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  disabled={loading}
                >
                  <option value="student">📚 Étudiant</option>
                  <option value="mentor">🎓 Mentor</option>
                  <option value="admin">👑 Administrateur</option>
                </select>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                  className="px-6 py-3 border border-gray-300 rounded-2xl text-gray-700 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || !formData.name || !formData.email || (!editingUser && !formData.password)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {editingUser ? 'Modification...' : 'Création...'}
                    </>
                  ) : (
                    editingUser ? 'Modifier' : 'Créer'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernUsersManagement;