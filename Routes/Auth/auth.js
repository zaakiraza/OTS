import express from 'express'
import { signupController, loginController, generateToken } from '../../Controllers/authController/auth.js';

export const authRoutes = express.Router();

authRoutes.post('/signup', signupController)
authRoutes.post('/login', loginController)
authRoutes.post('/token/:id', generateToken)