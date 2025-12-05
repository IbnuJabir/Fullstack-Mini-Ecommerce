import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../middlewares/validate.middleware';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;
