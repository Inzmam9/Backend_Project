import {v2 as cloudinary} from "cloudinary"
import fs, { unlink, unlinkSync } from "fs"
import dotenv from "dotenv"
dotenv.config();

//(async function() {

    // Configuration
    cloudinary.config({ 
    //     cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`, 
    //     api_key:`${process.env.CLOUDINARY_API}` , 
    //     api_secret: `${process.env.CLOUDINARY_SECRET}`  // Click 'View API Keys' above to copy your API secret
             cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
         api_key:process.env.CLOUDINARY_API , 
        api_secret:process.env.CLOUDINARY_SECRET  // Click 'View API Keys' above to copy your API secret

    
     }) 
      const uploadOnCloudinary= async (filePath)=>{
        try {
           const response=await cloudinary.uploader.upload(filePath,{resourse_type:"auto"})
           console.log('file uploader on cloudinary\n')
           fs.unlinkSync(filePath)
        return response
    
        } catch (error) {
            console.log(` ${error} `)
            fs.unlinkSync(filePath)
            return null
        }
    }
    

    //wrong code 
    
   // });
    // const uploadOnCloudinary= async (filePath)=>{
    //     try {
    //        const response=await cloudinary.uploader.upload(filePath,{resourse_type:"auto"})
    //        console.log('file uploader on cloudinary\n')
    //        //fs.unlinkSync(filePath)
    //     return response
    
    //     } catch (error) {
    //         console.log(` ${error} `)
    //         fs.unlinkSync(filePath)
    //         return null
    //     }
    // }
export{uploadOnCloudinary}