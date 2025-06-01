import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subjectId: {
        type: Number,
        require: true,
        author: { type: Schema.Types.ObjectId, ref: 'subjects' }
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


export default mongoose.model('chapterSchema', chapterSchema);