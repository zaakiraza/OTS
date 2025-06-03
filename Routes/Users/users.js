import express from 'express'
import { getAllUsers } from '../../Controllers/userController/user.js'

export const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);