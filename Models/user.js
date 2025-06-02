import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    // Need to create seperate user roles table in future
    roleId: {
        type: Number,
        required: false,
    },
    dob: {
        type: Date,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    qualification: {
        type: String,
        required: false,
    },
    designation: {
        type: String,
        required: false,
    },
    youAre: {
        type: String,
        required: false,
    },
    rememberToken: {
        type: String,
        required: false,
    },
    resetCode: {
        type: String,
        required: false,
    },
    resetCodeExpiresAt: {
        type: Date,
        required: false,
    },
    emailVerified: {
        type: Boolean,
        required: true,
        default: false
    },
}, { timestamps: true })


export default mongoose.model('userSchema', userSchema);