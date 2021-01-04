let canvas=document.querySelector("#canvas");
let ctx=canvas.getContext('2d');

let {top:canvasTop}=canvas.getBoundingClientRect();

canvas.height=window.innerHeight-canvasTop;
canvas.width=window.innerWidth;

window.addEventListener("resize",function(){
    canvas.height=window.innerHeight-canvasTop;
    canvas.width=window.innerWidth;
});

let isPenDown=false;
ctx.lineCap="round";
canvas.addEventListener("mousedown",function(e){
    isPenDown=true;
    let x=e.clientX;
    let y=e.clientY-canvasTop;

    ctx.beginPath();
    ctx.moveTo(x,y);
});

canvas.addEventListener("mousemove",function(e){
    if(isPenDown){
        let x=e.clientX;
        let y=e.clientY-canvasTop;

        ctx.lineTo(x,y);
        ctx.stroke();
    }
});

canvas.addEventListener("mouseup",function(e){
    isPenDown=false;
})