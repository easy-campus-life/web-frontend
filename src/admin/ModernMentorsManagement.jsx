import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const ModernMentorsManagement = () => {
  const [mentorRelations, setMentorRelations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingRelation, setEditingRelation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [activeView, setActiveView] = useState('relations'); // 'relations' or 'stats'

  const [formData, setFormData] = useState({
    mentor_id: '',
    sponsored_id: '',
    subject: '',
    description: ''
  });

  const subjectsList = [
    { id: 'web-dev', name: 'Développement Web', icon: '💻', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'mobile', name: 'Mobile & Apps', icon: '📱', gradient: 'from-green-500 to-emerald-500' },
    { id: 'ai-ml', name: 'IA & Machine Learning', icon: '🤖', gradient: 'from-purple-500 to-pink-500' },
    { id: 'data-science', name: 'Data Science', icon: '📊', gradient: 'from-orange-500 to-red-500' },
    { id: 'cybersecurity', name: 'Cybersécurité', icon: '🔒', gradient: 'from-red-500 to-pink-500' },
    { id: 'ux-ui', name: 'UX/UI Design', icon: '🎨', gradient: 'from-indigo-500 to-purple-500' },
    { id: 'devops', name: 'DevOps & Cloud', icon: '☁️', gradient: 'from-teal-500 to-blue-500' },
    { id: 'general', name: 'Général', icon: '📚', gradient: 'from-gray-500 to-gray-700' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 🔥 CHARGEMENT PARALLÈLE DES DONNÉES
      const [mentorRelationsResponse, usersResponse] = await Promise.all([
        apiService.getMentoring().catch(() => []),
        apiService.getUsers().catch(() => [])
      ]);
      
      setMentorRelations(mentorRelationsResponse || []);
      setUsers(usersResponse || []);
      
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setError(err.message);
      
      // Fallback vers données de démo
      setMentorRelations([
        {
          id: 1,
          mentor_id: 1,
          sponsored_id: 2,
          subject: 'web-dev',
          description: 'Accompagnement en développement web full-stack',
          created_at: '2025-01-15T10:00:00Z',
          mentor: { id: 1, name: 'Dr. Sarah Chen', email: 'sarah@campus.fr', level: 'mentor' },
          sponsored: { id: 2, name: 'Emma Rousseau', email: 'emma@campus.fr', level: 'student' }
        },
        {
          id: 2,
          mentor_id: 3,
          sponsored_id: 4,
          subject: 'ai-ml',
          description: 'Introduction au machine learning et IA',
          created_at: '2025-02-20T14:30:00Z',
          mentor: { id: 3, name: 'Marc Dubois', email: 'marc@campus.fr', level: 'mentor' },
          sponsored: { id: 4, name: 'Thomas Leroy', email: 'thomas@campus.fr', level: 'student' }
        }
      ]);
      
      setUsers([
        { id: 1, name: 'Dr. Sarah Chen', email: 'sarah@campus.fr', level: 'mentor' },
        { id: 2, name: 'Emma Rousseau', email: 'emma@campus.fr', level: 'student' },
        { id: 3, name: 'Marc Dubois', email: 'marc@campus.fr', level: 'mentor' },
        { id: 4, name: 'Thomas Leroy', email: 'thomas@campus.fr', level: 'student' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      if (editingRelation) {
        // 🔥 MISE À JOUR RELATION MENTORAT
        const updatedRelation = await apiService.updateMentoring(editingRelation.id, formData);
        setMentorRelations(mentorRelations.map(relation => 
          relation.id === editingRelation.id ? updatedRelation : relation
        ));
      } else {
        // 🔥 CRÉATION RELATION MENTORAT
        const newRelation = await apiService.createMentoring(formData);
        setMentorRelations([...mentorRelations, newRelation]);
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

  const handleDelete = async (relationId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette relation de mentorat ?')) {
      try {
        setLoading(true);
        
        // 🔥 SUPPRESSION RELATION MENTORAT
        await apiService.deleteMentoring(relationId);
        setMentorRelations(mentorRelations.filter(relation => relation.id !== relationId));
        
      } catch (err) {
        console.error('Erreur lors de la suppression:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (relation) => {
    setEditingRelation(relation);
    setFormData({
      mentor_id: relation.mentor_id,
      sponsored_id: relation.sponsored_id,
      subject: relation.subject,
      description: relation.description
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingRelation(null);
    setFormData({
      mentor_id: '',
      sponsored_id: '',
      subject: '',
      description: ''
    });
  };

  const getSubjectInfo = (subject) => {
    return subjectsList.find(s => s.id === subject) || subjectsList.find(s => s.id === 'general');
  };

  const getAvailableMentors = () => {
    return users.filter(user => user.level === 'mentor' || user.level === 'admin');
  };

  const getAvailableStudents = () => {
    return users.filter(user => user.level === 'student');
  };

  const filteredRelations = mentorRelations.filter(relation => {
    const matchesSearch = relation.mentor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         relation.sponsored?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         relation.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         relation.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = filterSubject === 'all' || relation.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  // 🔥 CALCUL DES STATISTIQUES
  const stats = {
    totalRelations: mentorRelations.length,
    totalMentors: getAvailableMentors().length,
    totalStudents: getAvailableStudents().length,
    activeSubjects: [...new Set(mentorRelations.map(r => r.subject))].length
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

  if (loading && mentorRelations.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-orange-200 rounded-full animate-spin border-t-orange-600"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-red-200 rounded-full animate-ping border-t-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header moderne */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
          🎓 Gestion du Mentorat
        </h1>
        <p className="text-gray-600 text-lg">Organisez les relations mentor-étudiant et suivez les progrès</p>
      </div>

      {/* 🔥 ALERTE D'ERREUR */}
      {error && (
        <ErrorAlert 
          message={error} 
          onRetry={() => {
            setError(null);
            loadData();
          }} 
        />
      )}

      {/* Onglets de navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/20">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveView('relations')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeView === 'relations'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              🤝 Relations ({stats.totalRelations})
            </button>
            <button
              onClick={() => setActiveView('stats')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeView === 'stats'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              📊 Statistiques
            </button>
          </div>
        </div>
      </div>

      {activeView === 'relations' ? (
        <>
          {/* Barre de recherche et filtres */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="🔍 Rechercher une relation de mentorat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/80 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                />
              </div>
              
              <div className="relative">
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="appearance-none bg-white/80 border border-white/30 rounded-2xl px-6 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500 backdrop-blur-sm transition-all duration-300"
                >
                  <option value="all">🌐 Tous les sujets</option>
                  {subjectsList.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.icon} {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                disabled={loading}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                )}
                Nouvelle relation
              </button>

              {/* Bouton rafraîchissement */}
              <button
                onClick={loadData}
                disabled={loading}
                className="bg-white/80 hover:bg-white border border-white/30 text-gray-700 px-4 py-3 rounded-2xl transition-all duration-300 hover:shadow-lg flex items-center disabled:opacity-50"
              >
                <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Grid des relations de mentorat */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredRelations.map((relation, index) => {
              const subjectInfo = getSubjectInfo(relation.subject);
              
              return (
                <div 
                  key={relation.id} 
                  className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Header coloré */}
                  <div className={`h-20 bg-gradient-to-r ${subjectInfo.gradient} relative`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4 text-3xl">{subjectInfo.icon}</div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-bold text-white text-lg">{subjectInfo.name}</h3>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    {/* Mentor et étudiant */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                          <span className="text-white font-bold text-sm">
                            {relation.mentor?.name?.split(' ').map(n => n[0]).join('') || 'M'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-500">Mentor</div>
                          <div className="font-semibold text-gray-800">{relation.mentor?.name || 'Mentor inconnu'}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                          <span className="text-white font-bold text-sm">
                            {relation.sponsored?.name?.split(' ').map(n => n[0]).join('') || 'E'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-500">Étudiant</div>
                          <div className="font-semibold text-gray-800">{relation.sponsored?.name || 'Étudiant inconnu'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <div className="text-sm text-gray-500 mb-2">Description</div>
                      <p className="text-gray-700 text-sm line-clamp-3">{relation.description}</p>
                    </div>

                    {/* Date de création */}
                    <div className="mb-6 text-sm text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Débuté le {new Date(relation.created_at).toLocaleDateString('fr-FR')}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleEdit(relation)}
                        disabled={loading}
                        className="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(relation.id)}
                        disabled={loading}
                        className="flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Supprimer
                      </button>
                    </div>
                  </div>

                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Vue Statistiques */
        <div className="space-y-6">
          {/* Statistiques générales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Relations actives', value: stats.totalRelations, icon: '🤝', gradient: 'from-orange-500 to-red-500' },
              { title: 'Mentors disponibles', value: stats.totalMentors, icon: '👨‍🏫', gradient: 'from-green-500 to-emerald-500' },
              { title: 'Étudiants', value: stats.totalStudents, icon: '🎓', gradient: 'from-blue-500 to-cyan-500' },
              { title: 'Sujets actifs', value: stats.activeSubjects, icon: '📚', gradient: 'from-purple-500 to-pink-500' }
            ].map((stat, index) => (
              <div key={index} className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10`}></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{stat.value}</p>
                  </div>
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.gradient} text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Répartition par sujet */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <h3 className="text-xl font-bold text-gray-800 mb-6">📊 Répartition par sujet</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {subjectsList.map(subject => {
                const count = mentorRelations.filter(r => r.subject === subject.id).length;
                return (
                  <div key={subject.id} className={`p-4 rounded-2xl bg-gradient-to-r ${subject.gradient} text-white text-center shadow-lg hover:scale-105 transition-transform duration-300`}>
                    <div className="text-2xl mb-2">{subject.icon}</div>
                    <div className="font-bold text-lg">{count}</div>
                    <div className="text-xs opacity-90">{subject.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Message si aucune relation */}
      {filteredRelations.length === 0 && activeView === 'relations' && !loading && (
        <div className="text-center py-12 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
          <div className="text-6xl mb-4">🎓</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Aucune relation de mentorat trouvée</h3>
          <p className="text-gray-600 mb-4">Commencez par créer votre première relation mentor-étudiant</p>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ➕ Créer une relation
          </button>
        </div>
      )}

      {/* Modal de création/édition */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-2xl mx-4 shadow-2xl border border-white/20 max-h-screen overflow-y-auto">
            {/* Header du modal */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {editingRelation ? '✏️ Modifier la relation' : '🎓 Nouvelle relation de mentorat'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-300"
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Formulaire */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    👨‍🏫 Mentor
                  </label>
                  <select
                    required
                    value={formData.mentor_id}
                    onChange={(e) => setFormData({ ...formData, mentor_id: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                    disabled={loading}
                  >
                    <option value="">Sélectionner un mentor</option>
                    {getAvailableMentors().map(mentor => (
                      <option key={mentor.id} value={mentor.id}>
                        {mentor.name} - {mentor.email}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🎓 Étudiant
                  </label>
                  <select
                    required
                    value={formData.sponsored_id}
                    onChange={(e) => setFormData({ ...formData, sponsored_id: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                    disabled={loading}
                  >
                    <option value="">Sélectionner un étudiant</option>
                    {getAvailableStudents().map(student => (
                      <option key={student.id} value={student.id}>
                        {student.name} - {student.email}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📚 Sujet du mentorat
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                  disabled={loading}
                >
                  <option value="">Sélectionner un sujet</option>
                  {subjectsList.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.icon} {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📝 Description
                </label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 resize-none"
                  placeholder="Décrivez les objectifs et le contenu du mentorat..."
                  disabled={loading}
                />
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
                  disabled={loading || !formData.mentor_id || !formData.sponsored_id || !formData.subject}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {editingRelation ? 'Modification...' : 'Création...'}
                    </>
                  ) : (
                    editingRelation ? 'Modifier' : 'Créer'
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
    
    .line-clamp-3 {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    
    .hover\\:scale-102:hover {
      transform: scale(1.02);
    }
  `;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default ModernMentorsManagement;