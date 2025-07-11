import express from 'express'
import { getAllChapters, getChapterById, deleteChapter, updateChapter, createChapter } from '../../Controllers/apiControlller/chapterController.js'
import {authenticateToken,isAdmin} from '../../Middlewares/adminMiddleware.js'

export const chapterRoutes = express.Router();

chapterRoutes.get('/', getAllChapters)
chapterRoutes.get('/:id', getChapterById)

chapterRoutes.post('/', authenticateToken, isAdmin, createChapter)
chapterRoutes.put('/:id', authenticateToken, isAdmin, updateChapter)
chapterRoutes.delete('/:id', authenticateToken, isAdmin, deleteChapter)