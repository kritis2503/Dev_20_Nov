let puppeteer= require("puppeteer");

let id="gokon21156@dkt1.com";
let pw="123456789";
let tab;
let gtab;
let gIdx;
let gcode;
let browerPromise=puppeteer.launch({headless:false,
    defaultViewport:null,
    args:["--start-maximized"]
})
browerPromise.then(function(brower){
    let pagePromise=brower.pages();
    return pagePromise;
})
.then(function(pages){
    let page=pages[0];
    tab=page;
    gtab=tab;
    let gotoPromise=page.goto("https://www.hackerrank.com/auth/login");
    return gotoPromise;
})
.then(function()
{
    let idTypedpromise=gtab.type("#input-1",id);
    return idTypedpromise;
})
.then (function()
{
    let pwTypedpromise=gtab.type("#input-2",pw);
    return pwTypedpromise;
})
.then(function()
{
    let loginPromise=gtab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return loginPromise;
})
.then(function()
{
    let waitandClickPromise=waitandClick("#base-card-1-link");
    return waitandClickPromise;
})
.then(function()
{
    let waitandClickPromise=waitandClick("#base-card-1-link");
    return waitandClickPromise;
})
.then(function(){
    let waitpromise=gtab.waitForSelector(".js-track-click.challenge-list-item" , {visible:true});
    return waitpromise;
})
.then(function(){
    let allQuestionsPromise=gtab.$$(".js-track-click.challenge-list-item");
    return allQuestionsPromise;
})
.then(function(allQuesElements){
    let completeLinkPromise=[];
    for(let i=0;i<allQuesElements.length;i++)
    {
        let linkPromise=gtab.evaluate(function(elem){ return elem.getAttribute("href")},allQuesElements[i]);
        completeLinkPromise.push(linkPromise);
    }
    let pendingPromiseofAllLinks=Promise.all(completeLinkPromise);
    return pendingPromiseofAllLinks;
})
.then(function(allLinks){
    let compeleteLinks=[];
    for(let i=0;i<allLinks.length;i++){
        let compeleteLink=`http://www.hackerrank.com${allLinks[i]}`;
        compeleteLinks.push(compeleteLink);
    }
    console.log(compeleteLinks);

    let firstQuesolvePromise=solveQuestion(compeleteLinks[0]);

    for(let i=1;i<compeleteLinks.length;i++){
        console.log("first wala");
        let nextQuesSolvepromise=solveQuestion(compeleteLinks[i]);
        return nextQuesSolvepromise;
    }
    return firstQuesolvePromise;
 })
.then(function(){
    console.log("All Questions solved successfully");
})
.catch(function(error)
{
    console.log(error);
})
function waitandClick(selector)
{
    return new Promise(function(resolve,reject)
    {
        let waitpromise=tab.waitForSelector(selector, {visible:true});
        waitpromise.then(function(){
            let clickpromise=tab.click(selector);
            return clickpromise;
        })
        .then(function()
        {
            resolve();
        })
        .catch(function()
        {
            reject();
        })

    })
}
function getCode(){
    return new Promise( function(resolve , reject){
        console.log("Welcome to getcode");
      let waitPromise = gtab.waitForSelector(".hackdown-content h3" , {visible:true});
      waitPromise.then(function(){
        let allCodeNamesElementsPromise = gtab.$$(".hackdown-content h3");
        return allCodeNamesElementsPromise;
      })
      .then(function(allCodeNamesElements){
        // [ <h3>C++</h3> , <h3>Java</h3> , <h3>Python</h3>];
        //let allCodeNamesPromise = [  Promise<pending> , Promise<pending> , Promise<pending> ];
        let allCodeNamesPromise = [];
        for(let i=0 ; i<allCodeNamesElements.length ; i++){
          let namePromise = gtab.evaluate( function(elem){ return elem.textContent;  } , allCodeNamesElements[i] );
          allCodeNamesPromise.push(namePromise);
        }
        let promiseOfAllCodesNames = Promise.all(allCodeNamesPromise);
        return promiseOfAllCodesNames;
      })
      .then(function(codeNames){
         //[C++ , Java , Python];
         let idx;
         for(let i=0 ; i<codeNames.length ; i++){
           if(codeNames[i] == "C++"){
             idx = i;
             break;
           }
         }
         gIdx = idx;
         let allCodeElementsPromise = gtab.$$(".hackdown-content .highlight");
         return allCodeElementsPromise;
      })
      .then(function(allCodeElements){
        // [<div> </div> , <div> </div> , <div> </div>  ]
        let codeDiv = allCodeElements[gIdx];
        let codePromise = gtab.evaluate( function(elem){  return elem.textContent; }  , codeDiv)
        return codePromise;
      })
      .then(function(code){
        // console.log(code);
        gcode = code;
        console.log("code copied");
        resolve();
      })
      .catch(function(error){
        reject(error);
      })
    });
  }
function pasteCode(){
    return new Promise(function(resolve,reject){
        console.log("Welcome to paste code");
        let problemTabClickedPromise=gtab.click('div[data-attr2="Problem"]');
        problemTabClickedPromise.then(function(){
            console.log("checkbox clicked");
            let waitandClickPromise=waitandClick('.custom-input-checkbox');
            return waitandClickPromise;
        })
        .then(function(){
            let codeTypedPromise=gtab.type(".custominput",gcode);
            return codeTypedPromise;
        })
        .then (function(){
            let ctrlKeyDownPromise=gtab.keyboard.down("Control");
            return ctrlKeyDownPromise;
        })
        .then(function(){
            let aKeyPressPromise=gtab.keyboard.press("A");
            return aKeyPressPromise;
        })
        .then(function(){
            let xKeyPressPromise=gtab.keyboard.press("X");
            return xKeyPressPromise;
        })
        .then(function(){
            let clickedOnCodePromise=gtab.click(".monaco-scrollable-element.editor-scrollable.vs");
            return clickedOnCodePromise;
        })
        .then(function(){
            let aKeyPressPromise=gtab.keyboard.press("A");
            return aKeyPressPromise;
        }).then(function(){
            let vKeyPressPromise=gtab.keyboard.press("V");
            return vKeyPressPromise;
        })
        .then(function(){
            let codeSubmitPromise=gtab.click('.pull-right.btn.btn-primary.hr-monaco-submit');
            return codeSubmitPromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error);
        })

    })
}
function handlelockBtn(){
    return new Promise(function(resolve,reject){
        let waitPromise = gtab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled' , {visible:true , timeout:5000});

        waitPromise.then(function(){
            let mouseMovePromise=gtab.mouse.move(10,10);
            return mouseMovePromise;
        })
        .then(function(){
            let clickpromise=gtab.click('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
            return clickpromise;
        })
        .then(function(){
            console.log("lock button found!!!");
            resolve();
        })
        .catch(function(){
            console.log("lock button not found!!!");
            resolve();
        })
    })
}
function solveQuestion(quesLink){
    return new Promise(function(resolve,reject){
        let gotoQuesPromise=gtab.goto(quesLink);
        gotoQuesPromise.then(function(){
            let waitandClickPromise=waitandClick('div[data-attr2="Editorial"]');
            console.log("solve question-go to question");
            return waitandClickPromise;
        })
        .then(function(){
            let lockbtnPromise=handlelockBtn();
            return lockbtnPromise;
        })
        .then(function(){
            let codePromise=getCode();
            return codePromise;
        })
        .then(function(){                     
            let codePastePromise=pasteCode();
            return codePastePromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error);
        })
    })
}