// services/apiService.js
const API_BASE_URL = 'https://backend-production-3740d.up.railway.app';

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
    const response = await this.request('/auth/login-json', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.access_token) {
      this.token = response.access_token;
      localStorage.setItem('token', this.token);
      localStorage.setItem('token_type', response.token_type);
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
  
  async participateEvent(eventId, email) {
    return this.request('/event-participations/', {
      method: 'POST',
      body: JSON.stringify({
        event_id: eventId,
        email: email
      }),
    });
  }

  async getEventParticipantCount(eventId) {
    return this.request(`/event-participations/event/${eventId}/participant-count`);
  }
  
  // === MENTORING ===
  async getMentoringSessions(skip = 0, limit = 100) {
    return this.request(`/mentoring/?skip=${skip}&limit=${limit}`);
  }

  async getMentoringSession(mentoringId) {
    return this.request(`/mentoring/${mentoringId}`);
  }
  
  async getMentorRequests(skip = 0, limit = 100) {
    return this.request(`/mentoring/requests/?skip=${skip}&limit=${limit}`);
  }

  async createMentoringSession(mentoringData) {
    return this.request('/mentoring/', {
      method: 'POST',
      body: JSON.stringify(mentoringData),
    });
  }

  async updateMentoringSession(mentoringId, mentoringData) {
    return this.request(`/mentoring/${mentoringId}`, {
      method: 'PUT',
      body: JSON.stringify(mentoringData),
    });
  }

  async deleteMentoringSession(mentoringId) {
    return this.request(`/mentoring/${mentoringId}`, {
      method: 'DELETE',
    });
  }

  async getUserMentoring(userId) {
    return this.request(`/mentoring/user/${userId}/mentoring`);
  }

  async getUserSponsored(userId) {
    return this.request(`/mentoring/user/${userId}/sponsored`);
  }

  // === CLASSROOMS ===
  async getClassrooms(skip = 0, limit = 100) {
    return this.request(`/classrooms/?skip=${skip}&limit=${limit}`);
  }

  async getClassroom(classroomId) {
    return this.request(`/classrooms/${classroomId}`);
  }

  async createClassroom(classroomData) {
    return this.request('/classrooms/', {
      method: 'POST',
      body: JSON.stringify(classroomData),
    });
  }

  async updateClassroom(classroomId, classroomData) {
    return this.request(`/classrooms/${classroomId}`, {
      method: 'PUT',
      body: JSON.stringify(classroomData),
    });
  }

  async deleteClassroom(classroomId) {
    return this.request(`/classrooms/${classroomId}`, {
      method: 'DELETE',
    });
  }

  async getClassroomWithPresences(classroomId) {
    return this.request(`/classrooms/${classroomId}/with-presences`);
  }

  // === PRESENCES ===
  async getPresences(skip = 0, limit = 100) {
    return this.request(`/presences/?skip=${skip}&limit=${limit}`);
  }

  async getPresence(presenceId) {
    return this.request(`/presences/${presenceId}`);
  }

  async createPresence(presenceData) {
    return this.request('/presences/', {
      method: 'POST',
      body: JSON.stringify(presenceData),
    });
  }

  async updatePresence(presenceId, presenceData) {
    return this.request(`/presences/${presenceId}`, {
      method: 'PUT',
      body: JSON.stringify(presenceData),
    });
  }

  async deletePresence(presenceId) {
    return this.request(`/presences/${presenceId}`, {
      method: 'DELETE',
    });
  }

  async getClassroomOccupancy(classroomId) {
    return this.request(`/presences/classroom/${classroomId}/occupancy`);
  }

  async getUserPresenceHistory(userId) {
    return this.request(`/presences/user/${userId}/history`);
  }

  async getAffluenceOverview() {
    return this.request('/presences/analytics/overview');
  }
  
  async getClassroomAffluenceTrends(classroomId) {
    return this.request(`/presences/analytics/classroom/${classroomId}/trends`);
  }
  
  async getRealTimeAffluence() {
    return this.request('/presences/analytics/real-time');
  }
  
  async getAffluenceData() {
    // Utilise la méthode getRealTimeAffluence pour récupérer les données d'affluence
    return this.getRealTimeAffluence();
  }
  
  async getPeakTimes() {
    return this.request('/presences/analytics/peak-times');
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
