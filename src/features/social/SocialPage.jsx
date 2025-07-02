import React from 'react';

const SocialPage = () => {
  const events = [
    {
      id: 1,
      title: 'Soirée d\'intégration',
      date: '15 Septembre 2025',
      time: '20:00',
      location: 'Campus Principal',
      description: 'Venez rencontrer les nouveaux étudiants lors de notre soirée d\'intégration annuelle.',
      attendees: 156
    },
    {
      id: 2,
      title: 'Hackathon Innovation',
      date: '22 Septembre 2025',
      time: '09:00',
      location: 'Bâtiment Technologie',
      description: '48 heures pour créer une solution innovante en équipe.',
      attendees: 87
    },
    {
      id: 3,
      title: 'Conférence IA & Éthique',
      date: '30 Septembre 2025',
      time: '14:00',
      location: 'Amphithéâtre Central',
      description: 'Discussion sur les implications éthiques de l\'intelligence artificielle.',
      attendees: 42
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Événements Campus</h1>
      
      <div className="mb-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
          Créer un événement
        </button>
      </div>
      
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <div className="mt-2 space-y-1">
                  <p className="text-gray-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {event.date} à {event.time}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {event.location}
                  </p>
                </div>
                <p className="mt-3 text-gray-700">{event.description}</p>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {event.attendees} participants
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300">
                Participer
              </button>
              <button className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md transition duration-300">
                Plus d'infos
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialPage;
