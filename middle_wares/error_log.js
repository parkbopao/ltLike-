import  Error_log  from './../models/Error';
export default (errLog,req,res,next)=>{
    let error_log = new Error_log({
        //错误名称
        error_title: errLog.name,
        //错误信息
        error_message : errLog.message,
        //错误堆栈
        error_stack : errLog.stack
    });
    error_log.save((err,result)=>{
            res.json({
                err_code : 500,
                result : '服务器内部错误',
                message:errLog.message,
                error_stack : errLog.stack
            })
    })

}
