class ApiResquest extends Error{
    constructor(
         statusCode=false,
        message="Something went wrong",
        errors=[],
        stack="",
    ){
       
    
    super(message)
        this.message=this.message
        this.statusCode=this.statusCode
        this.errors=errors
        this.success=false

        
    
    if(stack){
        this.stack=stack
    }
    else{
        Error.captureStackTrace(this, this.constructor)
}

}
}
export default ApiResquest