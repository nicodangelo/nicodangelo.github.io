// JavaScript Document

"use strict";
var canvas;
var context;
var game;
var width, height;
var amount, netWorth, amountFactor;
var column, row;
var menuButtons = [];
var workButtons = [];
var companyButtons = [];
var typeBrowser = true;
var hasWaiterPerchased = false;
var hasMusicianPerchased = false;

function setup(c)
{
	canvas = c;
	console.log(canvas);
	context = canvas.getContext("2d");
	
	//set the amount variables
	amount = 0.0; 
	if(getItem("amount") !== null)
	{
		//amount = Number(getItem("amount"));
	}
	netWorth = 0.0;
	amountFactor = 0.0;
	width = canvas.width;
	height = canvas.height;
	column = width / 5;
	row = height / 7;
	
	//Check for the mouse events
    canvas.addEventListener("mousedown", eventMouseDown);
    canvas.addEventListener("mouseup", eventMouseUp);
	
	game = new game();
	game.setup();
	
	
	var interval = setInterval(render, 40);
	
	/*if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
		console.log("chrome");
		render();
	}
	else
	{
		console.log("not chrome");
		var interval = setInterval(render, 40);
		typeBrowser = false;
	}*/
	
	//var updateInterval = Interval(update, 1000 / 60);
}

//The master render function
function render()
{
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	game.render();
	/*if(typeBrowser)
	{
		window.requestAnimationFrame(render);
		game.render();
	}
	else
	{
		context.clearRect(0, 0, canvas.width, canvas.height);
		game.render();
		//console.log("not chrome");
	}*/
	
	update();
	context.clearRect(0, 0, canvas.width, canvas.height);
	game.render();
}

function update()
{
	amount += amountFactor;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	game.update();
}

function eventMouseDown(e)
{	
	for(var i = 0; i < menuButtons.length; i++)
	{
		menuButtons[i].eventMouseDown(e);
	}	
	
	for(i = 0; i < workButtons.length; i++)
	{
		workButtons[i].eventMouseDown(e);
	}
	
	for(i = 0; i < companyButtons.length; i++)
	{
		companyButtons[i].eventMouseDown(e);
	}
	
	//console.log("clicked at " + mouseX + ", " + mouseY);
}

function eventMouseUp(e)
{
	for(var i = 0; i < menuButtons.length; i++)
	{
		menuButtons[i].eventMouseUp(e);
	}	
	
	for(i = 0; i < workButtons.length; i++)
	{
		workButtons[i].eventMouseUp(e);
	}	
	
	for(i = 0; i < companyButtons.length; i++)
	{
		companyButtons[i].eventMouseUp(e);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//IS THE "GAME" IT HOLDS AND CALLS ALL OTHER FUNCTIONS TO RUN THE GAME
function game()
{
	var workButton,
		upgradesButton,
		companyButton,
		optionsButton,
		stocksButton,
		stockInfoButton,
		investorsButton,
		achievementsButton;
		
		/*
			hot dog stand - hot dog vendor
			Coffee Shop - musician
			restaurant - waiter
			
			Oil Company - 
			Tech Company - 
		*/
		
	var hotDogStandButton,
		coffeeShopButton,
		restaurantButton;
	
	var hotDogVendorButton,
		musicianButton,
		waiterButton;
	
	this.setup = function()
	{
		console.log("game setup");
		
		//Create the Buttons
		workButton = new staticButton(0, row * 2, column - 5, row - 5, "work", "Work", "#5900b3", "#7300e6", "#9933ff", false);
		upgradesButton = new staticButton(0, row * 3, column - 5, row - 5, "upgrades", "Upgrades", "#ff8000", "#e67300", "#ff9933", false);
		companyButton = new staticButton(0, row * 4, column - 5, row - 5, "company", "Company",  "#0099cc", "#00bfff", "#33ccff", false);
		optionsButton = new staticButton(0, row * 5, column - 5, row - 5, "options", "Options", "#ff8000", "#e67300", "#ff9933", false);
		stocksButton = new staticButton((column * 4) - 10, row * 2, column - 5, row - 5, "stocks", "Stocks", "#ff8000", "#e67300", "#ff9933", false);
		stockInfoButton = new staticButton((column * 4) - 10, row * 3, column - 5, row - 5, "stock_info", "Stock Info", "#ff8000", "#e67300", "#ff9933", false);
		investorsButton = new staticButton((column * 4) - 10, row * 4, column - 5, row - 5, "investors", "Investors", "#ff8000", "#e67300", "#ff9933", false);
		achievementsButton = new staticButton((column * 4) - 10, row * 5, column-5, row-5, "achievements", "Achievements", "#ff8000", "#e67300", "#ff9933", false);
		
		hotDogStandButton = new dynamicButton((column * 1), row * 2, column - 5, row - 5, "hot_dog_stand", "Hot Dog Stand", "#0099cc", "#00bfff", "#33ccff", 50.00, true);
		restaurantButton = new dynamicButton((column * 1), row * 3, column - 5, row - 5, "restaurant", "Restaurant","#0099cc", "#00bfff", "#33ccff", 525.25, true);
		coffeeShopButton = new dynamicButton((column * 1), row * 4, column - 5, row - 5, "coffee_shop", "Coffee Shop", "#0099cc", "#00bfff", "#33ccff", 8412, true);
		
		hotDogVendorButton = new dynamicButton((column * 1), row * 2, column - 5, row - 5, "hot_dog_vendor", "Hot Dog Vendor", "#5900b3", "#7300e6", "#9933ff", 0.00, true);
		waiterButton = new dynamicButton((column * 1), row * 3, column - 5, row - 5, "waiter", "Waiter",  "#5900b3", "#7300e6", "#9933ff", 52.00, true);
		musicianButton = new dynamicButton((column * 1), row * 4, column - 5, row - 5, "musician", "Musician",  "#5900b3", "#7300e6", "#9933ff", 1300.00, true);
		
		//add the buttons to the array
		menuButtons.push(workButton);
		menuButtons.push(upgradesButton);
		menuButtons.push(companyButton);
		menuButtons.push(optionsButton);
		menuButtons.push(stocksButton);
		menuButtons.push(stockInfoButton);
		menuButtons.push(investorsButton);
		menuButtons.push(achievementsButton);
		
		companyButtons.push(hotDogStandButton);
		companyButtons.push(coffeeShopButton);
		companyButtons.push(restaurantButton);
		
		workButtons.push(hotDogVendorButton);
		workButtons.push(musicianButton);
		workButtons.push(waiterButton);
		
		//initialize the buttons as the work tab being open.
		for(var x = 0; x < workButtons.length; x++)
		{
			workButtons[x].canBeClicked = true;
			workButtons[x].shouldRender = true;
		}
		
		for(var y = 0; y < companyButtons.length; y++)
		{
			companyButtons[y].canBeClicked = false;
			companyButtons[y].shouldRender = false;
		}
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//initialize the buttons accordingly 
		workButton.perchased = true;
		hotDogVendorButton.perchased = true;
		upgradesButton.perchased = true;
		optionsButton.perchased = true;
		companyButton.perchased = true;
		achievementsButton.perchased = true;
		/////////////////////////////////////IMAMOTHERFUCKINGMEMEMACHINE/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		
		
		
		for(x = 0; x < workButtons.length; x++)
		{
			if(!companyButtons[x].perchased)
			{
				workButtons[x].canBeClicked = true;
			}
		}
		
		for(x = 0; x < companyButtons.length; x++)
		{
			if(!companyButtons[x].perchased)
			{
				companyButtons[x].canBeClicked = false;
			}
		}
		
		for(x = 0; x < menuButtons.length; x++)
		{
			if(!menuButtons[x].perchased)
			{
				menuButtons[x].canBeClicked = false;
			}
		}
	};
	
	this.render = function()
	{
		//call all other game render functions HERE!
		renderAmounts();
		shouldRender(menuButtons);
		shouldRender(workButtons);
		shouldRender(companyButtons);
	};
	
	this.update = function()
	{
		setItem("amount", amount);
		//call all other game update functions HERE!
	};
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//THE STATIC BUTTON FUNCTION
function staticButton(x, y, width, height, id, text, fillClicked, fill, cannotClicked, displayExtras)
{
	this.id = id;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.canBeClicked = true;
	this.shouldRender = true;
	this.fillStyle = fill;
	this.shouldDisplayExtras = displayExtras;
	this.fillStyleUnclicked = fill;
	this.fillStyleClicked = fillClicked;
	this.fillCannotBeClicked = cannotClicked;
	this.cannotBeClicked = false;
	this.perchased = false;
	
	this.setup = function(){};
	
	this.render = function()
	{
		//the color of the button
		if(this.cannotBeClicked)
		{
			context.fillStyle = this.fillCannotBeClicked;
		}
		else
		{
			if(this.perchased)
			{
				context.fillStyle = this.fillStyle;
			}
			else
			{
				context.fillStyle = this.fillStyleClicked;
			}
		}

		//render the button itself
		context.fillRect(this.x, this.y, this.width, this.height);
		
		if(this.text !== null)
		{
			//Text options
			var fontSize = 25;
			context.fillStyle = "white";
			context.font = fontSize + "px sans-serif";
			
			//Text position
			var textSize = context.measureText(this.text);
			var textX = this.x + (this.width / 2) - (textSize.width / 2);
			var textY = this.y + (this.height/2) + (this.height / 9);
			

			this.text = text;
			if(!this.perchased && this.shouldDisplayExtras)
			{
				var newAmount = this.perchaseCost.toFixed(2);
				this.text += " $" + newAmount;
			}
			
			//render the Text over the button
			context.fillText(this.text, textX, textY);
		}
	};
	
	this.update = function(){};
	
	this.eventMouseDown = function(e)
	{
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		
		if(this.canBeClicked)
		{
			if(mouseX >= this.x && mouseX <= (this.x + this.width) && mouseY >= this.y && mouseY <= (this.y + this.height))
			{
				switch(this.id)
				{
					case "work": 
							//console.log("work Button Pressed"); 
							this.fillStyle = this.fillStyleClicked;
							for(var x = 0; x < workButtons.length; x++)
							{
								workButtons[x].canBeClicked = true;
								workButtons[x].shouldRender = true;
							}
							
							for(var y = 0; y < companyButtons.length; y++)
							{
								companyButtons[y].canBeClicked = false;
								companyButtons[y].shouldRender = false;
							}
						break;
					case "upgrades": 
							//console.log("Upgrades Button Pressed"); 
							this.fillStyle = this.fillStyleClicked;
							for(x = 0; x < workButtons.length; x++)
							{
								workButtons[x].canBeClicked = false;
								workButtons[x].shouldRender = false;
							}
							
							for(y = 0; y < companyButtons.length; y++)
							{
								companyButtons[y].canBeClicked = false;
								companyButtons[y].shouldRender = false;
							}
						break;
					case "company": 
							//console.log("Company Button Pressed"); 
							this.fillStyle = this.fillStyleClicked;
							for(x = 0; x < workButtons.length; x++)
							{
								workButtons[x].canBeClicked = false;
								workButtons[x].shouldRender = false;
							}
							
							for(y = 0; y < companyButtons.length; y++)
							{
								companyButtons[y].canBeClicked = true;
								companyButtons[y].shouldRender = true;
							}
						break;
					case "options": 
							//console.log("Options Button Pressed"); 
							this.fillStyle = this.fillStyleClicked;
							for(x = 0; x < workButtons.length; x++)
							{
								workButtons[x].canBeClicked = false;
								workButtons[x].shouldRender = false;
							}
							
							for(y = 0; y < companyButtons.length; y++)
							{
								companyButtons[y].canBeClicked = false;
								companyButtons[y].shouldRender = false;
							}
						break;
					case "stocks": 
							//console.log("Stocks Button Pressed"); 
							this.fillStyle = this.fillStyleClicked;
							for(x = 0; x < workButtons.length; x++)
							{
								workButtons[x].canBeClicked = false;
								workButtons[x].shouldRender = false;
							}
							
							for(y = 0; y < companyButtons.length; y++)
							{
								companyButtons[y].canBeClicked = false;
								companyButtons[y].shouldRender = false;
							}
						break;
					case "stock_info": 
							//console.log("Stock Info Button Pressed"); 
							this.fillStyle = this.fillStyleClicked;
							for(x = 0; x < workButtons.length; x++)
							{
								workButtons[x].canBeClicked = false;
								workButtons[x].shouldRender = false;
							}
							
							for(y = 0; y < companyButtons.length; y++)
							{
								companyButtons[y].canBeClicked = false;
								companyButtons[y].shouldRender = false;
							}
						break;
					case "investors": 
							//console.log("Investors Button Pressed"); 
							this.fillStyle = this.fillStyleClicked;
							for(x = 0; x < workButtons.length; x++)
							{
								workButtons[x].canBeClicked = false;
								workButtons[x].shouldRender = false;
							}
							
							for(y = 0; y < companyButtons.length; y++)
							{
								companyButtons[y].canBeClicked = false;
								companyButtons[y].shouldRender = false;
							}
						break;
					case "achievements": 
							//console.log("Achievements Button Pressed"); 
							this.fillStyle = this.fillStyleClicked;
							for(x = 0; x < workButtons.length; x++)
							{
								workButtons[x].canBeClicked = false;
								workButtons[x].shouldRender = false;
							}
							
							for(y = 0; y < companyButtons.length; y++)
							{
								companyButtons[y].canBeClicked = false;
								companyButtons[y].shouldRender = false;
							}
						break;
					default: console.log("clicked Mouse button"); break;
				}
			}
		}
	};
	
	this.eventMouseUp = function(e)
	{
		this.fillStyle = this.fillStyleUnclicked;
	};
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//THE DYNAMIC AND DISPLAY BUTTON FUNCTION
function dynamicButton(x, y, width, height, id, text, fillClicked, fill, cannotClicked, cost, displayExtras)
{
	this.id = id;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.canBeClicked = true;
	this.shouldRender = true;
	this.fillStyle = fill;
	this.fillStyleUnclicked = fill;
	this.shouldDisplayExtras = displayExtras;
	this.fillStyleClicked = fillClicked;
	this.perchased = false;
	this.fillCannotBeClicked = cannotClicked;
	this.cannotBeClicked = false;
	this.perchaseCost = cost;
	this.addAmount = (cost / 4);
	
	this.setup = function(){};
	
	this.render = function()
	{
		//the color of the button
		if(this.cannotBeClicked)
		{
			context.fillStyle = this.fillCannotBeClicked;
			//if(amount >= this.perchaseCost)
			//{
			//	context.fillStyle = this.fillStyle;
			//}
		}
		else
		{
			if(this.perchased)
			{
				context.fillStyle = this.fillStyle;
			}
			else
			{
				context.fillStyle = this.fillStyleClicked;
			}
		}
		
		//render the button itself
		context.fillRect(this.x, this.y, this.width, this.height);
		
		if(this.text !== null)
		{
			//Text options
			var fontSize = 25;
			context.fillStyle = "white";
			context.font = fontSize + "px sans-serif";
			
			//Text position
			var textSize = context.measureText(this.text);
			var textX = this.x + (this.width / 2) - (textSize.width / 2);
			var textY = this.y + (this.height/2) + (this.height / 9);
			
			this.text = text;
			if(!this.perchased || this.perchaseCost > 0 && this.shouldDisplayExtras)
			{
				var newAmount = this.perchaseCost.toFixed(2);
				this.text += " $" + newAmount;
			}

			//render the Text over the button
			context.fillText(this.text, textX, textY);
		}
	};
	
	this.update = function()
	{
		
	};
	
	this.eventMouseDown = function(e)
	{
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		console.log(this.id + " ID " + this.canBeClicked);
		
		if(this.canBeClicked)
		{
			if(mouseX >= this.x && mouseX <= (this.x + this.width) && mouseY >= this.y && mouseY <= (this.y + this.height))
			{
				switch(this.id)
				{
					case "hot_dog_stand": 
							if(amount >= this.perchaseCost)
							{
								this.fillStyle = this.fillStyleClicked;
								amount -= this.perchaseCost;
								this.perchased = true;
								this.addAmount = ((this.addAmount) * 1.07);
								amountFactor += (this.addAmount / 25);
								this.perchaseCost = this.perchaseCost * 1.07;
							}
						break;
					case "coffee_shop": 
							if(amount >= this.perchaseCost && hasMusicianPerchased)
							{
								this.fillStyle = this.fillStyleClicked;
								amount -= this.perchaseCost;
								this.perchased = true;
								this.addAmount = ((this.addAmount) * 1.15);
								amountFactor += (this.addAmount / 25);
								this.perchaseCost = this.perchaseCost * 1.15;
							}
						break;
					case "restaurant": 
							if(amount >= this.perchaseCost && hasWaiterPerchased)
							{
								this.fillStyle = this.fillStyleClicked;
								amount -= this.perchaseCost;
								this.perchased = true;
								this.addAmount = ((this.addAmount) * 1.14);
								amountFactor += (this.addAmount / 25);
								this.perchaseCost = this.perchaseCost * 1.14;
							}
						break;
					case "musician": 
							this.fillStyle = this.fillStyleClicked;
							if(this.perchased)
							{
								amount+=2;
							}
							else if(amount >= this.perchaseCost)
							{
								amount -= this.perchaseCost;
								this.perchased = true;
								this.perchaseCost = 0.0;
								hasMusicianPerchased = true;
							}
						break;
					case "hot_dog_vendor": 
							this.fillStyle = this.fillStyleClicked;
							if(this.perchased)
							{
								amount+=0.25;
							}
							else if(amount >= this.perchaseCost)
							{
								amount -= this.perchaseCost;
								this.perchased = true;
								this.perchaseCost = 0.0;
							}
						break;
					case "waiter": 
							this.fillStyle = this.fillStyleClicked;
							if(this.perchased)
							{
								amount+=1;
							}
							else if(amount >= this.perchaseCost)
							{
								amount -= this.perchaseCost;
								this.perchased = true;
								this.perchaseCost = 0.0;
								hasWaiterPerchased = true;
							}
						break;
					default : break; 
				}
			}
		}
	};
	
	this.eventMouseUp = function(e)
	{
		this.fillStyle = this.fillStyleUnclicked;
	};
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//EXTRA HELPER FUNCTIONS AND INDIVIDUAL FUNCTIONS
function renderAmounts()
{
	context.fillStyle = "#000000";
	context.font="40px Georgia";
	var newAmount = amount.toFixed(2);
	context.fillText("$" + newAmount, column, row);
	//context.fillText("Net Worth: $" + netWorth, column * 3, row);
}

function shouldRender(listOfButtons)
{
	for(var i = 0; i < listOfButtons.length; i++)
	{
		if(listOfButtons[i].shouldRender === true)
		{
			listOfButtons[i].render();
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////
function setItem(key, variable)
{
	localStorage.setItem(key, variable);
}

function getItem(key)
{
	return localStorage.getItem(key);
}
