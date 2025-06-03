import express from 'express'
import { getAllSubjects, getSubjectById, createSubject, updateSubject, deleteSubject } from '../../Controllers/apiControlller/subjectController.js'
import { authenticateToken, isAdmin } from '../../Middlewares/adminMiddleware.js'

export const subjectsRoutes = express.Router();

subjectsRoutes.get('/', getAllSubjects)
subjectsRoutes.get('/:id', getSubjectById)

subjectsRoutes.post('/', authenticateToken, isAdmin, createSubject)
subjectsRoutes.put('/:id', authenticateToken, isAdmin, updateSubject)
subjectsRoutes.delete('/:id', authenticateToken, isAdmin, deleteSubject)