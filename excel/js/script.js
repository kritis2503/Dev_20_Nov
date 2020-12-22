let $= require("jquery");

$(document).ready(function(){
    let db;
    let lsc;

    $(".cell").on("click",function(){
        let rowId=Number($(this).attr("rowid"))+1;
        let colId=Number($(this).attr("colid"));
        let cellObject=db[rowId][colId];
        $("#formula").val(cellObject.formula);
        let address=String.fromCharCode(65+colId)+rowId+"";
        $("#address").val(address);
    });

    $(".cell").on("blur",function(){
        lsc=this;
        let rowId=$(this).attr("rowid");
        let colId=$(this).attr("colid");
        let value=$(this).text();
        let cellObject=db[rowId][colId];
        if(value!=cellObject.value){
            cellObject.value=value;
            updateChildren(cellObject);
        }
    });

    $("#formula").on("blur",function(){
        let formula=$(this).val();
        if(formula){
            let rowId=$(lsc).attr("rowid");
            let colId=$(lsc).attr("colid");
            //db update
            let cellObject=db[rowId][colId];
            if(cellObject.formula!=formula){
                let value=solveFormula(formula,cellObject);

                cellObject.value=value;
                cellObject.formula=formula;
                console.log(db);
                $(lsc).text(value);
            }
        }
    });
    function updateChildren(cellObject){
        for(let i=0;i<cellObject.children.length;i++){
            let {rowId,colId}=getRowIdColIdFromAddress(cellObject.children[i]);
            let childrenCellObject=db[rowId][colId];
            let value=solveFormula(childrenCellObject.formula);
            childrenCellObject.value=value;

            $(`div[rowid=${rowId}][colid=${colId}]`).text(value);
            updateChildren(childrenCellObject);

        }
    }

    function solveFormula(formula,selfCellObject){
        let fComps=formula.split(" ");
        for(let i=0;i<fComps.length;i++){
            let comp=fComps[i];
            let firstCharacter=comp[0];
            if((firstCharacter>="A" && firstCharacter<="Z")|| (firstCharacter>="a" && firstCharacter<="z")){
                let {rowId,colId}=getRowIdColIdFromAddress(comp);
                let cellObject=db[rowId][colId];

                if(selfCellObject){
                    cellObject.children.push(selfCellObject.name);
                }

                let value=cellObject.value;
                formula=formula.replace(comp,value);
            }
        }
        let value=eval(formula);
        return value;
    }
    //utility functions
    function getRowIdColIdFromAddress(address){
        let colId=address.charCodeAt(0)<=90? address.charCodeAt(0)-65: address.charCodeAt(0)-97;
        let rowId=Number(address.substring(1))-1;
        return{
            rowId: rowId,
            colId: colId
        }
    }

    function initDB(){
        db=[];
        for(let i=0;i<100;i++){
            let row=[];
            for(let j=0;j<26;j++){
                let rowId=i+1;
                let colId=String.fromCharCode(65+j);
                let name=colId+rowId+"";
                let cellObject={
                    name: name,
                    value:"",
                    formula:"",
                    children:[]                    
                };
                row.push(cellObject);
            }
            db.push(row);
        }
        console.log(db);
    }
    initDB();
});
 