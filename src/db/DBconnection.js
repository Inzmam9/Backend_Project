import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose"

import { DB_NAME } from "../constants.js";
  const connectDB=async ()=>{
    try{
        console.log("Trying to connect to database ", DB_NAME);

   const dataBase= await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`Connection Done with database`);


    }
    catch(error){
        console.log("Error in loading database",error);
    }
}
 
 export default connectDB