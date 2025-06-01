import { errorHandler } from "../utils/responseHandler"


export const authenticateToken = (req, res, next) => {
    try {
        if (!req?.headers?.authorization) {
            return errorHandler(res, 404, "No Valid Token Found")
        }

        const token = req.headers.authorization

        const isValidToken = verify(token, process.env.JWT_SECRET_KEY)

        console.log(isValidToken, "==>> isValidToken")


        if (!isValidToken) {
            return errorHandler(res, 404, "Your token is expired", error.message)
        }

        req.user = isValidToken.data

        next()
    } catch (error) {
        return errorHandler(res, 404, "Phat gaya code", error.message)
    }
}