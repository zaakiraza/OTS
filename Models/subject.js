import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subcategoryId: {
        type: Number,
        required: true,
        author: { type: Schema.Types.ObjectId, ref: 'subCategorySchema' },
    },
    instructorId: {
        type: Number,
        required: false,
        author: { type: Schema.Types.ObjectId, ref: 'userSchema' },
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
        type: Float,
        required: false,
        default: 0,
    },
}, { timestamps: true })


export default mongoose.model('subjectSchema', subjectSchema);