import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { errorHandler, successHandler } from '../../utils/responseHandler.js';

dotenv.config();

export const sendMail = async (req, res) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let info = await transporter.sendMail({
            from: `"Zakir 👨‍💻" <${process.env.EMAIL_USER}>`,
            to: req.body.receiver,
            subject: req.body.subject,
            text: req.body.text,
            html: `<b>${req.body.html}</b>`
        });
        return successHandler(res, 200, "Email sent successfully")
    } catch (e) {
        console.error('Error:', e);
        return errorHandler(res, 500, e.message)
    }
};
