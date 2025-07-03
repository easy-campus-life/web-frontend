import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiService from '../../services/apiService';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../../components/LoginModal';

const EventDetailPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isParticipating, setIsParticipating] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [participateLoading, setParticipateLoading] = useState(false);
  const [participantCount, setParticipantCount] = useState(null);
  
  const { isAuthenticated, user, loading: authLoading } = useAuth();

  // Debug: Afficher l'état de l'authentification
  useEffect(() => {
    console.log('EventDetailPage: État auth - isAuthenticated:', isAuthenticated, 'user:', user, 'loading:', authLoading);
  }, [isAuthenticated, user, authLoading]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      try {
        const [eventData, participantData] = await Promise.all([
          apiService.getEvent(eventId),
          apiService.getEventParticipantCount(eventId)
        ]);
        
        setEvent(eventData);
        setParticipantCount(participantData);
        setIsParticipating(eventData.isUserParticipating || false);
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
    console.log('handleParticipate appelé - isAuthenticated:', isAuthenticated, 'user:', user, 'authLoading:', authLoading);
    
    // Attendre que l'authentification soit chargée
    if (authLoading) {
      console.log('AuthContext encore en cours de chargement...');
      return;
    }
    
    // Si l'utilisateur n'est pas connecté, afficher le modal de connexion
    if (!isAuthenticated) {
      console.log('Utilisateur non authentifié, ouverture du modal de connexion');
      setShowLoginModal(true);
      return;
    }

    console.log('User dans handleParticipate:', user);

    // Vérifier que l'utilisateur a un email
    if (!user || !user.email) {
      console.error('Utilisateur ou email manquant:', user);
      alert('Erreur: Informations utilisateur manquantes. Veuillez vous reconnecter.');
      return;
    }

    // Si l'utilisateur est connecté, procéder à la participation
    try {
      setParticipateLoading(true);
      console.log('Participation à l\'événement:', eventId, 'avec email:', user.email);
      await apiService.participateEvent(eventId, user.email);
      setIsParticipating(true);
      
      // Rafraîchir le nombre de participants
      try {
        const updatedParticipantData = await apiService.getEventParticipantCount(eventId);
        setParticipantCount(updatedParticipantData);
      } catch (err) {
        console.error('Erreur lors du rafraîchissement du nombre de participants:', err);
      }
    } catch (err) {
      console.error('Erreur lors de la participation à l\'événement:', err);
      alert('Impossible de participer à l\'événement. Veuillez réessayer.');
    } finally {
      setParticipateLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    console.log('handleLoginSuccess appelé');
    // Attendre un peu pour que l'état soit mis à jour
    setTimeout(() => {
      console.log('handleLoginSuccess: Tentative de participation après délai');
      handleParticipate();
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-white/60 rounded-xl w-1/4 backdrop-blur-sm"></div>
            <div className="h-96 bg-white/60 rounded-2xl backdrop-blur-sm"></div>
            <div className="h-8 bg-white/60 rounded-xl w-1/2 backdrop-blur-sm"></div>
            <div className="h-48 bg-white/60 rounded-2xl backdrop-blur-sm"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-xl border border-red-200/50 text-red-700 px-8 py-6 rounded-2xl shadow-xl max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">Erreur</h2>
            </div>
            <p className="mb-4">{error}</p>
            <Link to="/social" className="inline-flex items-center text-red-700 font-medium hover:text-red-800 transition-colors">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour aux événements
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-xl border border-yellow-200/50 text-yellow-700 px-8 py-6 rounded-2xl shadow-xl max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">Événement non trouvé</h2>
            </div>
            <p className="mb-4">L'événement que vous recherchez n'existe pas ou a été supprimé.</p>
            <Link to="/social" className="inline-flex items-center text-yellow-700 font-medium hover:text-yellow-800 transition-colors">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour aux événements
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

  const getTimeUntilEvent = (dateString) => {
    const now = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Événement terminé';
    if (diffDays === 0) return 'Aujourd\'hui';
    if (diffDays === 1) return 'Demain';
    if (diffDays < 7) return `Dans ${diffDays} jours`;
    if (diffDays < 30) return `Dans ${Math.ceil(diffDays / 7)} semaines`;
    return `Dans ${Math.ceil(diffDays / 30)} mois`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <Link 
          to="/social" 
          className="group inline-flex items-center text-slate-600 hover:text-slate-800 mb-8 transition-all duration-300 hover:translate-x-[-4px]"
        >
          <div className="w-8 h-8 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center mr-3 group-hover:bg-white/80 transition-colors">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <span className="font-medium">Retour aux événements</span>
        </Link>
        
        {/* Hero Section */}
        <div className="relative mb-8">
          <div className="h-96 w-full rounded-3xl overflow-hidden shadow-2xl">
            {event.image_url ? (
              <img 
                src={event.image_url} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <div className="text-white text-opacity-80 text-8xl">🎓</div>
              </div>
            )}
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/30">
                  {event.category || 'Social'}
                </span>
                                 <span className="bg-purple-500/80 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full">
                   {participantCount ? participantCount.participant_count : event.attendance || '0'} participants
                 </span>
                <span className="bg-blue-500/80 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full">
                  {getTimeUntilEvent(event.date_start)}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
                {event.title}
              </h1>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                À propos de l'événement
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            </div>
            
            {/* Event Information */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Informations pratiques
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-slate-50/50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Date et heure</h3>
                    <p className="text-slate-600">
                      {formatDate(event.date_start)}
                      {event.date_end && ` - ${formatDate(event.date_end)}`}
                    </p>
                  </div>
                </div>
                
                {event.place && (
                  <div className="flex items-start gap-4 p-4 bg-slate-50/50 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">Lieu</h3>
                      <p className="text-slate-600">{event.place}</p>
                    </div>
                  </div>
                )}
                
                                 {(participantCount || event.attendance) && (
                   <div className="flex items-start gap-4 p-4 bg-slate-50/50 rounded-xl">
                     <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                       <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                       </svg>
                     </div>
                     <div>
                       <h3 className="font-semibold text-slate-800 mb-1">Participants</h3>
                       <div className="space-y-1">
                         <p className="text-slate-600">
                           {participantCount ? participantCount.participant_count : event.attendance} personnes inscrites
                         </p>
                         {participantCount && (
                           <div className="flex items-center gap-4 text-sm">
                             <span className="text-slate-500">
                               Attendu: {participantCount.expected_attendance}
                             </span>
                             <span className="text-slate-500">
                               {participantCount.attendance_percentage}% de remplissage
                             </span>
                           </div>
                         )}
                       </div>
                     </div>
                   </div>
                 )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Action Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {new Date(event.date_start).toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </h3>
                <p className="text-slate-600">
                  {new Date(event.date_start).toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
              
              <button 
                onClick={handleParticipate}
                disabled={isParticipating || participateLoading}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  isParticipating 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white cursor-default shadow-lg' 
                    : participateLoading
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isParticipating ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Vous participez
                  </div>
                ) : participateLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Participation...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {isAuthenticated ? 'Participer' : 'Se connecter pour participer'}
                  </div>
                )}
              </button>
              
              <div className="mt-6 p-4 bg-slate-50/50 rounded-xl">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Places disponibles</span>
                  <span className="font-semibold text-slate-800">
                    {participantCount && participantCount.expected_attendance 
                      ? `${participantCount.expected_attendance.replace('+', '') - (participantCount.participant_count || 0)}`
                      : event.max_capacity 
                        ? `${event.max_capacity - (event.attendance || 0)}` 
                        : 'Illimité'
                    }
                  </span>
                </div>
                {participantCount && (
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Remplissage</span>
                      <span>{participantCount.attendance_percentage}%</span>
                    </div>
                    <div className="mt-1 w-full bg-slate-200 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(participantCount.attendance_percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
    
            </div>
          </div>
        </div>
        
        {/* Related Events Section */}
        <div className="mt-16">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              Événements similaires
            </h2>
            <p className="text-slate-600 mb-6">
              Découvrez d'autres événements qui pourraient vous intéresser
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder for related events */}
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-slate-300 rounded-lg mx-auto mb-4"></div>
                <div className="h-4 bg-slate-300 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-slate-300 rounded w-1/2 mx-auto"></div>
              </div>
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-slate-300 rounded-lg mx-auto mb-4"></div>
                <div className="h-4 bg-slate-300 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-slate-300 rounded w-1/2 mx-auto"></div>
              </div>
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-slate-300 rounded-lg mx-auto mb-4"></div>
                <div className="h-4 bg-slate-300 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-slate-300 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default EventDetailPage;
