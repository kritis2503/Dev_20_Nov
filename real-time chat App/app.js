const express=require("express");
const app=express();

const http=require('http').Server(app);
const io=require('socket.io')(http);

app.use(express.static("public"));

let user=[];

io.on('connection',function(socket){
    console.log(`${socket.id} connected`);
    user.push({id:socket.id})

    socket.on("join",function(username){
        for(let i=0;i<user.length;i++){
            if(user[i].id==socket.id){
                user[i].username=username;
                break;
            }
        }
        socket.broadcast.emit("chat-join",username);
    })

    socket.on("chat",function(message){
        let username;
        for(let i=0;i<user.length;i++){
            if(user[i].id==socket.id){
                username=user[i].username;
                break;
            }
        }
        socket.broadcast.emit("chat-left",{message,username});
    })

    socket.on('disconnect',function(){
        let idx;
        let name;
        for(let i=0;i<user.length;i++){
            if(user[i].id==socket.id){
                idx=i;
                name=user[i].username;
                break;
            }
        }
        socket.broadcast.emit("leave",name);
        user.splice(idx,1);
    });
});

let port=3000;
http.listen(port,function(){
    console.log("Server started at port 3000");
})