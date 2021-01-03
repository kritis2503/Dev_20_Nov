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
        $(".left-col, .top-left-cell").css("left",left+"px");
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
            if(cellObject.fontStyles.strikeThrough)
            $(lsc).css("text-decoration","underline line-through");
            else
            $(lsc).css("text-decoration",cellObject.fontStyles.underline?"none":"underline");
            cellObject.fontStyles.underline=!cellObject.fontStyles.underline;
        }
        else if(button=="I"){
            $(lsc).css("font-style" , cellObject.fontStyles.italic ? "normal":"italic");
            cellObject.fontStyles.italic = !cellObject.fontStyles.italic;           
        }
        else{
            //text-decoration: line-through;
            if(cellObject.fontStyles.underline)
            $(lsc).css("text-decoration","line-through underline");
            else
            $(lsc).css("text-decoration","line-through");
            cellObject.fontStyles.strikeThrough=!cellObject.fontStyles.strikeThrough;
        }
    });

    $(".font-alignment button").on("click",function(){
        let button=$(this).text();
        console.log(`clicked on ${button}`);
        let rowId=$(lsc).attr("rowid");
        let colId=$(lsc).attr("colid");
        let cellObject=db[rowId][colId];
        if(button=="L"){
            $(lsc).css("text-align","left");
            cellObject.fontAlignment="left";
        }
        else if(button=="C"){
            $(lsc).css("text-align","center");
            cellObject.fontAlignment="center";
        }
        else{
            $(lsc).css("text-align","right");
            cellObject.fontAlignment="right";
        }
    });
    $("#font-size").on("change",function(){
        let fontSize=$(this).val();
        let rowId=$(lsc).attr("rowid");
        let colId=$(lsc).attr("colid");
        let cellObject=db[rowId][colId];
        $(lsc).css("font-size",fontSize+"px");
        cellObject.fontSize=fontSize;
    });
    $("#cell-font-color").on("change",function(){
        let color=$(this).val();
        console.log(color);
        let rowId=$(lsc).attr("rowid");
        let colId=$(lsc).attr("colid");
        let cellObject=db[rowId][colId];
        $(lsc).css("color",color);
        cellObject.fontColor=color;
    });
    $("#cell-color").on("change",function(){
        let color=$(this).val();
        console.log(color);
        let rowId=$(lsc).attr("rowid");
        let colId=$(lsc).attr("colid");
        let cellObject=db[rowId][colId];
        $(lsc).css("background",color);
        cellObject.fontBackground=color;
    });
   $("#font-select").on("change",function(){
    let font=$(this).val();
    let rowId=$(lsc).attr("rowid");
    let colId=$(lsc).attr("colid");
    let cellObject=db[rowId][colId];
    $(lsc).css("font-family",font);
    cellObject.fontName=font;
   });
    let fontStyles;
    let fontAlignment;
    let fontSize;
    let fontColor;
    let fontBackground;                                 
    let fontName;
    $(".copy-format").on("click",function(){
        let rowId=$(lsc).attr("rowid");
        let colId=$(lsc).attr("colid");
        let cellObject=db[rowId][colId];
        fontStyles=cellObject.fontStyles;
        fontAlignment=cellObject.fontAlignment;
        fontSize=cellObject.fontSize;
        fontColor=cellObject.fontColor;
        fontBackground=cellObject.fontBackground;
        fontName=cellObject.fontName;
    });

   $(".paint-format").on("click",function(){
        console.log(fontStyles);
        $(lsc).css("font-weight",fontStyles.bold?"bold":"normal");
        $(lsc).css("font-style" , fontStyles.italic ? "italic":"normal");
        if(fontStyles.underline && fontStyles.strikeThrough)
            $(lsc).css("text-decoration","underline line-through");
        else
        if(fontStyles.underline)
            $(lsc).css("text-decoration","underline");
        else
        if(fontStyles.strikeThrough)
            $(lsc).css("text-decoration","line-through");
        $(lsc).css("text-align",fontAlignment);
        $(lsc).css("font-size" , fontSize+"px");
        $(lsc).css("color",fontColor);
        $(lsc).css("background",fontBackground);
        $(lsc).css("font-family",fontName);       
   }); 
   $(".hide-row").on("click",function(){
        let rowId=$(lsc).attr("rowid");
        // let colId=$(lsc).attr("colid");
        // let cellObject=db[rowId][colId];
        // console.log(lsc);
        // console.log(this);
        let allRows = $(".cells .row")
        let toBeHide = allRows[rowId];
        $(toBeHide).css("display","none");
        let leftCell=$(".left-col-cell");
        let tobeHidden=leftCell[rowId];
        $(tobeHidden).css("display","none");
        
    });
    $(".hide-column").on("click",function(){
        //let rowId=$(lsc).attr("rowid");
        let colId=$(lsc).attr("colid");
        // let cellObject=db[rowId][colId];
        // console.log(lsc);
        // console.log(this);
        let allcol = $(".cells .row");
        let toBeHide = allcol[colId];
        //console.log(toBeHide);
        $(toBeHide).addClass("hide");
       let topCol=$(".top-row-cell");
        let tobeHidden=topCol[colId];
        $(tobeHidden).css("display","none");
        
    });
    $(".freeze-row").on("click",function(){
        let rowId=$(lsc).attr("rowid");
        let rows;
        for(let i=0;i<=rowId;i++){
            let r=$(".cells .row");
            let row=r[i];
            rows.push(r);
        }
        

    })
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
        for(let i=selfCellObject.parents.length-1;i>=0;i--){
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
        for(let i=0;i<cellObject.childrens.length;i++){
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
                    value: "",
                    formula: "",
                    childrens: [],
                    parents: [],
                    fontStyles:{bold:false , italic:false , underline:false,strikeThrough: false},
                    fontAlignment:"left",
                    fontSize:"16",
                    fontColor:"black",
                    fontBackground:"white",                                 
                    fontName: "Roboto"
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
