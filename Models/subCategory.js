import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Number,
        required: true,
        ref: 'categorySchema',
    },
}, { timestamps: true })


export default mongoose.model('subCategorySchema', subCategorySchema);