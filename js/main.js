// JavaScript Document that controls tha main game
//@author Jacob Cox
"use strict";

//VARIABLES AND ARRAYS
////////////////////////////////////////////////--1--//////////////////////////////////////////////
var navIndex = 1;
var loaded = false;

//time variable to calculate the total time played
var timePlayed = 0;

var timeInvestors;
var offlineMoney = 14400000;


window.onload = function()
{
	//Set Constructed Variables
	timeInvestors = 0;
	
	localStorage.clear();
	
	//Update needed variables
	var timeCounter = 0;
	var pastTimeCounter = 0;
	if(getItem("varPastTimeCounter") != null)
	{
		timeCounter = new Date().getTime();
		pastTimeCounter = Number(getItem("varPastTimeCounter"));
	}
	
	//If the player was offline for more than half a second
	if(timeCounter - pastTimeCounter > 500)
	{
		//window.alert(timeCounter - pastTimeCounter);
	}
	
	//load the game variables for the saved player
	loadSave();
	
	//for the job tab
	loadJobsTab();
	
	clickNav(1);
	
	//Loading the game is done, so start the game
	loaded = true;
};

setInterval(function(){
	if(loaded)
	{
		if(navIndex === 1)
		{
			render();	
		}
		update();
		//save the game
		save();
	}
}, 25);

function update()
{
	//Update the actual time of the game for offline game running
	var pastTimeCounter = new Date().getTime();
	setItem("varPastTimeCounter", pastTimeCounter);
}





//ACTION LISTENERS AND CALLED HTML METHODS
////////////////////////////////////////////////--4--//////////////////////////////////////////////
function clickNav(index){
    if(index != 0)
    {
        if(index === navIndex)
        {
            index = 1;
        }
        for(var i = 1; i <= 7; i++)
        {   
            $("#display" + i).css("display", "none");
            $("#display" + index).css("display", "block");
            navIndex = index;
        }
    }
}






















//HELPER METHODS
////////////////////////////////////////////////--5--//////////////////////////////////////////////
//Takes in a number and makes it pretty
function fixNumber(num, x)
{
	if(num >= 1e9)
    {
        var i = Math.floor(logFloor(num)/3);        
        var prefixes = ["Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredicillion", "Quatturodecillion", "Quindecillion", "Sexdecillion", "Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion", "Unvigintillion", "Duovigintillion", "Tresvigintillion", "Quattuorvigintillion", "Quinvigintillion", "Sexvigintillion", "Septenvigintillion", "Octovigintillion", "Novemvigintillion", "Trigintillion", "Untrigintillion", "Duotrigintillion", "Googol", "Tretrigintillion", "Quattuortrigintillion", "Quintrigintillion", "Sextrigintillion", "Septentrigintillion", "Octotrigintillion", "Novemtrigintillion", "Quadragintillion", "Unquadragintillion", "Duoquadragintillion", "Trequadragintillion", "Quattuorquadragintillion", "Quinquadragintillion", "Sexquadragintillion", "Septquadragintillion", "Octoquadragintillion", "Novemquadragintillion", "Quinquagintillion", "Unquinquagintillion", "Duoquinquagintillion", "Trequinquagintillion", "Quattuorquinquagintillion", "Quinquinquagintillion", "Sexquinquagintillion", "Septquinquagintillion", "Octoquinquagintillion", "Novemquinquagintillion", "Sexagintillion", "Unsexagintillion", "Duosexagintillion", "Tresexagintillion", "Quattorsexagintillion", "Quinsexagintillion", "Sexsexagintillion", "Septsexagintillion", "Octosexagintillion", "Novemsexagintillion", "Septuagintillion", "Unseptuagintillion", "Duoseptuagintillion", "Treseptuagintillion", "Quattorseptuagintillion", "Quinseptuagintillion", "Sexseptuagintillion", "Septseptuagintillion", "Octoseptuagintillion", "Novemseptuagintillion", "Octogintillion", "Unoctogintillion", "Duooctogintillion", "Treoctogintillion", "Quattoroctogintillion", "Quinoctogintillion", "Sexoctogintillion", "Septoctogintillion", "Octooctogintillion", "Novemoctogintillion", "Nonagintillion", "Unnonagintillion", "Duononagintillion", "Trenonagintillion", "Quattornonagintillion", "Quinnonagintillion", "Sexnonagintillion", "Septnonagintillion", "Octononagintillion", "Novemnonagintillion", "Centillion", "Uncentillion", "Duocentillion", "Trecentillion", "Quattorcentillion", "Quincentillion", "Sexcentillion", "Septcentillion", "Octocentillion", "Novemcentillion", "Decacentillion", "Undecacentillion", "Duodecacentillion", "Tredecacentillion", "Quattordecacentillion", "Quindecacentillion", "Sexdecacentillion", "Septendecacentillion", "Octodecacentillion", "Novemdecacentillion", "Vigincentillion"];
        var s = fixNumber(num / Math.pow(10, 3*i), x);
        return s + " " + prefixes[i - 3];
    }
    return numberWithCommas(num.toFixed(x));
}

function logFloor(x)
{
    var count = 0;
    while (x >= 10)
    {
        count++;
        x /= 10;
    }
    return count;
}

//Got from stackoverflow (http://stackoverflow.com/a/10899795)
function numberWithCommas(n) 
{
    var parts=n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}

//function to add money to the user(later will also keep track of the total earned and so on)
function gainmoney(amount)
{
    Money.money += amount;
	Money.lifeTimeMoney += amount;
}

function degToRad(degree)
{
    var factor = Math.PI / 180;
    return degree*factor;
}

function cutTimeHalf()
{
    for(var l = 0; l < companies.length; l++)
    {
        companies[l].time = companies[l].time / 2;
    }
	achieveAmount = achieveAmount * 4;
}

function save()
{
	
}

function loadSave()
{
	
}

function setItem(key, variable)
{
    localStorage.setItem(key, variable);
}

function getItem(key)
{
    return localStorage.getItem(key);
}

//OBJECT FUNCTIONS
////////////////////////////////////////////////--6--//////////////////////////////////////////////

//The Money
function Money(amount, moneyPerSecond, lifeTimeMoney)
{
    this.money = amount;
	this.moneyPerSecond = moneyPerSecond;
	this.lifeTimeMOney = lifeTimeMoney;
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
function Company(name, owned, price,  inc, inflation, time, progress, past)
{
	this.name = name;
	this.owned = owned;
	this.price = price;
	this.inc = inc;
    this.inflation = inflation;
    this.time = time;
    this.progress = progress;
}

//the upgrade object
function Upgrade(type, name, text, price, perchased, action, actionAmount)
{
    this.type = type;
    this.name = name;
    this.text = text;
    this.price = price;
    this.perchased = perchased;
    //this.past = past;
    this.action = action;
    this.actionAmount = actionAmount;
}




























