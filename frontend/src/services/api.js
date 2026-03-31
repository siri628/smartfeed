import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
