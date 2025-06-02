import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subcategoryId: {
        type: Number,
        required: true,
        ref: 'subCategorySchema',
    },
    instructorId: {
        type: Number,
        required: false,
        ref: 'userSchema',
    },
    description: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    rating: {
        type: Number,
        required: false,
        default: 0,
    },
}, { timestamps: true })


export default mongoose.model('subjectSchema', subjectSchema);