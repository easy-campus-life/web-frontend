// services/apiService.js
const API_BASE_URL = 'http://127.0.0.1:8000';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  // Configuration des headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Méthode générique pour les requêtes
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // === AUTHENTICATION ===
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.access_token) {
      this.token = response.access_token;
      localStorage.setItem('token', this.token);
    }
    
    return response;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async updateCurrentUser(userData) {
    return this.request('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // === USERS ===
  async getUsers(skip = 0, limit = 100) {
    return this.request(`/users/?skip=${skip}&limit=${limit}`);
  }

  async getUser(userId) {
    return this.request(`/users/${userId}`);
  }

  async createUser(userData) {
    return this.request('/users/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(userId, userData) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(userId) {
    return this.request(`/users/${userId}`, {
      method: 'DELETE',
    });
  }

  // === EVENTS ===
  async getEvents(skip = 0, limit = 100) {
    return this.request(`/events/?skip=${skip}&limit=${limit}`);
  }

  async getEvent(eventId) {
    return this.request(`/events/${eventId}`);
  }

  async createEvent(eventData) {
    return this.request('/events/', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async updateEvent(eventId, eventData) {
    return this.request(`/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  async deleteEvent(eventId) {
    return this.request(`/events/${eventId}`, {
      method: 'DELETE',
    });
  }

  async getUpcomingEvents() {
    return this.request('/events/upcoming/');
  }

  // === MENTORS ===
  async getMentors(skip = 0, limit = 100) {
    return this.request(`/mentors/?skip=${skip}&limit=${limit}`);
  }

  async getMentor(mentorId) {
    return this.request(`/mentors/${mentorId}`);
  }

  async createMentor(mentorData) {
    return this.request('/mentors/', {
      method: 'POST',
      body: JSON.stringify(mentorData),
    });
  }

  async updateMentor(mentorId, mentorData) {
    return this.request(`/mentors/${mentorId}`, {
      method: 'PUT',
      body: JSON.stringify(mentorData),
    });
  }

  async deleteMentor(mentorId) {
    return this.request(`/mentors/${mentorId}`, {
      method: 'DELETE',
    });
  }

  async getUserMentoring(userId) {
    return this.request(`/mentors/user/${userId}/mentoring`);
  }

  async getUserSponsored(userId) {
    return this.request(`/mentors/user/${userId}/sponsored`);
  }

  // === HEALTH & MISC ===
  async healthCheck() {
    return this.request('/health');
  }

  // Méthode pour déconnexion
  logout() {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  }
}

// Export d'une instance unique
const apiService = new ApiService();
export default apiService;
