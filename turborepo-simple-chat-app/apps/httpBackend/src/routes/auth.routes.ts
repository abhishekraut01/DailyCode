import { Router } from 'express';
import { getCurrentUser, handleLogout, handleSignin, handleSignup, healthCheck, refreshAccessToken } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router: Router = Router();

// auth.routes.ts
router.post('/signup', handleSignup);
router.post('/signin', handleSignin);
router.post('/logout', authenticate, handleLogout);
router.get("/health", healthCheck);
router.get("/me", authenticate, getCurrentUser);
router.post("/refresh-token", refreshAccessToken);


export default router;