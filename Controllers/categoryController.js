import { successHandler, errorHandler } from '../utils/responseHandler.js'
import category from '../Models/category.js'

export const getAllCategories = async (req, res) => {
    try {
        const { limit, page } = req.query
        let limitOfRecords
        if (!limit) {
            limitOfRecords = 10
        } else {
            limitOfRecords = limit
        }
        let skip = (page - 1) * limitOfRecords
        const countNumbers = await category.countDocuments()
        const allCategory = await category.find().limit(limitOfRecords).skip(skip).sort({ createdAt: -1 });


        successHandler(res, 200, "All Categories get successfully", allCategory, limit)
    }
    catch (e) {
        return errorHandler(res, 400, e.message);
    }
}


export const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id
        const todo = await category.findById({ _id: categoryId })
        successHandler(res, 200, "Get Todo by ID", todo)
    }
    catch (e) {
        return errorHandler(res, 400, e.message);
    }
}


export const createCategory = async (req, res) => {
    const { categoryName, categoryImageUrl } = req.body

    if (!categoryName) {
        return errorHandler(res, 400, "Missing Fields")
    }

    try {
        await category.create({
            name: categoryName,
            imageUrl: categoryImageUrl || ""
        })

        return successHandler(res, 200, "Category is Created Successfully")
    }
    catch (error) {
        return errorHandler(res, 400, e.message);
    }
}


export const updateCategory = async (req, res) => {
    let requestedCategory = req.params.id;
    const { categoryName, categoryImageUrl } = req.body;
    if (!categoryName) {
        return errorHandler(res, 404, "In valid Params");
    }
    try {
        const categoryData = await category.findOneAndUpdate(
            { _id: requestedCategory },
            {
                $set: {
                    name: categoryName,
                    imageUrl: categoryImageUrl
                }
            },
            { new: true }
        );

        if (!categoryData) {
            return errorHandler(res, 400, "Something went wrong");
        }
        return successHandler(res, 200, "Category updated successfully", categoryData, categoryData.length)
    }
    catch (e) {
        return errorHandler(res, 400, e);
    }
}


export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const isCategoryExist = await category.findById({ _id: categoryId })

        if (!isCategoryExist) {
            return errorHandler(res, 400, "Category Not Found")
        }
        await category.findByIdAndDelete({ _id: categoryId })
        return successHandler(res, 200, "Deleted Category Successfully")
    }
    catch (error) {
        return errorHandler(res, 400, error.message)
    }
}