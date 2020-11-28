let request=require("request");
let cheerio=require("cheerio");
const getMatch = require("./match");
const { get } = require("request");

function getAllMatches(link)
{
    request(link,cb);
}
function cb(error,response,data)
{
    if(error==null && response.statusCode==200)
        parseData(data);
    if(response.statusCode==404)
        console.log("Page Not Found!!");
    else console.log(error);
}

function parseData(html)
{
    let ch=cheerio.load(html);
    let allAtags=ch('a[data-hover="Scorecard"]');
    console.log(allAtags.length);
    for(let i=0;i<allAtags.length;i++)
    {
        let link=ch(allAtags[i]).attr("href");
        let completeLink="https://www.espncricinfo.com"+link;
        getAllMatches(completeLink);
    }
}
module.exports.getAllMatches = getAllMatches;
