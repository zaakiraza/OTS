import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    chapterId: {
        type: String,
        require: true,
        ref: 'chapter',
    },
    description: {
        type: String,
        require: false,
    },
    duration: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
}, { timestamps: true })


export default mongoose.model('lesson', lessonSchema);