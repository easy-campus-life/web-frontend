import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiService from '../../services/apiService';

const MentoringDetailPage = () => {
  const { mentoringId } = useParams();
  const [session, setSession] = useState(null);
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
      'bg-purple-200 text-purple-800',
      'bg-blue-200 text-blue-800',
      'bg-green-200 text-green-800',
      'bg-yellow-200 text-yellow-800',
      'bg-red-200 text-red-800',
      'bg-indigo-200 text-indigo-800',
      'bg-pink-200 text-pink-800'
    ];
    return colors[id % colors.length];
  };

  useEffect(() => {
    const fetchMentoringDetails = async () => {
      setLoading(true);
      try {
        const data = await apiService.getMentoringSession(mentoringId);
        setSession(data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des détails de la session de mentorat:', err);
        setError('Impossible de charger les détails de la session de mentorat.');
      } finally {
        setLoading(false);
      }
    };

    fetchMentoringDetails();
  }, [mentoringId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
          <Link to="/mentoring" className="text-red-700 font-medium hover:underline mt-2 inline-block">
            Retour aux sessions de mentorat
          </Link>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
          <p>Session de mentorat non trouvée.</p>
          <Link to="/mentoring" className="text-yellow-700 font-medium hover:underline mt-2 inline-block">
            Retour aux sessions de mentorat
          </Link>
        </div>
      </div>
    );
  }



  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/mentoring" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Retour aux sessions de mentorat
      </Link>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Session de mentorat: {session.subject}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-purple-700 mb-4">Mentor</h2>
              <div className="flex items-start gap-4">
                {session.mentor && (
                  <>
                    <div className={`h-16 w-16 rounded-full flex items-center justify-center flex-shrink-0 ${getBackgroundColor(session.mentor.id)}`}>
                      {getInitials(session.mentor.name)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{session.mentor.name}</h3>
                      <p className="text-gray-600">Email: {session.mentor.email}</p>
                      <p className="text-gray-600">Niveau: {session.mentor.level}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">Étudiant</h2>
              <div className="flex items-start gap-4">
                {session.sponsored && (
                  <>
                    <div className={`h-16 w-16 rounded-full flex items-center justify-center flex-shrink-0 ${getBackgroundColor(session.sponsored.id)}`}>
                      {getInitials(session.sponsored.name)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{session.sponsored.name}</h3>
                      <p className="text-gray-600">Email: {session.sponsored.email}</p>
                      <p className="text-gray-600">Niveau: {session.sponsored.level}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Détails de la session</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-sm text-gray-500">Sujet</p>
                  <p className="text-gray-900">{session.subject}</p>
                </div>
                

              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">{session.description || "Aucune description fournie."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentoringDetailPage;
