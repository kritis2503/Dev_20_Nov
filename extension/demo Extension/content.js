// let images=document.querySelectorAll("img");

let localImages=["./images/dd.jpeg","./images/n.jpg","./t.jpeg"];

// for(let i=0;i<images.length;i++){
    // let idx=Math.floor(Math.random()*localImages.length);
    // let absolutePath=chrome.extension.getURL(localImages[idx]);
    // images[i].src=absolutePath;
// }

function changeImages(){
    let images=document.querySelectorAll("img");
    for(let i=0;i<images.length;i++){
        let idx=Math.floor(Math.random()*localImages.length);
        let absolutePath=chrome.extension.getURL(localImages[idx]);
        images[i].src=absolutePath;
    }
}

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    changeImages();
    sendResponse("images have been changed");
});