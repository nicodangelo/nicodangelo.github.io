"use strict";

var canvasButton;
var ctx;
var currentJob;
var WIDTH;
var HEIGHT;
var canvasHeight;
var canvasWidth;
var shouldRenderRings = true;
var jobMoney = 0.25;

var rings;

/*var jobs = [
    new Job("Candy Sales", 0, 0.25, null, true),
    new Job("Hot dog sales", 50.00, 1.00, null, true),
    new Job("Burger Flipper", 150.00, 2.75, null, true),
    new Job("Grocery Bagger", 270.00, 3.26, null, true),
    new Job("Laborer", 420, 5.50, null, true),
    new Job("Teacher", 690.00, 8.00, null, true),
    new Job("Dentist", 800.63, 10.00, null, true),
    new Job("Programmer", 1234.56, 12.75, null, true),
    new Job("Project Leader", 2580.69, 15.00, null, true),
    new Job("Manager", 5000.00, 20.00, null, true),
    new Job("CEO", 12000.12, 33.33, null, true),
    new Job("Owner and Founder", 20000.00, 50.00, null, true),
    new Job("Mom", 245000.00, 69.00, null, true)  
];*/

function loadJobsTab()
{
    rings = new Array();
    canvasButton = document.getElementById('jobButton');
    
    /*if(window.innerWidth > 2000)
        canvasButton.width = 800;
    else
        canvasButton.width = 700;
    
    if(window.innerHeight > 900)
        canvasButton.height = 650;
    else
        canvasButton.height = 450;*/
    
	canvasWidth = window.innerWidth - 400;
	canvasHeight = window.innerHeight - 50;
	
	canvasButton.width = canvasWidth;
	canvasButton.height = canvasHeight;
	
    WIDTH = canvasWidth / 1.5;
    HEIGHT = canvasHeight / 1.5;
    
    if(rings.length === 0)
	   rings.push(new Ring(0, 270, 15, 0.5, 30, 1, 0));
	   
	currentJob = 0;
    
    ctx = canvasButton.getContext('2d');
    
    //load the styles for everything
    ctx.fillStyle = "rgba(0,0,0, 0)";
	ctx.strokeStyle = 'rgba(40,209,250, 1)';
    ctx.font = '25px Arial';
    ctx.shadowColor = '#28d1fa';
    
    shouldRenderRings = true;
}

function CreateRing()
{
	if(currentJob < 25)
	{
        var start = Math.floor((Math.random() * 360));
        var stop = Math.floor((Math.random() * 360) + start);
        var thickness = Math.floor((Math.random() * 40) + 1);
        var inc = Math.floor((Math.random()) * 3 + 1);
        var fromLast = Math.floor((Math.random() * currentJob) + 20);
		
        var halfHeight = HEIGHT / 2;
        var fromCenter = Math.abs(Math.floor((Math.random() * halfHeight - thickness))); 
        var opacity = Math.random();
        if(opacity >= 0.95)
            opacity = 1;
        var direction = Math.floor(Math.random() * 2);
        var ring = new Ring(start, stop, thickness, inc, fromCenter, opacity, direction);
        rings.push(ring);
        currentJob++;
    }
}

function jobclick()
{
    gainmoney(jobMoney, jobMoney, 0);
	CreateRing();
}

function render()
{
    //clear the rect
	ctx.clearRect(0,0,canvasWidth,canvasHeight);
	
	//get Variables
	var now = new Date();
	var seconds = now.getSeconds();
	var milliseconds = now.getMilliseconds();
	var newSeconds = seconds + (milliseconds / 1000);
    
	//render the rings and the Button
    ctx.shadowBlur = 2;
    renderRings();
	
	var fontSize = canvasHeight / 25;
	
	//After you render all the rings and such render the extra information
	ctx.font = fontSize + "px Arial";
	ctx.strokeStyle = 'rgba(0,0,0, 1)';
    ctx.shadowBlur = 0;
    ctx.lineWidth = HEIGHT / 2 - 8;
    ctx.globalAlpha = 1;

    //draw the text
    ctx.fillStyle = '#000000';
    ctx.fillText(jobMoney + " /per click", (canvasWidth / 2) + (canvasWidth / 5), (canvasHeight / 2) + (canvasHeight / 3));
	
	//at the very end you need to refresh the positions of all of the variables
	canvasWidth = window.innerWidth - 400;
	canvasHeight = window.innerHeight - 50;
	
    WIDTH = canvasWidth / 1.5;
    HEIGHT = canvasHeight / 1.5;
}

function renderRings()
{
    if(shouldRenderRings)
    {
        ctx.strokeStyle = 'rgba(0,0,0, 1)';
        ctx.shadowBlur = 0;
        ctx.lineWidth = HEIGHT / 2 - 8;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(canvasWidth / 2, canvasHeight / 2, HEIGHT / 4 - 8, 0, Math.PI * 2, true);
        ctx.stroke();
        
        ctx.strokeStyle = 'rgba(40,209,250, 1)';
        ctx.shadowBlur = 2;
        
        ctx.lineWidth = 6;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(canvasWidth / 2, canvasHeight / 2, HEIGHT / 2 - 10, 0, 360);
        ctx.stroke();
        
        var inc = 0;
        for(var i = 0; i < rings.length; i++)
        {
            if(rings[i].direction !== 1)
            {
                inc = rings[i].inc;
                rings[i].start = rings[i].start + inc;
                rings[i].stop = rings[i].stop + inc;
                ctx.lineWidth = rings[i].thickness;
                ctx.globalAlpha = rings[i].opacity;
                ctx.beginPath();
                ctx.arc(canvasWidth / 2, canvasHeight / 2, rings[i].fromCenter, degToRad(rings[i].start), degToRad(rings[i].stop));
                ctx.stroke();
            }
            else
            {
                inc = rings[i].inc;
                rings[i].start = rings[i].start - inc;
                rings[i].stop = rings[i].stop - inc;
                ctx.lineWidth = rings[i].thickness;
                ctx.globalAlpha = rings[i].opacity;
                ctx.beginPath();
                ctx.arc(canvasWidth / 2, canvasHeight / 2, rings[i].fromCenter,degToRad(rings[i].start), degToRad(rings[i].stop));
                ctx.stroke();
            }
        }
    }
}

function Ring(start, stop, thickness, inc, fromCenter, opacity, direction)
{
    this.start = start;
    this.stop = stop;
    this.thickness = thickness;
    this.inc = inc;
    this.fromCenter = fromCenter;
    this.opacity = opacity;
    this.direction = direction;
}

























