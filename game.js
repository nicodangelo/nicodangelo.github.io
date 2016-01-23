var GameEngine = function(canvas, FPS) {
    this.FPS = 1000 / FPS;
    this.canvas = canvas;
    this.context2D = canvas.getContext("2d");
    this.gameObjects = [];
    this.setupCanvas();
}

GameEngine.prototype.setupCanvas = function() {
    this.context2D.textBaseline = "top";
    this.context2D.mouse = {
        x: 0,
        y: 0,
        clicked: false,
        down: false
    };
 
    var engine = this;
} 

GameEngine.prototype.run = function() {
    var desiredTime = Date.now() + this.FPS;
 
    this.update();
    this.draw();
 
    var interval = Math.max(0, desiredTime-Date.now());
    setTimeout(_.bind(this.run, this), interval);
}

GameEngine.prototype.update = function() {
    _.each(this.gameObjects, function(obj) {
        obj.update(this.context2D);
    }, this);
}
 
GameEngine.prototype.draw = function() {
    this.context2D.clearRect(0, 0, 600, 400);
    _.each(this.gameObjects, function(obj) {
        obj.draw(this.context2D);
    }, this);
}




/*
function GameEngine(canvas, FPS)
{
	this.FPS = FPS;
	this.canvas = canvas;
	this.running = null;
	this.context2D = canvas.getContext("2d");
}

GameEngine.prototype.startGame = function(context)
{
	alert("Started game");
	this.running = setInterval(this.run(this.context), 1000);
}

GameEngine.prototype.stopGame = function()
{
	alert("Stoped Game");
	clearInterval(running);
}

GameEngine.prototype.run = function(context)
{
	context.clearRect(0, 0, canvas.width, canvas.height);
}

GameEngine.prototype.setupCanvas = function()
{
	console.log("set up canvas" + this.FPS);
}

GameEngine.prototype.update = function(){}

GameEngine.prototype.render = function(){}

*/


















/*var GameEngine = {
	constructor: function (canvas, FPS)
	{
		this.FPS = 1000 / FPS;
    	this.canvas = canvas;
    	this.context2D = canvas.getContext("2d");
    	this.setupCanvas();
	}
	
	setupCanvas: function (){
		console.log("This setup function has been called!");
	}
	
	
};

GameEngine.start = function(){
	console.log("Started");
}*/

