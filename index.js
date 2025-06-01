import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {connectDB} from './utils/DB.js'
import {apiRoutes} from './Routes/routes.js'
dotenv.config();

const app = express()
app.use(cors())
app.use(express.json());

connectDB();

app.use("/api", apiRoutes);
app.use("/users", users);


app.listen(process.env.PORT, () => {
    console.log("server start");
})