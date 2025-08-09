import asyncHandler from "../utils/Async_Handler.js";
import ApiError from "../utils/API_Error.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/fileUpload.js";
import { ApiResponse } from "../utils/API_Response.js";
import jwt from "jsonwebtoken"
const userRegister= asyncHandler(async(req,res,next)=>{
        //res.status(200).json({message:"Run seccessfully"})

        const {name, fullname,email,password}= await req.body
        console.log(`The email is ${email},  Name is ${name}`)

          console.log("Logining the req.body", req.body)
        if([name, fullname,email].some(field=>(field?.trim==""))){
                throw new ApiError(200,"All fields are required")
        }
        const checkUser=await User.findOne({email, fullname})
        //checking if user already exists 
           if(checkUser ){
            throw new ApiError(234,"Cananot resgister User already exsist")
           }
           else{
            console.log(`User with fullname${fullname} is register successfully\n`)
           }
            //pushing user into database
            const avatarLocalPath=req.files?.avatar[0]?.path
            const coverImageLocalPath=req.files?.coverImage[0]?.path
            console.log("Logining the req.file\n ")
            console.log(req.files)
            if(!avatarLocalPath){
                throw new ApiError(300, "Avatar is required field\n")
            }
            const avatarUrl= await uploadOnCloudinary(avatarLocalPath)
            const coverImageUrl= await uploadOnCloudinary(coverImageLocalPath)
            const createUser= await User.create({
                    userName:name,
                    userEmail:email,
                    userFullName:fullname.toLowerCase(),
                    avatar:avatarUrl.url,
                    coverImage:coverImageUrl.url || "",
                    password:password,
            })
            console.log("User created ")
           const findUser =await User.findById(createUser._id).select(    // the findById function returns all fields(values) if found
                                                        // select function unselct them
            " -refreshToken"
           )
            if(!findUser){
                throw new ApiError(500, "Something went wrong while registering user\n")

            }
           


          //Sending response
          return await res.status(200).json(new ApiResponse("All good", findUser, 201))
        

        }
)


                //Login controller 



                 

        
        const getAccessAndRefreshToken= async (userId)=>{       
          //  try {
       const user= await User.findById(userId)
       if(!user){
        throw new ApiError(401,"User not found")
       }
     const refreshToken=  user.generateRefreshTokens()
          const accessToken=  user.generateAccessTokens()
        user.refreshTokens=refreshToken
       
      await user.save({validateBeforSave: false})
   
        return {refreshToken, accessToken}
   
    // }
//   catch (error) {
//     throw new ApiError(505," Some thing went wrong while generating access token")
//  }
    }


    
              // const  userLogin=asyncHandler(async(req,res)=>{
                
              //    try {
                
              //             const {userName, email, password}=  req.body
              //             if (!(userName|| password)) {  
              //                   throw new ApiError(505, "The password and username not recieved")
              //             } 
              //               console.log(userName,email,password)
              //                   const  userSearch=await  User.findOne({
              //                     $or: [{userName}, {email}]
              //                   })

              //                 if(!userSearch){
              //                   throw new ApiError(500,"User is not registered")
                                
              //                 }
              //                 console.log("Usser mill gya")
                            
              //                 const checkUser= await userSearch.isPasswordCorrect(password)
              //                 if (!checkUser) {
              //                             throw new ApiError(400,"Access denined ")
              //                 } 
              //                 console.log("Password is matched")
                              
              //                   const {refreshToken,accessToken}=await getAccessAndRefreshToken(userSearch._id)
              //                   const loggedInUser= await User.findOne(userSearch._id).select("-password -refreshToken")
              //                   const options={
              //                     httpOnly:true,
              //                     secure:true
                                  
              //                   }
              //                   res.status(200).cookie("refreshToken",refreshToken, options).cookie("accessToken",accessToken).json(
              //                     new ApiResponse("User logged in Succesfully",200,{user:loggedInUser,accessToken,refreshToken },)//sending tokens is good practice

              //                     //Send the refresh token because it help in when reaching to mobile app dev/team 
              //                   )
                                
                      
              // } catch (error) 
              //   {             
              //   throw new ApiError(404,"An error in user login",error)


              //   }
              // }
              const userLogin=asyncHandler(async(req,res)=>{

               //try {
                const {userName,userEmail,password}= req.body
                if(!(userName||userEmail)){
                  throw new ApiError(400,"The username or email is invalid")
                }
                console.log(userName, userEmail,password)
               const  user=await  User.findOne({
                     $or: [{userName}, {userEmail}]
                      })
                if(!user){
                  throw new ApiError(404,"User not found")
                }

                const isPasswordCorrect=await user.isPasswordCorrect(password)
                if(!isPasswordCorrect){
                  throw new ApiError(400,"The password is not correct")
                }
                const {refreshToken,accessToken}=await getAccessAndRefreshToken(user._id)
                const options={
                  httpOnly:true,
                  secure:true
                }
                res.status(200).cookie("refreshToken",refreshToken,options).cookie("accessToken",accessToken,options)
                .json(new ApiResponse("User logedin successfully",{refreshToken,accessToken},200))

                





              // } catch (error) {
              //   throw new ApiError(400, "Failed to login the user ")
              // }


                }
              )


//User LogOut
/*->design a middleware  to access the user info
->update in the routes
->remove the access token info of user by updating
->send response and also remove the cookie of user

*/

const userLogOut=asyncHandler(async(req, res, )=>{

const user=await req?.user?._id
if(!user){
  throw new ApiError(502, "User not found in logout function")
}
await User.findOneAndUpdate(user,{
    $set:{refreshTokens:undefined,

        new:true
    }
   
})

 const options={
      httpOnly:true,
      secure: true
    }
    console.log("User LOgged out")
return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken").json(new ApiResponse("User Log out",200,{}))

})


//create and replace new  refresh token
/*
- Access old token by cookie
- create new token 
- send new token in cookie
-create a new route for new refresh token
*/
const createNewRefreshToken=asyncHandler(async (req,res)=>{

// try {
const incomingRefreshToken=req.cookies?.refreshToken||req.body.refreshToken||req.header("Authorization").replace("Bearer ","")
if(!incomingRefreshToken){
  throw new ApiError(504,"Token not recieved")
}
console.log(incomingRefreshToken)

const verifyToken= jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
if(!verifyToken){
  throw new ApiError(401, "Token did not matched")
}
//console.log('printing decoded token')
//console.log(verifyToken)
const user=await User.findById(verifyToken?._id)
if(!user){
  throw new ApiError(505,"user not found")
}
//const userDecodedToken=jwt.veri
 console.log("\n\nPrinting databse token",user?.refreshTokens)
// console.log("User mil gya")
// console.log("Printing resfrehToken ",incomingRefreshToken)
// console.log("Printing user reffresh",user?.refreshTokens)
if(incomingRefreshToken!==user.refreshTokens){
  throw new ApiError(500,"Unauthoirized refresh token")
}

const {refreshToken,accessToken}=await getAccessAndRefreshToken(verifyToken._id)

const options={
  httpOnly:true,
  secure:true
}
return res.status(200)
.cookie("accessToken",refreshToken,options)
.cookie("refreshToken",accessToken,options)
.json(new ApiResponse("Refresh token updated successfully",200,{accessToken:accessToken,refreshToken:refreshToken}))

  
// } catch (error) {
//   throw new ApiError(503,"Something went wrong in createrefresh Token function")
// }





})

// change current password
/*
-check if user is logged in 
-check incoming password and verify
-change password and update user data


*/

const changeCurrentPassword=asyncHandler(async(req,res)=>{

  const {incommingPasswrod,setNewPassword}=req.body
  if(!incommingPasswrod){
    throw new ApiError(402,"Password not recieved in change current password method")

  }
const user=req.user
const passwordVerify=await user.isPasswordCorrect(incommingPasswrod)
if(!passwordVerify){
  throw new ApiError(505,"Password not matched")
}
user.password=setNewPassword
user.save({validateBeforSave:false})
// const updateUser=await User.findByIdAndUpdate(user?._id,{
//   $set:{password:setNewPassword},
//   new:true,
 
// }).select("-password -refreshTokens -accessToken")

return res.status(200).json(new ApiResponse("Password changed Successfully",200,{updateUser}))


})

// get current user

export {userRegister,
        userLogin,userLogOut,createNewRefreshToken,changeCurrentPassword
      }  