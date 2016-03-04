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
var money;
var past;
var speed;
var interval;
var ups;
var moneyDisplay;
var upgradeJobButton;
var jobButton;
var currentJob;
var shouldSave = false;
var navIndex = 1;
var width = 0;
var loaded = false;
var offlineMoney = 14400000;
var canvasButton;

var jobs = [
    /*0*/new Job("Candy Sales", 0, 0.25, null, true),
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
];

var companies = [
           //Company(name, owned, time,  price, inc)
	/*0*/new Company("Candy Store", 0, 2000, 2.00, 0.25, null),
	/*1*/new Company("Hot Dog Stand", 0, 5000, 10.00, 1.00, null)
];

var company_progress = [
    /*0*/0, 
    /*1*/0
	];
	
	
	
	
	
	
	
	

//START OF THE GAME AND MAIN LOOP
////////////////////////////////////////////////--2--//////////////////////////////////////////////
window.onload = function()
{
    localStorage.clear();
	save();
    
    //initialize variables
    currentJob = 0;
    money = 0.0;
	past = new Date().getTime();
	speed = 0;
	ups = 40;
	interval = 1000/ups;
    clickmeNav(1);
    
    moneyDisplay = document.getElementById('amount_display');
    upgradeJobButton = document.getElementById('upgrade_job_button');
    jobButton = document.getElementById('active_job_button'); 
	canvasButton = document.getElementById('dynamicJobButton');
	canvasButton.height = 450;
	canvasButton.width = 700;
    
    //load the save if needed
    if(shouldSave)
	{
        loadSave();
	}
	
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
	}
}, 25);









//UPDATE AND DISPLAY FUNCTIONS
////////////////////////////////////////////////--3--//////////////////////////////////////////////
function update(elapsedTime, now)
{
    updateInfoBar();
    //updateJobs();
	updateCompanies(elapsedTime, now);
    updateUpgrades();
	
	if(navIndex === 1)
	{
		renderJobButton();
	}
    
    if(shouldSave)
        save();
}

function updateInfoBar()
{
    moneyDisplay.innerHTML = "$" + fixNumber(money, 2);
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

function updateCompanies(elapsedTime, now)
{
	for(var i = 0; i < companies.length; i++)
	{
		//The owned Amount
		$("#owned" + i).text(companies[i].owned);
		
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
			$("#cost" + i).text("$" + (companies[i].price).toFixed(2));
			$("#inc" + i).text("$" + (companies[i].inc).toFixed(2));
            
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
	switch(index)
	{
		case 1: gainmoney(jobs[currentJob].inc); break;
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
	if(money >= companies[index].price)
	{
		money = money - companies[index].price;
		companies[index].owned += 1;
        if(companies[index].owned > 1)
        {
            if(companies[index].owned % 100 === 0)
            {
                companies[index].inc += Math.sqrt(companies[index].inc) * 2;
                companies[index].price += companies[index].price * 5;
            }
            else
            {
                if(companies[index].owned % 30 === 0)
                {
                    companies[index].inc += Math.sqrt(companies[index].inc);
                    companies[index].price += (Math.sqrt(companies[index].price) * 18);
                }
                else
                {
                    if((companies[index].inc + Math.sqrt(companies[index].inc)) >= companies[index].price)
                    {
                        companies[index].inc += Math.sqrt(companies[index].inc);
                        companies[index].price += (Math.sqrt(companies[index].price) * 10);
                    }
                    else
                    {
                        companies[index].inc += Math.sqrt(companies[index].inc);
                        companies[index].price += (Math.sqrt(companies[index].price) * 3);
                    }
                }
            }
        }
        else
        {
              companies[index].price += (Math.sqrt(companies[index].price) - 1);
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
        var prefixes = ["Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredicillion", "Quatturodecillion", "Quindecillion", "Sexdecillion", "Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion", "Unvigintillion", "Duovigintillion", "Tresvigintillion", "Quattuorvigintillion", "Quinvigintillion", "Sexvigintillion", "Septenvigintillion", "Octovigintillion", "Novemvigintillion", "Trigintillion", "Untrigintillion", "Duotrigintillion", "Googol"];
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
    money += amount;
}

function renderJobButton()
{
	var ctx = canvasButton.getContext('2d');
	//get Variables
	var now = new Date();
	var seconds = now.getSeconds();
	var milliseconds = now.getMilliseconds();
	var newSeconds = seconds + (milliseconds / 1000);
	//set attributes
	ctx.fillStyle = "rgba(0,0,0, 0)";
	ctx.strokeStyle = 'rgba(40,209,250, 1)';
	ctx.lineWidth = 15;
	ctx.shadowBlur = 20;
	ctx.shadowColor = '28d1fa';
	//clear the rect
	ctx.clearRect(0,0,700,450);
	//draw new elements
	ctx.beginPath();
	ctx.arc(350, 225, 100, degToRad(270), degToRad((newSeconds*6)-90));
    ctx.stroke();
	//draw the text
	ctx.font = '25px Arial';
    ctx.fillStyle = '28d1fa';
    ctx.fillText(seconds, 335, 230);
}

function degToRad(degree)
{
    var factor = Math.PI / 180;
    return degree*factor;
}









//OBJECT FUNCTIONS
////////////////////////////////////////////////--6--//////////////////////////////////////////////

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
    @param name : the name of the company.
    @param owned : boolean for if the company is owned or not.
    @param time : the time in millis it takes for that company to produce money.
    @param price : the price of the next tier of company.
    @param inc : how much money that company makes per the speed.
*/
function Company(name, owned, time,  price, inc, past)
{
	this.name = name;
	this.owned = owned;
    this.time = time;
	this.price = price;
	this.inc = inc;
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
    setItem("money", money);
    setItem("currentJob", currentJob);
    setItem("past", past);
    
    localStorage.setItem("jobs", JSON.stringify(jobs));
    localStorage.setItem("companies", JSON.stringify(companies));
    localStorage.setItem("company_progress", JSON.stringify(company_progress));
}

function loadSave()
{
    if(getItem("currentJob") !== null)
	   currentJob = Number(getItem("currentJob"));
    if(getItem("money") !== null)
	   money = Number(getItem("money"));
    if(getItem("past") !== null)
       past = getItem("past");
    
    if(JSON.parse(localStorage.getItem("jobs")) !== null)
        jobs = JSON.parse(localStorage.getItem("jobs"));
    if(JSON.parse(localStorage.getItem("companies")) !== null)
        companies = JSON.parse(localStorage.getItem("companies"));
    if(JSON.parse(localStorage.getItem("company_progress")) !== null)
        company_progress = JSON.parse(localStorage.getItem("company_progress"));
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
    localStorage.clear();
	save();
	
    money = 0;
    currentJob = 0;
    save();
	
	for(var x = 0; x < company_progress.length; x++)
	{
		company_progress[x] = 0;
	}
	save();
	
	for(x = 0; x < companies.length; x++)
	{
		companies[x].owned = 0;	
		this.name = name;
		this.owned = owned;
    	this.time = time;
		this.price = price;
		this.inc = inc;
    	this.past = past;
	}
	save();
	
	loadSave();

    //window.location='index.html';
}










