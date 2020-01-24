'use strict';

function Laser(canvas, shots) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.shots = shots;
  this.h0X = 250;
  this.h0Y = 1000; // FIXED
  this.h1X = 0; // FIXED
  this.h1Y = 750;
}

Laser.prototype.setAim = function(direction) {
    if (direction === "up") this.h1Y -= 10; // no curly brakets because just 1 line of code
    else if (direction === "down") this.h1Y += 10;
    else if (direction === "left") this.h0X -= 10;
    else if (direction === "right") this.h0X += 10;
}

Laser.prototype.calculatePath = function() {
    var p1grad; //gradient of 1 path
    var p2grad;
    var p3grad;
    var p4grad;
    var p1ref; // where the 1. path crosses the Y axis
    var p2ref;
    var p3ref = 0;
    var p4ref;
    var h2X; //hit2 X position
    var h2Y;
    var h3X;
    var h3Y;
    var h4Y;
    var h4X;
    var pathObj;

    //caluate grad an ref of path 1
    p1grad = (this.h0Y-this.h1Y)/(this.h0X-this.h1X);
    p1ref = this.h0Y - (p1grad * this.h0X);
    //calculate grad and ref of path 2
    p2grad = (0 - p1grad);
    p2ref = this.h1Y - p2grad * this.h1X;
        console.log("p2 grad ", p2grad, " p2ref", p2ref);
    //calculate Hitpoint 2 (top)
    h2Y = 0; // FIXED, TOP OF CANVAS
    h2X = Number(h2Y-p2ref) / p2grad;
    // calculate grad and ref of path 3
    p3grad = (0 - p2grad);
    p3ref = Number(h2Y) - Number(p3grad) * Number(h2X);
    // calculate hitpoint 3 (right)
    h3X = 1000; // FIXED, RIGHT border of canvase
    h3Y = h3X * p3grad + p3ref;
    // calculate grad and ref of path 4
    p4grad = 0-p3grad;
    p4ref = h3Y - p4grad * h3X;
    // calculate hitpoint 4 (bottom)
    h4Y = 1000; // FIXED, Bottom end of canvas
    h4X = (h4Y - p4ref) / p4grad;
    //build path obj
    pathObj = {
        h0: [this.h0X, this.h0Y],
        h1: [this.h1X, this.h1Y],
        h2: [h2X, h2Y],
        h3: [h3X, h3Y],
        h4: [h4X, h4Y],
    };

    return pathObj
};

// Player.prototype.didCollide = function(enemy) {
//   
//   return false;
// };

// Player.prototype.handleScreenCollision = function() {
//   
// };

// Player.prototype.removeLife = function() {
//   this.lives -= 1;
// };

Laser.prototype.draw = function(path) {
    this.ctx.fillStyle;
    this.ctx.beginPath();
    console.log(path)
    this.ctx.moveTo(path.h0[0], path.h0[1]);         //(this.fireposX, this.fireposY); //start of line
    this.ctx.lineTo(path.h1[0], path.h1[1]);                            // (this.firstHitX, this.firstHitY);  // end of line
    this.ctx.lineTo(path.h2[0], path.h2[1]);
    this.ctx.lineTo(path.h3[0], path.h3[1]);
    this.ctx.lineTo(path.h4[0], path.h4[1]);
    this.ctx.lineWidth = 2; // size
    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();          // Render the path
    this.ctx.closePath();
};
