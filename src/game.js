'use strict';

function Game() {
  this.canvas = null;
  this.ctx = null;
  this.laser = null;
  this.gameIsOver = false;
  this.gameScreen = null;
  this.target;
  this.hitTarget = false;
  this.score = 0;
  this.level = 1;
  this.tries = 3;
}

// Append canvas to the DOM, create a laser and a target and start the Canvas loop
Game.prototype.start = function() {
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

  // Add event listener for moving the player
  this.handleKeyDown = function(event) {
    if (event.key === 'ArrowLeft') {
      this.laser.setAim('left');
    } else if (event.key === 'ArrowRight') {
      this.laser.setAim('right');
    } else if (event.key === 'a') {
      this.laser.setAim('up');
    } else if (event.key === 'y') {
      this.laser.setAim('down');
    } else if (event.key === ' ' && !this.gameIsOver) {
      this.fire(); 
    }
  }; 

  // Any function provided to eventListener
  // is always called by window (this === window)!
  // So, we have to bind `this` to the `game` object,
  // to prevent it from pointing to the `window` object
  document.body.addEventListener('keydown', this.handleKeyDown.bind(this));

  // Start the canvas requestAnimationFrame loop
  this.startLoop();
};

Game.prototype.startLoop = function() {
  var loop = function() {
    // CLEAR THE CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // calculate the path of the laser
    this.laser.calculatePath();
    // draw the laser (to be done when there shot)
    this.laser.draw(this.laser.pathObj_points);
    // Draw the target
    
    this.target.draw();
    // Draw the indikators
    this.laser.drawStartPoints(this.laser.h0X, this.laser.h1Y);
    // Draw the helper
    this.laser.drawSecondHelper(this.laser.pathObj_points.h2[0], this.laser.pathObj_points.h1[1])
    
      
    // TERMINATE LOOP IF GAME IS OVER --> when tries are zero
    if (!this.gameIsOver) {
      window.requestAnimationFrame(loop);
    }

    //  5. Update Game data/stats
    //this.updateGameStats();
    
  }.bind(this);

  // As loop function will be continuously invoked by
  // the `window` object- `window.requestAnimationFrame(loop)`
  // we have to bind the function so that value of `this` is
  // pointing to the `game` object, like this:
  // var loop = (function(){}).bind(this);

  loop();
};

Game.prototype.passGameOverCallback = function(callback) {
  this.onGameOverCallback = callback;
};

Game.prototype.gameOver = function() {
  // flag `gameIsOver = true` stops the loop
  this.gameIsOver = true;
  
  // Call the gameOver function from `main` to show the Game Over Screen
  this.onGameOverCallback();
};

Game.prototype.removeGameScreen = function() {
  this.gameScreen.remove();
};

Game.prototype.roundHandling = function() {
  // check if there was a hit for each part of the laser
  this.laser.pathArrayPaths.forEach (element => {
    if (this.laser.checkHitTarget(this.target, element)){
      this.hitTarget = true;
      console.log(this.hitTarget);
    };
  });
  //do something if there was a hit
  if (this.hitTarget) {
    //set score
    this.score = this.score + this.tries * 5;
    // set tries back to 3
    this.tries = 3;
    //set level
    this.level++;
    this.levelAdjust(this.level);
    //set laser back to start position
    this.laser.h0X = this.laser.h0XStart;
    this.laser.h1Y = this.laser.h1yStart;
    //modify target
    this.target.changePosRandom();
    //set hit back to false
    this.hitTarget = false;
  } else {
    this.tries--; //reduce tries by one if the 
    if (this.tries <= 0) {
      this.gameOver();
    }
  }
  this.laser.color = "black";
  this.laser.helpercolor = "#3CFF33";
  this.updateGameStats();
};

Game.prototype.fire = function(){
  //make laser visible for a short time
  this.laser.color = "red";
  this.laser.helpercolor = "red";
  setTimeout(function() {
    this.roundHandling();
  }.bind(this),500)
}

Game.prototype.updateGameStats = function() {
  this.levelElement.innerHTML = this.level;
  this.scoreElement.innerHTML = this.score;
  this.shotsElement.innerHTML = this.tries;
};

Game.prototype.levelAdjust = function(level) {
  if (this.level%3 === 0 && this.target.size > 5) {
    this.target.size = this.target.size * 0.8
    console.log(this.target.size)
  }
  if (this.level > 9) {
    this.helpercolor2 = "black";
  }
}

