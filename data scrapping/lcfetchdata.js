let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");

let link="https://leetcode.com/tag/array/";
request(link,cb);
function getData(link)
{
    request(link, cb);
}
function cb(error,response,data)
{
    if(error==null && response.statusCode==200)
    {
        console.log("Kriti");
        parseData(data);
    }
    else if(response.statusCode==404)
        console.log("Page Not Found!!");
    else console.log(error);
}
function parseData(html)
{
    let ch=cheerio.load(html);
    let l=ch('.title-cell__ZGos a').text().trim();
    console.log("Kriti");
    console.log(l);
}