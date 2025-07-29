class ApiResponse{
    constructor(message="Success",statusCode,data){
        this.message=""
        this.data=""
        this.Success=statusCode<400

    }
}