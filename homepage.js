let request=require("request");
let cheerio=reqire("cheerio");
const { getAllMatches } = require("./allMatches");


let link="https://www.espncricinfo.com/series/_/id/8048/season/2020/indian-premier-league";
request(link,cb);

function cb(error,response,data)
{
    if(error==null && response.statsCode==200)
        parseData(data);
    else if(response.statsCode==404)
        console.log("Page Not Found");
    else    console.log(error);

}
function parseData(html)
{
    let ch=cheerio.load(html);
    let list=ch('.widget-items.cta-link a').attr("href")
    let compeleteLink="https://www.espncricinfo.com"+link;
    console.log(compeleteLink);
    getAllmatches(compeleteLink);
}