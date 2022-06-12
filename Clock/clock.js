let month = ["Javary","Febuary","March","April","May","June","July","August","September","November","December"];
let days =["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
let set = setInterval(()=>{
    let date = new Date();
    let time = document.getElementById("timeh");

    if(date.getHours() < 10){
       time.innerText = `0${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }else{
        time.innerText = `0${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    let dateh = document.getElementById("dateh");
    dateh.innerText = `${date.getDate()} ${month[date.getMonth()-1]}, ${date.getFullYear()}`
    let dayh = document.getElementById("dayh");
    dayh.innerText = `${days[date.getDay()-1]}`
},1000);
