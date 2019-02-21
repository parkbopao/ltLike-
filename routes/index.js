import express from 'express';
let router = express.Router();

router.get('/',(req,res,next)=>{
   res.render('index.html')
});
// export default router
module.exports = router ;