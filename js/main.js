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
var achieveAmount = 25;

var companies = [
           //Company(name, owned, price,  inc, inflation, time, past)
	/*0*/new Company("Candy Store", 0, 4, 0.25, 1.06, 2000, 0),
	/*1*/new Company("Hot Dog Stand",0, 70, 1.00, 1.14, 3000, 0),
	/*2*/new Company("Diner", 0, 325.00, 35.00, 1.17, 6000, 0),
    /*3*/new Company("Music Store", 0, 1300.00, 50.00, 1.19, 9000, 0),
    /*4*/new Company("Pawn Shop", 0, 4000.00, 135.20, 1.17, 12000, 0),
    /*5*/new Company("I'm Lost", 0, 10000.00, 250.00, 1.16, 14000, 0)
];

var upgrades = [
    //Upgrade(type, name, text, price, perchased, action, actionAmount)
    new Upgrade("Jobs", "Job lv.2", "Job Button x2",  50.00, false, "multiplier", 2),
    new Upgrade("Jobs", "Job lv.3", "Job Button x2",  100.00, false, "multiplier", 2),
    new Upgrade("Jobs", "Job lv.4", "Job Button x2",  1000.00, false, "multiplier", 2),
    new Upgrade("Jobs", "Job lv.5", "Job Button x2",  2000.00, false, "multiplier", 2),
    new Upgrade("Jobs", "Job lv.6", "Job Button x2",  12000.00, false, "multiplier", 2),
    new Upgrade("Jobs", "Job lv.7", "Job Button x2",  24000.00, false, "multiplier", 2),
    new Upgrade("Jobs", "Job lv.8", "Job Button x2",  96000.00, false, "multiplier", 2),
    new Upgrade("Jobs", "Job lv.9", "Job Button x2",  125000.00, false, "multiplier", 2),
    new Upgrade("Jobs", "Job lv.10", "Job Button x2", 12521846.00, false, "multiplier", 2),
    new Upgrade("Jobs", "Job lv.11", "Job Button x5", 222222222.01, false, "multiplier", 5)
];

var save_companies = [
           //Company(name, owned, price,  inc, inflation, time, past)
	/*0*/new Company("Candy Store", 0, 4, 0.25, 1.06, 2000, 0),
	/*1*/new Company("Hot Dog Stand",0, 70, 1.00, 1.14, 3000, 0),
	/*2*/new Company("Diner", 0, 325.00, 35.00, 1.17, 6000, 0),
    /*3*/new Company("Music Store", 0, 1300.00, 50.00, 1.19, 9000, 0),
    /*4*/new Company("Pawn Shop", 0, 4000.00, 135.20, 1.17, 12000, 0),
    /*5*/new Company("Jakian", 0, 10000.00, 250.00, 1.16, 14000, 0)
];









//START OF THE GAME AND MAIN LOOP
////////////////////////////////////////////////--2--//////////////////////////////////////////////
window.onload = function()
{   
    //initialize variables
    onLoad();
    currentJob = 0;
    Money.money = 0.0;
	past = new Date().getTime();
	speed = 0;
	ups = 40;
	interval = 1000/ups;
    clickmeNav(1);
	currentJob = 0;
    
    moneyDisplay = document.getElementById('amount_display');
    
    //load the save if needed
    if(shouldSave)
        loadSave();
	else
		localStorage.clear();
	
	//initialize the companies
	for(var i = 0; i < companies.length; i++)
	{
		$("#perchaseName" + i).text(companies[i].name);
		$("#perchasePrice" + i).text("$" + (companies[i].price).toFixed(2));
        companies[i].past = new Date().getTime();
	}
    
    //initialize the Upgrades
    for(var i = 0; i < upgrades.length; i++)
    {
        if(upgrades[i].perchased === false)
        {
            $("#vertical" + i).text(upgrades[i].type);
            $("#titleUpgrade" + i).text(upgrades[i].name);
            $("#extraInformation" + i).text(upgrades[i].text);
            $("#costUpgrade" + i).text("Cost: $" + fixNumber(upgrades[i].price, 2));
        }
        else
        {
             $("#upgrade" + i).css("display", "none");
        }
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
    else
        localStorage.clear();
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
            $("#companyButton" + i).css("background-color", "rgba(0, 85, 86, .8)");
        }
        else
        {   if($("#companyButton" + i).css("background-color") !== "rgba(0, 192, 194, .8)")
                $("#companyButton" + i).css("background-color", "rgba(0, 192, 194, .8)");
        }
		
		//The progress bar
		if(companies[i].owned > 0)
		{
			if(companies[i].progress > 99)
				companies[i].progress = 0;
			if(companies[i].time < 100)
			{
				$("#bar"+ i).css("width",100+"%");
			}
			else
			{
                //this needs to desparatly be fixed but im like how?
                companies[i].progress = (now - companies[i].past) / (companies[i].time / 100);
                if(companies[i].progress <= 100)
				    $("#bar"+ i).css("width",Math.max(companies[i].progress, 1)+"%");
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
    if(index != 0)
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
		var countCompanies = 0;
        for(var h = 0; h < companies.length; h++)
        {
			if(companies[h].owned >= achieveAmount)
            	countCompanies++;
        }
        if(countCompanies >= companies.length)
        {
            cutTimeHalf();
        }
	}
}

function buyUpgrade(index)
{
    if(Money.money >= upgrades[index].price)
    {
        Money.money = Money.money - upgrades[index].price;
        $("#upgrade" + index).css("display", "none");
        upgrades[index].perchased = true;
        CreateRing();
        switch(upgrades[index].type)
        {
            case "Jobs": 
                switch(upgrades[index].action)
                {
                    case "multiplier" : jobMoney = jobMoney * upgrades[index].actionAmount;
                    default: break;
                }
                
                
                break;
            default: break;
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
    this.past = past;
    this.action = action;
    this.actionAmount = actionAmount;
}











//SAVE AND LOAD SAVE FUNCTIONS
////////////////////////////////////////////////--7--//////////////////////////////////////////////

function save()
{
    setItem("money", Money.money);
    setItem("currentJob", currentJob);
    setItem("past", past);
    setItem("achieveAmount", achieveAmount);
    
    localStorage.setItem("companies", JSON.stringify(companies));
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
    if(getItem("achieveAmount") !== null)
        achieveAmount = getItem("achieveAmount");
    
    if(JSON.parse(localStorage.getItem("companies")) !== null)
        companies = JSON.parse(localStorage.getItem("companies"));
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
    
    achieveAmount = 25;
    Money.money = 0.0;
    currentJob = 0;
    
	rings.splice(0,rings.length);
    rings.push(new Ring(0, 270, 15, 0.5, 30, 1, 0));
    
    for(var i = 0; i < companies.length; i++)
    {
        companies[i] = save_companies[i];
    }
	
    save();
    window.location='index.html';
}










