  
  import express, { Router, urlencoded } from "express"
  //import bodyParser from "express"
  import cookieParser from "cookie-parser"
  import dotenv from "dotenv"
  dotenv.config();
  import cors from "cors"
const app=express();


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

 app.use(express.json({limit:"100mb"}));//handles data on form submission type
 //app.use(bodyParser.json())
 app.use(express.urlencoded({extended:true,limit: "17kb"})) // to handle and understand url data
 app.use(express.static("public"))
 app.use(cookieParser())
 //app.use(userRoutes);

 //import router
 import router from "./routes/user.routes.js";
 // create route
app.use("/api/v1/user",router)
app.use("/api/v1",router)

export default app 
