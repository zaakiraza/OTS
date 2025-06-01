import express from 'express'
import { getAllSubCategories, getSubCategoryById, createSubCategory, updateSubCategory, deleteSubCategory } from '../Controllers/subCategoryController.js'

export const subCategoryRoutes = express.Router();

subCategoryRoutes.get('/', getAllSubCategories)
subCategoryRoutes.get('/:id', getSubCategoryById)

subCategoryRoutes.post('/', authenticateToken, isAdmin, createSubCategory)
subCategoryRoutes.put('/:id', authenticateToken, isAdmin, updateSubCategory)
subCategoryRoutes.delete('/:id', authenticateToken, isAdmin, deleteSubCategory)