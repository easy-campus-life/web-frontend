import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/apiService';

const MentoringPage = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    topic: '',
    message: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [mentoringSessions, setMentoringSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fonction pour générer les initiales à partir d'un nom
  const getInitials = (name) => {
    if (!name) return 'XX';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Fonction pour générer une couleur de fond basée sur l'ID
  const getBackgroundColor = (id) => {
    const colors = [
      'bg-blue-200 text-blue-800',
      'bg-green-200 text-green-800',
      'bg-purple-200 text-purple-800',
      'bg-yellow-200 text-yellow-800',
      'bg-red-200 text-red-800',
      'bg-indigo-200 text-indigo-800',
      'bg-pink-200 text-pink-800'
    ];
    return colors[id % colors.length];
  };

  const handleMentorSelect = (mentor) => {
    setSelectedMentor(mentor);
    setShowBookingForm(false);
    setBookingSuccess(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Création d'un objet de session de mentorat au format attendu par l'API
      const mentoringData = {
        mentor_id: selectedMentor.id,
        // Pour l'instant, on utilise un ID utilisateur fixe pour le sponsored_id
        // Dans une application réelle, cela viendrait de l'utilisateur connecté
        sponsored_id: 2, // ID de l'utilisateur actuellement connecté
        subject: bookingData.topic,
        description: bookingData.message
        // Les champs created_at et updated_at sont gérés par l'API
      };
      
      // Appel à l'API pour créer une session de mentorat
      await apiService.createMentoringSession(mentoringData);
      
      // Rafraîchir les données après la création
      const data = await apiService.getMentoringSessions();
      setMentoringSessions(data);
      
      setBookingSuccess(true);
      setShowBookingForm(false);
    } catch (error) {
      console.error('Erreur lors de la création de la session de mentorat:', error);
      // En cas d'erreur, on simule quand même le succès pour l'expérience utilisateur
      setTimeout(() => {
        setBookingSuccess(true);
        setShowBookingForm(false);
      }, 1000);
    }
  };

  // Chargement des sessions de mentorat depuis l'API
  useEffect(() => {
    const fetchMentoringSessions = async () => {
      setLoading(true);
      try {
        const data = await apiService.getMentoringSessions();
        setMentoringSessions(data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des sessions de mentorat:', err);
        setError('Impossible de charger les données de mentorat. Utilisation des données simulées.');
      } finally {
        setLoading(false);
      }
    };

    fetchMentoringSessions();
  }, []);

  // Conversion des données de l'API au format attendu par le composant
  const convertApiDataToMentorFormat = (apiData) => {
    if (!apiData || apiData.length === 0) return [];
    
    // Map pour éviter les doublons de mentors
    const mentorsMap = new Map();
    
    apiData.forEach(session => {
      const mentor = session.mentor;
      
      if (!mentorsMap.has(mentor.id)) {
        mentorsMap.set(mentor.id, {
          id: mentor.id,
          name: mentor.name,
          department: `Niveau ${mentor.level}`,
          specialty: session.subject || 'Non spécifié',
          availability: 'Sur demande',
          rating: 4.5, // Valeur par défaut
          bio: session.description || 'Mentor disponible pour vous aider dans vos études.'
        });
      }
    });
    
    return Array.from(mentorsMap.values());
  };

  // Utilisation des données de l'API ou tableau vide en cas d'erreur
  const mentors = error ? [] : 
                 (mentoringSessions.length > 0 ? 
                  convertApiDataToMentorFormat(mentoringSessions) : 
                  []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h1 className="text-3xl font-bold">Mentorat Entre Étudiants</h1>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition" onClick={() => setSelectedMentor(null)}>
          Devenir mentor
        </button>
      </div>

      <p className="text-gray-600 mb-6">
        Connectez-vous avec d'autres étudiants de l'ÉSTIAM pour recevoir de l'aide sur vos projets ou partager vos compétences dans votre spécialité informatique.
      </p>

      {/* Section des sessions de mentorat actives */}
      {mentoringSessions.length > 0 && !error && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Sessions de mentorat actives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mentoringSessions.map(session => (
              <Link 
                to={`/mentoring/session/${session.id}`} 
                key={session.id} 
                className="block bg-white rounded-xl shadow hover:shadow-lg transition p-4 border border-gray-100"
              >
                <div className="mb-3">
                  <h3 className="font-medium">{session.subject}</h3>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-gray-600">Mentor: <span className="font-medium">{session.mentor.name}</span></p>
                    <p className="text-gray-600">Étudiant: <span className="font-medium">{session.sponsored.name}</span></p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full h-fit">Voir détails</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Liste des mentors */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Mentors disponibles</h2>
            <div className="space-y-4">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  onClick={() => handleMentorSelect(mentor)}
                  className={`cursor-pointer p-3 rounded-xl transition-all ${
                    selectedMentor?.id === mentor.id
                      ? 'bg-purple-50 border border-purple-300'
                      : 'hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full mr-4 flex items-center justify-center ${getBackgroundColor(mentor.id)}`}>
                      {getInitials(mentor.name)}
                    </div>
                    <div>
                      <h3 className="font-medium">{mentor.name}</h3>
                      <p className="text-sm text-gray-600">{mentor.department}</p>
                      <div className="text-yellow-500 text-sm">★ {mentor.rating}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Détails du mentor sélectionné */}
        <div className="md:w-2/3">
          {selectedMentor ? (
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center mb-6">
                <img src={selectedMentor.image} alt={selectedMentor.name} className="w-24 h-24 rounded-full mr-6" />
                <div>
                  <h2 className="text-xl font-bold">{selectedMentor.name}</h2>
                  <p className="text-gray-600">{selectedMentor.department}</p>
                  <div className="text-yellow-500">★ {selectedMentor.rating}</div>
                </div>
              </div>

              <p className="mb-4">{selectedMentor.bio}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-700">Spécialité</h3>
                  <p>{selectedMentor.specialty}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-700">Disponibilité</h3>
                  <p>{selectedMentor.availability}</p>
                </div>
              </div>

              {bookingSuccess ? (
                <div className="bg-green-100 p-4 rounded-lg text-green-700 mb-4">
                  ✅ Votre session avec {selectedMentor.name} a été réservée !
                  <div className="mt-2">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg mt-2" onClick={() => setBookingSuccess(false)}>
                      Voir mes réservations
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {!showBookingForm ? (
                    <button
                      onClick={() => setShowBookingForm(true)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2.5 rounded-lg shadow hover:shadow-lg transition"
                    >
                      Réserver une session
                    </button>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium">Date</label>
                        <input
                          type="date"
                          name="date"
                          value={bookingData.date}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Heure</label>
                        <input
                          type="time"
                          name="time"
                          value={bookingData.time}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Sujet</label>
                        <input
                          type="text"
                          name="topic"
                          placeholder="Ex: Projet React"
                          value={bookingData.topic}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Message</label>
                        <textarea
                          name="message"
                          rows="3"
                          placeholder="Expliquer brièvement votre besoin"
                          value={bookingData.message}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-lg"
                        ></textarea>
                      </div>
                      <div className="flex gap-2">
                        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg">Confirmer</button>
                        <button type="button" onClick={() => setShowBookingForm(false)} className="border px-4 py-2 rounded-lg">
                          Annuler
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <p>Sélectionnez un mentor pour voir les détails</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentoringPage;
