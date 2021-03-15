let request=require("request");
let cheerio=require("cheerio");

let link="https://github.com/kritis2503"

request(link,cb);

function cb(error,response,data){
    parseData(data);
}

function parseData(html){
    let ch=cheerio.load(html);
    let navLinks=ch('.UnderlineNav-item');
    let repoLink=ch(navLinks[1]).attr("href");
    let rLink="http://github"+repoLink;
    console.log(rLink);
}

function 