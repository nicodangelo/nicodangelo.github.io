var canvasButton;
var ctx;
var cuurentJob;
var WIDTH;
var HEIGHT;
var rings;
var shouldRenderRings = false;

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

function onLoad()
{
    canvasButton = document.getElementById('FunJobButton');
    
    if(window.innerWidth > 2000)
        canvasButton.width = 800;
    else
        canvasButton.width = 700;
    
    if(window.innerHeight > 900)
        canvasButton.height = 650;
    else
        canvasButton.height = 450;
    
    WIDTH = canvasButton.width;
    HEIGHT = canvasButton.height;
    
    rings = [
        new Ring(0, 270, 15, .5, 30, 1, 0),
        new Ring(0, 360, 4, 0, HEIGHT / 2 - 10, 1, 0)
    ];
    
    ctx = canvasButton.getContext('2d');
    currentJob = 0;
    
    //load the styles for everything
    ctx.fillStyle = "rgba(0,0,0, 0)";
	ctx.strokeStyle = 'rgba(40,209,250, 1)';
    ctx.font = '25px Arial';
    ctx.shadowColor = '#28d1fa';
    
    shouldRenderRings = true;
}

function CreateRing()
{
	if(currentJob < 60)
	{
		if(Money.money >= 50.00)
		{
			Money.money = Money.money - 50.00;
			var start = Math.floor((Math.random() * 360));
			var stop = Math.floor((Math.random() * 360) + start);
			var thickness = Math.floor((Math.random() * 40) + 1);
			var inc = Math.floor((Math.random()) * 5 + 1);
			var fromLast = Math.floor((Math.random() * currentJob) + 20);
			var halfHeight = HEIGHT / 2;
			var fromCenter = Math.abs(Math.floor((Math.random() * halfHeight - thickness))); 
			var opacity = Math.abs(Math.random() * 1);
			var direction = Math.floor(Math.random() * 2);
			var ring = new Ring(start, stop, thickness, inc, fromCenter, opacity, direction);
			rings.push(ring);
			console.log(fromCenter);
			currentJob++;
		}
	}
	gainmoney(1.00);
    
}

function render()
{
    //clear the rect
	ctx.clearRect(0,0,WIDTH,HEIGHT);
    
	//get Variables
	var now = new Date();
	var seconds = now.getSeconds();
	var milliseconds = now.getMilliseconds();
	var newSeconds = seconds + (milliseconds / 1000);
    
    ctx.shadowBlur = 2;
    renderRings();

    //draw the text
    //ctx.fillStyle = '#28d1fa';
    //ctx.fillText(seconds, WIDTH / 2 - 10, HEIGHT / 2);
    //ctx.fillStyle = "rgba(0,0,0, 0)";
}

function renderRings()
{
    if(shouldRenderRings)
    {
        var inc = 0;
        for(var i = 0; i < rings.length; i++)
        {
            if(rings[i].direction != 1)
            {
                inc = rings[i].inc;
                rings[i].start = rings[i].start + inc;
                rings[i].stop = rings[i].stop + inc;
                ctx.lineWidth = rings[i].thickness;
                ctx.globalAlpha = rings[i].opacity;
                ctx.beginPath();
                ctx.arc(WIDTH / 2, HEIGHT / 2, rings[i].fromCenter, degToRad(rings[i].start), degToRad(rings[i].stop));
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
                ctx.arc(WIDTH / 2, HEIGHT / 2, rings[i].fromCenter,degToRad(rings[i].start), degToRad(rings[i].stop));
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

























