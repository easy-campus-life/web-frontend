import React, { useState } from 'react';

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

  // Données simulées des mentors étudiants en informatique
  const mentors = [
    {
      id: 1,
      name: 'Emma Moreau',
      department: 'Master 2 Informatique',
      specialty: 'Développement Web, React, Node.js',
      availability: 'Lundi, Mercredi',
      rating: 4.8,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Étudiante en M2 Informatique, spécialisée en développement web fullstack. J\'aide les étudiants de licence à comprendre les concepts fondamentaux de la programmation web et à réaliser leurs projets React/Node.'
    },
    {
      id: 2,
      name: 'Thomas Dupont',
      department: 'L3 Informatique',
      specialty: 'Algorithmes, Structures de données, Java',
      availability: 'Mardi, Jeudi',
      rating: 4.6,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Passionné par l\'algorithmique et la programmation orientée objet. Je propose mon aide pour les TD de Java, les structures de données et l\'analyse d\'algorithmes.'
    },
    {
      id: 3,
      name: 'Sophie Martin',
      department: 'Master 1 Cybersécurité',
      specialty: 'Sécurité informatique, Réseaux, Linux',
      availability: 'Mercredi, Vendredi',
      rating: 4.9,
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      bio: 'Étudiante en cybersécurité, je peux vous aider sur les fondamentaux des réseaux, la sécurité informatique et l\'administration Linux. Expérience en pentesting et sécurisation d\'applications.'
    },
    {
      id: 4,
      name: 'Alexandre Petit',
      department: 'Doctorat en IA',
      specialty: 'Machine Learning, Python, Data Science',
      availability: 'Lundi, Vendredi',
      rating: 4.7,
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
      bio: 'Doctorant en intelligence artificielle, je propose du soutien en Python, machine learning et analyse de données. Approche pédagogique pour rendre accessibles les concepts complexes d\'IA.'
    }
  ];

  const handleMentorSelect = (mentor) => {
    setSelectedMentor(mentor);
    setShowBookingForm(false);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Simulation d'envoi de données
    setTimeout(() => {
      setBookingSuccess(true);
      setShowBookingForm(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Mentorat Entre Étudiants en Informatique</h1>
      <p className="text-gray-600 mb-6">Connectez-vous avec d'autres étudiants en informatique pour recevoir de l'aide sur vos projets ou partager vos compétences techniques</p>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Liste des mentors */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Mentors disponibles</h2>
            <div className="space-y-4">
              {mentors.map(mentor => (
                <div 
                  key={mentor.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedMentor?.id === mentor.id 
                      ? 'bg-blue-50 border-2 border-blue-500' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => handleMentorSelect(mentor)}
                >
                  <div className="flex items-center">
                    <img 
                      src={mentor.image} 
                      alt={mentor.name} 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-medium">{mentor.name}</h3>
                      <p className="text-sm text-gray-600">{mentor.department}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm ml-1">{mentor.rating}/5</span>
                      </div>
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
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
                <img 
                  src={selectedMentor.image} 
                  alt={selectedMentor.name} 
                  className="w-24 h-24 rounded-full object-cover mr-6 mb-4 md:mb-0"
                />
                <div>
                  <h2 className="text-xl font-bold">{selectedMentor.name}</h2>
                  <p className="text-gray-600">{selectedMentor.department}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{selectedMentor.rating}/5</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Biographie</h3>
                <p className="text-gray-700">{selectedMentor.bio}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Spécialités</h3>
                  <p className="text-gray-700">{selectedMentor.specialty}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Disponibilité</h3>
                  <p className="text-gray-700">{selectedMentor.availability}</p>
                </div>
              </div>

              {bookingSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <strong className="font-bold">Réservation confirmée!</strong>
                  <span className="block sm:inline"> Votre session avec {selectedMentor.name} a été programmée. Vous recevrez bientôt un email de confirmation.</span>
                </div>
              ) : (
                <button
                  onClick={() => setShowBookingForm(!showBookingForm)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  {showBookingForm ? 'Annuler' : 'Réserver une session'}
                </button>
              )}

              {showBookingForm && (
                <div className="mt-6 border-t pt-6">
                  <h3 className="font-semibold text-lg mb-4">Réserver une session avec {selectedMentor.name}</h3>
                  <form onSubmit={handleBookingSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="date">
                          Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          required
                          value={bookingData.date}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="time">
                          Heure
                        </label>
                        <select
                          id="time"
                          name="time"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          required
                          value={bookingData.time}
                          onChange={handleInputChange}
                        >
                          <option value="">Sélectionner une heure</option>
                          <option value="09:00">09:00</option>
                          <option value="10:00">10:00</option>
                          <option value="11:00">11:00</option>
                          <option value="14:00">14:00</option>
                          <option value="15:00">15:00</option>
                          <option value="16:00">16:00</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="topic">
                        Sujet de la session
                      </label>
                      <input
                        type="text"
                        id="topic"
                        name="topic"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Ex: Orientation professionnelle, Aide au projet..."
                        required
                        value={bookingData.topic}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="message">
                        Message (optionnel)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Décrivez brièvement ce que vous souhaitez aborder pendant la session..."
                        value={bookingData.message}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                      Confirmer la réservation
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center h-64">
              <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <p className="text-gray-500 text-center">Sélectionnez un mentor pour voir ses détails et réserver une session</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentoringPage;
