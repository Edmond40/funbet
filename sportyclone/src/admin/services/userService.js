import apiService from './api';

class UserService {
  // Get all users with pagination and filters
  async getUsers(params) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return apiService.get(`/admin/users?${queryParams}`);
  }

  // Get single user by ID
  async getUserById(id) {
    return apiService.get(`/admin/users/${id}`);
  }

  // Create new user
  async createUser(userData) {
    return apiService.post('/admin/users', userData);
  }

  // Update user
  async updateUser(id, userData) {
    return apiService.put(`/admin/users/${id}`, userData);
  }

  // Delete user
  async deleteUser(id) {
    return apiService.delete(`/admin/users/${id}`);
  }

  // Update user status
  async updateUserStatus(id, status) {
    return apiService.patch(`/admin/users/${id}/status`, { status });
  }

  // Get user activities
  async getUserActivities(userId, params) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return apiService.get(`/admin/users/${userId}/activities?${queryParams}`);
  }

  // Get user verification documents
  async getUserDocuments(userId) {
    return apiService.get(`/admin/users/${userId}/documents`);
  }

  // Approve/Reject document
  async updateDocumentStatus(
    userId,
    documentId,
    status,
    rejectionReason
  ) {
    return apiService.patch(
      `/admin/users/${userId}/documents/${documentId}`,
      { status, rejectionReason }
    );
  }

  // Add user restriction
  async addUserRestriction(userId, restriction) {
    return apiService.post(`/admin/users/${userId}/restrictions`, restriction);
  }

  // Remove user restriction
  async removeUserRestriction(userId, restrictionId) {
    return apiService.delete(`/admin/users/${userId}/restrictions/${restrictionId}`);
  }

  // Get user restrictions
  async getUserRestrictions(userId) {
    return apiService.get(`/admin/users/${userId}/restrictions`);
  }

  // Bulk operations
  async bulkUpdateUsers(userIds, updates) {
    return apiService.post('/admin/users/bulk-update', { userIds, updates });
  }

  async bulkDeleteUsers(userIds) {
    return apiService.post('/admin/users/bulk-delete', { userIds });
  }

  // Export users
  async exportUsers(format = 'csv') {
    return apiService.get(`/admin/users/export?format=${format}`);
  }

  // User statistics
  async getUserStats() {
    return apiService.get('/admin/users/stats');
  }
}

export const userService = new UserService();
export default userService;