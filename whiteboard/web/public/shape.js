let circle=document.querySelector("circle");
let rectangle=document.querySelector("rectangle");
let triangle=document.querySelector("triangle");
let sqaure=document.querySelector("square");
let star=document.querySelector("star");
let octagon=document.querySelector("octagon");
let hexagon=document.querySelector("hexagon");

circle.addEventListener("click",function(){
    let canvasContent=createCanvas();

    let canvas=document.createElement("canvas");
    canvas.style("height","30px");
    canvas.style("width","30px");
    canvas.setAttribute("id","shape-circle");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 70;
    
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = las;
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
})