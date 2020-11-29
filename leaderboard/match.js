//const { fchown, fstat } = require("fs");
let request=require("request")
let cheerio=require("cheerio");
let fs=require("fs");

let count=0;
let leaderboard=[];

function getMatch(link)
{
    count++;
    request(link,cb);
}

function cb(error,response,data)
{
    if(error==null && response.statusCode==200){
        count--;
        parseData(data);
        if(count==0)
            console.table(leaderboard);
    }        
    else if(response.statusCode==404)
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
        //console.log(teamName);
        let allTrs=ch(bothInnings[i]).find(".table.batsman tbody tr");
        //console.log(allTrs);
        for(let j=0;j<allTrs.length-1;j++)
        {
            //console.log("Kriti");
            let allTds=ch(allTrs[j]).find("Td");
            if(allTds.length>1)
            {
                let batsmanName=ch(allTds[0]).find("a").text().trim();
                let runs = ch(allTds[2]).text().trim();
                let balls = ch(allTds[3]).text().trim();
                let fours = ch(allTds[5]).text().trim();
                let sixes = ch(allTds[6]).text().trim();
                //console.log(`Batsman =${batsmanName} Runs =${runs} Balls =${balls} fours =${fours} sixes =${sixes} `);
               // console.log(`Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes}`);
                processDetails(teamName,batsmanName,runs,balls,fours,sixes);
            }                 
        }
        // console.log();
        // console.log("#################################################################");
        // console.log();
    }
}


function processDetails(teamName , batsmanName , runs , balls , fours , sixes){
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);

    for(let i=0 ; i<leaderboard.length ; i++){
        if(leaderboard[i].Team == teamName && leaderboard[i].Batsman == batsmanName){
            leaderboard[i].Runs += runs;
            leaderboard[i].Balls += balls;
            leaderboard[i].Fours += fours;
            leaderboard[i].Sixes += sixes;
            return;
        }
    }

    let entry = {
        Team : teamName , 
        Batsman : batsmanName , 
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes
    }
    leaderboard.push(entry);
}


module.exports=getMatch; 