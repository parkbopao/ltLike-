// 1.收件过滤get请求,然后过滤掉文件（图片，视频）等大型流文件处理，只处理表单提交
import queryString from 'querystring';
export default (req,res,next)=>{
    //1.1过滤get请求
    if(req.method.toLowerCase() === 'get'){
        return next()
    }
    // 1.2. 如果是普通的表单提交, 要处理  application/x-www-form-urlencoded
    //  如果有文件(图片, 音视频, ...), 不要处理  multipart/form-data
    if(req.headers['content-type'].startsWith('multipart/form-data')){
          return next()
    }
 /*   if(req.headers['content-type'].startsWith('application/x-www-form-urlencoded')){
        let data = '';
        req.on('data',(chunk)=>{
            data += chunk
        });
        req.on('end',()=>{
            req.body = queryString.parse(data);
            next()
        })
    }*/
    //1.3 数据流的拼接
    let data = '';
    req.on('data',(chunk)=>{
        data += chunk
    });
    req.on('end',()=>{
        req.body = queryString.parse(data);
        next()
    })
}