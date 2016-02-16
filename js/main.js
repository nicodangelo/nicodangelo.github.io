// JavaScript Document that controls tha main game

var money;
var amountFactor;
var before;
var speed;
var interval;
var fps;
var interval;
var moneyDisplay;
var upgradeJobButton;
var jobButton;
var currentJob;
var shouldSave = true;
var navIndex = 1;

var jobs = [
    /*0*/new Job("Candy Sales", 0.00, 0.25, null, true),
    /*1*/new Job("Hot dog sales", 50.00, 1.00, null, true),
    /*2*/new Job("Burger Flipper", 150.00, 2.75, null, true),
    /*3*/new Job("Grocery Bagger", 270.65, 3.26, null, true),
    /*4*/new Job("Laborer", 420.20, 5.50, null, true),
    /*5*/new Job("Teacher", 690.00, 8.00, null, true),
    /*6*/new Job("Dentist", 800.63, 10.00, null, true),
    /*7*/new Job("Programmer", 1234.56, 12.75, null, true),
    /*8*/new Job("Project Leader", 2580.69, 15.00, null, true),
    /*9*/new Job("Manager", 5000.00, 20.00, null, true)
];

window.onload = function()
{
	"use strict";
    currentJob = 0;
    money = 0.0;
    if(shouldSave)
        loadSave();
	amountFactor = 0.25;
	before = new Date().getTime();
	speed = 0;
	fps = 60;
	interval = 1000/fps;
    moneyDisplay = document.getElementById('amount_display');
    upgradeJobButton = document.getElementById('upgrade_job_button');
    jobButton = document.getElementById('active_job_button'); 
    nav(1);
};

function update(amountToUpdate)
{
    var newMoney = money.toFixed(2);
    moneyDisplay.innerHTML = "$" + newMoney;
    updateJobs();
    if(shouldSave)
        save();
}

function updateJobs()
{
    var newInc =  jobs[currentJob].inc.toFixed(2);
    jobButton.innerHTML = jobs[currentJob].name + " +" + newInc;
    if(currentJob + 1 < jobs.length)
    {
        var tempPrice = jobs[currentJob + 1].price.toFixed(2); 
        if(currentJob > 0)
            upgradeJobButton.innerHTML = "lv. " + currentJob + " Upgrade Job For " + tempPrice;
        else
            upgradeJobButton.innerHTML = " Upgrade Job For " + tempPrice;
    }
}

function clickme(index)
{
	switch(index)
	{
		case 1: gainMoney(jobs[currentJob].inc); break;
		case 2: 
            if(currentJob < jobs.length)
            {
                if(money >= jobs[currentJob + 1].price)
                {
                    money = money - jobs[currentJob + 1].price;
                    currentJob++;
                    //should increment count here but there is only one job so far...
                }  
            }
			break;
	}
}

function clickmeNav(index)
{
    nav(index);
}

function nav(index)
{
    if(index == navIndex)
        index = 1;
    for(var i = 1; i <= 8; i++)
    {
        $("#display" + i).css("display", "none");
        $("#display" + index).css("display", "block");
        navIndex = index;
    }
}

//game loop
setInterval(function(){
	"use strict";
	var now = new Date().getTime();
	var elapsedTime = now - before;
	if(elapsedTime > interval)
	{
		update(Math.floor(elapsedTime/interval));
	}
	else
	{
		update(1.0);
	}
	before = new Date().getTime();
}, interval);

//function to add money to the user(later will also keep track of the total earned and so on)
function gainMoney(amount)
{
    money += amount;
}

//The job object
function Job(name, price, inc, inflation, current)
{
    this.name = name;
    this.price = price;
    this.inc = inc;
    this.inflation = inflation;
    this.current = current;
}

function save()
{
    setItem("money", money);
    setItem("currentJob", currentJob);
}

function loadSave()
{
    if(getItem("currentJob") != null)
	   currentJob = Number(getItem("currentJob"));
    if(getItem("money") != null)
	   money = Number(getItem("money"));
}

function setItem(key, variable)
{
    localStorage.setItem(key, variable);
}

function getItem(key)
{
    return localStorage.getItem(key);
}










