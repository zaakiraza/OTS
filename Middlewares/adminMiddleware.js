import { errorHandler, successHandler } from "../utils/responseHandler.js"
import pkg from "jsonwebtoken"
import user from "../Models/user.js"

const { sign, verify } = pkg

let id;

export const authenticateToken = (req, res, next) => {
    try {
        if (req?.headers?.authorization) {
            return errorHandler(res, 404, "No Valid Token Found")
        }
        const isValidToken = verify(token, process.env.JWT_SECRET_KEY)

        if (!isValidToken) {
            return errorHandler(res, 404, error.message)
        }

        req.user = isValidToken.data

        id = isValidToken.data.id;
        next()
    }
    catch (error) {
        return errorHandler(res, 404, error.message)
    }
}


export const isAdmin = async (req, res, next) => {
    try {
        const userData = await user.findOne({ _id: id })
        if (!userData) {
            return errorHandler(res, 404, "User not found");
        }
        if (!userData.isAdmin) {
            return errorHandler(res, 400, "Access is denied");
        }
        next()
    }
    catch (e) {
        return errorHandler(res, 404, e.message)
    }
}