let request=require("request");
let cheerio=require("cheerio");
const { getAllMatches } = require("./getAllmatches");



let link="https://www.espncricinfo.com/series/_/id/8048/season/2020/indian-premier-league";
request(link,cb);

function cb(error,response,data)
{
    if(error==null && response.statusCode==200)
        parseData(data);
        //console.log("Kriti");
    else if(response.statusCode==404)
        console.log("Page Not Found");
    else    console.log(error+" kriti");

}
function parseData(html)
{
    let ch=cheerio.load(html);
    let list=ch('.widget-items.cta-link a').attr("href");
    console.log(list);
    let compeleteLink="https://www.espncricinfo.com"+list;
    console.log(compeleteLink);
    getAllMatches(compeleteLink);
}
