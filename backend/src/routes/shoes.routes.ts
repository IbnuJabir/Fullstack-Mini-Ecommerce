import { Router } from 'express';
import { getShoes, addShoe, removeShoe } from '../controllers/shoes.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateShoe } from '../middlewares/validate.middleware';

const router = Router();

// All routes are protected with authentication
router.use(authMiddleware);

router.get('/', getShoes);
router.post('/', validateShoe, addShoe);
router.delete('/:id', removeShoe);

export default router;
