import axios from 'axios';

const API_BASE_URL = 'https://smartfeed-ldqu.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (request) => {
    console.log('API Request:', request);
    return request;
  },
  (error) => {
    console.log('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    console.log('API Response Error:', error);
    return Promise.reject(error);
  }
);

export const feedbackAPI = {
  submitFeedback: (feedbackData) => api.post('/feedback', feedbackData),
  getAllFeedback: () => api.get('/feedback'),
  getFeedbackById: (id) => api.get(`/feedback/${id}`),
  deleteFeedback: (id) => api.delete(`/feedback/${id}`),
  getFeedbackByRating: (rating) => api.get(`/feedback/rating/${rating}`),
  getFeedbackByCategory: (category) => api.get(`/feedback/category/${category}`),
  getFeedbackBySentiment: (sentiment) => api.get(`/feedback/sentiment/${sentiment}`),
  searchFeedback: (query) => api.get('/feedback/search', { params: { query } }),
  getRatingsAnalytics: () => api.get('/feedback/analytics/ratings'),
  getSentimentsAnalytics: () => api.get('/feedback/analytics/sentiments'),
};

export default api;
