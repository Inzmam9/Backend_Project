import {v2 as cloudinary} from "cloudinary"
import fs, { unlink, unlinkSync } from "fs"
import dotenv from "dotenv"
import asyncHandler from "./Async_Handler.js";
import ApiError from "./API_Error.js";
dotenv.config();

//(async function() {

    // Configuration
    //cloudinary.config({ 
    //     cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`, 
    //     api_key:`${process.env.CLOUDINARY_API}` , 
    //     api_secret: `${process.env.CLOUDINARY_SECRET}`  // Click 'View API Keys' above to copy your API secret
    //          cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    //      api_key:process.env.CLOUDINARY_API , 
    //     api_secret:process.env.CLOUDINARY_SECRET  // Click 'View API Keys' above to copy your API secret

    
    //  }) 
    //   const uploadOnCloudinary= async (filePath)=>{
    //     try {
    //        const response=await cloudinary.uploader.upload(filePath,{resourse_type:"auto"})
    //        console.log('file uploader on cloudinary\n')
    //        fs.unlinkSync(filePath)
    //     return response
    
    //     } catch (error) {
    //         console.log(` ${error} `)
    //         fs.unlinkSync(filePath)
    //         return null
    //     }
    // }
    

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
// writing cloudinary for practice again




cloudinary.config({ 
  
  
        cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`, 
        api_key:`${process.env.CLOUDINARY_API}` , 
        api_secret: `${process.env.CLOUDINARY_SECRET}`  // Click 'View API Keys' above to copy your API secret
             
  
  
  
      //wrong way of declearing cloud configuration
  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  // cloud_api_key: process.env.CLOUDINARY_API, 
  // cloud_api_secret: process.env.CLOUDINARY_SECRET
});
const uploadOnCloudinary=async(path)=>{
const response=await cloudinary.uploader.upload(path,{
    unique_filename:true,
    overwrite:true,
    use_filename: true,
    resource_type: "auto"
})
try{
console.log("File uploaded on cloudinarry")
console.log("removing file from local storage")
fs.unlinkSync(path)
return response

}


catch(error){
new ApiError(500, "Error in uploadinig file on cloudinary")
fs.unlinkSync(path)
}

}
export{uploadOnCloudinary}