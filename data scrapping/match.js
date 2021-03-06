//const { fchown, fstat } = require("fs");
let request=require("request")
let cheerio=require("cheerio");
let fs=require("fs");

function getMatch(link)
{
    request(link,cb);
}

function cb(error,response,data)
{
    if(error==null && response.statusCode==200)
        parseData(data);
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
        console.log(teamName);
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
                processData(teamName,batsmanName,runs,balls,fours,sixes);
            }                 
        }
        // console.log();
        // console.log("#################################################################");
        // console.log();
    }
}
function checkTeamFolder(teamName)
{
    let teamPath=`worldcup/${teamName}`;
    return fs.existsSync(teamPath);
}
function checkBatsman(teamName,batsmanName)
{
    let teamPath=`worldcup/${teamName}/${batsmanName}.json`;
    return fs.existsSync(teamPath);
}
function createTeamFolder(teamName)
{
    let teamPath=`worldcup/${teamName}`;
    fs.mkdirSync(teamPath);
}
function createBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes)
{
    let batsmanPath=`worldcup/${teamName}/${batsmanName}.json`;
    let batsmanFile=[];
    let Inning={
        Runs: runs,
        Balls: balls,
        Fours: fours,
        Sixes: sixes
    }
    batsmanFile.push(Inning);
    fs.writeFileSync(batsmanPath,JSON.stringify(batsmanFile));
}
function updateBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes)
{
    let batsmanPath=`worldcup/${teamName}/${batsmanName}.json`;
    let batsmanFile=fs.readFileSync(batsmanPath);
    batsmanFile=JSON.parse(batsmanFile);
    let Inning={
        Runs: runs,
        Balls: balls,
        Fours: fours,
        Sixes: sixes
    }
    batsmanFile.push(Inning);
    fs.writeFileSync(batsmanPath,JSON.stringify(batsmanFile));

}
function processData(teamName,batsmanName,runs,balls,fours,sixes)
{
    let teamExist=checkTeamFolder(teamName);
    if(teamExist)
    {
        let BatsmanExist=checkBatsman(teamName,batsmanName);
        if(BatsmanExist)
        {
            updateBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes);
        }
        else{
            createBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes);
        }
    }
    else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes);
    }
}
module.exports=getMatch; 