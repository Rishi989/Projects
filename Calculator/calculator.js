let Input = document.getElementById("input");

let button = document.getElementsByClassName("btn");
let buttonvalue ="";
let backspace = document.getElementById("backspace");
for(let element of button){
    element.addEventListener('click' ,(e)=> {
        let buttonV = e.target.innerText;
        let back = e.target.innerHtml;

        if(buttonV == 'x'){
            buttonV ='*';
            buttonvalue += buttonV;
            Input.value = buttonvalue;
        }else if(buttonV == '='){

            Input.value = eval(buttonvalue);
        }else if (buttonV =='C'){
            buttonvalue = "";
            Input.value = buttonvalue;
        }else if(buttonV == ''){
            buttonvalue = buttonvalue.slice(0,-1);
            Input.value = buttonvalue;
        }else{
            buttonvalue += buttonV;
            Input.value = buttonvalue;
        }
    })

    

}
