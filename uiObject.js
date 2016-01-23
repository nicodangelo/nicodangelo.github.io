"use strict";
class UIObject
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }
}
















var UIObject = {
    intersects: function(obj, mouse) {
        var t = 5; //tolerance
    },
    updateStats: function(canvas){
        if (this.intersects(this, canvas.mouse)) {
            this.hovered = true;
            if (canvas.mouse.clicked) {
                this.clicked = true;
            }
        } else {
            this.hovered = false;
        }
 
        if (!canvas.mouse.down) {
            this.clicked = false;
        }               
    }
};