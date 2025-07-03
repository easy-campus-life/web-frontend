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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h1 className="text-3xl font-bold">Événements Campus</h1>
        </div>
        <div className="flex space-x-3">
          <button onClick={handleRefresh} disabled={isLoading} className={`px-4 py-2 rounded-lg flex items-center ${isLoading ? 'bg-gray-200' : 'bg-white border hover:bg-gray-50'}`}>
            <svg className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8 8 0 004.582 9H9m11 11v-5h-.581a8 8 0 01-15.357-2H15" />
            </svg>
            {isLoading ? 'Actualisation...' : 'Actualiser'}
          </button>
          <button onClick={() => setShowCreateModal(true)} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2.5 rounded-lg flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Créer un événement
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-6">Découvrez et participez aux événements organisés sur le campus.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <Link to={`/social/event/${event.id}`} key={event.id} className="block bg-white rounded-xl shadow hover:shadow-lg transition">
            <div className="p-6 bg-gradient-to-r from-blue-400 to-purple-600 text-white">
              <h2 className="text-xl font-bold">{event.title}</h2>
              <p className="mt-2">{new Date(event.date_start).toLocaleDateString('fr-FR')} {event.date_end !== event.date_start ? `- ${new Date(event.date_end).toLocaleDateString('fr-FR')}` : ''}</p>
              <p className="mt-1">{event.place}</p>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600">{event.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{event.category}</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{event.attendance} participants</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {renderCreateEventModal()}
    </div>
  );
};

export default SocialPage;
