import { Router } from 'express';
import { handleSignup } from '../controllers/auth.controller.js';

const router: Router = Router();

// auth.routes.ts
router.post('/signup', handleSignup);


export default router;