var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.strokeStyle = '28d1fa';
ctx.lineWidth = 17;
ctx.lineCap = 'round';
ctx.shadowBlur = 13;
ctx.shadowColor = '28d1fa';

function degToRad(degree)
{
    var factor = Math.PI / 180;
    return degree*factor;
}

var now = new Date();
var today = now.toDateString();
var time = now.toLocaleTimeString();
var hours = now.getHours();
var minutes = now.getMinutes();
var seconds = now.getSeconds();
var milliseconds = now.getMilliseconds();

var newHours = hours + (minutes / 60);
var newMinutes = minutes + (seconds / 60);
var newSeconds = seconds + (milliseconds / 1000);

function renderTime()
{
    var now = new Date();
    var today = now.toDateString();
    var time = now.toLocaleTimeString();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var milliseconds = now.getMilliseconds();
    
    var newHours = hours + (minutes / 60);
    var newMinutes = minutes + (seconds / 60);
    var newSeconds = seconds + (milliseconds / 1000);
    
    //Background
    gradient = ctx.createRadialGradient(250, 250, 5, 250, 250, 260);
    gradient.addColorStop(0, '09303a');
    gradient.addColorStop(1, '000000');
    ctx.fillStyle = gradient;
    //ctx.fillStyle = '333333';
    ctx.fillRect(0, 0, 500, 500);
    
    //Hours 360 / 24 = 15
    ctx.beginPath();
    ctx.arc(250, 250, 200, degToRad(270), degToRad((newHours*15)-90));
    ctx.stroke();
    
    //Minutes 360 / 60 = 6
    ctx.beginPath();
    ctx.arc(250, 250, 170, degToRad(270), degToRad((newMinutes*6)-90));
    ctx.stroke();
    
    
    //Seconds 360 / 60 = 6
    ctx.beginPath();
    ctx.arc(250, 250, 140, degToRad(270), degToRad((newSeconds*6)-90));
    ctx.stroke();
    
    
    //Date
    ctx.font = '25px Arial';
    ctx.fillStyle = '28d1fa';
    ctx.fillText(today, 155, 250);
    
    //Time
    ctx.font = '22px Arial';
    ctx.fillStyle = '28d1fa';
    ctx.fillText(hours + ":" + minutes + ":" + seconds, 500 / 2 - 40, 280);
    
    
    //var dataURL = canvas.toDataURL();
    //document.getElementById('myImage').src = dataURL;
}

setInterval(renderTime, 40);





