import prisma from '../config/database';
import { AppError } from '../middlewares/error.middleware';

export interface CreateShoeData {
  name: string;
  brand: string;
}

export interface ShoeResponse {
  id: string;
  name: string;
  brand: string;
  createdAt: Date;
}

export const getAllShoes = async (userId: string): Promise<ShoeResponse[]> => {
  const shoes = await prisma.shoe.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return shoes;
};

export const createShoe = async (
  data: CreateShoeData,
  userId: string
): Promise<ShoeResponse> => {
  const shoe = await prisma.shoe.create({
    data: {
      name: data.name,
      brand: data.brand,
      userId,
    },
  });

  return shoe;
};

export const deleteShoe = async (
  shoeId: string,
  userId: string
): Promise<void> => {
  // Check if shoe exists and belongs to user
  const shoe = await prisma.shoe.findUnique({
    where: { id: shoeId },
  });

  if (!shoe) {
    throw new AppError('Shoe not found', 404);
  }

  if (shoe.userId !== userId) {
    throw new AppError('Not authorized to delete this shoe', 403);
  }

  await prisma.shoe.delete({
    where: { id: shoeId },
  });
};
