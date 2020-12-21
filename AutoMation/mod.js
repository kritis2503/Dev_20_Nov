const id = "pamico3332@nic58.com";
const pw = "12345678";

const puppeteer = require("puppeteer");
const challenges = require("./challenge");
let tab;

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


async function addModerators(browser)
{
    try{
        await tab.waitForSelector(".backbone.block-center" , {visible:true});
        let aTag= await tab.$$('.backbone.block-center');
        //console.log(aTag.length);
        let completeLinks=[];
        for(let i=0;i<aTag.length;i++)
        {
            let link=await tab.evaluate(function(elem){return elem.getAttribute("href");},aTag[i]);
            link=`http://www.hackerrank.com${link}`;
            completeLinks.push(link);
        }
        console.log(completeLinks);

        let allModeratorAddPromise=[];

        for(let i=0;i<completeLinks.length;i++){
            let moderatorAddPromise=addModeratorToASingleQues(completeLinks[i],browser);
            allModeratorAddPromise.push(moderatorAddPromise);
        }

        await Promise.all(allModeratorAddPromise);
        let allLis= await tab.$$('.pagination li');
        let nextBtn=allLis[allLis.length-2];
        let isDisabled=await tab.evaluate(function(elem){ return elem.classList.contains("disabled");}, nextBtn);
        if(!isDisabled)
        {
            await Promise.all([rab.waitForNavigation({waitUntil:"networkidle2"}),nextBtn.click()]);
            await addModerators(browser);
        }
        else {
            return;
        }

    }   
    catch (error)
    {
        console.log(error);   
    }
}
async function confirmModal(){
    try{
        await tab.waitForSelector('#confirm-modal',{timeout:5000});
        await tab.click('#confirmBtn');
    }
    catch(error){
        return;
    }
}
async function addModeratorToASingleQues(link,browser){
    let newTab=await browser.newPage();
    await newTab.goto(link);
    await confirmModal(newTab);
    await newTab.waitForSelector('li[data-tab="moderators"]',{visible:true});
    await newTab.click('li[data-tab="moderators"]');
    await newTab.waitForSelector('#moderator',{visible:true});
    await newTab.type('#moderator',"Rajma_chawal");
    await newTab.click('.btn.moderator-save');
    await newTab.waitForTimeout(3000);
    await newTab.click('.save-challenge.btn.btn-green');
    await newTab.waitForTimeout(10000);
    await newTab.close();
}

//function addModerators
// get all links of questions of current page 
// loop of all links and call
// addModeratorToASingleQues( link  ) => newTab => newTab.goto(link); => newTab.close

