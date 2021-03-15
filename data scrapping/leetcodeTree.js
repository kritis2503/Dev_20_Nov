let request=require("request");
let cheerio =require("cheerio");

let link="https://leetcode.com/tag/tree/"
request(link,cb)

function cb(error,response,data){
    if(error==null && response.statusCode==200)
        parseData(data);
    else if(response.statusCode==404)
        console.log("page not found");
    else console.log(error);
}
function parseData(html){
    console.log("Kriti");
    let ch=cheerio.load(html);
    let questions=ch('.title-cell__ZGos').html();
    console.log(questions);
    for(let i=0;i<questions.length;i++){
        let name=ch(questions[i]).find("a").text().trim();
        let lock=ch(questions[i]).find("span");
        if(!lock)
            console.log(name);
    }
    // console.log(questions);
}