let puppeteer=require("puppeteer");

let tab;
let song="Ae dil hai mushkil";

let browserPromise=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args: ["--start-maximized"]
} )
browserPromise.then(function(browser){
    let pagePromise=browser.pages();
    return pagePromise;
})
.then(function(pages){
    let page=pages[0];
    tab=page;
    let gotoPromise=page.goto("https://www.youtube.com/");
    return gotoPromise;
})
.then (function(){
    let wait=tab.waitForSelector("#search.ytd-searchbox");
    return wait;
})
.then (function(){
    let searchTypedPromise=tab.type("#search.ytd-searchbox",song);
    return searchTypedPromise;
})
.then (function()
{
    let c=tab.click("#search-icon-legacy");
    return c;
})
.then(function(){
    console.log("yayyyyy");
})
.catch(function(error){
    console.log(error);
})