import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

export const sendMail = async () => {
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS  // Use Gmail App Password, not your actual password
        }
    });


    // Wrap in an async IIFE so we can use await.
    await transporter.sendMail({
        from: `${req.body.name} <${req.body.email}>`,
        to: adminEmail,
        subject: req.body.subject,
        text: req.body.message,
    });
}