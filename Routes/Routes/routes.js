import express from 'express'
import { categoryRoutes } from './category.js'
import { chapterRoutes } from './chapter.js'
import { lessonRoutes } from './lesson.js'
import { subCategoryRoutes } from './subCategory.js'
import { subjectsRoutes } from './subjects.js'

export const apiRoutes = express.Router();

apiRoutes.use('/category', categoryRoutes)
apiRoutes.use('/chapter', chapterRoutes)
apiRoutes.use('/lesson', lessonRoutes)
apiRoutes.use('/subCategory', subCategoryRoutes)
apiRoutes.use('/subject', subjectsRoutes)