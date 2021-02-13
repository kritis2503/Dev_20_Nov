const{
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
    }=require("../controller/userController");

const userRouter=require("express").Router();
//const multer=require("multer");
//const path=require("path");
//localhost3000/api/user

// const storage=multer.diskStorage({
    // destination: function(req,res,cb){
        // cb(null,'public/images/user');
    // },
    // filename:function(req,file,cb){
        // cb(null,Date.now()+path.extname(file.originalname));
    // }
// });
// 
// const fileFilter=function(req,file,cb){
    // if(file.mimetype=='image/jpeg' || file.mimetype=='image/png'|| file.mimetype=='image/jpg'){
        // cb(null,true);
    // }
    // else{
        // cb(null,false);
    // }
// }
// const upload=multer({storage:storage,  fileFilter: fileFilter});

userRouter.route("")
    .get(getAllUsers)
    //.post(upload.single('user'),createUser);
    .post(createUser);

//localhost3000/api/user/----
userRouter.route("/:id")
    .get(getUserById)
    // .patch(upload.single('user'),updateUserById)
    .patch(updateUserById)
    .delete(deleteUserById);

module.exports=userRouter;