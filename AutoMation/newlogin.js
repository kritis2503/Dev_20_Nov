const id="xacodi4805@ahhtee.com";
const pw="123456789"

const { fchown } = require("fs");
const puppeteer=require("puppeteer");

let gTab;
let gIdx;
let gCode;
(async function(){
    try{
let browser= await puppeteer.launch({
    headless:false ,
    defaultViewport: null,
    args:["--start-maximized"],
});
let pages=await browser.pages();
gTab=pages[0];
await gTab.goto("https://www.hackerrank.com/auth/login");
await gTab.type("#input-1",id);
await gTab.type("#input-2",pw);
await gTab.click(".ui-btn.ui-btn-large.ui-btn-primary");
await waitAndClick('#base-card-1-link');
await waitAndClick('#base-card-1-link');
await gTab.waitForSelector(".js-track-click.challenge-list-item" , {visible:true})
let allQues=await gTab.$$(".js-track-click.challenge-list-item");
let completeLinkPromise=[];
for(let i=0;i<allQues.length;i++) 
{
    let linkPromise=gTab.evaluate(function(elem){return elem.getAttribute("href")},allQues[i]);
    completeLinkPromise.push(linkPromise);
}
let pendingPromise= await Promise.all(completeLinkPromise);
let completeLinks=[];
for(let i=0;i<pendingPromise.length;i++)
{
    let completeLink=`http://www.hackerrank.com${pendingPromise}`
    completeLinks.push(completeLink);
}
console.log(completeLinks);
//await Questions(completeLinks);

// firstQuesSolvePromise.then(){
    // console.log("all QuesSolved");
// }
}
catch(error)
{
    console.log(error);
}
})();
function Questions(completeLinks)
{
    let firstQuesSolvePromise = solveQuestion(completeLinks[0]);

    for(let i=1 ; i<completeLinks.length ; i++){
      firstQuesSolvePromise = firstQuesSolvePromise.then(function(){
        let nextQuesSolvePromise = solveQuestion(completeLinks[i]);
        return nextQuesSolvePromise;
      })
    }
    return firstQuesSolvePromise;

   
}

async function waitAndClick(selector){
    //console.log(selector);
     await gTab.waitForSelector(selector,{visible:true});
     await gTab.click(selector);
}
function handleLockBtn(){
    return new Promise(function(resolve , reject){
      let waitPromise = gTab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled' , {visible:true , timeout:5000});
      waitPromise.then(function(){
        let mouseMovePromise = gTab.mouse.move(10,10);
        return mouseMovePromise;
      })
      .then(function(){
        let clickPromise = gTab.click('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
        return clickPromise;
      })
      .then(function(){
        //lock btn found
        console.log("lock button found !!");
        resolve();
      })
      .catch(function(error){
        // lock btn not found
        console.log("lock button not found !!");
        resolve();
      })
    })
  }
// async function handleLockBtn()
// {
    // try{
    // await gTab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled', {visible:true});
    //await gTab.mouse.move(10,10);
    // await gTab.mouse.click('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
    //await gTab.click('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
    // console.log("lock button found");
// }
    // catch{
        // console.log("lock button not found");
    // }
// }
async function getCode(){
    try{
        await gTab.waitForSelector('.hackdown-content h3',{visible:true});
        let allcodeNames=await gTab.$$('.hackdown-content h3');
        //console.log(allcodeNames);
        let allcodeNamePromise=[];
        for(let i=0;i<allcodeNames.length;i++)
        {
            let namePromise=gTab.evaluate(function(elem){return elem.textContent },allcodeNames[i]);
            allcodeNamePromise.push(namePromise);
        }
       let codeNames= await Promise.all(allcodeNamePromise);
        //console.log(allcodeNamePromise);
        let idx;
        for(let i=0;i<codeNames.length;i++){
            if(codeNames[i]=="C++"){
                idx=i;
                break;
            }
        }
        //console.log(idx);
        gIdx=idx;
        let allCodeElements=await gTab.$$('.hackdown-content .highlight');
        let codeDiv=allCodeElements[gIdx];
        //console.log(codeDiv);
        let code= await gTab.evaluate( function(elem){ return elem.textContent;  }, codeDiv);
        gCode=code;
        console.log(gCode);
    }
    catch(error){
        console.log(error);
    }
}
async function pasteCode()
{
    try{
        await gTab.click('div[data-attr2="Problem"]');
        waitAndClick('.custom-input-checkbox');
        //await waitForSelector('.custominput',{visible:true});
        await gTab.waitForSelector('.custominput', {visible: true});
        await gTab.type(".custominput" , gCode);
        await gTab.keyboard.down("Control");
        await gTab.keyboard.press("A");
        await gTab.keyboard.press("X");
        await gTab.click('.monaco-scrollable-element.editor-scrollable.vs');
        await gTab.keyboard.press("A");
        await gTab.keyboard.press("V");
        await gTab.keyboard.up("Control");
        await gTab.click('.pull-right.btn.btn-primary.hr-monaco-submit');
    }
    catch(error)
    {
        console.log(error);
    }
}
async function solveQuestion(QuesLink)
{
    await gTab.goto(QuesLink);
    waitAndClick('div[data-attr2="Editorial"]');
    await handleLockBtn();
    getCode();
    pasteCode();
}
