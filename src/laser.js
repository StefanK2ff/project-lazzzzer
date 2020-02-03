'use strict';

class Laser {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.h0XStart = this.canvas.width * 0.25;
        this.h1yStart = this.canvas.height * 0.75;
        this.h0X = this.h0XStart;
        this.h0Y = this.canvas.height; // FIXED
        this.h1X = 0; // FIXED
        this.h1Y = this.h1yStart;
        this.color = "black";
        this.helpercolor1 = "#3CFF33";
        this.barrierTop = this.canvas.height * 0.35;
    }

    setAim(direction) {
        if (direction === "up" && this.h1Y >= this.canvas.height * 0.1) this.h1Y -= 3;
        else if (direction === "down" && this.h1Y <= this.canvas.height * 0.90) this.h1Y += 3;
        else if (direction === "left" && this.h0X >= this.canvas.width * 0.1) this.h0X -= 3;
        else if (direction === "right" && this.h0X <= this.canvas.width / 2 - this.canvas.width * 0.05) this.h0X += 3;
    }

    calculatePath() {
        let proceed = true;
        this.pathArrayPoints = [];
        this.pathArrayLines = [];

        //function to find out if any path hits the middle barrier
        var hitBarrier = function (grad, ref, barrierTop) {
            if (grad * this.canvas.width / 2 + ref > barrierTop) return true
            else return false
        }.bind(this);

        //caluate gradiend and reference point of path 1 (between hitpoint 0 (h0) and hitpoint 1 (h1))
        var p1grad = (this.h0Y - this.h1Y) / (this.h0X - this.h1X);
        var p1ref = this.h0Y - (p1grad * this.h0X);

        //Path and hitpoint 2 
        var p2grad = (0 - p1grad); // gradient
        var p2ref = this.h1Y - p2grad * this.h1X; // reference point
        //calculate Hitpoint 2 (top)
        var h2Y;
        var h2X;
        //check if ray passed barrier
        if (hitBarrier(p2grad, p2ref, this.barrierTop)) {
            proceed = false;
            h2Y = p2grad * this.canvas.width / 2 + p2ref
            h2X = Number(h2Y - p2ref) / p2grad;
        } else {
            h2Y = 0; // fixed, always at the top of the canvas
            h2X = Number(h2Y - p2ref) / p2grad;
        }
        this.pathArrayPoints.push({
            x: this.h0X,
            y: this.h0Y
        }, {
            x: this.h1X,
            y: this.h1Y
        }, {
            x: h2X,
            y: h2Y
        });
        this.pathArrayLines.push({
            grad: p1grad,
            ref: p1ref
        }, {
            grad: p2grad,
            ref: p2ref
        });

        if (proceed) {
            //path and hitpoint 3
            var p3grad = (0 - p2grad);
            var p3ref = Number(h2Y) - Number(p3grad) * Number(h2X);
            this.pathArrayLines.push({
                grad: p3grad,
                ref: p3ref
            });
            if (hitBarrier(p3grad, p3ref, this.barrierTop)) {
                proceed = false;
                var h3X = this.canvas.width / 2;
                var h3Y = h3X * p3grad + p3ref;
            } else {
                var h3X = this.canvas.width; // FIXED, RIGHT border of canvase
                var h3Y = h3X * p3grad + p3ref;
                proceed = true;
            }
            this.pathArrayPoints.push({
                x: h3X,
                y: h3Y
            });
        }

        if (proceed) {
            //path and hitpoint 4
            var h4Y;
            var h4X;
            var p4grad = 0 - p3grad;
            var p4ref = h3Y - p4grad * h3X;
            this.pathArrayLines.push({
                grad: p4grad,
                ref: p4ref
            });
            if (hitBarrier(p4grad, p4ref, this.barrierTop)) {
                h4X = this.canvas.width / 2;
                h4Y = h4X * p4grad + p4ref;
                proceed = true;
            } else {
                h4Y = this.canvas.height; // FIXED, Bottom end of canvas
                h4X = (h4Y - p4ref) / p4grad;
                proceed = false;
            }
            this.pathArrayPoints.push({
                x: h4X,
                y: h4Y
            });
        }

        if (proceed) {
            // path and hitpoint 5
            var h5Y, h5X;
            var p5grad = (0 - p4grad);
            var p5ref = h4Y - p5grad * h4X;
            h5X = this.canvas.width;
            h5Y = h5X * p5grad + p5ref;
            this.pathArrayPoints.push({
                x: h5X,
                y: h5Y
            });
            this.pathArrayLines.push({
                grad: p5grad,
                ref: p5ref
            });
        }
        this.helperExtendedArrayPoints = [{
                x: this.h0X,
                y: this.h0Y
            },
            {
                x: this.h1X,
                y: this.h1Y
            },
            {
                x: (h2X * 0.1),
                y: p2grad * (h2X * 0.1) + p2ref
            }
        ];
        return this.pathArrayPoints;
    }
    
    drawStartPoints(h0x, h1y) {
        this.ctx.fillStyle = "#3CFF33";
        this.ctx.fillRect(h0x, this.canvas.height - 5, 4, 7); //pos x pos y width height
        this.ctx.fillStyle = "#3CFF33";
        this.ctx.fillRect(0, h1y, 7, 3); //pos x pos y width height
        this.ctx.fillStyle; //end of line
    }

    drawPath(points, color, width) {
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
}