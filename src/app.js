//const express = require('express');
import express from 'express';
 //将配置路径引入
import config from './config';
//引入核心模块
import util from  'util';

//生成服务并开启
let app = express();

//设置静态资源文件位置
app.use(express.static(config.publicStaticPath));
app.use('/node_modules',express.static(config.publicModulePath));
//引入模板引擎
import nunjucks from 'nunjucks';

//设置视图位置和模板引擎
//app.set('views',config.viewPath);
//app.set('view engine','ejs');
nunjucks.configure(config.viewPath, {
    //自动缩进
    autoescape: true,
    express: app,
    //取消缓存
    noCache:true
});

// 引入路由文件
import indexRouter from './../routes/index'
import carouselRouter from  './../routes/carousel';

//引入中间价
import body_parser from './../middle_wares/body_parser';
import error_log from  './../middle_wares/error_log';
// 配置中间件在所有路由最前面
app.use(body_parser);
//挂载路由文件
/*
app.get('/',(req,res,next)=>{
    //res.write(util.inspect(req.body)+'////////////////////////////');
    //res.end(util.inspect(req))
    res.render('index.html')
});
*/
app.use(indexRouter);
app.use(carouselRouter);

//错误日志中间件放在最后面
app.use(error_log);
//监听服务
app.listen(3000,(err)=>{
    console.log('server is running.....')
});
