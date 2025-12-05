import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import shoesRoutes from './routes/shoes.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.use('/auth', authRoutes);
app.use('/shoes', shoesRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
