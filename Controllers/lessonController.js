import { successHandler, errorHandler } from '../utils/responseHandler.js'
import lesson from '../Models/lesson.js'

export const getAllLessons = async (req, res) => {
    try {
        const { limit, page } = req.query
        let limitOfRecords
        if (!limit) {
            limitOfRecords = 10
        } else {
            limitOfRecords = limit
        }
        let skip = (page - 1) * limitOfRecords
        const countNumbers = await lesson.countDocuments()
        const allLesson = await lesson.find().limit(limitOfRecords).skip(skip).sort({ createdAt: -1 });


        successHandler(res, 200, "All Lessons get successfully", allLesson, limit)
    }
    catch (e) {
        return errorHandler(res, 400, e.message);
    }
}


export const getLessonById = async (req, res) => {
    try {
        const lessonId = req.params.id
        const lessons = await lesson.findById({ _id: lessonId })
        successHandler(res, 200, "Get Lesson by ID", lessons)
    }
    catch (e) {
        return errorHandler(res, 400, e.message);
    }
}


export const createLesson = async (req, res) => {
    const { lessonTitle, chapterId, description, duration, imageUrl } = req.body

    if (!lessonTitle || !chapterId || !duration || !imageUrl) {
        return errorHandler(res, 400, "Missing Fields")
    }

    try {
        await lesson.create({
            title: categoryName,
            chapterId: chapterId,
            description: description || "",
            duration: duration,
            imageUrl: imageUrl
        })

        return successHandler(res, 200, "lesson is Created Successfully")
    }
    catch (error) {
        return errorHandler(res, 400, e.message);
    }
}


export const updateLesson = async (req, res) => {
    let requestedLesson = req.params.id;
    const { lessonTitle, chapterId, description, duration, imageUrl } = req.body;
    if (!lessonTitle || !chapterId || !duration || !imageUrl) {
        return errorHandler(res, 400, "Missing Fields")
    }
    try {
        const lessonData = await lesson.findOneAndUpdate(
            { _id: requestedLesson },
            {
                $set: {
                    title: categoryName,
                    chapterId: chapterId,
                    description: description || "",
                    duration: duration,
                    imageUrl: imageUrl
                }
            },
            { new: true }
        );

        if (!lessonData) {
            return errorHandler(res, 400, "Something went wrong");
        }
        return successHandler(res, 200, "Lesson updated successfully", lessonData, lessonData.length)
    }
    catch (e) {
        return errorHandler(res, 400, e);
    }
}


export const deleteLesson = async (req, res) => {
    try {
        const lessonId = req.params.id;

        const isLessonExist = await lesson.findById({ _id: lessonId })

        if (!isLessonExist) {
            return errorHandler(res, 400, "Lesson Not Found")
        }
        await lesson.findByIdAndDelete({ _id: lessonId })
        return successHandler(res, 200, "Deleted Lesson Successfully")
    }
    catch (error) {
        return errorHandler(res, 400, error.message)
    }
}