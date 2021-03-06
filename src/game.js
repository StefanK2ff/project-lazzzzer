'use strict';

var globalGameOver = false;

function Game() {
  this.canvas = null;
  this.ctx = null;
  this.laser = null;
  this.gameIsOver = false;
  this.gameScreen = null;
  this.target;
  //this.hitTarget = false;
  this.score = 0;
  this.level = 1;
  this.tries = 3;
}

// Append canvas to the DOM, create a laser and a target and start the Canvas loop
Game.prototype.start = function () {
  // Save reference to canvas and its container. Create ctx
  this.canvasContainer = document.querySelector('.canvas-container');
  this.canvas = this.gameScreen.querySelector('canvas');
  this.ctx = this.canvas.getContext('2d');

  // Save reference to the score and level elements
  this.levelElement = this.gameScreen.querySelector('.level .value');
  this.scoreElement = this.gameScreen.querySelector('.score .value');
  this.shotsElement = this.gameScreen.querySelector('.shots .value');

  // Set the canvas dimensions
  this.canvas.setAttribute('width', 600);
  this.canvas.setAttribute('height', 600);

  // Create a new laser for the current round
  this.laser = new Laser(this.canvas);
  // Create the initial target

  this.target = new Target(this.canvas);
  this.target.size = this.target.inititalSize;
  globalGameOver = false;

  // Add event listener for moving the player
  // move by keays
  this.handleKeyDown = function (event) {
    if (event.key === 'ArrowLeft') {
      this.laser.setAim('left');
    } else if (event.key === 'ArrowRight') {
      this.laser.setAim('right');
    } else if (event.key === 'ArrowUp') {
      this.laser.setAim('up');
    } else if (event.key === 'ArrowDown') {
      this.laser.setAim('down');
    } else if (event.key === ' ' && !this.gameIsOver) {
      this.fire();
    }
  };

  //move by voice
  this.handleVoiceInput = function (command) {
    if (command === 'move left') {
      this.laser.setAim('left');
      
    } else if (command === 'move right') {
      this.laser.setAim('right');
      
    } else if (command === 'move up') {
      this.laser.setAim('up');
      
    } else if (command === 'move down') {
      this.laser.setAim('down');
      
    } else if (command === 'fire' || command === 'shoot') {
      currentCommand = "";
      this.fire();
    }
  }

  // Any function provided to eventListener
  // is always called by window (this === window)!
  // So, we have to bind `this` to the `game` object,
  // to prevent it from pointing to the `window` object
  document.body.addEventListener('keydown', this.handleKeyDown.bind(this));

  // Start the canvas requestAnimationFrame loop
  this.startLoop();
};

Game.prototype.startLoop = function () {
  var loop = function () {
    // CLEAR THE CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // calculate the path of the laser
    this.laser.calculatePath();
    // DRAW LASERS
    // draw the full laser but invisible
    this.laser.drawPath(this.laser.calculatePath(), this.laser.color, 2)
    // HELPER: draw the the first bit of the laser as support
    this.laser.drawPath(this.laser.helperExtendedArrayPoints, this.laser.helpercolor1, 3)
    // OBSTACLE: draw the barrier in the middle
    this.laser.drawPath([{
      x: this.canvas.width / 2,
      y: this.laser.barrierTop // Top point
    }, { 
      x: this.canvas.width / 2, // Bottom piunt
      y: this.canvas.height
    }], "white", 3)
    // Draw the target
    this.target.draw();
    // Draw the indikators
    this.laser.drawStartPoints(this.laser.h0X, this.laser.h1Y);
    // handle voice input
    this.handleVoiceInput(currentCommand);
    // TERMINATE LOOP IF GAME IS OVER
    if (!this.gameIsOver) {
      window.requestAnimationFrame(loop);
    }
  }.bind(this);
  // As loop function will be continuously invoked by  `window` object- `window.requestAnimationFrame(loop)` 
  // we have to bind the function so that value of `this` is pointing to the `game` object, like this: var loop = (function(){}).bind(this);

  loop();
};

Game.prototype.passGameOverCallback = function (callback) {
  this.onGameOverCallback = callback;
};

Game.prototype.gameOver = function () {
  // flag `gameIsOver = true stops the loop
  this.gameIsOver = true;

  // Call the gameOver function from `main` to show the Game Over Screen
  this.onGameOverCallback();
};

Game.prototype.removeGameScreen = function () {
  this.gameScreen.remove();
  
};

Game.prototype.roundHandling = function () {
  // check if there was a hit of a part the laser
  var i = 0
  console.log(this.laser.pathArrayLines[i].ref)
  while (!this.hitTarget && i < this.laser.pathArrayLines.length) {
    if (this.checkHitTarget(this.target, this.laser.pathArrayLines[i], i)) {
      this.hitTarget = true;
    } else {
      i++;
    };
  }
  //do something if there was a hit
  if (this.hitTarget) {
    //set score
    this.score = this.score + this.tries * 5;
    // set tries back to 3
    this.tries = 3;
    //set level
    this.level++;
    this.levelAdjust(this.level);
    //modify target
    this.target.changePosRandom();
    //set hit back to false
    this.hitTarget = false;
  } else {
    this.tries--; //reduce tries by one if the laser does not hit
    if (this.tries <= 0) {
      this.gameOver(); // sets game over if tries are zero
      globalGameOver = true;
    }
  }
  this.updateGameStats();
};

Game.prototype.fire = function () {
  //make laser visible for a short time
  this.laser.color = "red"
  this.laser.helpercolor = "red";

  setTimeout(function () {
    this.laser.color = "black";
    this.roundHandling();
  }.bind(this), 500)
}

Game.prototype.updateGameStats = function () {
  this.levelElement.innerHTML = this.level;
  this.scoreElement.innerHTML = this.score;
  this.shotsElement.innerHTML = this.tries;
};

Game.prototype.levelAdjust = function (level) {
  if (this.level % 3 === 0 && this.target.size > 5) {
    this.target.size = this.target.size * 0.8;
  };
  if (this.level >= 9) {
    this.laser.helpercolor1 = "";
  }
}

Game.prototype.checkHitBarrier = function (line, lineNr) {
  var barrT_x = this.canvas.width / 2; // Barrier Top x coordinate
  var barrT_y = this.laser.barrierTop; // Barrier Top y coordinate
  //var barrB_x = this.canvas.width / 2; // Barrier Bottom x coordinate
  var barrB_y = this.canvas.height; // Barrier Bottom y coordinate
  // intersection point of path and barrier - equal 
  var iPB_x = barrT_x;
  var iPB_y = line.grad * iPB_x + line.ref;
  //check if intersection point is between top and bottom of line
  if(iPB_y <= barrB_y && iPB_y >= barrT_y && lineNr <= 2) {
    return true;
  } else {
    return false;
  }
}

Game.prototype.checkHitTarget = function (targ, line, lineNr) {
  var ilt_x = targ.x; // intersection left top x coodrinate
  var ilt_y = targ.y; // intersection left top y coordinate
  var irt_x = targ.x + targ.size; // right top
  var irt_y = targ.y;
  var ilb_x = targ.x;
  var ilb_y = targ.y + targ.size;
  var irb_x = targ.x + targ.size;
  var irb_y = targ.y + targ.size;
  var hit = false;

  //check for targ's upper horizontal line
  //  Intersection point of path and targ's upper line
  var iPLt_x = (targ.y - line.ref) / line.grad; // intersectionpoint Path Line top x coordinate
  var iPLt_y = targ.y;
  //check for targ's left vertical line
  //  Itersection point of path and targ's left vertical line
  var iPLl_x = targ.x;
  var iPLl_y = line.grad * iPLl_x + line.ref;
  //check for targ's right vertical line
  //  Itersection point of path and targ's right vertical line
  var iPLr_x = targ.x + targ.size;
  var iPLr_y = line.grad * iPLr_x + line.ref;
  //  Check if x value of intersection point is between IRT_x and ILT_x
  if (iPLt_x >= ilt_x && iPLt_x <= irt_x && !this.checkHitBarrier(line, lineNr)) {
     //console.log(iPLt_x,' >= ',ilt_x, '&&' ,iPLt_x,' <=', irt_x);
     //console.log(this.laser.pathArrayPoints)
    hit = true;
  } else if (iPLl_y <= ilb_y && iPLl_y >= ilt_y && !this.checkHitBarrier(line, lineNr)) { // Check if y value of intersection point is between ILT_y and ILB_y
     //console.log(this.laser.pathArrayPoints)
    hit = true;
  } else if (iPLr_y <= irb_y && iPLr_y >= irt_y && !this.checkHitBarrier(line, lineNr)) { // Check if y value of intersection point is between IRT_y and IRB_y
     //console.log(iPLr_y,' <= ',irb_y,' && ', iPLr_y,' >= ',irt_y)
     //console.log(this.laser.pathArrayPoints)
    hit = true;
  }
  var checkObk = {
    ilt_x,
    ilt_y,
    irt_x,
    irt_y,
    ilb_x,
    ilb_y,
    irb_x,
    irb_y,
    iPLt_x,
    iPLt_y,
    iPLl_x,
    iPLl_y,
    iPLr_x,
    iPLr_y,
    line,
    hit
  }
  console.log("checkObk", checkObk);
  return hit;
};