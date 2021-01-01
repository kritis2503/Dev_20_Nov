let $= require("jquery");
let remote=require("electron").remote;
let dialog=remote.dialog;
let fs=require("fs");

$(document).ready(function(){
    let db;
    let lsc;
    let sheetsDB=[];

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
    $(".open").on("click",function(){
        console.log("open button clicked");
        let path=dialog.showOpenDialogSync();
        let openeddb=fs.readFileSync(path[0]);
        sheetsDB=JSON.parse(openeddb);

        setUI(sheetsDB[0]);
        //console.log(sheetsDB.length());
        for(let i=0;i<sheetsDB.length;i++){
            
                $(".active-sheet").removeClass("active-sheet");
                console.log("sheet add clicked");
                sheetid++;
                let sheet=`<div class="sheet active-sheet" sid="${sheetid}">Sheet ${sheetid+1}</div>`;
                $(".sheets-list").append(sheet);
                $(".active-sheet").on("click",function(){
                    if(!$(this).hasClass("active-sheet")){
                        $(".active-sheet").removeClass("active-sheet");
                        $(this).addClass("active-sheet");
                        let sheetId=$(this).attr("sid");
                        db=sheetsDB[sheetId];
                        //setUI();
                    }
                });
        }
    });
    $(".save").on("click",function(){
        console.log("Save button is clicked !!");
        let path = dialog.showSaveDialogSync();
        // console.log(path);
        // let filePath = __dirname;
        if(path){
        fs.writeFileSync(path , JSON.stringify(sheetsDB));
        alert("FILE SAVED");
        }
        else{
            alert("NO FILE SELECTED");
        } 
    });
    $(".font-styles button").on("click",function(){
        let button=$(this).text();
        console.log(`clicked on ${button}`);
        let rowId=$(lsc).attr("rowid");
        let colId=$(lsc).attr("colid");
        let cellObject=db[rowId][colId];
        if(button=="B"){
            $(lsc).css("font-weight",cellObject.fontStyles.bold?"normal":"bold");
            cellObject.fontStyles.bold=!cellObject.fontStyles.bold;
        }
        else if(button=="U"){
            $(lsc).css("text-decoration",cellObject.fontStyles.underline?"none":"underline");
            cellObject.fontStyles.underline=!cellObject.fontStyles.underline;
        }
        else{
            $(lsc).css("text-style",cellObject.fontStyles.italic?"normal":"italic");
            cellObject.fontStyles.italic=!cellObject.fontStyles.italic;   
        }
    });
    $(".font-alignment button").on("click",function(){
        let button=$(this).text();
        console.log(`clicked on ${button}`);
        let rowId=$(lsc).attr("rowid");
        let colId=$(lsc).attr("colid");
        let cellObject=db[rowId][colId];

    });
    let sheetid=0;
    $(".sheet-add").on("click",function(){
        $(".active-sheet").removeClass("active-sheet");
        console.log("sheet add clicked");
        sheetid++;

        let sheet=`<div class="sheet active-sheet" sid="${sheetid}">Sheet ${sheetid+1}</div>`;
        $(".sheets-list").append(sheet);

        $(".active-sheet").on("click",function(){
            if(!$(this).hasClass("active-sheet")){
                $(".active-sheet").removeClass("active-sheet");
                $(this).addClass("active-sheet");
                let sheetId=$(this).attr("sid");
                db=sheetsDB[sheetId];
                setUI();
            }
        });
        initDB();
        initUI();
        console.log(sheetsDB);
    });
    $(".sheet").on("click",function(){
        if(!$(this).hasClass("active-sheet")){
            $(".active-sheet").removeClass("active-sheet");
            $(this).addClass("active-sheet");
            let sheetId= $(this).attr("sid");
            db=sheetsDB[sheetId];
            setUI();
        }
    });
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
        //let count=0;
        for(let i=0 ; i<cells.length ; i++){
          $(cells[i]).text("");
          //console.log(count);
          //count++;
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
                    parent: [],
                    fontStyles:{bold:false , italic:false , underline:false},
                    fontAlignment:"left"
                };
                row.push(cellObject);
            }
            db.push(row);
        }
        sheetsDB.push(db);
        console.log(db);
    }
    initDB();
});
 //cycle detection-graph
 //stack infix
 //css
