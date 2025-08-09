
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













// By writing all the code in index file


/*import dotenv from "dotenv";
dotenv.config();



import mongoose from "mongoose"
import { DB_NAME } from "./constants.js"
import express from"express"
const app=express();
 (async ()=> {
    try{

        console.log("Tryiing to connect data base")

//console.log(`The  uri of db is ${process.env.MONGO_URI}/${DB_NAME}`);
       const dataBase= await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
       console.log("Connected to database\n")
       app.on("error",(error)=>{
        console.log(`Facing ${error} in connecting with express`);
            throw error;
       });
   
       console.log("The express is also working fine",dataBase.connection.host)
    }
    catch(error){
  console.error(`An error ${error} came in connecting the data base`);
      throw error;
    }
    //throw error;
})()
app.listen(process.env.PORT|| 8000,()=>{
    console.log(`This is listening on ${process.env.PORT}`)
   
});

*/


//CHAT BOT RESPONCE

/*import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

const app = express();

(async () => {
  try {
    console.log("Trying to connect to database...");

    const database = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
    console.log("Database connected successfully");

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });

  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
    process.exit(1); // Exit if DB fails to connect
  }
})();
*/