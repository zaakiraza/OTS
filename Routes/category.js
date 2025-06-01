import express from 'express'
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../Controllers/categoryController.js'

export const categoryRoutes = express.Router();

categoryRoutes.get('/', getAllCategories)
categoryRoutes.get('/:id', getCategoryById)

categoryRoutes.post('/', authenticateToken, isAdmin, createCategory)
categoryRoutes.put('/:id', authenticateToken, isAdmin, updateCategory)
categoryRoutes.delete('/:id', authenticateToken, isAdmin, deleteCategory)