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
  this.helpercolor1 = "#3CFF33";
}

Laser.prototype.setAim = function(direction) {
    if (direction === "up") {
        if(this.h1Y >= this.canvas.height*0.1) this.h1Y -= 3;
    }
    else if (direction === "down") {
        if(this.h1Y < this.canvas.height*0.90) this.h1Y += 3;
    }
    else if (direction === "left") {
        if(this.h0X > this.canvas.width*0.1) this.h0X -= 3;
    }
    else if (direction === "right") {
        if(this.h0X <= this.canvas.width/2-this.canvas.width*0.5) this.h0X += 3;
    }
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
    
    //Store all Points
    this.pathArrayPoints = [ // stores the endpoints of each line
        {x: this.h0X,       y: this.h0Y},
        {x: this.h1X,       y: this.h1Y},
        {x: h2X,            y: h2Y},
        {x: h3X,            y: h3Y},
        {x: h4X,            y: h4Y}
    ];
    this.helperArrayPoints = [
        {x: this.h0X,       y: this.h0Y},
        {x: this.h1X,       y: this.h1Y}
    ];
    this.helperExtendedArrayPoints = [
        {x: this.h0X,       y: this.h0Y},
        {x: this.h1X,       y: this.h1Y},
        {x: (h2X*0.1),     y: (this.h1Y*(1-0.1))}
    ];

    this.pathArrayLines = [ // stores the gradients and reference points for each path
        {grad: p1grad, ref:p1ref},
        {grad: p2grad, ref:p2ref},
        {grad: p3grad, ref:p3ref},
        {grad: p4grad, ref:p4ref},
    ];
    return this.pathArrayPoints;
};

Laser.prototype.checkHitTarget = function(target, line) { 
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
    var iPLt_x = (target.y - line.ref) / line.grad; // intersectionpoint Path Line top x coordinate
    var iPlt_y = target.y;
    //check for target's left vertical line
    //  Itersection point of path and target's left vertical line
    var iPLl_x = target.x;
    var iPLl_y = line.grad * iPLl_x + line.ref;
    //check for target's right vertical line
    //  Itersection point of path and target's right vertical line
    var iPLr_x = target.x + target.size;
    var iPLr_y = line.grad * iPLr_x + line.ref;
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
    this.ctx.fillStyle = "#3CFF33";
    this.ctx.fillRect(h0x, this.canvas.height-5, 4, 7); //pos x pos y width height
    this.ctx.fillStyle = "#3CFF33";
    this.ctx.fillRect(0, h1y, 7, 3);            //pos x pos y width height
    this.ctx.fillStyle;                       //end of line
}

Laser.prototype.drawPath = function(points, color, width) {
    this.ctx.fillStyle;
    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    points.forEach(point => {
        this.ctx.lineTo(point.x, point.y);
    });
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
    this.ctx.closePath();
}