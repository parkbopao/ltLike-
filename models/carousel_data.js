//链接mongoDB数据库 创建schema模型对象 model集合
//引入模块
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/lk_data');
mongoose.connection.once('open',()=>{
    console.log('数据库连接成功_carousel_data');
});
let carouselSchema = mongoose.Schema({
      //图片的名称  required 必须项目
    image_title : { type : String , required : true},
      //图片的地址
    image_url   : {type : String , required: true },
     //小图片地址
    image_small_url:{type : String , required: true },
    //图片的链接
     image_link : {type : String , required : true},
     // 上架时间
     begin_time : {type : Date , required  : true},
     //下架时间
     end_time : { type: Date , required : true},
    //当前编辑时间
     c_time: {type: Date, default: Date.now},
    // 最后编辑时间
      l_time: {type: Date, default: Date.now},

});
let CarouselModel = mongoose.model('Carousel_model',carouselSchema);
export default CarouselModel

