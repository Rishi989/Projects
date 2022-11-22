// Game Constants & Variables
// 
localStorage.setItem("save",1020);
let save = localStorage.getItem("save");
save=parseInt(save);
console.log(save,typeof(save));

save += 1000;

localStorage.setItem("save",save);

let save2 = (localStorage.getItem("invset"));
console.log(save2,typeof(save2))