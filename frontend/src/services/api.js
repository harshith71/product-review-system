import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// ── Products ──────────────────────────────────────────────
export const getProducts = (params = {}) => api.get('/products', { params });
export const getProduct = (id) => api.get(`/products/${id}`);
export const getCategories = () => api.get('/products/categories');
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// ── Reviews ───────────────────────────────────────────────
export const getReviews = (productId) => api.get(`/products/${productId}/reviews`);
export const getRatingStats = (productId) => api.get(`/products/${productId}/reviews/stats`);
export const addReview = (productId, data) => api.post(`/products/${productId}/reviews`, data);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

export default api;

// ── Auth ──────────────────────────────────────────────────
export const loginApi = (data) => api.post('/auth/login', data);
export const registerApi = (data) => api.post('/auth/register', data);

// ── Admin ─────────────────────────────────────────────────
export const getAdminStats = () => api.get('/admin/stats');
export const getAdminUsers = () => api.get('/admin/users');
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);
