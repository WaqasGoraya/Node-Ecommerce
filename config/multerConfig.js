import multer from "multer";

const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images');
    },
    filename:(req,file,cb)=>{
        const Image = 'image' + Date.now() + file.originalname;
        cb(null,Image);
    }
});
const upload = multer({storage:fileStorage}).fields([{name:'image', maxCount: 1},{name:'gallery',maxCount:5}]) ;
// const upload = multer({storage:fileStorage,fileFilter:(req,file,cb)=>{
//     if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
//         cb(null,true)
//     }
//     else{
//         cb(null,false);
//     }
// }});
export default upload;