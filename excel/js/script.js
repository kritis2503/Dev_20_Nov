let $= require("jquery");

$(document).ready(function(){
    let db;
    let lsc;

    $(".cell").on("click",function(){
        let rowId=Number($(this).attr("rowid"))+1;
        let colId=Number($(this).attr("colid"));
        let address=String.fromCharCode(65+colId)+rowId+"";
        $("#address").val(address);
    });

    $(".cell").on("blur",function(){
        lsc=this;
        let row

    })
})
