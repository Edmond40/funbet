class ApiService {
  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
  }

  async request(
    endpoint,
    options = {}
  ) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
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

  async get(endpoint, options) {
    let url = endpoint;
    
    if (options?.params) {
      const searchParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }
    
    return this.request(url, { method: 'GET' });
  }

  async post(
    endpoint, 
    data, 
    options
  ) {
    const config = {
      method: 'POST',
      ...options,
    };

    if (data instanceof FormData) {
      config.body = data;
      // Remove Content-Type header for FormData to let browser set it
      const headers = { ...config.headers };
      delete headers['Content-Type'];
      config.headers = headers;
    } else if (data) {
      config.body = JSON.stringify(data);
    }

    return this.request(endpoint, config);
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
export default apiService;