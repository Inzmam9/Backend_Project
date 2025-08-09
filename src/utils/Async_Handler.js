// const asyncHandler=(asyncHandles)=>async (req, res, next)=>{
//     try{
//         await asyncHandles(req, res, next)
//     }
//     catch(error){
//         res.status(err.code||500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }

const asyncHandler=(asyncHandles)=>(req, res, next)=>{
  
    Promise.resolve(asyncHandles(req, res, next)).catch(error=> next(error))
}





export default asyncHandler