// JavaScript Document that controls tha main game

var money;
var amountFactor;
var before;
var speed;
var interval;
var ups;
var interval;
var moneyDisplay;
var upgradeJobButton;
var jobButton;
var currentJob;
var shouldSave = true;
var navIndex = 1;
var width = 0;
var loaded = false;

var jobs = [
    /*0*/new Job("Candy Sales", 0.00, 0.25, null, true),
    /*1*/new Job("Hot dog sales", 50.00, 1.00, null, true),
    /*2*/new Job("Burger Flipper", 150.00, 2.75, null, true),
    /*3*/new Job("Grocery Bagger", 270.00, 3.26, null, true),
    /*4*/new Job("Laborer", 420, 5.50, null, true),
    /*5*/new Job("Teacher", 690.00, 8.00, null, true),
    /*6*/new Job("Dentist", 800.63, 10.00, null, true),
    /*7*/new Job("Programmer", 1234.56, 12.75, null, true),
    /*8*/new Job("Project Leader", 2580.69, 15.00, null, true),
    /*9*/new Job("Manager", 5000.00, 20.00, null, true),
    /*10*/new Job("CEO", 12000.12, 33.33, null, true),
    /*11*/new Job("Owner and Founder", 20000.00, 50.00, null, true),
    /*12*/new Job("Mom", 245000.00, 69.00, null, true)
    
    /*actual costs: */
    
    /*0:  0.00*/
    /*1:  50.00*/
    /*2:  150.00*/
    /*3:  270.65*/
    /*4:  420.20*/
    /*5:  690.00*/
    /*6:  800.63*/
    /*7:  1234.56*/
    /*8:  2580.69*/
    /*9:  5000.00*/
    /*10: 1200.12*/
    /*11: 20000.00*/
    /*12: 245000.00*/
    
];

var companies = [
	/*0*/new Company("Candy Store", 0, 1, 2.00, 0.25),
	/*1*/new Company("Hot Dog Stand", 0, 1, 10.00, 1.00)
];

var progress = [0, 0];

window.onload = function()
{
    currentJob = 0;
    money = 0.0;
    if(shouldSave)
        //loadSave();
        loadSave();
	amountFactor = 0.25;
	before = new Date().getTime();
	speed = 0;
	ups = 60;
	interval = 1000/ups;
    moneyDisplay = document.getElementById('amount_display');
    upgradeJobButton = document.getElementById('upgrade_job_button');
    jobButton = document.getElementById('active_job_button'); 
    nav(1);
	loaded = true;
	
	//initialize the companies
	for(var i = 0; i < companies.length; i++)
	{
		$("#perchaseName" + i).text(companies[i].name);
		$("#perchasePrice" + i).text("$" + (companies[i].price).toFixed(2));
	}
};

function update(amountToUpdate)
{
	var newMoney = 0.0;
	if(money != null)
    	newMoney = money.toFixed(2);
    moneyDisplay.innerHTML = "$" + newMoney;
    updateJobs();
	updateCompanies();
    if(shouldSave)
        save();
}

function updateJobs()
{
    var newInc =  jobs[currentJob].inc.toFixed(2);
    jobButton.innerHTML = jobs[currentJob].name + " + $" + newInc;
    if(currentJob + 1 < jobs.length)
    {
        var tempPrice = jobs[currentJob + 1].price.toFixed(2); 
        if(currentJob > 0)
            upgradeJobButton.innerHTML = "lv. " + currentJob + " Upgrade Job: $" + tempPrice;
        else
            upgradeJobButton.innerHTML = " Upgrade Job: $" + tempPrice;
    }
}

function updateCompanies()
{
	for(var i = 0; i < companies.length; i++)
	{
		//The owned Amount
		$("#owned" + i).text(companies[i].owned);
		
		//The progress bar
		if(companies[i].owned > 0)
		{
			
			if(progress[i] > 99)
				progress[i] = 0;
			if(companies[i].owned > 29)
			{
				$("#bar"+ i).css("width",100+"%");
			}
			else
			{
				$("#bar"+ i).css("width",progress[i]+"%");
			}
			
			progress[i] = progress[i] + companies[i].speed;
			
			if(progress[i] >= 100)
			{
				gainMoney(companies[i].inc);
			}
			
			//the name and perchase amount
			$("#owned" + i).text(companies[i].owned);
			$("#name" + i).text(companies[i].name);
			$("#cost" + i).text("$" + (companies[i].price).toFixed(2));
			$("#inc" + i).text("$" + (companies[i].inc).toFixed(2));	
		}
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

function perchaseCompany(index)
{
	if(money >= companies[index].price)
	{
		money = money - companies[index].price;
		companies[index].owned += 1;
		$("#notPerchased" + index).css("display", "none");
		
		if(companies[index].owned % 5 === 0)
		{
			companies[index].speed = companies[index].speed + 1;
		}
	}
}

function nav(index)
{
    if(index === navIndex)
	{
        index = 1;
	}
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
	if(loaded)
	{
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
	}
}, interval);

//Takes in a number and makes it pretty
function fixNumber()
{
	
}

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

//The company Object
function Company(name, owned, speed, price, inc)
{
	this.name = name;
	this.owned = owned;
	this.speed = speed;
	this.price = price;
	this.inc = inc;
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










