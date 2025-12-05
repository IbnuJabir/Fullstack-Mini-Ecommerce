import api from './api';
import type { ShoesResponse, ShoeResponse, CreateShoeData } from '../types';

export const shoesService = {
  getShoes: async (): Promise<ShoesResponse> => {
    const response = await api.get<ShoesResponse>('/shoes');
    return response.data;
  },

  createShoe: async (data: CreateShoeData): Promise<ShoeResponse> => {
    const response = await api.post<ShoeResponse>('/shoes', data);
    return response.data;
  },

  deleteShoe: async (id: string): Promise<void> => {
    await api.delete(`/shoes/${id}`);
  },
};
