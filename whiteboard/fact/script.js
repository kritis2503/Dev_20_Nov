let work=document.querySelector(".todo-work");
let addBtn=document.querySelector(".add");
let list=document.querySelector(".list");

addBtn.addEventListener("click",function(){
    let val=work.value;
    if(val){
    let li=document.createElement("li");

    let p=document.createElement("p");
    p.innerHTML=val;

    let closeBtn=document.createElement("button");
    closeBtn.innerHTML="X";
    closeBtn.addEventListener("click",function(){
        closeBtn.parentElement.remove();
    });


    li.append(p);
    li.append(closeBtn);

    list.append(li);
    work.value="";
    }
})
