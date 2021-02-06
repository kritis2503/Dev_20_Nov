let siteName=document.querySelector("#site-name");
let blockedList=document.querySelector("#blocked-list");
let blockBtn=document.querySelector("#block-site");

siteName.addEventListener("keyup",function(e){
    if(e.keyCode=="13")
        blockBtn.click();
});

blockBtn.addEventListener("click",function(){
    let site=siteName.value;
    if(site){
        let li=document
    }
})