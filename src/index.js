
// Importing from other file
// import dotenv from "dotenv"
// dotenv.config();
import connectDB from "./db/DBconnection.js";
import app from "./app.js";


connectDB().then(()=>{

  app.listen( process.env.PORT || 8000,()=>{
    console.log(`App is listening on ${process.env.PORT}`)
  } )
  app.on("error",(error)=>{
        console.log(`An erro ${error} came in connection of express`);
        throw error
    })
    console.log(`Express is also conncected \n`);
}).catch((error)=>{
  console.log(`Found error : ${error} in connecting db`);
})



