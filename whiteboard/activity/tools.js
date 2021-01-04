let pencil=document.querySelector("#pencil");
let pencilOptions=document.querySelector("#pencil-options");
let eraser=document.querySelector("#eraser");
let eraserOptions=document.querySelector("#eraser-options");

let red=document.querySelector(".red");
let blue=document.querySelector(".blue");
let yellow=document.querySelector(".yellow");
let green=document.querySelector(".green");
let black=document.querySelector(".black");

let pencilSize=document.querySelector("#pencil-size");
let eraserSize=document.querySelector("#eraser-size");

let lastPencilSize=1;
let lastEraserSize=1;

pencil.addEventListener("change",function(){
    lastPencilSize=pencilSize.value;
    ctx.lineWidth=lastPencilSize;
});

eraser.addEventListener("change",function(){
    lastEraserSize=eraserSize.value;
    ctx.lineWidth=lastEraserSize
});


red.addEventListener("click",function(){
    ctx.strokeStyle="red";
});
blue.addEventListener("click",function(){
    ctx.strokeStyle="blue";
});
yellow.addEventListener("click",function(){
    ctx.strokeStyle="yellow";
});
black.addEventListener("click",function(){
    ctx.strokeStyle="black";
});
green.addEventListener("click",function(){
    ctx.strokeStyle="green";
});



pencil.addEventListener("click",function(){
    if(pencil.classList.contains("active-tool")){
        if(pencilOptions.classList.contains("hide"))
            pencilOptions.classList.remove("hide");
        else
            pencilOptions.classList.add("hide");
    }else{
        ctx.strokeStyle="black";
        ctx.lineWidth=lastPencilSize;
        
        if(!eraserOptions.classList.contains("hide"))
            eraserOptions.classList.add("hide");
        pencil.classList.add("active-tool");
        eraser.classList.remove("active-tool");
    }
});

eraser.addEventListener("click",function(){
    if(eraser.classList.contains("active-tool")){
        if(eraserOptions.classList.contains("hide"))
            eraserOptions.classList.remove("hide");
        else
            eraserOptions.classList.add("hide");
    }else{
        ctx.strokeStyle="white";
        ctx.lineWidth=lastEraserSize;
        if(!pencilOptions.classList.contains("hide"))
            pencilOptions.classList.add("hide");
        eraser.classList.add("active-tool");
        pencil.classList.remove("active-tool");
    }
});