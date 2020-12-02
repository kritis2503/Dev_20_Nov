let puppeteer=require("puppeteer");

let tab;
let browserPromise=puppeteer.launch({headless: false,
    defaultViewport:null,
    args: ["--start-maximized"]
})
browserPromise.then(function(browser){
    let pagePromise=browser.pages();
    return pagePromise
})
.then(function(pages){
    let page=pages[0];
    tab=page;
    let goTopromise=page.goto("https://www.google.com/");
    return goTopromise;
})
.then(function(){
    let s="Ross Geller";
    let typePromise=tab.type(".gLFyf.gsfi",s);
    return typePromise;
})
.then(function(){
    let e=tab.keyboard.press('Enter');
    return e;
})

.then(function(){
    let w=tab.waitForSelector(".hide-focus-ring.lNPNe");
    return w;
})
.then(function(){
    let c=tab.click(".hide-focus-ring.lNPNe");
    return c; 
})
// .then(function(){
    // let w=tab.waitForSelector(".hide-focus-ring.lNPNe");
    // return w;
// })
// 
// .then(function(){
    // let c=tab.click(".hide-focus-ring.lNPNe");
// return c; 
// })

.then(function(){
    let s="Joey Tribbiani";
    let typePromise=tab.type(".gLFyf.gsfi",s);
    return typePromise;
})
.then(function(){
    let e=tab.keyboard.press('Enter');
    return e;
})

.then (function(){
    console.log("kriti");
})
.catch(function(error){
    console.log(error);
})