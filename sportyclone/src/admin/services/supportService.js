import { apiService } from './apiService';

class SupportService {
  // Tickets
  async getTickets(params) {
    return apiService.get('/admin/support/tickets', { params });
  }

  async getTicket(id) {
    return apiService.get(`/admin/support/tickets/${id}`);
  }

  async createTicket(data) {
    return apiService.post('/admin/support/tickets', data);
  }

  async updateTicket(id, data) {
    return apiService.put(`/admin/support/tickets/${id}`, data);
  }

  async deleteTicket(id) {
    return apiService.delete(`/admin/support/tickets/${id}`);
  }

  async assignTicket(ticketId, agentId) {
    return apiService.post(`/admin/support/tickets/${ticketId}/assign`, { agentId });
  }

  async bulkUpdateTickets(ticketIds, updates) {
    return apiService.post('/admin/support/tickets/bulk-update', { ticketIds, updates });
  }

  // Messages
  async getTicketMessages(ticketId) {
    return apiService.get(`/admin/support/tickets/${ticketId}/messages`);
  }

  async addTicketMessage(ticketId, message, attachments) {
    const formData = new FormData();
    formData.append('message', message);
    
    if (attachments) {
      attachments.forEach((file, index) => {
        formData.append(`attachment_${index}`, file);
      });
    }

    return apiService.post(`/admin/support/tickets/${ticketId}/messages`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  // Statistics
  async getStats(params) {
    return apiService.get('/admin/support/stats', { params });
  }

  async getAgentPerformance(agentId) {
    return apiService.get('/admin/support/agents/performance', { 
      params: agentId ? { agentId } : undefined 
    });
  }

  // Categories and Tags
  async getCategories() {
    return apiService.get('/admin/support/categories');
  }

  async createCategory(data) {
    return apiService.post('/admin/support/categories', data);
  }

  async updateCategory(id, data) {
    return apiService.put(`/admin/support/categories/${id}`, data);
  }

  async deleteCategory(id) {
    return apiService.delete(`/admin/support/categories/${id}`);
  }

  async getTags() {
    return apiService.get('/admin/support/tags');
  }

  async addTagToTicket(ticketId, tag) {
    return apiService.post(`/admin/support/tickets/${ticketId}/tags`, { tag });
  }

  async removeTagFromTicket(ticketId, tag) {
    return apiService.delete(`/admin/support/tickets/${ticketId}/tags/${tag}`);
  }

  // Automated Responses
  async getAutoResponses() {
    return apiService.get('/admin/support/auto-responses');
  }

  async createAutoResponse(data) {
    return apiService.post('/admin/support/auto-responses', data);
  }

  async updateAutoResponse(id, data) {
    return apiService.put(`/admin/support/auto-responses/${id}`, data);
  }

  async deleteAutoResponse(id) {
    return apiService.delete(`/admin/support/auto-responses/${id}`);
  }

  // Export and Reports
  async exportTickets(params) {
    return apiService.post('/admin/support/export/tickets', params);
  }

  async generateSupportReport(params) {
    return apiService.post('/admin/support/reports/generate', params);
  }

  // Knowledge Base
  async getKnowledgeBaseArticles() {
    return apiService.get('/admin/support/knowledge-base');
  }

  async createKnowledgeBaseArticle(data) {
    return apiService.post('/admin/support/knowledge-base', data);
  }

  async updateKnowledgeBaseArticle(id, data) {
    return apiService.put(`/admin/support/knowledge-base/${id}`, data);
  }

  async deleteKnowledgeBaseArticle(id) {
    return apiService.delete(`/admin/support/knowledge-base/${id}`);
  }

  // Escalation Rules
  async getEscalationRules() {
    return apiService.get('/admin/support/escalation-rules');
  }

  async createEscalationRule(data) {
    return apiService.post('/admin/support/escalation-rules', data);
  }

  async updateEscalationRule(id, data) {
    return apiService.put(`/admin/support/escalation-rules/${id}`, data);
  }

  async deleteEscalationRule(id) {
    return apiService.delete(`/admin/support/escalation-rules/${id}`);
  }
}

export const supportService = new SupportService();
export default supportService;