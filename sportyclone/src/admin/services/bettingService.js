import apiService from './api';

class BettingService {
  // Bets management
  async getBets(params) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return apiService.get(`/admin/bets?${queryParams}`);
  }

  async getBetById(id) {
    return apiService.get(`/admin/bets/${id}`);
  }

  async cancelBet(id, reason) {
    return apiService.patch(`/admin/bets/${id}/cancel`, { reason });
  }

  async settleBet(id, status, actualWin) {
    return apiService.patch(`/admin/bets/${id}/settle`, { status, actualWin });
  }

  // Events management
  async getEvents(params) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return apiService.get(`/admin/events?${queryParams}`);
  }

  async getEventById(id) {
    return apiService.get(`/admin/events/${id}`);
  }

  async createEvent(eventData) {
    return apiService.post('/admin/events', eventData);
  }

  async updateEvent(id, eventData) {
    return apiService.put(`/admin/events/${id}`, eventData);
  }

  async deleteEvent(id) {
    return apiService.delete(`/admin/events/${id}`);
  }

  async updateEventStatus(id, status) {
    return apiService.patch(`/admin/events/${id}/status`, { status });
  }

  async updateEventScore(id, score) {
    return apiService.patch(`/admin/events/${id}/score`, { score });
  }

  // Markets management
  async getEventMarkets(eventId) {
    return apiService.get(`/admin/events/${eventId}/markets`);
  }

  async createMarket(eventId, marketData) {
    return apiService.post(`/admin/events/${eventId}/markets`, marketData);
  }

  async updateMarket(eventId, marketId, marketData) {
    return apiService.put(`/admin/events/${eventId}/markets/${marketId}`, marketData);
  }

  async deleteMarket(eventId, marketId) {
    return apiService.delete(`/admin/events/${eventId}/markets/${marketId}`);
  }

  async updateMarketStatus(eventId, marketId, status) {
    return apiService.patch(`/admin/events/${eventId}/markets/${marketId}/status`, { status });
  }

  // Odds management
  async updateOdds(eventId, marketId, outcomeId, odds) {
    return apiService.patch(
      `/admin/events/${eventId}/markets/${marketId}/outcomes/${outcomeId}/odds`,
      { odds }
    );
  }

  async bulkUpdateOdds(updates) {
    return apiService.post('/admin/odds/bulk-update', { updates });
  }

  // Sports management
  async getSports() {
    return apiService.get('/admin/sports');
  }

  async createSport(sportData) {
    return apiService.post('/admin/sports', sportData);
  }

  async updateSport(id, sportData) {
    return apiService.put(`/admin/sports/${id}`, sportData);
  }

  async deleteSport(id) {
    return apiService.delete(`/admin/sports/${id}`);
  }

  // Leagues management
  async getLeagues(sportId) {
    const endpoint = sportId ? `/admin/sports/${sportId}/leagues` : '/admin/leagues';
    return apiService.get(endpoint);
  }

  async createLeague(leagueData) {
    return apiService.post('/admin/leagues', leagueData);
  }

  async updateLeague(id, leagueData) {
    return apiService.put(`/admin/leagues/${id}`, leagueData);
  }

  async deleteLeague(id) {
    return apiService.delete(`/admin/leagues/${id}`);
  }

  // Statistics
  async getBettingStats(params) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return apiService.get(`/admin/betting/stats?${queryParams}`);
  }

  // Risk management
  async getRiskAlerts() {
    return apiService.get('/admin/betting/risk-alerts');
  }

  async resolveRiskAlert(id) {
    return apiService.patch(`/admin/betting/risk-alerts/${id}/resolve`, {});
  }
}

export const bettingService = new BettingService();
export default bettingService;