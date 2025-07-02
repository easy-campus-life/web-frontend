import React from 'react';

const UserPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Profil Utilisateur</h1>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
            <span className="text-3xl text-gray-600">JD</span>
          </div>
          <h2 className="text-xl font-semibold">Jean Dupont</h2>
          <p className="text-gray-600">Étudiant en Informatique</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Email:</span>
            <span className="text-gray-600">jean.dupont@etudiant.fr</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Promotion:</span>
            <span className="text-gray-600">2025</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Campus:</span>
            <span className="text-gray-600">Paris</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Numéro étudiant:</span>
            <span className="text-gray-600">20220134</span>
          </div>
        </div>
        
        <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
          Modifier le profil
        </button>
      </div>
    </div>
  );
};

export default UserPage;
