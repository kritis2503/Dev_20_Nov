let puppeteer = require("puppeteer");
const challenges = require("./challenge");

let id = "gokon21156@dkt1.com";
let pw = "123456789";

(async function () {
    try {
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
        });
        let pages = await browser.pages();
        let tab = pages[0];
        await tab.goto("http:/www.hackerrank.com/auth/login");
        await tab.type("#input-1", id);
        await tab.type("#input-2", pw);

        await Promise.all([tab.waitForNavigation(), tab.click(".ui-btn.ui-btn-large.ui-btn-primary")]);

        await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]', { visible: true });
        await tab.click('div[data-analytics="NavBarProfileDropDown"]');
        await Promise.all([tab.waitForNavigation(), tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]')]);

        await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li', { visible: true });
        let bothLis = await tab.$$('.nav-tabs.nav.admin-tabbed-nav li');
        let manageChallengeLi = bothLis[1];

        await manageChallengeLi.click();
        await tab.waitForSelector('.btn.btn-green.backbone.pull-right', { visible: true });
        let createChallenge = await tab.$('.btn.btn-green.backbone.pull-right');
        let createChallengeLink = await tab.evaluate(function (elem) { return elem.getAttribute('href'); }, createChallenge);
        createChallengeLink = `http://www.hackerrank.com${createChallengeLink}`;
        
        // await addChallenge(challenges[0], browser, createChallengeLink);
        for (let i = 0; i < challenges.length; i++) {
            addChallenge(challenges[i], browser, createChallengeLink);

        }
    }
    catch (error) {

    }
})();

async function addChallenge(challenge, browser, link) {
    let challengeName = challenge["Challenge Name"];
    let description = challenge["Description"];
    let problem = challenge["Problem Statement"];
    let input = challenge["Input Format"];
    let constraints = challenge["Constraints"];
    let output = challenge["Output Format"];
    let tags = challenge["Tags"];

    let newTab = await browser.newPage();
    await newTab.goto(link);
    await newTab.waitForSelector('#name', { visible: true });
    await newTab.type("#name", challengeName);
    await newTab.type('#preview', description);
    await newTab.waitForSelector('#problem_statement-container .CodeMirror textarea', { visible: true });
    await newTab.type('#problem_statement-container .CodeMirror textarea', problem);
    await newTab.type('#input_format-container .CodeMirror textarea', input);
    await newTab.type('#constraints-container .CodeMirror textarea', constraints);
    await newTab.waitForSelector("#output_format-container .CodeMirror textarea", { visible: true });
    await newTab.type("#output_format-container .CodeMirror textarea", output);
    await newTab.type("#tags_tag", tags);
    await newTab.keyboard.press("Enter");
    await newTab.click('.save-challenge.btn.btn-green');
    //await newTab.close();

}