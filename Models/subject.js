import mongoose from "mongoose";


// english, urdu
const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subcategoryId: {
        type: String,
        required: true,
        ref: 'subCategory',
    },
    instructorId: {
        type: String,
        required: false,
        ref: 'user',
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


export default mongoose.model('subject', subjectSchema);