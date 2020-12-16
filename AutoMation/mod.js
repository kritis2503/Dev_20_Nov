let id = "gokon21156@dkt1.com";
let pw = "123456789";


const puppeteer = require("puppeteer");
const challenges = require("./challenge");
//let tab;

// IIFE => Immediately Invoked Function Expressions

// waitForSelector

// waitForNavigation

(async function(){
    try{
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
          });

          let pages = await browser.pages();
           tab = pages[0];
          await tab.goto("https://www.hackerrank.com/auth/login");
          await tab.type("#input-1" , id);
          await tab.type("#input-2" , pw);
          
          await Promise.all( [ tab.waitForNavigation({waitUntil:"networkidle2"}) , tab.click(".ui-btn.ui-btn-large.ui-btn-primary")]);

          await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' , {visible:true});
          await tab.click('div[data-analytics="NavBarProfileDropDown"]');

          await Promise.all( [ tab.waitForNavigation({waitUntil:"networkidle2"}) , tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]') ] );

          await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li' , {visible:true});
          let bothLis = await tab.$$('.nav-tabs.nav.admin-tabbed-nav li');
          let manageChallengeLi = bothLis[1];
          // <li></li>
          await manageChallengeLi.click();
          await tab.waitForSelector('.btn.btn-green.backbone.pull-right' , {visible:true});
          
          // on challenges page
         await  addModerators(browser,tab);
          // await addModerators();
    }
    catch(error){
        console.log(error);
    }
})();


async function addModerators(tab,browser)
{
    await tab.waitForSelector('.backbone.block-center' , {visible:true});
    let aTag= await tab.$$('.backbone.block-center');
    //console.log(aTag.length);
    let completeLinks=[];
    for(let i=0;i<aTag.length;i++)
    {
        let link=await tab.evaluate(function(elem){return elem.getAttribute("href");},aTag[i]);
        link=`http://www.hackerrank.com${link}`;
        completeLinks.push(completeLink);
    }
    console.log(completeLinks);
}
//function addModerators
// get all links of questions of current page 
// loop of all links and call
// addModeratorToASingleQues( link  ) => newTab => newTab.goto(link); => newTab.close

