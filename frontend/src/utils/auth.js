// src/utils/auth.js
import api from '@/api/api';

export function logout(navigate) {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
  navigate('/login');
}
