const{createUser}=require("../controller/userController");

const userRouter=require("express").Router();

userRouter.route("").post(createUser);

module.exports=userRouter;