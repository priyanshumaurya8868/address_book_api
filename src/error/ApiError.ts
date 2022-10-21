class ApiError {
  code: number;
  message: string;
  constructor(code : number, message: string) {
    this.code = code;
    this.message = message;
  }
  
  static unprocessableEntity(msg : string){
    return new ApiError(422,msg)
  }

  static  unauthorizedResponse(msg : string){
    return new ApiError(401,msg)
  }
  static resourceConflict(msg : string){
    return new ApiError(409,msg)
  }
  
  static badRequest(msg : string) {
    return new ApiError(400, msg);
  }

  static resourceNotFound(msg : string) {
    return new ApiError(404, msg);
  }

  static internal(msg : string) {
    return new ApiError(500, msg);
  }
}
export default ApiError;
