import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // Identifiants simulés - 3 comptes au total
  const validCredentials = [
    {
      email: 'admin@campus.fr',
      password: 'admin123',
      userData: {
        name: 'Admin Système',
        email: 'admin@campus.fr',
        role: 'admin'
      }
    },
    {
      email: 'etudiant@campus.fr',
      password: 'password123',
      userData: {
        name: 'Jean Dupont',
        email: 'etudiant@campus.fr',
        role: 'etudiant'  
      }
    },
    {
      email: 'student@campus.fr',
      password: 'student123',
      userData: {
        name: 'Marie Martin',
        email: 'student@campus.fr',
        role: 'etudiant'
      }
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulation d'une requête d'authentification
    setTimeout(() => {
      // Rechercher les identifiants correspondants
      const validUser = validCredentials.find(
        cred => cred.email === email && cred.password === password
      );

      if (validUser) {
        // Stockage d'une information d'authentification dans le localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(validUser.userData));
        
        // Redirection selon le rôle
        if (validUser.userData.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Identifiants incorrects. Essayez avec les comptes de test ci-dessous.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <div className="flex justify-center">
            <span className="text-5xl">🎓</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            EasyCampus
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Connectez-vous à votre espace
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Adresse email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Se souvenir de moi
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Mot de passe oublié?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2 font-medium">Comptes de test :</p>
            
            {/* Compte Admin */}
            <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded">
              <p className="text-xs text-red-800 font-semibold mb-1">👑 Administrateur</p>
              <p className="text-xs text-gray-700">
                <span className="font-mono">admin@campus.fr</span><br />
                <span className="font-mono">admin123</span>
              </p>
            </div>
            
            {/* Compte Étudiant 1 */}
            <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded">
              <p className="text-xs text-blue-800 font-semibold mb-1">🎓 Étudiant</p>
              <p className="text-xs text-gray-700">
                <span className="font-mono">etudiant@campus.fr</span><br />
                <span className="font-mono">password123</span>
              </p>
            </div>
            
            {/* Compte Étudiant 2 */}
            <div className="p-2 bg-blue-50 border border-blue-200 rounded">
              <p className="text-xs text-blue-800 font-semibold mb-1">🎓 Étudiant</p>
              <p className="text-xs text-gray-700">
                <span className="font-mono">student@campus.fr</span><br />
                <span className="font-mono">student123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;