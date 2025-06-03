import { hash, genSalt, compare, compareSync, genSaltSync, hashSync } from "bcrypt";
import { successHandler, errorHandler } from '../../utils/responseHandler.js'
import user from "../../Models/user.js";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg

export const signupController = async (req, res) => {
    try {
        const { firstName, lastName, userName, password, email, phone } = req.body
        if (!userName || !password || !email) {
            return errorHandler(res, 400, "Missing Fields")
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return errorHandler(res, 400, "Invalid email");
        }

        const isExists = await user.findOne({ $or: [{ email: email }, { userName: userName }] })

        if (isExists) {
            return errorHandler(res, 400, "UserName or Email Address already exists, please change and retry")
        }
        const salt = await genSaltSync(10);

        const newUser = await user.create({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: await hashSync(password, salt),
            email: email,
            phone: phone,
        })

        if (newUser) {
            return successHandler(res, 200, "user added successfully", newUser, 1);
        }
        return errorHandler(res, 400, "something went wrong");

    }
    catch (e) {
        return errorHandler(res, 400, e.message)
    }
}

export const loginController = async (req, res) => {
    const { email, password } = req.body

    const isExists = await user.findOne({ email: email })

    if (!isExists) {
        return errorHandler(res, 400, "No User with such email exists, please try to create account first")
    }

    const isValid = await compareSync(password, isExists.password);
    return successHandler(res, 200, "Valid email and password");
}

export const generateToken = async (req, res) => {
    const userData = await user.findOne({ _id: req.params.id });

    if (!userData) {
        return errorHandler(res, 400, "Invalid Id");
    }

    const { _id, email } = userData;

    try {
        const generateToken = sign({
            data: { id: _id, email: email },
            expiresIn: "24h",
        }, process.env.JWT_SECRET_KEY);

        console.log(generateToken);

        if (!generateToken) {
            return errorHandler(res, 400, "Error occur");
        }

        return successHandler(res, 200, "Token Generated", generateToken);
    }

    catch (e) {
        return errorHandler(res, 500, e.message);
    }
}