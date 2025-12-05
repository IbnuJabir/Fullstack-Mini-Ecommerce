import { Request, Response, NextFunction } from 'express';
import {
  getAllShoes,
  createShoe,
  deleteShoe,
} from '../services/shoes.service';

export const getShoes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).userId as string;
    const shoes = await getAllShoes(userId);

    res.status(200).json({
      status: 'success',
      data: shoes,
    });
  } catch (error) {
    next(error);
  }
};

export const addShoe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).userId as string;
    const { name, brand } = req.body;
    const shoe = await createShoe({ name, brand }, userId);

    res.status(201).json({
      status: 'success',
      data: shoe,
    });
  } catch (error) {
    next(error);
  }
};

export const removeShoe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).userId as string;
    const { id } = req.params;
    await deleteShoe(id, userId);

    res.status(200).json({
      status: 'success',
      message: 'Shoe deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
