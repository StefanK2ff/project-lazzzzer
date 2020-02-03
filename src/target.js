"use strict"

class Target {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.inititalSize = 50;
        this.size = this.inititalSize;
        this.x = this.canvas.width*0.75;
        this.y = this.canvas.height*0.60;
    }
    changePosRandom(){
        this.changeXPosRandom();
        this.changeYPosRandom();
    }

    changeXPosRandom(){
        this.x = (this.canvas.width/2 * Math.random() + this.canvas.width/2);
        if (this.x + this.size > this.canvas.width-this.size) this.x - this.size;
    }

    changeYPosRandom() {
        this.y = (this.canvas.height/2 * Math.random() + this.canvas.height/2)-this.size*5;
    }

    draw() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.x, this.y, this.size, this.size) //pos x pos y width height
    }
}