Socket.on("md",function(lineObject){
    let currentStrokeStyle=ctx.strokeStyle;
    let currentPenWidth=ctx.lineWidth;

    ctx.strokeStyle=lineObject.color;
    ctx.lineWidth=lineObject.width;

    ctx.beginPath();
    ctx.moveTo(lineObject.x,lineObject.y);
});

Socket.on("mm",function(lineObject){
    let currentStrokeStyle=ctx.strokeStyle;
    let currentPenWidth=ctx.lineWidth;
    ctx.strokeStyle=lineObject.color;
    ctx.lineWidth=lineObject.width;

    ctx.lineTo(lineObject.x,lineObject.y);
    ctx.stroke();

    ctx.strokeStyle=currentStrokeStyle;
    ctx.lineWidth=currentPenWidth;
})