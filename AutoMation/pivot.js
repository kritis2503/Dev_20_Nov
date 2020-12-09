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
    let s="Ross geller";
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
.then(function(){
    let w=tab.waitForTimeout(4000);
    return w;
})
.then(function(){
    let w=tab.waitForSelector(".hide-focus-ring.lNPNe");
    return w;
})

.then(function(){
    let c=tab.click(".hide-focus-ring.lNPNe");
return c; 
})
.then(function(){
    let w=tab.waitForTimeout(4000);
    return w;
})
.then(function(){
    let w=tab.waitForSelector(".hide-focus-ring.lNPNe");
    return w;
})

.then(function(){
    let c=tab.click(".hide-focus-ring.lNPNe");
return c; 
})
.then(function(){
    let w=tab.waitForTimeout(4000);
    return w;
})
.then(function(){
    let w=tab.waitForSelector(".hide-focus-ring.lNPNe");
    return w;
})

.then(function(){
    let c=tab.click(".hide-focus-ring.lNPNe");
return c; 
})
.then(function(){
    let w=tab.waitForTimeout(4000);
    return w;
})
.then(function(){
    let w=tab.waitForSelector(".hide-focus-ring.lNPNe");
    return w;
})

.then(function(){
    let c=tab.click(".hide-focus-ring.lNPNe");
return c; 
})
.then(function(){
    let w=tab.waitForTimeout(5000);
return w;
})
.then(function(){
    let c=tab.click("#logo");
    return c;
})
.then(function(){
    let w=tab.waitForSelector(".gLFyf.gsfi");
    return w;
})
.then(function(){
    let s="Joey Tribbiani";
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
.then(function(){
    let w=tab.waitForTimeout(5000);
return w;
})
.then(function(){
    let c=tab.click("#logo");
    return c;
})

.then(function(){
    let s="chandler bing";
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
.then(function(){
    let w=tab.waitForTimeout(4000);
return w;
})
.then(function(){
    let c=tab.click("#logo");
    return c;
})

.then(function(){
    let s="Monica geller";
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
.then(function(){
    let w=tab.waitForTimeout(4000);
return w;
})
.then(function(){
    let c=tab.click("#logo");
    return c;
})

.then(function(){
    let s="Phoebe buffay";
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
.then(function(){
    let w=tab.waitForTimeout(15000);
return w;
})
.then(function(){
    let c=tab.click("#logo");
    return c;
})

.then(function(){
    let s="Rachel Green";
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
.then(function(){
    let w=tab.waitForTimeout(4000);
return w;
})
.then (function(){
    console.log("kriti");
})
.catch(function(error){
    console.log(error);
})