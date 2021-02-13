const express=require("express");
const requestRouter = require("./router/requestRouter");
const userRouter=require("./router/userRouter");

const app=express();

app.use(express.static("public"));
app.use(express.json());

app.use("/api/user",userRouter);
app.use("/api/request" , requestRouter);

app.listen(3000,function(){
    console.log("server started at 3000");
})