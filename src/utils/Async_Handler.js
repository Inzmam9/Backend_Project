

const asyncHandler=(asyncHandles)=>(req, res, next)=>{
  
    Promise.resolve(asyncHandles(req, res, next)).catch(error=> next(error))
}





export default asyncHandler
