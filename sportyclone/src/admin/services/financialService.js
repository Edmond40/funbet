import apiService from './api';

class FinancialService {
  // Transactions
  async getTransactions(params) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return apiService.get(`/admin/transactions?${queryParams}`);
  }

  async getTransactionById(id) {
    return apiService.get(`/admin/transactions/${id}`);
  }

  async updateTransactionStatus(id, status, notes) {
    return apiService.patch(`/admin/transactions/${id}/status`, { status, notes });
  }

  async createManualTransaction(data) {
    return apiService.post('/admin/transactions/manual', data);
  }

  // Withdrawal Requests
  async getWithdrawalRequests(params) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return apiService.get(`/admin/withdrawals?${queryParams}`);
  }

  async getWithdrawalRequestById(id) {
    return apiService.get(`/admin/withdrawals/${id}`);
  }

  async approveWithdrawal(id, notes) {
    return apiService.patch(`/admin/withdrawals/${id}/approve`, { notes });
  }

  async rejectWithdrawal(id, reason) {
    return apiService.patch(`/admin/withdrawals/${id}/reject`, { reason });
  }

  async processWithdrawal(id, transactionId) {
    return apiService.patch(`/admin/withdrawals/${id}/process`, { transactionId });
  }

  async bulkProcessWithdrawals(requestIds) {
    return apiService.post('/admin/withdrawals/bulk-process', { requestIds });
  }

  // Payment Methods
  async getPaymentMethods() {
    return apiService.get('/admin/payment-methods');
  }

  async getPaymentMethodById(id) {
    return apiService.get(`/admin/payment-methods/${id}`);
  }

  async createPaymentMethod(data) {
    return apiService.post('/admin/payment-methods', data);
  }

  async updatePaymentMethod(id, data) {
    return apiService.put(`/admin/payment-methods/${id}`, data);
  }

  async deletePaymentMethod(id) {
    return apiService.delete(`/admin/payment-methods/${id}`);
  }

  async updatePaymentMethodStatus(id, status) {
    return apiService.patch(`/admin/payment-methods/${id}/status`, { status });
  }

  // Financial Statistics
  async getFinancialStats(params) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return apiService.get(`/admin/financial/stats?${queryParams}`);
  }

  async getRevenueChart(params) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return apiService.get(`/admin/financial/revenue-chart?${queryParams}`);
  }

  async getTransactionSummary(params) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return apiService.get(`/admin/financial/transaction-summary?${queryParams}`);
  }

  // Risk Management
  async getFraudAlerts() {
    return apiService.get('/admin/financial/fraud-alerts');
  }

  async updateFraudAlertStatus(id, status, notes) {
    return apiService.patch(`/admin/financial/fraud-alerts/${id}`, { status, notes });
  }

  // Reports
  async generateFinancialReport(params) {
    return apiService.post('/admin/financial/reports/generate', params);
  }

  async getReportStatus(reportId) {
    return apiService.get(`/admin/financial/reports/${reportId}/status`);
  }

  async downloadReport(reportId) {
    return apiService.get(`/admin/financial/reports/${reportId}/download`);
  }

  // Currency Management
  async getSupportedCurrencies() {
    return apiService.get('/admin/currencies');
  }

  async updateExchangeRates() {
    return apiService.post('/admin/currencies/update-rates', {});
  }

  async updateCurrencyStatus(code, status) {
    return apiService.patch(`/admin/currencies/${code}/status`, { status });
  }
}

export const financialService = new FinancialService();
export default financialService;