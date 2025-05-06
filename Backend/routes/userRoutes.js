import express from 'express';
import { createUser, updateUser, getUser, login, deleteUser } from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js';


const router = express.Router();

router.post('/signup', createUser);

router.post('/login', login);

router.put('/:id', verifyToken, updateUser);

router.get('/:id', verifyToken, getUser);

router.delete('/del', verifyToken, deleteUser);

export default router;