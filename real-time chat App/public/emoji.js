let icon=document.querySelector("#emoji-icon");
let emoji=document.querySelector(".emoji");

let smiley=document.querySelector(".smiley");
let laugh=document.querySelector(".laugh");
let angry=document.querySelector(".angry");
let dizzy=document.querySelector(".dizzy");
let flushed=document.querySelector(".flushed");
let frown=document.querySelector(".frown");
let frownOpen=document.querySelector(".frown-open");
let grimace=document.querySelector(".grimace");
let grin=document.querySelector(".grin");
let grinAlt=document.querySelector(".grin-alt");
let grinBeam=document.querySelector(".grin-beam");
let grimBeamSweat=document.querySelector(".grim-beam-sweat");

let heartEyes=document.querySelector(".heart-eyes");
let squint=document.querySelector(".squint");
let tiltedLaugh=document.querySelector(".tilted-laugh");
let starryEyes=document.querySelector(".starry-eyes");
let laughingTears=document.querySelector(".laughing-tears");
let tongueOut=document.querySelector(".out-tongue");
let tongueSquint=document.querySelector(".tongue-squint");
let tongueWink=document.querySelector(".tongue-wink");
let wink=document.querySelector(".wink");
let kiss=document.querySelector(".kiss");
let kissBeam=document.querySelector(".kiss-beam");
let kissHeart=document.querySelector(".kiss-heart");

let laughBeam=document.querySelector(".laugh-beam");
let laughSquint=document.querySelector(".laugh-squint");
let meh=document.querySelector(".meh");
let mehBlank=document.querySelector(".meh-blank");
let rollingEyes=document.querySelector(".rolling-eyes");
let sadCry=document.querySelector(".sad-cry");
let sadTear=document.querySelector(".sad-tear");
let smileBeam=document.querySelector(".smile-beam");
let smileWink=document.querySelector(".smile-wink");
let surprise=document.querySelector(".surprise");
let tired=document.querySelector(".tired");
let heart=document.querySelector(".heart");




icon.addEventListener("click",function(){
    console.log("clicked");
    if(emoji.classList.contains("hide")){
        emoji.classList.remove("hide");
    }
    else
        emoji.classList.add("hide");
});




smiley.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-smile"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

laugh.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-laugh"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

angry.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-angry"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

dizzy.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-dizzy"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

flushed.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-flushed"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

frown.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-frown"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

frownOpen.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-frown-open"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

grimace.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-grimace"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

grin.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-grin"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

grinAlt.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-grin-alt"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

grinBeam.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-grin-beam"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

grimBeamSweat.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-grin-beam-sweat"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

heartEyes.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-grin-hearts"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

squint.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-grin-squint"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

tiltedLaugh.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-grin-squint"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

starryEyes.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-grin-stars"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

laughingTears.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-grin-tears"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

tongueOut.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-grin-tongue"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

tongueSquint.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-grin-tongue-squint"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

tongueWink.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-grin-tongue-wink"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

wink.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-grin-wink"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

kiss.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-kiss"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

kissBeam.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-kiss-beam"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

kissHeart.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-kiss-wink-heart"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

laughBeam.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-laugh-beam"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

laughSquint.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-laugh-squint"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

meh.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-meh"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

mehBlank.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-meh-blank"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

rollingEyes.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-meh-rolling-eyes"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

sadCry.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-sad-cry"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

sadTear.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-sad-tear"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

smileBeam.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-smile-beam"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

smileWink.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-smile-wink"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

surprise.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-surprise"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

tired.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-tired"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});

heart.addEventListener("click",function(){
    let chat=document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("right");
    chat.innerHTML=`<i class="fas fa-heart"></i>`;
    chatList.append(chat);
    

    socket.emit("chat",chat.innerHTML);
});