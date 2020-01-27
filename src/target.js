"use strict"

function Target(canvas) { // posX, posY, size
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.inititalSize = 50;
    this.size = this.inititalSize;
    this.x = this.canvas.width*0.75;
    this.y = this.canvas.height*0.60;
}

Target.prototype.changePosRandom = function() {
    console.log(this)
    this.changeXPosRandom();
    this.changeYPosRandom();
}

Target.prototype.changeXPosRandom = function() {
    this.x = (this.canvas.width/2 * Math.random() + this.canvas.width/2)-this.size*2;
}

Target.prototype.changeYPosRandom = function() {
    this.y = (this.canvas.height/2 * Math.random() + this.canvas.height/2)-this.size*5;
}

Target.prototype.draw = function() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.x, this.y, this.size, this.size) //pos x pos y width height
}