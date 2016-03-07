// JavaScript Document that controls tha main game
//@author Jacob Cox

/*
    1: Variables and Arrays.
    2: start of the game and main loop.
    3: Update and Display functions.
    4: Action Listeners and called html methods.
    5: Helper Methods.
    6: Object Functions.
    7: Save and load save functions.
*/

//VARIABLES AND ARRAYS
////////////////////////////////////////////////--1--//////////////////////////////////////////////
var past;
var speed;
var interval;
var ups;
var moneyDisplay;
var shouldSave = true;
var navIndex = 1;
var width = 0;
var loaded = false;
var offlineMoney = 14400000;

var companies = [
           //Company(name, owned, price,  inc, inflation, time, past)
	/*0*/new Company("Candy Store", 0, 4, 0.25, 1.06, 2000, null),
	/*1*/new Company("Hot Dog Stand",0, 70, 1.00, 1.14, 3000, null)
];

var company_progress = [
    /*0*/0, 
    /*1*/0
	];

var save_companies = [
           //Company(name, owned, price,  inc, inflation, time, past)
	/*0*/new Company("Candy Store", 0, 4, 0.25, 1.06, 2000, null),
	/*1*/new Company("Hot Dog Stand",0, 70, 1.00, 1.14, 3000, null)
];

/*function disable()
{
    try {
        var $_console$$ = console;
        Object.defineProperty(window, "console", {
            get: function() {
                if ($_console$$._commandLineAPI)
                    throw "Sorry, for security reasons, the script console is deactivated on stockpiler.website";
                return $_console$$
            },
            set: function($val$$) {
                $_console$$ = $val$$
            }
        })
    } catch ($ignore$$) {
    }
}*/
	
	
	
	
	
	
	
	

//START OF THE GAME AND MAIN LOOP
////////////////////////////////////////////////--2--//////////////////////////////////////////////
window.onload = function()
{   
    //initialize variables
    currentJob = 0;
    Money.money = 0.0;
	past = new Date().getTime();
	speed = 0;
	ups = 40;
	interval = 1000/ups;
    clickmeNav(1);
	currentJob = 0;
	
	rings = [
        new Ring(0, 270, 15, .5, 30, 1, 0),
        new Ring(0, 360, 4, 0, HEIGHT / 2 - 10, 1, 0)
    	];
    
    moneyDisplay = document.getElementById('amount_display');
    
    onLoad();
    
    //load the save if needed
    if(shouldSave)
        loadSave();
	
	//initialize the companies
	for(var i = 0; i < companies.length; i++)
	{
		$("#perchaseName" + i).text(companies[i].name);
		$("#perchasePrice" + i).text("$" + (companies[i].price).toFixed(2));
        companies[i].past = new Date().getTime();
	}
    
    //all done then let the game begin
    loaded = true;
};

//game loop
setInterval(function(){
	if(loaded)
	{
		var now = new Date().getTime();
		var elapsedTime = now - past;
        update(elapsedTime, now);
		past = new Date().getTime();
        if(navIndex === 1)
            render();
	}
}, 25);









//UPDATE AND DISPLAY FUNCTIONS
////////////////////////////////////////////////--3--//////////////////////////////////////////////
function update(elapsedTime, now)
{
    updateInfoBar();
	updateCompanies(elapsedTime, now);
    updateUpgrades();
    
    if(shouldSave)
        save();
}

function updateInfoBar()
{
    moneyDisplay.innerHTML = "$" + fixNumber(Money.money, 2);
}

function updateCompanies(elapsedTime, now)
{
	for(var i = 0; i < companies.length; i++)
	{
		//The owned Amount
		$("#owned" + i).text(companies[i].owned);
        
        //The perchaseButton(ie. show if it can be clicked or not)
        if(Money.money < companies[i].price)
        {
            $("#companyButton" + i).css("background-color", "#929292");
        }
        else
        {   if($("#companyButton" + i).css("background-color") !== "#EEEEEE")
                $("#companyButton" + i).css("background-color", "#EEEEEE");
        }
		
		//The progress bar
		if(companies[i].owned > 0)
		{
			if(company_progress[i] > 99)
				company_progress[i] = 0;
			if(companies[i].time < 100)
			{
				$("#bar"+ i).css("width",100+"%");
			}
			else
			{
                //this needs to desparatly be fixed but im like how?
                company_progress[i] = (now - companies[i].past) / (companies[i].time / 100);
                if(company_progress[i] <= 100)
				    $("#bar"+ i).css("width",Math.max(company_progress[i], 1)+"%");
			}
			
			//the name and perchase amount
			$("#owned" + i).text(companies[i].owned);
			$("#name" + i).text(companies[i].name);
			$("#cost" + i).text("$" + fixNumber(companies[i].price,2));
			$("#inc" + i).text("$" + fixNumber(companies[i].inc,2));
            
            //for gaining the money
            var delta = now - companies[i].past;
            if(delta >= companies[i].time)
            {
                if(delta > offlineMoney)
                {
                    gainmoney(companies[i].inc * (offlineMoney / 1000));
                }
                else
                {
                    gainmoney(companies[i].inc * Math.ceil(companies[i].time / delta));
                }
                companies[i].past = new Date().getTime();
            }
		}
        if(companies[i].owned > 0)
        {
            $("#notPerchased" + i).css("display", "none");
        }
	}
}

function updateUpgrades()
{
    //needs to be implemented
}


//ACTION LISTENERS AND CALLED HTML METHODS
////////////////////////////////////////////////--4--//////////////////////////////////////////////
function clickme(index)
{

}

function clickmeNav(index)
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

function clickmePerchaseCompany(index)
{
	if(Money.money >= companies[index].price)
	{
		Money.money = Money.money - companies[index].price;
		companies[index].owned = (companies[index].owned + 1);
        if(companies[index].owned > 1)
        {
            companies[index].inc = (companies[index].inc * companies[index].inflation);
            companies[index].price = (companies[index].price * companies[index].inflation);
        }
        
		$("#notPerchased" + index).css("display", "none");
		
        //actually should be in the achievements category or the upgrades category
		if(companies[index].owned % 25 === 0)
		{
			companies[index].time = companies[index].time / 2;
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
        var prefixes = ["Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredicillion", "Quatturodecillion", "Quindecillion", "Sexdecillion", "Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion", "Unvigintillion", "Duovigintillion", "Tresvigintillion", "Quattuorvigintillion", "Quinvigintillion", "Sexvigintillion", "Septenvigintillion", "Octovigintillion", "Novemvigintillion", "Trigintillion", "Untrigintillion", "Duotrigintillion", "Googol", "Tretrigintillion", "Quattuortrigintillion", "Quintrigintillion", "Sextrigintillion", "Septentrigintillion", "Octotrigintillion", "Novemtrigintillion", "Quadragintillion", "Unquadragintillion", "Duoquadragintillion", "Trequadragintillion", "Quattuorquadragintillion", "Quinquadragintillion", "Sexquadragintillion", "Septquadragintillion", "Octoquadragintillion", "Novemquadragintillion", "Quinquagintillion", "Unquinquagintillion", "Duoquinquagintillion", "Trequinquagintillion", "Quattuorquinquagintillion", "Quinquinquagintillion"];
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
}

function degToRad(degree)
{
    var factor = Math.PI / 180;
    return degree*factor;
}









//OBJECT FUNCTIONS
////////////////////////////////////////////////--6--//////////////////////////////////////////////

//The Money
function Money(amount)
{
    this.money = amount;    
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
/*
    
*/
function Company(name, owned, price,  inc, inflation, time, past)
{
	this.name = name;
	this.owned = owned;
	this.price = price;
	this.inc = inc;
    this.inflation = inflation;
    this.time = time;
    this.past = past;
}

//the upgrade object
function Upgrade(name, text, price)
{
    this.name = name;
    this.text = text;
    this.price = price;
}











//SAVE AND LOAD SAVE FUNCTIONS
////////////////////////////////////////////////--7--//////////////////////////////////////////////

function save()
{
    setItem("money", Money.money);
    setItem("currentJob", currentJob);
    setItem("past", past);
    
    localStorage.setItem("jobs", JSON.stringify(jobs));
    localStorage.setItem("companies", JSON.stringify(companies));
    localStorage.setItem("company_progress", JSON.stringify(company_progress));
	localStorage.setItem("rings", JSON.stringify(rings));
}

function loadSave()
{
    if(getItem("currentJob") !== null)
	   currentJob = Number(getItem("currentJob"));
    if(getItem("money") !== null)
	   Money.money = Number(getItem("money"));
    if(getItem("past") !== null)
       past = getItem("past");
    
    if(JSON.parse(localStorage.getItem("jobs")) !== null)
        jobs = JSON.parse(localStorage.getItem("jobs"));
    if(JSON.parse(localStorage.getItem("companies")) !== null)
        companies = JSON.parse(localStorage.getItem("companies"));
    if(JSON.parse(localStorage.getItem("company_progress")) !== null)
        company_progress = JSON.parse(localStorage.getItem("company_progress"));
	if(JSON.parse(localStorage.getItem("rings")) != null)
		rings = JSON.parse(localStorage.getItem("rings"));
}

function setItem(key, variable)
{
    localStorage.setItem(key, variable);
}

function getItem(key)
{
    return localStorage.getItem(key);
}

function resetGame()
{
    shouldSave = false;
    localStorage.clear();
	rings = [
        new Ring(0, 270, 15, 0.5, 30, 1, 0),
        new Ring(0, 360, 4, 0, HEIGHT / 2 - 10, 1, 0)
    	];

    Money.money = 0.0;
    currentJob = 0;
	
	for(var x = 0; x < company_progress.length; x++)
	{
		company_progress[x] = 0;
	}
    
    for(var i = 0; i < companies.length; i++)
    {
        companies[i] = save_companies[i];
    }
	
    save();
    window.location='index.html';
}










