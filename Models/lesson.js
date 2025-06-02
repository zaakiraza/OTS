import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    chapterId: {
        type: Number,
        require: true,
        ref: 'chapterSchema',
    },
    description: {
        type: String,
        require: false,
    },
    duration: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true })


export default mongoose.model('lessonSchema', lessonSchema);