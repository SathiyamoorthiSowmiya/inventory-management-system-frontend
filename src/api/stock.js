import api from './axios';

export const getStockTransactions = () => api.get('/stock');
export const recordStockTransaction = (data) => api.post('/stock', data);
