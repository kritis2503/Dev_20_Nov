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
            console.log("yess");
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
                removeFormula(cellObject);
                let value=solveFormula(formula,cellObject);
                cellObject.value=value;
                cellObject.formula=formula;
                updateChildren(cellObject);
                console.log(db);
                $(lsc).text(value);
            }
        }
    });
    function removeFormula(selfCellObject){
        if(selfCellObject.formula.length==0)
            return;
        selfCellObject.formula="";
        for(let i=selfCellObject.parent.length-1;i>=0;i++){
            let {rowId,colId}=getRowIdColIdFromAddress(selfCellObject.parent[i]);
            let parentCellObject=db[rowId][colId];
            let idx=-1;
            for(let j=0;j<parentCellObject.children.length;j++)
            {
                if(parentCellObject[j]==selfCellObject)
                {
                    idx=j;
                    break;
                }
            }
            parentCellObject.children.pop(idx);
        }
        selfCellObject.parent.pop();
    }

    function updateChildren(cellObject){
        console.log("update children");
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
                selfCellObject.parent.push(cellObject.name);

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
        let rowId=Number(address.substring(1))-1;
        let colId=address.charCodeAt(0)<=90? address.charCodeAt(0)-65: address.charCodeAt(0)-97;
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
                    children:[],
                    parent: []                  
                };
                row.push(cellObject);
            }
            db.push(row);
        }
        console.log(db);
    }
    initDB();
});
 