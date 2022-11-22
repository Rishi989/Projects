
const radioButtons = document.querySelectorAll('input[name="exp"]');
let btn = document.getElementById("btn");
let Amount =document.getElementById("Amount")
let discription = document.getElementById("Discription");
let list = document.getElementById("list");
let clear = document.getElementById("clear")
let budgetDiv = document.getElementById("budget");

let myLineChart={};
let budAmount =0;




    


///////it extract Budget value///////


//// IT RETURN DATE FOR NOTES///
function getDate(){
    
    let date = new Date();
    let month="";
    if(date.getMonth() +1<10 ){
        month = "0"+date.getMonth();
    }else{
        month=date.getMonth();
    }
    let currD = `${date.getDate()}/${month}/${date.getFullYear()}`
    return currD;
}
/// this represent the notes/ Details of expenses///
// let html="";
// function showFunction(){
    
//     html+= `
//     <div class="element">
//         <p >${getDate()}</p>
//         <p >${dis}</p>
//         <p >${type}</p>
//         <p >${Amount}</p>
//     </div>
    
// `
//     list.innerHTML = html;
    
// }



//// IT IS THE MAIN FUNCTION FOR NOTES//////////
// btn.addEventListener('click',()=>{
//     //// IF AMOUNT IF NOT INTEGER/////////////
//     if (isNaN(amount.value)) {
//         alert("Must input numbers");
//     }
    
    
//     else{    
//         for (const radioButton of radioButtons) {
//             if (radioButton.checked) {/// WHICH RADIO IS CHECKED

//                 selectedSize = radioButton.id; //// THERE ID IS AS PER THE NAME
//                 radioButton.checked = false; //// UNCHECKING RADIO BUTTON
                
//                 if("Saving" === selectedSize){
//                     save += parseInt(amount.value); //// INCREMENTING THE SAVE OR BUDGET


//                     showFunction(selectedSize,amount.value,discription.value);////  IMP**** ->>> IN PLACE OF amount.value we can't use save because save it total sum OR budget;
//                     showBudget(save);/// 


//                     amount.value = "";
//                     discription.value ="";
                    
//                     myLineChart.data.datasets[0].data[2] = save;//// UPDATING THE PIECHART BECAUSE WE CAN'T MAKE NEW WITHOUT DISTROYING PREVIOUS ONE
//                     myLineChart.update();


//                 }else if("Investment" === selectedSize){
//                         invest += parseInt(amount.value);/////////UPDATEING ENTIER INVEST VALUE
//                         save -= parseInt(amount.value); //// SAVE OR BUDEGET IS DEC
//                         showFunction(selectedSize,amount.value,discription.value); //// SIMI. USING amount.value,
//                         showBudget(save);
                        
//                         amount.value = "";
//                         discription.value ="";
                        
//                         myLineChart.data.datasets[0].data[1] = invest;/// updating

//                         ////////CONDITION IF SAVE IS 0 or -VE ;
//                         if(save === 0){
//                             myLineChart.data.datasets[0].data[2] = 0;
//                             alert(`Your's Budget is finished `);
//                         }else if(save < 0){
//                             myLineChart.data.datasets[0].data[2] = 0;
//                             alert(`You are in Debt of ${save}`);
//                         }else{
//                             myLineChart.data.datasets[0].data[2] = save;
//                         }
//                         myLineChart.update();
//                 }else{
//                     expense += parseInt(amount.value);
//                     save -= parseInt(amount.value);
//                     showFunction(selectedSize,amount.value,discription.value);
//                     showBudget(save);
                   
//                     amount.value = "";
//                     discription.value ="";
                   
//                     myLineChart.data.datasets[0].data[0] = expense;
//                     if(save === 0){
//                         myLineChart.data.datasets[0].data[2] = 0;
//                         alert(`Your's Budget is finished `);
//                     }else if(save < 0){
//                         myLineChart.data.datasets[0].data[2] = 0;
//                         alert(`You are in Debt of ${save}`);
//                     }
//                     else{
//                         myLineChart.data.datasets[0].data[2] = save;
//                     }
//                     myLineChart.update();
//                 }
                
//             }
            
//         }
//     }
    


// })




  





//CHART  ->>>> THIS WE GET FROM " chart.js "  

data = {
    datasets: [{
        data: [0,0,0],
        backgroundColor: [
            'hsl(0, 94%, 51%)',
            'hsl(64, 100%, 59%)',
            'hsl(160, 94%, 51%)',
            
        ],
        borderColor: [
            'hsl(0, 94%, 51%)',
            'hsl(64, 100%, 59%)',
            'hsl(160, 94%, 51%)',
            
        ],
        borderWidth: 1
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Expenses',
        'Investments',
        'Savings'
    ]
};
const config = {
    type: 'doughnut',
    data: data,
    options: {}
};
let ctx = document.getElementById("piechart")
myLineChart = new Chart(ctx, config);
//////


showBudget();
showFunction();


clear.addEventListener('click',()=>{
    localStorage.clear();
    list.innerHTML="";
    showBudget();
    
})
//// IT CONVERTS BUDGET INTO DIV AND AS EXPENSE IS INCREASING IT DEC THE BUDGET//// 
function showBudget(){
    let save = localStorage.getItem("save");
    if(save === null){
        budgetDiv.innerHTML = `<h1> Budget:</h1>
        <input type="text" name="budgetInput" id="budgetInput">`
        let budget = document.getElementById("budgetInput");
        budget.addEventListener("keypress",(e)=>{
            if(e.key === 'Enter'){
                
                localStorage.setItem("save",parseInt(budget.value));
                // console.log(save);
                myLineChart.data.datasets[0].data[2] = parseInt(budget.value);
                myLineChart.update();
                budgetDiv.innerHTML =`
                <h1> Budget:</h1>
                <div id="bud">
                ${parseInt(budget.value)}
                </div>`;
                myLineChart.data.datasets[0].data[2] = save;
                myLineChart.update();
        
            }
        })


    }
    else{
        budgetDiv.innerHTML =`
        <h1> Budget:</h1>
        <div id="bud">
        ${parseInt(save)}
        </div>`;
        let invest = localStorage.getItem("invest");
        let expense = localStorage.getItem("expense");
        if(invest === null){
            invest =0;
        }if(expense === null){
            expense = 0;
            
        }
        

    }
}
    
function showFunction(){
    let html="";
    
    let date = localStorage.getItem("date");
    if(date == null){
        dateObj =[];
    }else{
        dateObj = JSON.parse(date);
    }
    let type = localStorage.getItem("type");
    if(type == null){
        typeObj =[];
    }else{
        typeObj = JSON.parse(type);
    }
    let disc = localStorage.getItem("disc");
    if(disc == null){
        discObj =[];
    }else{
        discObj = JSON.parse(disc);
    }
    let amount = localStorage.getItem("amount");
    if(amount == null){
        amountObj =[];
    }else{
        amountObj = JSON.parse(amount);
    }
    console.log(dateObj.length)
    
    for(i in dateObj){
        console.log("askndVnkjn");
        html+= `
        <div class="element">
            <p >${dateObj[i]}</p>
            <p >${discObj[i]}</p>
            <p >${typeObj[i]}</p>
            <p >${amountObj[i]}</p>
        </div>
        `
        list.innerHTML = html;
        
    }
}




btn.addEventListener('click',()=>{
    //// IF AMOUNT IF NOT INTEGER/////////////
    if (isNaN(Amount.value)) {
        alert("Must input numbers");
    }
    
    
    else{    
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {/// WHICH RADIO IS CHECKED

                selectedSize = radioButton.id; //// THERE ID IS AS PER THE NAME
                radioButton.checked = false; //// UNCHECKING RADIO BUTTON
                
                if("Saving" === selectedSize){
                    let type = localStorage.getItem("type");
                    let date = localStorage.getItem("date");
                    let disc = localStorage.getItem("disc");
                    let amount = localStorage.getItem("amount");
                    if(type === null){
                        typeObj =[];
                        discObj = [];
                        dateObj =[];
                        amountObj =[];

                    }else{
                        typeObj =JSON.parse(type);
                        discObj = JSON.parse(disc);
                        dateObj =JSON.parse(date);
                        amountObj =JSON.parse(amount);
                    }
                    typeObj.push(selectedSize);
                    dateObj .push(getDate());
                    discObj.push(discription.value);
                    amountObj.push(amount.value);

                    localStorage.setItem("type",JSON.stringify(typeObj));
                    localStorage.setItem("date",JSON.stringify(dateObj));
                    localStorage.setItem("disc",JSON.stringify(discObj));
                    localStorage.setItem("amount",JSON.stringify(amountObj));

                    let save = parseInt(localStorage.getItem("save"));

                    save += parseInt(Amount.value); //// INCREMENTING THE SAVE OR BUDGET


                    showFunction();////  IMP**** ->>> IN PLACE OF Amount.value we can't use save because save it total sum OR budget;
                    showBudget();/// 


                    Amount.value = "";
                    discription.value ="";
                    
                    myLineChart.data.datasets[0].data[2] = save;//// UPDATING THE PIECHART BECAUSE WE CAN'T MAKE NEW WITHOUT DISTROYING PREVIOUS ONE
                    myLineChart.update();


                }else if("Investment" === selectedSize){



                    let type = localStorage.getItem("type");
                    let date = localStorage.getItem("date");
                    let disc = localStorage.getItem("disc");
                    let amount = localStorage.getItem("amount");
                    if(type === null){
                        typeObj =[];
                        discObj = [];
                        dateObj =[];
                        amountObj =[];

                    }else{
                        typeObj =JSON.parse(type);
                        discObj = JSON.parse(disc);
                        dateObj =JSON.parse(date);
                        amountObj =JSON.parse(amount);
                    }
                    typeObj.push(selectedSize);
                    dateObj .push(getDate());
                    discObj.push(discription.value);
                    amountObj.push(Amount.value);

                    localStorage.setItem("type",JSON.stringify(typeObj));
                    localStorage.setItem("date",JSON.stringify(dateObj));
                    localStorage.setItem("disc",JSON.stringify(discObj));
                    localStorage.setItem("amount",JSON.stringify(amountObj));




                        
                        
                        let save = parseInt(localStorage.getItem("save"));

                        let invest =(localStorage.getItem("invest"));
                        if(invest === null){
                            invest = 0;
                        }else{
                            invest = parseInt(localStorage.getItem("invest"));
                        }
                        invest += parseInt(Amount.value);/////////UPDATEING ENTIER INVEST VALUE
                        save -= parseInt(Amount.value); //// SAVE OR BUDEGET IS DEC
                        showFunction(); //// SIMI. USING amount.value,
                        showBudget();

                        
                    localStorage.setItem("save" , save);
                    localStorage.setItem("invest",invest);
                    showFunction(); //// SIMI. USING amount.value,
                    showBudget();

                    Amount.value = "";
                    discription.value ="";
                    
                    myLineChart.data.datasets[0].data[1] = invest;/// updating

                    ////////CONDITION IF SAVE IS 0 or -VE ;
                    if(save === 0){
                        myLineChart.data.datasets[0].data[2] = 0;
                        alert(`Your's Budget is finished `);
                    }else if(save < 0){
                        myLineChart.data.datasets[0].data[2] = 0;
                        alert(`You are in Debt of ${save}`);
                    }else{
                        myLineChart.data.datasets[0].data[2] = save;
                    }
                    myLineChart.update();
                }else{

                    let type = localStorage.getItem("type");
                    let date = localStorage.getItem("date");
                    let disc = localStorage.getItem("disc");
                    let amount = localStorage.getItem("amount");
                    if(type === null){
                        typeObj =[];
                        discObj = [];
                        dateObj =[];
                        amountObj =[];

                    }else{
                        typeObj =JSON.parse(type);
                        discObj = JSON.parse(disc);
                        dateObj =JSON.parse(date);
                        amountObj =JSON.parse(amount);
                    }
                    typeObj.push(selectedSize);
                    dateObj .push(getDate());
                    discObj.push(discription.value);
                    amountObj.push(Amount.value);

                    localStorage.setItem("type",JSON.stringify(typeObj));
                    localStorage.setItem("date",JSON.stringify(dateObj));
                    localStorage.setItem("disc",JSON.stringify(discObj));
                    localStorage.setItem("amount",JSON.stringify(amountObj));




                        
                        
                        let save = parseInt(localStorage.getItem("save"));

                        let expense =(localStorage.getItem("expense"));
                        if(expense === null){
                            expense = 0;
                        }else{
                            expense = parseInt(localStorage.getItem("expense"));
                        }




                    expense += parseInt(Amount.value);
                    save -= parseInt(Amount.value);
                    localStorage.setItem("save" , save);
                    localStorage.setItem("expense",expense);


                    showFunction();
                    showBudget(save);
                   
                    Amount.value = "";
                    discription.value ="";
                   
                    myLineChart.data.datasets[0].data[0] = expense;
                    if(save === 0){
                        myLineChart.data.datasets[0].data[2] = 0;
                        alert(`Your's Budget is finished `);
                    }else if(save < 0){
                        myLineChart.data.datasets[0].data[2] = 0;
                        alert(`You are in Debt of ${save}`);
                    }
                    else{
                        myLineChart.data.datasets[0].data[2] = save;
                    }
                    myLineChart.update();
                }
                
            }
            
        }
    }
    


})
