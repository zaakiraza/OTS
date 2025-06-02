import { successHandler, errorHandler } from '../utils/responseHandler.js';
import subCategory from '../Models/subCategory.js'

export const getAllSubCategories = async (req, res) => {
    try {
        const { limit, page } = req.query
        let limitOfRecords
        if (!limit) {
            limitOfRecords = 10
        } else {
            limitOfRecords = limit
        }
        let skip = (page - 1) * limitOfRecords
        const countNumbers = await subCategory.countDocuments()
        const allSubCategory = await subCategory.find().limit(limitOfRecords).skip(skip).sort({ createdAt: -1 });


        successHandler(res, 200, "All subCategories get successfully", allSubCategory, limit)
    }
    catch (e) {
        return errorHandler(res, 400, e.message);
    }
}


export const getSubCategoryById = async (req, res) => {
    try {
        const subCategoryId = req.params.id
        const subCategory = await category.findById(subCategoryId)
        successHandler(res, 200, "Get subCategory by ID", subCategory)
    }
    catch (e) {
        return errorHandler(res, 400, e.message);
    }
}


export const createSubCategory = async (req, res) => {
    const { subCategoryName, categoryId } = req.body

    if (!subCategoryName || !categoryId) {
        return errorHandler(res, 400, "Missing Fields")
    }

    try {
        await subCategory.create({
            name: subCategoryName,
            categoryId: categoryId
        })

        return successHandler(res, 200, "SubCategory is Created Successfully")
    }
    catch (error) {
        return errorHandler(res, 400, e.message);
    }
}


export const updateSubCategory = async (req, res) => {
    let requestedSubCategory = req.params.id;
    const { subCategoryName, categoryId } = req.body;
    if (!subCategoryName || !categoryId) {
        return errorHandler(res, 404, "In valid Params");
    }
    try {
        const subCategoryData = await subCategory.findOneAndUpdate(
            { _id: requestedSubCategory },
            {
                $set: {
                    name: subCategoryName,
                    categoryId: categoryId
                }
            },
            { new: true }
        );


        if (!subCategoryData) {
            return errorHandler(res, 400, "Something went wrong");
        }
        return successHandler(res, 200, "subCategory updated successfully", subCategoryData, subCategoryData.length)
    }
    catch (e) {
        return errorHandler(res, 400, e);
    }
}


export const deleteSubCategory = async (req, res) => {
    try {
        const subCategoryId = req.params.id;
        const isSubCategoryExist = await subCategory.findById({ _id: subCategoryId })

        if (!isSubCategoryExist) {
            return errorHandler(res, 400, "subCategory Not Found")
        }
        await subCategory.findByIdAndDelete({ _id: subCategoryId })
        return successHandler(res, 200, "Deleted subCategory Successfully")
    }
    catch (error) {
        return errorHandler(res, 400, error.message)
    }
}