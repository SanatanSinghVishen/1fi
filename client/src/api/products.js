import axios from 'axios';
import { mockProducts } from './mockData';

const API_BASE = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  timeout: 5000,
});

export const getAllProducts = async () => {
  try {
    const { data } = await api.get('/products');
    if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
      return data.data;
    }
    return mockProducts;
  } catch (err) {
    console.warn('API /api/products unavailable, using fallback dataset:', err.message);
    return mockProducts;
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const { data } = await api.get(`/products/${slug}`);
    if (data?.data) {
      return data.data;
    }
    const clean = String(slug).toLowerCase();
    const fallback = mockProducts.find((p) => p.slug === clean || p.slug.includes(clean));
    if (fallback) return fallback;
    throw new Error('Product not found');
  } catch (err) {
    console.warn(`API /api/products/${slug} unavailable, using fallback dataset:`, err.message);
    const clean = String(slug).toLowerCase();
    const fallback = mockProducts.find((p) => p.slug === clean || p.slug.includes(clean));
    if (fallback) return fallback;
    throw err;
  }
};
