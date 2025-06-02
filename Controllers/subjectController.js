import { successHandler, errorHandler } from '../utils/responseHandler.js'
import subject from '../Models/subject.js'

export const getAllSubjects = async (req, res) => {
    try {
        const { limit, page } = req.query
        let limitOfRecords
        if (!limit) {
            limitOfRecords = 10
        } else {
            limitOfRecords = limit
        }
        let skip = (page - 1) * limitOfRecords
        const countNumbers = await subject.countDocuments()
        const allSubjects = await subject.find().limit(limitOfRecords).skip(skip).sort({ createdAt: -1 });


        successHandler(res, 200, "All Subjects get successfully", allSubjects, limit)
    }
    catch (e) {
        return errorHandler(res, 400, e.message);
    }
}


export const getSubjectById = async (req, res) => {
    try {
        const subjectId = req.params.id
        const subject = await subject.findById({ _id: subjectId })
        successHandler(res, 200, "Get subject by ID", subject, 1)
    }
    catch (e) {
        return errorHandler(res, 400, e.message);
    }
}


export const createSubject = async (req, res) => {
    const { subjectName, subcategoryId, instructorId, description, imageUrl, rating } = req.body

    if (!subjectName || !subcategoryId) {
        return errorHandler(res, 400, "Missing Fields")
    }

    try {
        await subject.create({
            name: categoryName,
            subcategoryId: subcategoryId,
            instructorId: instructorId,
            description: description,
            imageUrl: imageUrl,
            rating: rating,
        })

        return successHandler(res, 200, "Subject is Created Successfully")
    }
    catch (error) {
        return errorHandler(res, 400, e.message);
    }
}


export const updateSubject = async (req, res) => {
    let requestedSubject = req.params.id;
    const { subjectName, subcategoryId, instructorId, description, imageUrl, rating } = req.body;
    if (!subjectName || !subcategoryId) {
        return errorHandler(res, 404, "In valid Params");
    }
    try {
        const subjectData = await subject.findOneAndUpdate(
            { _id: requestedSubject },
            {
                $set: {
                    name: categoryName,
                    subcategoryId: subcategoryId,
                    instructorId: instructorId,
                    description: description,
                    imageUrl: imageUrl,
                    rating: rating,
                }
            },
            { new: true }
        );

        if (!subjectData) {
            return errorHandler(res, 400, "Something went wrong");
        }
        return successHandler(res, 200, "Subject updated successfully", subjectData, subjectData.length)
    }
    catch (e) {
        return errorHandler(res, 400, e);
    }
}


export const deleteSubject = async (req, res) => {
    try {
        const subjectId = req.params.id;

        const isSubjectExist = await subject.findById({ _id: subjectId })

        if (!isSubjectExist) {
            return errorHandler(res, 400, "Subject Not Found")
        }
        await subject.findByIdAndDelete({ _id: subjectId })
        return successHandler(res, 200, "Deleted subject Successfully")
    }
    catch (error) {
        return errorHandler(res, 400, error.message)
    }
}