// apiService.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('accessToken');
  }

  // Méthode pour définir le token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
  }

  // Méthode pour obtenir les headers par défaut
  getHeaders(contentType = 'application/json') {
    const headers = {
      'Content-Type': contentType,
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Méthode générique pour les requêtes
  async makeRequest(url, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      // Gérer les réponses 204 (No Content)
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // =============================================================================
  // AUTHENTICATION ENDPOINTS
  // =============================================================================

  // S'inscrire (créer un nouveau compte)
  async register(userData) {
    return this.makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Se connecter et obtenir un token d'accès (form-data)
  async login(username, password) {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('grant_type', 'password');

    return this.makeRequest('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });
  }

  // Se connecter avec JSON et obtenir un token d'accès
  async loginJson(email, password) {
    return this.makeRequest('/auth/login-json', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Obtenir les informations de l'utilisateur connecté
  async getCurrentUser() {
    return this.makeRequest('/auth/me');
  }

  // Mettre à jour les informations de l'utilisateur connecté
  async updateCurrentUser(userData) {
    return this.makeRequest('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // =============================================================================
  // USERS ENDPOINTS
  // =============================================================================

  // Créer un nouvel utilisateur
  async createUser(userData) {
    return this.makeRequest('/users/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Récupérer tous les utilisateurs
  async getUsers(skip = 0, limit = 100) {
    return this.makeRequest(`/users/?skip=${skip}&limit=${limit}`);
  }

  // Récupérer un utilisateur par son ID
  async getUser(userId) {
    return this.makeRequest(`/users/${userId}`);
  }

  // Mettre à jour un utilisateur
  async updateUser(userId, userData) {
    return this.makeRequest(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Supprimer un utilisateur
  async deleteUser(userId) {
    return this.makeRequest(`/users/${userId}`, {
      method: 'DELETE',
    });
  }

  // =============================================================================
  // EVENTS ENDPOINTS
  // =============================================================================

  // Créer un nouvel événement
  async createEvent(eventData) {
    return this.makeRequest('/events/', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  // Récupérer tous les événements avec filtres optionnels
  async getEvents(skip = 0, limit = 100, category = null) {
    let url = `/events/?skip=${skip}&limit=${limit}`;
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }
    return this.makeRequest(url);
  }

  // Récupérer un événement par son ID
  async getEvent(eventId) {
    return this.makeRequest(`/events/${eventId}`);
  }

  // Mettre à jour un événement
  async updateEvent(eventId, eventData) {
    return this.makeRequest(`/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  // Supprimer un événement
  async deleteEvent(eventId) {
    return this.makeRequest(`/events/${eventId}`, {
      method: 'DELETE',
    });
  }

  // Récupérer les événements à venir
  async getUpcomingEvents() {
    return this.makeRequest('/events/upcoming/');
  }

  // =============================================================================
  // MENTORING ENDPOINTS
  // =============================================================================

  // Créer une nouvelle relation de mentorat
  async createMentoring(mentoringData) {
    return this.makeRequest('/mentoring/', {
      method: 'POST',
      body: JSON.stringify(mentoringData),
    });
  }

  // Récupérer toutes les relations de mentorat
  async getMentoring(skip = 0, limit = 100) {
    return this.makeRequest(`/mentoring/?skip=${skip}&limit=${limit}`);
  }

  // Récupérer une relation de mentorat par son ID
  async getMentoringById(mentoringId) {
    return this.makeRequest(`/mentoring/${mentoringId}`);
  }

  // Mettre à jour une relation de mentorat
  async updateMentoring(mentoringId, mentoringData) {
    return this.makeRequest(`/mentoring/${mentoringId}`, {
      method: 'PUT',
      body: JSON.stringify(mentoringData),
    });
  }

  // Supprimer une relation de mentorat
  async deleteMentoring(mentoringId) {
    return this.makeRequest(`/mentoring/${mentoringId}`, {
      method: 'DELETE',
    });
  }

  // Récupérer tous les étudiants qu'un utilisateur mentore
  async getUserMentoring(userId) {
    return this.makeRequest(`/mentoring/user/${userId}/mentoring`);
  }

  // Récupérer tous les mentors d'un utilisateur
  async getUserSponsored(userId) {
    return this.makeRequest(`/mentoring/user/${userId}/sponsored`);
  }

  // =============================================================================
  // CLASSROOMS ENDPOINTS
  // =============================================================================

  // Créer une nouvelle salle de classe
  async createClassroom(classroomData) {
    return this.makeRequest('/classrooms/', {
      method: 'POST',
      body: JSON.stringify(classroomData),
    });
  }

  // Récupérer toutes les salles de classe
  async getClassrooms(skip = 0, limit = 100) {
    return this.makeRequest(`/classrooms/?skip=${skip}&limit=${limit}`);
  }

  // Récupérer une salle de classe par son ID
  async getClassroom(classroomId) {
    return this.makeRequest(`/classrooms/${classroomId}`);
  }

  // Mettre à jour une salle de classe
  async updateClassroom(classroomId, classroomData) {
    return this.makeRequest(`/classrooms/${classroomId}`, {
      method: 'PUT',
      body: JSON.stringify(classroomData),
    });
  }

  // Supprimer une salle de classe
  async deleteClassroom(classroomId) {
    return this.makeRequest(`/classrooms/${classroomId}`, {
      method: 'DELETE',
    });
  }

  // Récupérer une salle de classe avec ses présences
  async getClassroomWithPresences(classroomId) {
    return this.makeRequest(`/classrooms/${classroomId}/with-presences`);
  }

  // =============================================================================
  // PRESENCES ENDPOINTS
  // =============================================================================

  // Enregistrer une présence
  async createPresence(presenceData) {
    return this.makeRequest('/presences/', {
      method: 'POST',
      body: JSON.stringify(presenceData),
    });
  }

  // Récupérer les présences avec filtres
  async getPresences(skip = 0, limit = 100, classroomId = null, userId = null, dateFilter = null) {
    let url = `/presences/?skip=${skip}&limit=${limit}`;
    
    if (classroomId) {
      url += `&classroom_id=${classroomId}`;
    }
    if (userId) {
      url += `&user_id=${userId}`;
    }
    if (dateFilter) {
      url += `&date_filter=${dateFilter}`;
    }
    
    return this.makeRequest(url);
  }

  // Récupérer une présence par son ID
  async getPresence(presenceId) {
    return this.makeRequest(`/presences/${presenceId}`);
  }

  // Mettre à jour une présence
  async updatePresence(presenceId, presenceData) {
    return this.makeRequest(`/presences/${presenceId}`, {
      method: 'PUT',
      body: JSON.stringify(presenceData),
    });
  }

  // Supprimer une présence
  async deletePresence(presenceId) {
    return this.makeRequest(`/presences/${presenceId}`, {
      method: 'DELETE',
    });
  }

  // Obtenir l'occupation d'une salle de classe
  async getClassroomOccupancy(classroomId, dateFilter = null) {
    let url = `/presences/classroom/${classroomId}/occupancy`;
    if (dateFilter) {
      url += `?date_filter=${dateFilter}`;
    }
    return this.makeRequest(url);
  }

  // Obtenir l'historique des présences d'un utilisateur
  async getUserPresenceHistory(userId) {
    return this.makeRequest(`/presences/user/${userId}/history`);
  }

  // =============================================================================
  // DEFAULT ENDPOINTS
  // =============================================================================

  // Page d'accueil de l'API
  async getRoot() {
    return this.makeRequest('/');
  }

  // Vérification de l'état de l'API
  async healthCheck() {
    return this.makeRequest('/health');
  }

  // =============================================================================
  // MÉTHODES UTILITAIRES
  // =============================================================================

  // Déconnexion (supprime le token)
  logout() {
    this.setToken(null);
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated() {
    return !!this.token;
  }

  // Méthode pour gérer les erreurs d'authentification
  handleAuthError(error) {
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      this.logout();
      // Rediriger vers la page de connexion ou déclencher un événement
      window.location.href = '/login';
    }
    throw error;
  }
}

// Créer une instance unique du service
const apiService = new ApiService();

export default apiService;