import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/apiService';

const SocialPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [events, setEvents] = useState([]);
  
  // Charger les données des événements depuis l'API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getEvents();
        console.log(data);
        setEvents(data);
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Erreur lors de l\'actualisation des événements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCreateEventModal = () => {
    if (!showCreateModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
          <button
            onClick={() => setShowCreateModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-2xl font-bold mb-4">Créer un événement</h2>

          <form className="space-y-4">
            <div>
              <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
              <input type="text" id="eventTitle" className="w-full px-3 py-2 border rounded-lg" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" id="eventDate" className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                <input type="time" id="eventTime" className="w-full px-3 py-2 border rounded-lg" required />
              </div>
            </div>

            <div>
              <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
              <input type="text" id="eventLocation" className="w-full px-3 py-2 border rounded-lg" required />
            </div>

            <div>
              <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea id="eventDescription" rows="3" className="w-full px-3 py-2 border rounded-lg" required></textarea>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 rounded-lg">
              Créer l'événement
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h1 className="text-3xl font-bold">Événements Campus</h1>
        </div>
        <p className="text-gray-600 mb-8">Découvrez et participez aux événements qui favorisent la vie étudiante d'ESTIAM</p>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">Tous</button>
            <button className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">Social</button>
            <button className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">Tech</button>
            <button className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">Académique</button>
          </div>
          <div className="flex space-x-3">
            <button onClick={handleRefresh} disabled={isLoading} className={`px-4 py-2 rounded-lg flex items-center ${isLoading ? 'bg-gray-200' : 'bg-white border hover:bg-gray-50'}`}>
              <svg className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8 8 0 004.582 9H9m11 11v-5h-.581a8 8 0 01-15.357-2H15" />
              </svg>
              {isLoading ? 'Actualisation...' : 'Actualiser'}
            </button>
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            <div className="relative">
              {/* Image d'événement avec badge de catégorie */}
              <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-600">
                {event.image_url ? (
                  <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-opacity-30 text-6xl">
                    🎓
                  </div>
                )}
              </div>
              
              {/* Badge de catégorie */}
              <div className="absolute top-4 left-4">
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {event.category || 'Social'}
                </span>
              </div>
              
              {/* Badge de participants */}
              <div className="absolute top-4 right-4">
                <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {event.attendance || '0'} participants
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{event.title}</h2>
              
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date(event.date_start).toLocaleDateString('fr-FR')}</span>
              </div>
              
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{event.place || 'Campus'}</span>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">{event.description}</p>
              
              <div className="flex justify-center">
                <Link to={`/social/event/${event.id}`} className="bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-6 rounded-lg font-medium transition-colors w-full">
                  Participer
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {renderCreateEventModal()}
    </div>
    </>
  );
};

export default SocialPage;
