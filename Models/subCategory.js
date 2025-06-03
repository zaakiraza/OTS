import mongoose from "mongoose";


// class 1,2,3,4 and courses name
const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
        required: true,
        ref: 'category',
    },
}, { timestamps: true })


export default mongoose.model('subCategory', subCategorySchema);