import React from 'react';

const AffluencePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Affluence</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Statistiques d'affluence</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800">Bibliothèque</h3>
            <p className="text-2xl font-bold">75%</p>
            <p className="text-sm text-gray-600">Occupation actuelle</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-medium text-green-800">Cafétéria</h3>
            <p className="text-2xl font-bold">45%</p>
            <p className="text-sm text-gray-600">Occupation actuelle</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="font-medium text-purple-800">Salle d'étude</h3>
            <p className="text-2xl font-bold">30%</p>
            <p className="text-sm text-gray-600">Occupation actuelle</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffluencePage;
