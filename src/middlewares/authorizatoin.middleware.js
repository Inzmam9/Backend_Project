import asyncHandler from "../utils/Async_Handler.js";
import { User } from "../models/user.model.js";
//import jwt, { verify } from "jsonwebtoken"
//import jwt from "jsonwebtoken"
//import pkg from 'jsonwebtoken';
import { ApiResponse } from "../utils/API_Response.js";
import ApiError from "../utils/API_Error.js";
//import { use } from "react";
import jwt from "jsonwebtoken"
export const sign = jwt.sign;
export const verify = jwt.verify;
// Export others as needed





 //const authorization=asyncHandler(async(req,res,next)=>{
// 
//try {
    
//     req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ","")
//     if(!req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ","")){
//         throw new ApiError(404,"Token not found")
    
//     }
//     const token= await req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ","")
    
    
//     const verifyUser=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
//     if(!verifyUser){
//          throw new ApiError(500,"User not verified")
//     }
    
    
//     const user=await User.findById(verifyUser._id).select("-password -refreshTokn")
    
//     if(!use){
//         throw new ApiError(500, "Error in finding user")
//     }
    
//     req.user=user
    
//     next()
    
    
    
// } catch (error) {
//     throw new ApiError(404,"")
// }

// })



// 

const authorization=async(req, _, next)=>

{
    const accessToken=req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ","")
    if(!accessToken){
     throw new ApiError(404, "Cookies not recieved")
    }
    console.log("cookies recieved")
    console.log(accessToken)
    const verifiedStatus=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
    if(!verifiedStatus){
        throw new ApiError(500,"Token cant be verified")
    }
    console.log("cookie status verified")
//const user=await User.findOne(accessToken?._id).select("-password -refreshTokens")
//const user=await User.findById(verifiedStatus?._id).select("-password -refreshTokens")
const user=await User.findById(verifiedStatus?._id).select("-password")

console.log("Logging uer",user)
if(!user){
    throw new ApiError(501, "User not found")
}
req.user=user
console.log("LOggoin user details",user.userName)
//res.status(200, new ApiResponse("User log out",200,{}))  
next()
}
















export {authorization}