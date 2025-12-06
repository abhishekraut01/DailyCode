import { Router } from 'express';
import { handleSignin, handleSignup, healthCheck } from '../controllers/auth.controller.js';

const router: Router = Router();

// auth.routes.ts
router.post('/signup', handleSignup);
router.post('/signin', handleSignin);
router.get("/health", healthCheck);


export default router;