import express from 'express';
//引入carousel_data数据库
import CarouselModel from './../models/carousel_data';
import formidable from 'formidable';
import path, {basename} from 'path';
import config from './../src/config';
import Sowing from "../../../../12.24/Node-Day13/代码/likeManager/models/Sowing";
let router = express.Router();

router.post('/sowing/api/add',(req,res,next)=>{
    //初始化formidable对象
    let  form = new formidable.IncomingForm();
    //指定文件的存放位置
    form.uploadDir = config.upload_path;
    //是否保留文件后缀名
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if(err){
            return next(err)
        }
        let body = fields;
        //console.log(fields);
        //console.log(files);
        body.image_url = basename(files.image_url.path);
        body.image_small_url = basename(files.image_small_url.path);
        let carousel = new CarouselModel({
            //图片的名称  required 必须项目
            image_title : body.image_title,
            //图片的地址
             image_url : body.image_url,
            //小图片地址
             image_small_url : body.image_small_url,
            //图片的链接
             image_link : body.image_link,
            // 上架时间
             begin_time : body.begin_time,
            //下架时间
             end_time : body.end_time
        });
        carousel.save((err,result)=>{
            if(err){
                return next(err)
            }
            res.json({
                status_code: 200 ,
                result: '添加数据成功'
            })
        });

    });

});
router.get('/carousel/api/add',(req,res,next)=>{
    res.end('success')
});
// 接收表单提交的数据
/**
 * 往数据库中插入一条数据
 */
router.post('/carousel/api/add',(req,res,next)=>{
    const body = req.body;
    // => error
    // res.json(JSON.parse(req));
    let carousel = new CarouselModel({
        //图片名称
        image_title : body.image_title ,
        //图片地址
        image_url : body.image_url,
        image_small_url : body.image_small_url,
        //图片链接
        image_link : body.image_link,
        //上架时间
        begin_time : body.begin_time ,
        //下架时间
        end_time : body.end_time
    });
    carousel.save((err,result)=>{
        if(err){
            //数据储存失败将错误传下去
            return  next(err)
        }
        res.json({
            status:200,
            result:'数据库创建成功'
        })
    })

});
/**
 *
 * 获取轮播图数据（all）
 */
router.get('/carousel/api/list',(req,res,next)=>{
    CarouselModel.find((err,docs)=>{
        if(err){
            return next(err)
        }
        res.json({
            status_code :200,
            result:docs
        })
    })
});
/**
 *
 * 查询一条数据  (条件 id)
 /carousel/api/single/:carouselId 模糊路径匹配
 /carousel/api/single/*  路径形式按照如下输入
 /carousel/api/single/111 /carousel/api/single/222 /carousel/api/single/aaa
 /carousel/api/single
 /carousel/api/single/a/b
 *
 */
router.get('/carousel/api/single/:carouselId',(req,res,next)=>{
     CarouselModel.findById(req.params.carouselId,(err,doc)=>{
         if(err){
             return next(err)
         }
         res.json({
             status_code:200,
             result:doc
         })
     })

});
/**
 * 根据id修改一条数据
 */
router.post('/carousel/api/edit',(req,res,next)=>{
    const body = req.body;
    //根据id查询数据
   CarouselModel.findById(req.body.id,(err,carousel)=>{
       if(err){
           return next(err)
       }
       //修改数据
       carousel.image_title = body.image_title;
       carousel.image_url = body.image_url;
       carousel.image_small_url = body.image_small_url;
       carousel.image_link = body.image_link;
       carousel.begin_time = body.s_time;
       carousel.end_time = body.e_time;
       carousel.c_time = Date.now();
       carousel.l_time = Date.now()
       //保存
       carousel.save((err,result)=>{
           if(err){
               return next(err)
           }
           res.json({
               status_code:200,
               result:'修改数据成功'
           })
       })
   })
});
/**
 *
 * 根据id删除一条记录
 */
router.get('/carousel/api/remove/:carouselId',(req,res,next)=>{
    CarouselModel.remove({_id:req.params.carouselId},(err,result)=>{
        if(err){
            return next(err);
        }
        console.log(result);
        res.json({
            status_code: 200,
            result: '删除数据成功！'
        });
    })

});
/*
  加载轮播图的列表页面
*/
/*router.get('/sowing_list', (req, res, next) => {
    const page = Number.parseInt(req.query.page, 10) || 1;
    const pageSize = 3;
    // 查询数据库中所有的数据
    CarouselModel.find().skip((page-1)*pageSize).limit(pageSize).exec((err, sowings)=>{
        if(err){
            return next(err);
        }
        // 查询总的条数
        CarouselModel.count((err, count)=>{
            if(err){
                return next(err);
            }
            //  总页码 = 总记录数 / 每页显示的页数
            const  totalPage = Math.ceil(count / pageSize);
            console.log(totalPage);
            res.render('sowing_list.html', {sowings, totalPage, page});
        });
    });
});*/
/*获取数据库中的轮播数量*/
router.get('/sowing/api/count',(req,res,next)=>{
    CarouselModel.count((err,count)=>{
        if(err){
            return next(err)
        }
        res.json({
            status_code:200,
            result:count
        })
    })
});
router.get('/sowing/api/list',(req,res,next)=>{
    // 1. 接收传递的参数
   let {page , pageSize} = req.query;
    page = Number.parseInt(page);
    pageSize = Number.parseInt(pageSize);
   CarouselModel.find().skip((page-1)*pageSize).limit(pageSize).exec((err,sowings)=>{
       if(err){
           return next(err)
       }
       res.json({
           status_code:200,
           result:sowings
       })
   })
});
router.get('/sowing_list', (req, res, next)=>{
    //规定每页的数据量
    let singlePageCount = 3;
    //前端传来的page参数
    let page =  Number.parseInt(req.query.page, 10) || 1 ;
   //通过page来查询数据库中对应页的数据
    CarouselModel.find().skip((page-1)*singlePageCount).limit(singlePageCount).exec((err,sowings)=>{
        if(err){
            return next(err)
        }
        //查询总的条数
        CarouselModel.count((err,count)=>{
            if(err){
                return next(err)
            }
            //  总页码 = 总记录数 / 每页显示的页数
            let pageStep = Math.ceil(count/singlePageCount);
            res.render('sowing_list.html',{sowings,pageStep,page})

        });
     })


});
/*
  加载 添加轮播图的页面
*/
router.get('/sowing_add', (req, res, next)=>{
    res.render('sowing_add.html');
});

module.exports = router;