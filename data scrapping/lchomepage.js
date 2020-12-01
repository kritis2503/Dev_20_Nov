let request=require("request");
let cheerio=require("cheerio");
const { Console } = require("console");

let data  = [];

let link="https://leetcode.com/problemset/all/";
request(link,cb);

function cb(error,response,data)
{
    if(error==null && response.statusCode==200)
        parseData(data);
    else if(response.statusCode==404)
        console.log("Page not found!");
    else    console.log("K");
}
function parseData(html)
{
    let ch=cheerio.load(html);
    let list = ch('.col-md-offset-2.col-md-10');
    let topics = list[1];
    let listOfTopics = ch(topics).find(".text-sm.text-gray");

    for(let i=0 ; i<listOfTopics.length ; i++){
        console.log(ch(listOfTopics[i]).text().trim() );
        let link="https://leetcode.com/tag/"+listOfTopics[i]+"/";
        fetchData(link);
    }   
}