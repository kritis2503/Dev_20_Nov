const { fchown } = require("fs");
let request=require("request")
let cheerio=reqire("cheerio");

function getMatch(link)
{
    request(link,cb);
}

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
    let bothInnings = ch('.card.content-block.match-scorecard-table .Collapsible');
    for(let i=0;i<bothInnings.length;i++)
    {
        let teamName = ch(bothInnings[i]).find(".header-title.label").text().split("Innings")[0].trim();
        console.log(teamName);
        let allTrs=ch(bothInnings[i]).find(".table.batsman tbody tr");
        for(let j=0;j<allTrs-1;i++)
        {
            let allTds=ch(allTrs[j]).find("Td");
            if(allTds.length>1)
            {
                let batsmanName=ch(allTds[0]).find("a").text().trim();
                let runs = ch(allTds[2]).text().trim();
                let balls = ch(allTds[3]).text().trim();
                let fours = ch(allTds[5]).text().trim();
                let sixes = ch(allTds[6]).text().trim();
                processData(teamName,batsmanName,runs,balls,fours,sixes);
            }
        }
    }
}