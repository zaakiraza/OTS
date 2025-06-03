import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subjectId: {
        type: String,
        require: true,
        ref: 'subject',
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


export default mongoose.model('chapter', chapterSchema);