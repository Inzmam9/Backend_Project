import multer from "multer"
import fs from "fs"
import path from "path"




// const uploadDir = path.resolve("public", "temp"); // resolves to backend_project/public/temp

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }
// const storage=multer.diskStorage({destination:function(req, file,cb){

// const uploadDir = path.resolve("public", "temp");

// // Ensure it exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }



// cb(null,uploadDir)
// //cb(null,"./public/temp/")
// },
// filename:function(req,file,cb){
//     cb(null,file.originalname) //file.filename takes the name of file save in db

// }

// })

// Again practicing multer


const storage=multer.diskStorage({
  destination:function (req,file,cb){
cb(null,"./public/temp/")
  },
  filename:function (req, file, cb) {cb(null,file.originalname)}
})






// const uploadDir = path.resolve("public", "temp"); // resolves to backend_project/public/temp

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }
// const storage=multer.diskStorage({destination:function(req, file,cb){

// const uploadDir = path.resolve("public", "temp");

// // Ensure it exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }



// cb(null,uploadDir)
// //cb(null,"./public/temp/")
// },
// filename:function(req,file,cb){
//     cb(null,file.originalname) //file.filename takes the name of file save in db

// }

// })



 export const upload=multer({storage})


