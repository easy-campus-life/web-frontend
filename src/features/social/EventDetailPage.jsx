import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiService from '../../services/apiService';

const EventDetailPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isParticipating, setIsParticipating] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      try {
        const data = await apiService.getEvent(eventId);
        setEvent(data);
        // Vérifier si l'utilisateur participe déjà à l'événement
        // Ceci est un exemple, vous devrez adapter selon votre API
        setIsParticipating(data.isUserParticipating || false);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des détails de l\'événement:', err);
        setError('Impossible de charger les détails de l\'événement.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);
  
  const handleParticipate = async () => {
    try {
      // Appel API pour participer à l'événement
      // À adapter selon votre API
      await apiService.participateEvent(eventId);
      setIsParticipating(true);
    } catch (err) {
      console.error('Erreur lors de la participation à l\'événement:', err);
      alert('Impossible de participer à l\'événement. Veuillez réessayer.');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
          <Link to="/social" className="text-red-700 font-medium hover:underline mt-2 inline-block">
            Retour aux événements
          </Link>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
          <p>Événement non trouvé.</p>
          <Link to="/social" className="text-yellow-700 font-medium hover:underline mt-2 inline-block">
            Retour aux événements
          </Link>
        </div>
      </div>
    );
  }

  // Format de la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/social" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour aux événements
      </Link>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative">
          <div className="h-64 w-full overflow-hidden bg-gradient-to-r from-blue-400 to-purple-600">
            {event.image_url ? (
              <img 
                src={event.image_url} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
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
          <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span>{event.category}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
          
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-gray-700">
                  {formatDate(event.date_start)}
                  {event.date_end && ` - ${formatDate(event.date_end)}`}
                </p>
              </div>
            </div>
            
            {event.place && (
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-700">{event.place}</p>
              </div>
            )}
            
            {event.attendance && (
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p className="text-gray-700">{event.attendance} participants</p>
              </div>
            )}
          </div>
          
          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
          </div>
          
          <div className="mt-8 border-t pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600">
                  {new Date(event.date_start).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
              </div>
              
              <button 
                onClick={handleParticipate}
                disabled={isParticipating}
                className={`px-8 py-3 rounded-lg font-medium text-center w-full md:w-auto ${isParticipating ? 'bg-green-500 text-white cursor-default' : 'bg-blue-500 hover:bg-blue-600 text-white transition-colors'}`}
              >
                {isParticipating ? 'Vous participez' : 'Participer'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Autres événements à venir</h2>
        <p className="text-gray-500 mb-4">Découvrez d'autres événements qui pourraient vous intéresser</p>
        
        {/* Ici, vous pourriez ajouter une liste d'événements similaires */}
      </div>
    </div>
  );
};

export default EventDetailPage;
