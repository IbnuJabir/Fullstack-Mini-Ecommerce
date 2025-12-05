import api from './api';

export interface Shoe {
  id: string;
  name: string;
  brand: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateShoeData {
  name: string;
  brand: string;
}

export const shoesApi = {
  getAll: async (): Promise<Shoe[]> => {
    const response = await api.get<Shoe[]>('/shoes');
    return response.data;
  },

  create: async (data: CreateShoeData): Promise<Shoe> => {
    const response = await api.post<Shoe>('/shoes', data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/shoes/${id}`);
  },
};
