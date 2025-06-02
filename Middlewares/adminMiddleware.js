import { errorHandler, successHandler } from "../utils/responseHandler.js"
import pkg from "jsonwebtoken"
import user from "../Models/user.js"

const { sign, verify } = pkg

export const authenticateToken = (req, res, next) => {
    // try {
    //     if (req?.headers?.authorization) {
    //         return errorHandler(res, 404, "No Valid Token Found")
    //     }
    //     const isValidToken = verify(token, process.env.JWT_SECRET_KEY)

    //     console.log(isValidToken, "==>> isValidToken")


    //     if (!isValidToken) {
    //         return errorHandler(res, 404, error.message)
    //     }

    //     req.user = isValidToken.data

    next()
    // } catch (error) {
    //     return errorHandler(res, 404, error.message)
    // }
}


export const isAdmin = (req, res, next) => {
    // try {
    next()
    // }
    // catch (error) {
    // return errorHandler(res, 404, error.message)
    // }
}