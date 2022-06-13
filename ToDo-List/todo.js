showfunction();

let submit = document.getElementById("submit");
submit.addEventListener('click',()=>{
    // console.log("inside tick")
    let input = document.getElementById("inp");
    if(input.value ===""){
        let notelement = document.getElementById("notes");
        notelement.innerHTML = `<p style="text-align: center;">Enter the information need to be added above </p>`;
    }else{
        let notes = localStorage.getItem("notes");
        if(notes == null){
            notesObj =[];
            console.log("on clicking tick "+notes)
        }else{
            notesObj = JSON.parse(notes);
        }
        
        notesObj.push(input.value);
        // console.log("notesObj : ",notesObj,notes);
        localStorage.setItem("notes",JSON.stringify(notesObj));

        input.value = "";
        showfunction();
    }
})

function showfunction(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
       notesObj =[];
    }else{
        notesObj = JSON.parse(notes);

    }
    let html = "";
    notesObj.forEach(function(e, index){
        html += `<div class="elements" >
        <div class="Etext"> 
            ${e}
        </div>
        <button onclick="deleteList(${index})"  style="margin: 0px;"><img src="cross.png" ></button>
   </div>`
   ;
   
    });

    let notelement = document.getElementById("notes");
    if(notesObj.length != 0){
        
        notelement.innerHTML = html;
    }else{
        notelement.innerHTML = `<p style="text-align: center;">Enter the information need to be added above </p>`;
    }
}

function deleteList(index){
    let notes = localStorage.getItem("notes");
    let notesObj = JSON.parse(notes);
    // console.log(notesObj[index]);
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showfunction();
}

