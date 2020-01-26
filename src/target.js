"use strict"

function Target(canvas) { // posX, posY, size
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.size = 50;
    this.x = 700;
    this.y = 700;
}

Target.prototype.draw = function() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.x, this.y, this.size, this.size) //pos x pos y width height
}