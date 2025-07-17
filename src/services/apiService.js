// services/apiService.js
const API_BASE_URL = 'http://localhost:3001/api';

const apiService = {
  // Health check
  async getHealth() {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error('Health check failed');
    }
    return response.json();
  },

  // Get mentors with optional academic year filter
  async getMentors(academicYear = null) {
    const url = new URL(`${API_BASE_URL}/mentors`);
    if (academicYear) {
      url.searchParams.append('academic_year', academicYear);
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch mentors');
    }
    return response.json();
  },

  // Get mentees with optional academic year filter
  async getMentees(academicYear = null) {
    const url = new URL(`${API_BASE_URL}/mentees`);
    if (academicYear) {
      url.searchParams.append('academic_year', academicYear);
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch mentees');
    }
    return response.json();
  },

  // Get dashboard stats with optional academic year filter
  async getDashboardStats(academicYear = null) {
    const url = new URL(`${API_BASE_URL}/dashboard/stats`);
    if (academicYear) {
      url.searchParams.append('academic_year', academicYear);
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }
    return response.json();
  }
};

export default apiService;