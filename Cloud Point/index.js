

const days = ["Sun","Mon" , "Tue" , "Wed" , "Thurs" , "Fri" , "Sat"];
const months = ["Jan" , "Feb" , "March" , "April" , "May","June","July","Aug","Sept","Nov","Dec"];
setInterval(()=>{
    let time = new Date();
    let month = time.getMonth();
    // let year = time.getyear();
    let day = time.getDay();
    let min = time.getMinutes();
    let hour = time.getHours();
    let date = time.getDate(); 
    
    if(hour < 12){
        if(hour < 10 && min < 10){
            document.getElementById('hrs').innerHTML = ` 0${hour} : 0${min}`;
            document.getElementById('ampm').innerHTML = `AM`;
        }
        else if(hour < 10 && min > 10){
            document.getElementById('hrs').innerHTML = ` 0${hour} : ${min}`;
            document.getElementById('ampm').innerHTML = `AM`;
        }
        else if(hour > 10 && min < 10){
            document.getElementById('hrs').innerHTML = ` ${hour} : 0${min}`;
            document.getElementById('ampm').innerHTML = `AM`;

        }else{
        document.getElementById('hrs').innerHTML = `${hour} : ${min}`;
        document.getElementById('ampm').innerHTML = `AM`;
        }
    }else{
        hour = hour%12;
        if(hour < 10 && min < 10){
            document.getElementById('hrs').innerHTML = ` 0${hour} : 0${min}`;
            document.getElementById('ampm').innerHTML = `PM`;
        }
        else if(hour < 10 && min > 10){
            document.getElementById('hrs').innerHTML = ` 0${hour} : ${min}`;
            document.getElementById('ampm').innerHTML = `PM`;
        }
        else if(hour > 10 && min < 10){
            document.getElementById('hrs').innerHTML = ` ${hour} : 0${min}`;
            document.getElementById('ampm').innerHTML = `PM`;

        }else{
        document.getElementById('hrs').innerHTML = `${hour} : ${min}`;
        document.getElementById('ampm').innerHTML = `PM`;
        }
        
    } 
    document.getElementById('date').innerHTML= days[day] + ", " + date + " " + months[month];
}, 1000);
dailyweather();
function dailyweather(){
    navigator.geolocation.getCurrentPosition((res)=>{
         let { latitude,longitude } = res.coords
         fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=9eee4f5ca257fe21f717e39d664a6aca`)
         .then(res => {
            if(res.ok){
                return res.json()
            }else{
                console.error("City name is Invalid");
            }
        
        })
         .then(data =>
         this.currentweather(data)
         ).catch(error => console.log("this is current location error"+error))//https://unsplash.com/photos/bWtd1ZyEy6w

    })

}

function currentweather(data){
    const {temp,humidity,wind_speed} = data.current;
    const {icon , description} = data.current.weather[0];
    
    // document.querySelector('#city').innerHTML = name;
     document.querySelector('#icon2').src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"; 
     document.querySelector("#temp").innerHTML = temp + "&#176";
     document.querySelector("#discr").innerHTML = description;
     document.querySelector("#wind" ).innerHTML = wind_speed + "kmph";
     document.querySelector("#humidity").innerHTML = humidity + "%";
     document.body.style.backgroundImage = `url('${icon}.png')`;


     let otherforcast="";
     data.daily.forEach((day) => {
        
         
             otherforcast += `<div class="future" id="first">
             <p id="fhead">${window.moment(day.dt*1000).format('ddd')}</p>
             <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="">
             <p id="ftemp">Day : ${day.temp.day}&#176</p>
             </div>`

         



         
     });
     document.getElementById('footer').innerHTML = otherforcast;
     

     
}
cityname();
function cityname(){
    navigator.geolocation.getCurrentPosition((succses)=>{
        let { latitude,longitude } = succses.coords
    
    fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=9eee4f5ca257fe21f717e39d664a6aca`)
    .then(res => res.json())
    .then(data => this.printcity(data))
    .catch(error => console.log("this is cityname "+error))
})
    
}
function printcity(data){
    const{name} = data[0];
    const{state} = data[0];
    // console.log(country);
    document.querySelector('#city').innerHTML = name;
    document.getElementById('footer-head').innerHTML = `${name}'s future Weather Predictions`
    document.getElementById('dthead').innerHTML=`${name}`
}


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'iata-and-icao-codes.p.rapidapi.com',
		'X-RapidAPI-Key': '867c58e000mshfba58be367a2959p1b541ajsn74198d978ce6'
	}
};

fetch('https://iata-and-icao-codes.p.rapidapi.com/airlines', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));




let weather = {
    apikey : "9eee4f5ca257fe21f717e39d664a6aca",
    weather_fetch : function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+this.apikey)
            .then(res => res.json())
            .then(data => this.displydata(data))
            .catch(error => console.log("this is city error"+error))
        
    },
     displydata:function(data){
         const { name } = data;
         const {temp , humidity} = data.main;
         const{speed } = data.wind;
         const{ icon, description} = data.weather[0];
        //  console.log(name,temp,humidity,speed,icon,description);
         document.querySelector('#city').innerHTML = name;
         document.querySelector('#icon2').src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"; 
         document.querySelector("#temp").innerHTML = temp + "&#176";
         document.querySelector("#discr").innerHTML = description;
         document.querySelector("#wind" ).innerHTML =  speed;
         document.querySelector("#humidity").innerHTML = humidity + "%";
         document.body.style.backgroundImage = `url('${icon}.png')`;
    },
    
    search : function(){
        // console.log("searchfunction")
        this.weather_fetch(document.getElementById('input').value);
    }
    }
    document.getElementById('searchbtn').addEventListener("click", function(){
        // console.log("click")
        weather.search();
    })
    document.querySelector('input').addEventListener('keypress', function (e) {
        // console.log("enter key")
        if (e.key === 'Enter') {
            weather.search();
        }
    });

    