import mongoose, {Schema} from "mongoose"
// import dotenv from dotenv
// dotenv.config()
import "dotenv/config"
import bcrypt from "bcrypt"
import express from "express"
import jwt from "jsonwebtoken"
const userSchema=new Schema({
userName: {
    type : String,
    required:true,
    lowercase:true,
    unique:true,
    index:true,     //for search optimization
    trim:true,  // for removing leading and trailing whitespaces befor saving in database
},
userEmail: {
    type : String,
    required:true,
    lowercase:true,
    unique:true,
    trim:true,
},
userFullName: {
    type : String,
    required:true,
    lowercase:true,
    trim:true,
    index:true,
   
},
avatar:{
    type:String,   //cloudanary url
    required:true,

},
coverImage:{
    type:String, 
    
},
watchHistory:[{
   type:Schema.Types.ObjectId,
   ref:"Vedio"

}],
password:{
    type : String,
    required:[true,"Passowrd is required"],

},
refreshTokens:{
    type : String,
    //required: true,
},
},{timestamps:true})


userSchema.pre("save", async function(next){
    if(this.isModified("password")){
      this.password= await bcrypt.hash(this.password,10)
      next()
    }
    else{return next()}

})

userSchema.methods.isPasswordCorrect=async function(password){

    return await bcrypt.compare(password, this.password)   //returns true or false
}
// JWT is a bearer token

userSchema.methods.generateAccessTokens=function(){
   return jwt.sign({
        _id:this._id,
        userName:this.userName,
        userEmail:this.userEmail,
        userFullName:this.userFullName
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.generateRefreshTokens=function(){
   return jwt.sign({
        _id:this._id,
        userName:this.userName,
    },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}
export const User=mongoose.model("User",userSchema)