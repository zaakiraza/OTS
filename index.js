import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './utils/DB.js'
import { apiRoutes } from './Routes/Routes/routes.js'
import { userRoutes } from './Routes/Users/users.js'
import { authRoutes } from './Routes/Auth/auth.js'
import { mailRoutes } from './Routes/Mailer/mail.js'

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json());

connectDB();

app.use("/api", apiRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes)
app.use("/mail", mailRoutes)
app.use("/", (req, res) => {
    res.send("Welcome");
})

app.listen(process.env.PORT, () => {
    console.log("server start");
})