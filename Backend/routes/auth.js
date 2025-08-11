import express from 'express';
import { googleLogin } from '../controllers/authController.js'

const router = express.Router();

router.post('/api/auth/google', googleLogin);

export default router