import { Router } from 'express';
import { handleInitSignup } from '../controllers/auth.controller.js';

const router: Router = Router();

// auth.routes.ts
router.post('/signup', handleInitSignup);


export default router;