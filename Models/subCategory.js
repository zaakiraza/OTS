import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    categoryId:{
        type: Number,
        required: true,
        author: { type: Schema.Types.ObjectId, ref: 'categorySchema' }
    },
}, { timestamps: true })


export default mongoose.model('subCategorySchema', subCategorySchema);