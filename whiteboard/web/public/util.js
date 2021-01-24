function createSticky(){
    let sticky=document.createElement("div");
    sticky.classList.add("sticky");

    let stickyHeader=document.createElement("div");
    stickyHeader.classList.add("sticky-header");

    let stickyContent=document.createElement("div");
    stickyContent.classList.add("sticky-content");

    let minimize=document.createElement("div");
    minimize.classList.add("minimize");

    minimize.addEventListener("click",function(){
        stickyContent.style.display=stickyContent.style.display=="none"?"block":"none";
    });

    let close=document.createElement("div");
    close.classList.add("close");

    close.addEventListener("click",function(){
        sticky.remove();
    });

    stickyHeader.append(minimize);
    stickyHeader.append(close);
    sticky.append(stickyHeader);
    sticky.append(stickyContent);
    document.body.append(sticky);

    let initialX;
    let initialY;
    let isStickyHold=false;

    stickyHeader.addEventListener("mousedown",function(e){
        initialX=e.clientX;
        initialY=e.clientY;
        isStickyHold=true;
    });

    stickyHeader.addEventListener("mousemove",function(e){
        if(isStickyHold){
            let finalX=e.clientX;
            let finalY=e.clientY;

            let dx=finalX-initialX;
            let dy=finalY-initialY;

            let {top:stickyTop , left: stickLeft}=sticky.getBoundingClientRect();
            sticky.style.top=stickyTop+dy+"px";
            sticky.style.left=stickLeft+dx+"px";
            initialX=finalX;
            initialY=finalY;
        }
    })

    stickyHeader.addEventListener("mouseup",function(e){
        isStickyHold=false;
    });

    return stickyContent;
}