// JavaScript Document with many different utility type functions
/******************************************************************************************/
/*POPUP CODE*/
function toggle(id)
{
	"use strict";
	var t = document.getElementById(id);
	if(t.style.display === 'none')
	{
		t.style.display = 'block';	
	}
	else
	{
		t.style.display = 'none';	
	}
}

function blanket_size(id)
{
	"use strict";
	var blanketHeight = window.innerHeight;
	var blanket = document.getElementById('blanket');
	blanket.style.height = blanketHeight + 'px';
	var popUpHeight = blanketHeight / 2 - 200;
	var popUp = document.getElementById(id);
	popUp.style.top = popUpHeight + 'px';
}

function window_pos(id)
{
	"use strict";
	var popUp = document.getElementById(id);
	var windowWidth = window.innerWidth;
	var popUpWidth = windowWidth / 2 - 200;
	popUp.style.left = popUpWidth + 'px';
}

function popup(popUpName)
{
	"use strict";
	blanket_size(popUpName);
	window_pos(popUpName);
	toggle('blanket');
	toggle(popUpName);	
}
/******************************************************************************************/
/*END POPUP CODE*/