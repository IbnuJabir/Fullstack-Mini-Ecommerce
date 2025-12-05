import { Request, Response, NextFunction } from 'express';
import { AppError } from './error.middleware';

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and password are required', 400));
  }

  if (!email.includes('@')) {
    return next(new AppError('Invalid email format', 400));
  }

  if (password.length < 6) {
    return next(new AppError('Password must be at least 6 characters', 400));
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and password are required', 400));
  }

  next();
};

export const validateShoe = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, brand } = req.body;

  if (!name || !brand) {
    return next(new AppError('Name and brand are required', 400));
  }

  if (typeof name !== 'string' || typeof brand !== 'string') {
    return next(new AppError('Name and brand must be strings', 400));
  }

  next();
};
