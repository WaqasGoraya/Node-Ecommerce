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
const upload = multer({storage:fileStorage});
// const upload = multer({storage:fileStorage,fileFilter:(req,file,cb)=>{
//     if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
//         cb(null,true)
//     }
//     else{
//         cb(null,false);
//         return cb(new Error ('Only allowed png, jpg and jpeg file extension'));
//     }
// }});
export default upload;