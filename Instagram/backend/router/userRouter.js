const{createUser, getAllUsers, getUserById, updateUserById, deleteUserById}=require("../controller/userController");

const userRouter=require("express").Router();

//localhost3000/api/user
userRouter.route("").get(getAllUsers).post(createUser);

//localhost3000/api/user/----
userRouter.route("/:id").get(getUserById).patch(updateUserById).delete(deleteUserById);

module.exports=userRouter;