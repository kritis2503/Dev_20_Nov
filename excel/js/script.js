let $= require("jquery");
let remote=require("electron").remote;
let dialog=remote.dialog;
let path=require("path");
let fs=require("fs");


fs.writeFileSync("./test.txt" , "lkaskfja");


$(document).ready(function(){
    let db;
    let lsc;

    $(".cell").on("click",function(){
        let rowId=Number($(this).attr("rowid"));
        let colId=Number($(this).attr("colid"));
         let cellObject=db[rowId][colId];
        $("#formula").val(cellObject.formula);
        let address=String.fromCharCode(65+colId)+(rowId+1)+"";
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
            removeFormula(cellObject);
            //console.log("yess");
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
                $(lsc).text(value);
                updateChildren(cellObject);
                console.log(db);
            }
        }
    });
    $('.content').on("scroll",function(){
        let top=$(this).scrollTop();
        let left=$(this).scrollLeft();

        $(".top-row, .top-left-cell").css("top",top+"px");
        $(".left-col, .top-left-cell").css("left",left+px);
    });

    $(".cell").on("keyup",function(){
        console.log("keyup");
        let height=$(this).height();
        let id=$(this).attr("rowid");
        $(`.left-col-cell[cellid=${id}]`).height(height);
    });

    $(".new").on("click",function(){
        console.log("New buuton clicked");
        initDB();
        initUI();
    });

    $('.open').on("click",function(){
        console.log("open button is clciked");
        console.log(db);
    });

    $('.save').on("click",function(){
        console.log("Save button is clicked !!");
        let path = dialog.showSaveDialogSync();
        console.log(path);
        let filePath = __dirname;
        fs.writeFileSync(path , JSON.stringify(db));
        alert("FILE SAVED");
    // fs.writeFileSync("../myDb.txt" ,JSON.stringify(db) );

    // let filePath = __dirname;
    // filePath = path.join(filePath,"myDb.txt");
    // console.log(filePath);

    //fs.writeFileSync( filePath , "alsjkfnjaksf");
    });
    $(".open").on("click",function(){
        console.log("open button clicked");
        let path=dialog.showOpenDialogSync();
        let openeddb=fs.readFileSync(path[0]);
        db=JSON.parse(openeddb);
        setUI(db);
    })
    $(".file , .home").on("click" , function(){
        let menu = $(this).text();
        if(menu == "File"){
          $(".file").addClass("active");
          $(".file-menu-options").removeClass("hide");
          $(".home-menu-options").addClass("hide");
          $(".home").removeClass("active");
          
        }
        else{
          // menu == "Home"
          $(".file").removeClass("active");
          $(".file-menu-options").addClass("hide");
          $(".home").addClass("active");
          $(".home-menu-options").removeClass("hide");
    
        }
      });
    function removeFormula(selfCellObject){
        $("#formula").val("");        
        selfCellObject.formula="";
        for(let i=selfCellObject.parent.length-1;i>=0;i--){
            let {rowId,colId}=getRowIdColIdFromAddress(selfCellObject.parent[i]);
            let parentCellObject=db[rowId][colId];
            // let idx=-1;
            // for(let j=0;j<parentCellObject.children.length;j++)
            // {
                // if(parentCellObject[j]==selfCellObject)
                // {
                    // idx=j;
                    // break;
                // }
            // }
            // parentCellObject.children.splice(idx,1);
            let childrenOfParent=parentCellObject.children;
            let filteredchild=childrenOfParent.filter(function(child){
                return child!=selfCellObject.name;
            });
            parentCellObject.children=filteredchild;
            selfCellObject.parent.pop();
        }
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
                
                if(selfCellObject){
                    cellObject.children.push(selfCellObject.name);
                    selfCellObject.parent.push(cellObject.name);
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
    function setUI(db){
        for(let i=0;i<100;i++){
            for(let j=0;j<26;j++){
                let cellObject=db[i][j];
                $(`div[rowid="${i}"][colid="${j}"]`).text(cellObject.value);
            }
        }
    }
    function initUI(){
        let cells = $(".cell");
        let count=0;
        for(let i=0 ; i<cells.length ; i++){
          $(cells[i]).text("");
          console.log(count);
          count++;
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
 