let puppeteer= require("puppeteer");

let id="gokon21156@dkt1.com";
let pw="123456789";
let tab;

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
    let gotoPromise=page.goto("https://www.hackerrank.com/auth/login");
    return gotoPromise;
})
.then(function()
{
    let idTypedpromise=tab.type("#input-1",id);
    return idTypedpromise;
})
.then (function()
{
    let pwTypedpromise=tab.type("#input-2",pw);
    return pwTypedpromise;
})
.then(function()
{
    let loginPromise=tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return loginPromise;
})
.then(function()
{
    let waitandClickPromise=waitandClick("#base-card-1-link");
    return waitandClickPromise;
})
.then(function()
{
    let waitandClickPromise=waitandClick('a[data-attr1="warmup"]');
    return waitandClickPromise;
})
.then(function(){
    console.log("task done!!");
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