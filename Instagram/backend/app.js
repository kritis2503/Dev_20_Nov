const express=require("express");
const userRouter=require("./router/userRouter");

const app=express();

app.use("/api/user",userRouter);

app.listen(3000,function(){
    console.log("server started at 3000");
})