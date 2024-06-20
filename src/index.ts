import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import myUserRoute from './routes/MyUserRoute'
import mongoose from "mongoose"
import {v2 as cloudinary} from "cloudinary";
import MyRestaurantController from "./controllers/MyRestaurantController"
import MyRestaurantRoute from "./routes/MyRestaurantRoute"
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
    console.log("MONGODB Connected")
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const app = express()
app.use(express.json())
app.use(cors())
app.get("/health",async(req:Request,res:Response)=>{
    res.send({message:"Health OK!"})
});
app.use("/api/my/user",myUserRoute);
app.use("/api/my/restaurant",MyRestaurantRoute)

app.listen(7000, () => {
    console.log("Server started on localhost 7000")
})