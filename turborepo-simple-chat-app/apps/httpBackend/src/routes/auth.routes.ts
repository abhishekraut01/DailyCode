import { Router } from 'express';
import { getCurrentUser, handleSignin, handleSignup, healthCheck } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router: Router = Router();

// auth.routes.ts
router.post('/signup', handleSignup);
router.post('/signin', handleSignin);
router.get("/health", healthCheck);
router.get("/me", authenticate, getCurrentUser);


export default router;