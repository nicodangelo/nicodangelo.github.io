"use strict";
class Button extends UIObject
{
    constructor(text, x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
    }
    
    update(canvas)
    {
      
    }
    
    render(canvas)
    {
        canvas.setFillColor(0.2, 0.6, 0.5, 1.0);
        
        //draw button
        canvas.fillRect(this.x, this.y, this.width, this.height);
        
        //text options
        var fontSize = 20;
        canvas.setFillColor(1, 1, 1, 1.0);
        canvas.font = fontSize + "px sans-serif";
 
        //text position
        var textSize = canvas.measureText(this.text);
        var textX = this.x + (this.width/2) - (textSize.width / 2);
        var textY = this.y + (this.height/2) - (fontSize/2);
 
        //draw the text
        canvas.fillText(this.text, textX, textY);
    }
    
    var
    
}

