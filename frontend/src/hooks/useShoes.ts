import { useState, useEffect, useCallback } from 'react';
import type { Shoe, CreateShoeData } from '../types';
import { shoesService } from '../services/shoes.service';

export const useShoes = () => {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShoes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await shoesService.getShoes();
      setShoes(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch shoes');
    } finally {
      setLoading(false);
    }
  }, []);

  const addShoe = async (data: CreateShoeData) => {
    try {
      setError(null);
      const response = await shoesService.createShoe(data);
      setShoes((prev) => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to add shoe';
      setError(message);
      throw new Error(message);
    }
  };

  const removeShoe = async (id: string) => {
    try {
      setError(null);
      await shoesService.deleteShoe(id);
      setShoes((prev) => prev.filter((shoe) => shoe.id !== id));
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to delete shoe';
      setError(message);
      throw new Error(message);
    }
  };

  useEffect(() => {
    fetchShoes();
  }, [fetchShoes]);

  return {
    shoes,
    loading,
    error,
    fetchShoes,
    addShoe,
    removeShoe,
  };
};
