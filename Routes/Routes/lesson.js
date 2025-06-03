import express from 'express'
import { getAllLessons, getLessonById, createLesson, updateLesson, deleteLesson } from '../../Controllers/apiControlller/lessonController.js'
import {authenticateToken,isAdmin} from '../../Middlewares/adminMiddleware.js'

export const lessonRoutes = express.Router();

lessonRoutes.get('/', getAllLessons)
lessonRoutes.get('/:id', getLessonById)

lessonRoutes.post('/', authenticateToken, isAdmin, createLesson)
lessonRoutes.put('/:id', authenticateToken, isAdmin, updateLesson)
lessonRoutes.delete('/:id', authenticateToken, isAdmin, deleteLesson)