import { successHandler, errorHandler } from '../utils/responseHandler.js'
import chapter from '../Models/chapter.js'

export const getAllChapters = async (req, res) => {
    try {
        const { limit, page } = req.query
        let limitOfRecords
        if (!limit) {
            limitOfRecords = 10
        } else {
            limitOfRecords = limit
        }
        let skip = (page - 1) * limitOfRecords
        const countNumbers = await chapter.countDocuments()
        const allChapter = await chapter.find().limit(limitOfRecords).skip(skip).sort({ createdAt: -1 });


        successHandler(res, 200, "All chapters get successfully", allChapter, limit)
    }
    catch (e) {
        return errorHandler(res, 400, e.message);
    }
}


export const getChapterById = async (req, res) => {
    try {
        const chapterId = req.params.id
        const chapter = await chapter.findById({ _id: chapterId })
        successHandler(res, 200, "Get chapter by ID", chapter)
    }
    catch (e) {
        return errorHandler(res, 400, e.message);
    }
}


export const createChapter = async (req, res) => {
    const { chapterTitle, subjectId, description, duration, imageUrl } = req.body
    if (!chapterTitle || !subjectId || !duration || !imageUrl) {
        return errorHandler(res, 404, "Feilds are missing");
    }

    try {
        await chapter.create({
            title: chapterTitle,
            subjectId: subjectId,
            description: description || "",
            duration: duration,
            imageUrl: imageUrl
        })

        return successHandler(res, 200, "Chapter is Created Successfully")
    }
    catch (error) {
        return errorHandler(res, 400, e.message);
    }
}


export const updateChapter = async (req, res) => {
    let requestedChapter = req.params.id;
    const { chapterTitle, subjectId, description, duration, imageUrl } = req.body
    if (!chapterTitle || !subjectId || !duration || !imageUrl) {
        return errorHandler(res, 404, "Feilds are missing");
    }
    try {
        const chapterData = await chapter.findOneAndUpdate(
            { _id: requestedChapter },
            {
                $set: {
                    title: chapterTitle,
                    subjectId: subjectId,
                    description: description || "",
                    duration: duration,
                    imageUrl: imageUrl
                }
            },
            { new: true }
        );

        if (!chapterData) {
            return errorHandler(res, 400, "Something went wrong");
        }
        return successHandler(res, 200, "Chapter updated successfully", chapterData, chapterData.length)
    }
    catch (e) {
        return errorHandler(res, 400, e);
    }
}


export const deleteChapter = async (req, res) => {
    try {
        const chapterId = req.params.id;

        const isChapterExist = await chapter.findById({ _id: chapterId })

        if (!isChapterExist) {
            return errorHandler(res, 400, "Chapter Not Found")
        }
        await chapter.findByIdAndDelete({ _id: chapterId })
        return successHandler(res, 200, "Deleted Chapter Successfully")
    }
    catch (error) {
        return errorHandler(res, 400, error.message)
    }
}