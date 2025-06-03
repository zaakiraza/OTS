import express from 'express'
import { sendMail } from '../../Controllers/mailController/mailcontroller.js';
import { authenticateToken, isAdmin } from '../../Middlewares/adminMiddleware.js'

export const mailRoutes = express.Router();

mailRoutes.post('/subscribe', authenticateToken, isAdmin, sendMail);