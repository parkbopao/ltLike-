import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/lk_data');
mongoose.connection.once('open',()=>{
    console.log('数据库连接成功_error_log');
});
let errorSchema = mongoose.Schema({
    //错误名称
    error_title : {type: String , required:true},
    //错误信息
    error_message : {type : String , required: true},
    //错误时间
    error_time : {type : Date , default : Date.now},
    //错误堆栈
    error_stack : {type : String , required : true }
});

let Error_log = mongoose.model('Error',errorSchema);
export default Error_log