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
    let a=animation("Joey Tribbaani",5000);
    return a;
})
.then(function(){
    console.log("Kriti");
})
.catch(function(){
    console.log(error);
})
function animation(character,wait)
{
    return new Promise(function(resolve,reject){
        let s=character;
        let typePromise=tab.type(".gLFyf.gsfi",s);
        typePromise.then(function(){
            let e=tab.keyboard.press('Enter');
            e.then(function(){
                let w=tab.waitForSelector(".hide-focus-ring.lNPNe");
                w.then(function(){
                    let w=tab.waitForTimeout(wait);
                    w.then(function(){
                        let c=tab.click("#logo");
                        return c;
                    })      
                })
            })
        })
        .then(function(){
            resolve();
        })
        .then(function(){
            reject();
        })           
    })
    
    
    
    
    
    
}
