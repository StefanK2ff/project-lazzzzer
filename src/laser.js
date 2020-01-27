'use strict';

function Laser(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  //this.shots = shots;
  this.h0XStart = this.canvas.width * 0.25;
  this.h1yStart = this.canvas.height* 0.75;
  this.h0X = this.h0XStart;
  this.h0Y = this.canvas.height; // FIXED
  this.h1X = 0; // FIXED
  this.h1Y = this.h1yStart;
  this.color = "black";
  this.laserSize = 1;
  this.helpercolor = "#3CFF33"
}

Laser.prototype.setAim = function(direction) {
    if (direction === "up") this.h1Y -= 3; // no curly brakets because just 1 line of code
    else if (direction === "down") this.h1Y += 3;
    else if (direction === "left") this.h0X -= 3;
    else if (direction === "right") this.h0X += 3;
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
    //var pathObj;

    //caluate grad an ref of path 1
    p1grad = (this.h0Y-this.h1Y)/(this.h0X-this.h1X);
    p1ref = this.h0Y - (p1grad * this.h0X);
    //calculate grad and ref of path 2
    p2grad = (0 - p1grad);
    p2ref = this.h1Y - p2grad * this.h1X;
    //calculate Hitpoint 2 (top)
    h2Y = 0; // FIXED, TOP OF CANVAS
    h2X = Number(h2Y-p2ref) / p2grad;
    // calculate grad and ref of path 3
    p3grad = (0 - p2grad);
    p3ref = Number(h2Y) - Number(p3grad) * Number(h2X);
    // calculate hitpoint 3 (right)
    h3X = this.canvas.width; // FIXED, RIGHT border of canvase
    h3Y = h3X * p3grad + p3ref;
    // calculate grad and ref of path 4
    p4grad = 0-p3grad;
    p4ref = h3Y - p4grad * h3X;
    // calculate hitpoint 4 (bottom)
    h4Y = this.canvas.height; // FIXED, Bottom end of canvas
    h4X = (h4Y - p4ref) / p4grad;
    //build path obj
    this.pathObj_points = { // stores the dots of the path
        h0: [this.h0X, this.h0Y],
        h1: [this.h1X, this.h1Y],
        h2: [h2X, h2Y],
        h3: [h3X, h3Y],
        h4: [h4X, h4Y]
    };
    this.pathArrayPaths = [
        [p1grad, p1ref],
        [p2grad, p2ref],
        [p3grad, p3ref],
        [p4grad, p4ref]]; // stores the gradients and reference points for each path

    return this.pathObj_points
};

Laser.prototype.checkHitTarget = function(target, path) { 
    var ilt_x = target.x; // intersection left top x coodrinate
    var ilt_y = target.y; // intersection left top y coordinate
    var irt_x = target.x + target.size; // right top
    var irt_y = target.y;
    var ilb_x = target.x + target.size;
    var ilb_y = target.y + target.size;
    var irb_x = target.x + target.size;
    var irb_y = target.y + target.size;
    var hit = false;

    //check for target's upper horizontal line
    //  Intersection point of path and target's upper line
    var iPLt_x = (target.y - path[1]) / path[0]; // intersectionpoint Path Line top x coordinate
    var iPlt_y = target.y;
    //check for target's left vertical line
    //  Itersection point of path and target's left vertical line
    var iPLl_x = target.x;
    var iPLl_y = path[0] * iPLl_x + path[1];
    //check for target's right vertical line
    //  Itersection point of path and target's right vertical line
    var iPLr_x = target.x + target.size;
    var iPLr_y = path[0] * iPLr_x + path[1];
    //  Check if x value of intersection point is between IRT_x and ILT_x
    if (iPLt_x >= ilt_x && iPLt_x <= irt_x){
        hit = true;
    } else if (iPLl_y <= ilb_y && iPLl_y >= ilt_y) { // Check if y value of intersection point is between ILT_y and ILB_y
        hit = true;
    } else if (iPLr_y <= irb_y && iPLr_y >= irt_y) { // Check if y value of intersection point is between IRT_y and IRB_y
        hit = true;
    }

    return hit;  
};
Laser.prototype.drawStartPoints = function(h0x, h1y) {
    this.ctx.fillStyle = this.helpercolor;
    this.ctx.fillRect(h0x, this.canvas.height-5, 5, 5); //pos x pos y width height
    this.ctx.fillStyle = this.helpercolor;
    this.ctx.fillRect(0, h1y, 5, 5);            //pos x pos y width height
    this.ctx.fillStyle;
    this.ctx.beginPath();
    this.ctx.moveTo(h0x, this.canvas.height);    //start of line
    this.ctx.lineTo(0, h1y,);
    this.ctx.lineWidth = 1;                      // size
    this.ctx.strokeStyle = this.helpercolor;
    this.ctx.stroke();                          // Render the path
    this.ctx.closePath();
};

Laser.prototype.draw = function(path) {
    this.ctx.fillStyle;
    this.ctx.beginPath();
    this.ctx.moveTo(path.h0[0], path.h0[1]);    //start of line
    this.ctx.lineTo(path.h1[0], path.h1[1]); 
    this.ctx.lineTo(path.h2[0], path.h2[1]);
    this.ctx.lineTo(path.h3[0], path.h3[1]);
    this.ctx.lineTo(path.h4[0], path.h4[1]);    // end of line
    this.ctx.lineWidth = this.laserSize;        // size
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();                          // Render the path
    this.ctx.closePath();
};
