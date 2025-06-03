import mongoose from "mongoose";


// academics and skill
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


export default mongoose.model('category', categorySchema);