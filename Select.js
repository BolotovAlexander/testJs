let arr =["#f00","#0000ff","#000000","#eeea20","#ffffff","#464545"]
var startKnob = document.querySelector(".selectButton");
var pop_upMenu = document.querySelector(".pop_upMenu");


var time = document.querySelector(".time");
var speed = document.querySelector(".speed");
var textColor = document.querySelector(".textColor");
var backgroundColor = document.querySelector(".backgroundColor");
var some = document.querySelector(".some");


var i = 0;
function changheColorText(){
    if (i>2) {i=0};
    startKnob.style.color = arr[i];
    startKnob.style.color = arr[i];
    i++;
};
var j = 3;
function changheColorBackground(){
    if (j>5) {j=3};
    startKnob.style.backgroundColor = arr[j];
    j++;
};
function hideMenu(){
    pop_upMenu.style.display= (pop_upMenu.style.display == 'table')?
     'none':
     'table';
     
};


textColor.addEventListener("click", changheColorText);
backgroundColor.addEventListener("click", changheColorBackground);
startKnob.addEventListener("click", hideMenu);

