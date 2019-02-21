//配置所有的路径设置
import {join} from 'path';
export default {
    viewPath : join(__dirname,'../views'),
    publicStaticPath : join(__dirname,'../public'),
    publicModulePath : join(__dirname,'../node_modules'),
    upload_path: join(__dirname,'../public/uploads')
}