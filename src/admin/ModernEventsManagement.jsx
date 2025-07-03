import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const ModernEventsManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // 🔥 CORRECTION: Utilisation de image_url et attendance en string
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
    attendance: '50', // 🔥 STRING au lieu de number
    place: '',
    date_start: '',
    date_end: '',
    image_url: '' // 🔥 image_url au lieu de imageurl
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getEvents();
      setEvents(response || []);
      
    } catch (err) {
      console.error('Erreur lors du chargement des événements:', err);
      setError(err.message);
      
      // Données de fallback avec le bon format
      setEvents([
        {
          id: 1,
          title: 'Soirée d\'intégration 2025',
          description: 'Venez rencontrer les nouveaux étudiants lors de notre soirée d\'intégration annuelle. Au programme : animations, jeux et networking !',
          category: 'social',
          attendance: '100', // STRING
          place: 'Campus Principal - Grand Amphithéâtre',
          date_start: '2025-09-15',
          date_end: '2025-09-15',
          image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop',
          created_at: '2025-07-01T10:00:00Z',
          updated_at: '2025-07-01T10:00:00Z'
        },
        {
          id: 2,
          title: 'Hackathon Innovation 48h',
          description: '48 heures pour créer une solution innovante en équipe. Défis tech, IA et durabilité au programme.',
          category: 'tech',
          attendance: '30', // STRING
          place: 'Bâtiment Technologie - Labs 1-5',
          date_start: '2025-09-22',
          date_end: '2025-09-24',
          image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop',
          created_at: '2025-07-05T14:30:00Z',
          updated_at: '2025-07-05T14:30:00Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // 🔥 CORRECTION: Données formatées exactement selon le modèle API
      const eventData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        attendance: formData.attendance.toString(), // 🔥 FORCÉ EN STRING
        place: formData.place.trim(),
        date_start: formData.date_start,
        date_end: formData.date_end || formData.date_start,
        image_url: formData.image_url.trim() // 🔥 image_url au lieu de imageurl
      };

      console.log('🔥 Données envoyées à l\'API:', eventData); // DEBUG

      if (editingEvent) {
        const updatedEvent = await apiService.updateEvent(editingEvent.id, eventData);
        setEvents(events.map(event => 
          event.id === editingEvent.id ? updatedEvent : event
        ));
      } else {
        const newEvent = await apiService.createEvent(eventData);
        setEvents([...events, newEvent]);
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

  const handleDelete = async (eventId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      try {
        setLoading(true);
        
        await apiService.deleteEvent(eventId);
        setEvents(events.filter(event => event.id !== eventId));
        
      } catch (err) {
        console.error('Erreur lors de la suppression:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      category: event.category || 'general',
      attendance: event.attendance?.toString() || '50', // 🔥 CONVERSION EN STRING
      place: event.place,
      date_start: event.date_start,
      date_end: event.date_end,
      image_url: event.image_url || event.imageurl || '' // 🔥 GESTION DES DEUX FORMATS
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      category: 'general',
      attendance: '50', // 🔥 STRING
      place: '',
      date_start: '',
      date_end: '',
      image_url: '' // 🔥 image_url
    });
  };

  const getStatusBadge = (event) => {
    const now = new Date();
    const startDate = new Date(event.date_start);
    const endDate = new Date(event.date_end || event.date_start);
    
    if (endDate < now) {
      return <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">✅ Terminé</span>;
    }
    
    if (startDate > now) {
      return <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">🚀 À venir</span>;
    }
    
    return <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">⏳ En cours</span>;
  };

  const getCategoryInfo = (category) => {
    const categories = {
      social: { name: 'Social', icon: '🎉', gradient: 'from-pink-400 to-red-400' },
      tech: { name: 'Tech', icon: '💻', gradient: 'from-blue-400 to-cyan-400' },
      conference: { name: 'Conférence', icon: '🎤', gradient: 'from-purple-400 to-indigo-400' },
      workshop: { name: 'Atelier', icon: '🛠️', gradient: 'from-green-400 to-emerald-400' },
      career: { name: 'Carrière', icon: '🏢', gradient: 'from-orange-400 to-yellow-400' },
      academic: { name: 'Académique', icon: '📚', gradient: 'from-indigo-400 to-purple-400' },
      sport: { name: 'Sport', icon: '⚽', gradient: 'from-green-400 to-teal-400' },
      general: { name: 'Général', icon: '📅', gradient: 'from-gray-400 to-gray-600' }
    };
    return categories[category] || categories.general;
  };

  const getAttendanceBadge = (attendance) => {
    const numAttendance = Number(attendance);
    
    if (numAttendance === 0) {
      return <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">🚫 Fermé</span>;
    }
    
    if (numAttendance < 20) {
      return <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">🎫 {numAttendance} places</span>;
    }
    
    if (numAttendance < 50) {
      return <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">📊 {numAttendance} places</span>;
    }
    
    return <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">🌐 {numAttendance} places</span>;
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.place?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    
    const now = new Date();
    const startDate = new Date(event.date_start);
    const endDate = new Date(event.date_end || event.date_start);
    
    switch (filterStatus) {
      case 'upcoming':
        return matchesSearch && startDate > now;
      case 'ongoing':
        return matchesSearch && startDate <= now && endDate >= now;
      case 'past':
        return matchesSearch && endDate < now;
      default:
        return matchesSearch;
    }
  });

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

  if (loading && events.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-green-200 rounded-full animate-spin border-t-green-600"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-purple-200 rounded-full animate-ping border-t-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
          🎉 Gestion des Événements
        </h1>
        <p className="text-gray-600 text-lg">{filteredEvents.length} événements trouvés sur {events.length} au total</p>
      </div>

      {/* Alerte d'erreur */}
      {error && (
        <ErrorAlert 
          message={error} 
          onRetry={() => {
            setError(null);
            loadEvents();
          }} 
        />
      )}

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
              placeholder="🔍 Rechercher un événement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/80 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
            />
          </div>
          
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none bg-white/80 border border-white/30 rounded-2xl px-6 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 backdrop-blur-sm transition-all duration-300"
            >
              <option value="all">🌐 Tous les statuts</option>
              <option value="upcoming">🚀 À venir</option>
              <option value="ongoing">⏳ En cours</option>
              <option value="past">✅ Terminés</option>
            </select>
          </div>
          
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            disabled={loading}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            )}
            Créer événement
          </button>

          <button
            onClick={loadEvents}
            disabled={loading}
            className="bg-white/80 hover:bg-white border border-white/30 text-gray-700 px-4 py-3 rounded-2xl transition-all duration-300 hover:shadow-lg flex items-center disabled:opacity-50"
          >
            <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid des événements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredEvents.map((event, index) => {
          const categoryInfo = getCategoryInfo(event.category);
          
          return (
            <div 
              key={event.id} 
              className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header coloré avec image */}
              <div className={`h-24 bg-gradient-to-r ${categoryInfo.gradient} relative overflow-hidden`}>
                {/* 🔥 CORRECTION: Gestion des deux formats d'image */}
                {(event.image_url || event.imageurl) && (
                  <div className="absolute inset-0">
                    <img 
                      src={event.image_url || event.imageurl} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                  </div>
                )}
                
                {/* Overlay par défaut */}
                <div className="absolute inset-0 bg-black/20"></div>
                
                <div className="absolute top-4 left-4 text-4xl z-10">{categoryInfo.icon}</div>
                <div className="absolute top-4 right-4 z-10">
                  {getStatusBadge(event)}
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h3 className="font-bold text-white text-lg line-clamp-1">{event.title}</h3>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${categoryInfo.gradient} text-white`}>
                    {categoryInfo.name}
                  </span>
                  {getAttendanceBadge(event.attendance)}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
                
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex items-center text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(event.date_start).toLocaleDateString('fr-FR')}
                    {event.date_end && event.date_end !== event.date_start && (
                      <span> → {new Date(event.date_end).toLocaleDateString('fr-FR')}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.place}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(event)}
                    disabled={loading}
                    className="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
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

      {/* Message vide */}
      {filteredEvents.length === 0 && !loading && (
        <div className="text-center py-12 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Aucun événement trouvé</h3>
          <p className="text-gray-600 mb-4">Créez votre premier événement pour commencer</p>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ➕ Créer un événement
          </button>
        </div>
      )}

      {/* Modal de création/édition */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-2xl mx-4 shadow-2xl border border-white/20 max-h-screen overflow-y-auto">
            {/* Header modal */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {editingEvent ? '✏️ Modifier l\'événement' : '🎯 Nouvel événement'}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🎯 Titre de l'événement
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  placeholder="Ex: Workshop React Native"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📝 Description
                </label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 resize-none"
                  placeholder="Décrivez votre événement en détail..."
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📍 Lieu
                </label>
                <input
                  type="text"
                  required
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  placeholder="Ex: Amphithéâtre A, Campus Principal"
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📂 Catégorie
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                    disabled={loading}
                  >
                    <option value="general">📅 Général</option>
                    <option value="social">🎉 Social</option>
                    <option value="tech">💻 Tech</option>
                    <option value="conference">🎤 Conférence</option>
                    <option value="workshop">🛠️ Atelier</option>
                    <option value="career">🏢 Carrière</option>
                    <option value="academic">📚 Académique</option>
                    <option value="sport">⚽ Sport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🎫 Nombre de places
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="1000"
                    value={formData.attendance}
                    onChange={(e) => setFormData({ ...formData, attendance: e.target.value })} // 🔥 GARDÉ EN STRING
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                    placeholder="Ex: 50"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Nombre maximum de participants (0 = fermé)
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🖼️ Image de l'événement (URL)
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  placeholder="https://example.com/image.jpg"
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL de l'image qui illustrera votre événement (optionnel)
                </p>
                
                {/* Prévisualisation de l'image */}
                {formData.image_url && (
                  <div className="mt-3">
                    <img 
                      src={formData.image_url} 
                      alt="Prévisualisation"
                      className="w-full h-24 object-cover rounded-xl border"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      onLoad={(e) => {
                        e.target.style.display = 'block';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📅 Date de début
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date_start}
                    onChange={(e) => setFormData({ ...formData, date_start: e.target.value })}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📅 Date de fin (optionnel)
                  </label>
                  <input
                    type="date"
                    value={formData.date_end}
                    onChange={(e) => setFormData({ ...formData, date_end: e.target.value })}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                    disabled={loading}
                  />
                </div>
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
                  disabled={loading || !formData.title.trim() || !formData.place.trim() || !formData.date_start || !formData.category || Number(formData.attendance) < 0}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {editingEvent ? 'Modification...' : 'Création...'}
                    </>
                  ) : (
                    editingEvent ? 'Modifier' : 'Créer'
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

export default ModernEventsManagement;