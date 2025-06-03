import { successHandler, errorHandler } from "../../utils/responseHandler.js"
import user from '../../Models/user.js'

export const getAllUsers = async (req, res) => {
    const userData = await user.find({}, '-isAdmin');
    if (userData) {
        return successHandler(res, 200, "This is users", userData, userData.length);
    }
    return errorHandler(res, 404, "no user found");
}