  import express, { urlencoded } from "express"
  import cookieParser from "cookie-parser"
const app=express();


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

 app.use(express.json({limit:"16kb"}));  //handles data on form submission type
 app.use(urlencoded({extended:true,limit: "17kb"})) // to handle and understand url data
 app.use(express.static("public"))
 app.use(cookieParser())

export default app 
