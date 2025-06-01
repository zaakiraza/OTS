import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    imageUrl: {
        type: String,
        required: false
    },
}, { timestamps: true })


export default mongoose.model('categorySchema', categorySchema);