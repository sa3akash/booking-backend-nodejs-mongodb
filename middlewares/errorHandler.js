const errorHandler = (err, req, res, next)=>{
    let err_Status = err.status || 500;
    let err_Message = err.message || "Internal server error";
    

   return res.status(err_Status).json({
       success: false,
       status: err_Status,
       message: err_Message,
       stack: err.stack
   });
}


export default errorHandler