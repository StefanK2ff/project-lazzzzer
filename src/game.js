'use strict';

function Game() {
  this.canvas = null;
  this.ctx = null;
  this.laser = null;
  this.gameIsOver = false;
  this.gameScreen = null;
  //this.target = null;
  //this.score = 0;
  //this.level
  //this.tries
}

// Append canvas to the DOM, create a laser and start the Canvas loop
Game.prototype.start = function() {
  // Save reference to canvas and its container. Create ctx
  this.canvasContainer = document.querySelector('.canvas-container');
  this.canvas = this.gameScreen.querySelector('canvas');
  this.ctx = this.canvas.getContext('2d');

  // Save reference to the score and level elements
  //this.levelElement = this.gameScreen.querySelector('.level .value');
  //this.scoreElement = this.gameScreen.querySelector('.score .value');

  // Set the canvas dimensions
  //this.containerWidth = this.canvasContainer.offsetWidth;
  //this.containerHeight = this.canvasContainer.offsetHeight;
  this.canvas.setAttribute('width', 300);
  this.canvas.setAttribute('height', 300);

  // Create a new laser for the current round
  this.laser = new Laser(this.canvas, 3);

  // Add event listener for moving the player
  this.handleKeyDown = function(event) {
    if (event.key === 'ArrowLeft') {
      this.laser.setDirection('left');
    } else if (event.key === 'ArrowRight') {
      this.laser.setDirection('right');
    } else if (event.key === 'a') {
        this.laser.setDirection('up');
    } else if (event.key === 'y') {
        this.laser.setDirection('down');
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
    // 1. UPDATE THE STATE OF LASER AND later TARGET

    // // 0. Our laser is  already created - via `game.start()`

    // // 1. Create new taret randomly TO BE
    // if (Math.random() > 0.98) {
    //   var randomY = this.canvas.height * Math.random();
    //   this.enemies.push(new Enemy(this.canvas, randomY, 5));
    // }

    // 2. Check if player had hit any enemy (check all enemies)
    //this.checkCollisions();

    // 2. CLEAR THE CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 3. UPDATE THE CANVAS
    // Draw the player
    this.player.draw();

    // Draw the target
    

    // 4. TERMINATE LOOP IF GAME IS OVER
    if (!this.gameIsOver) {
      window.requestAnimationFrame(loop);
    }

    //  5. Update Game data/stats
    this.updateGameStats();
  }.bind(this);

  // As loop function will be continuously invoked by
  // the `window` object- `window.requestAnimationFrame(loop)`
  // we have to bind the function so that value of `this` is
  // pointing to the `game` object, like this:
  // var loop = (function(){}).bind(this);

  window.requestAnimationFrame(loop);
};

// Game.prototype.checkHit = function() {
//   this.target.
// };

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

Game.prototype.updateGameStats = function() {
  this.score += 1;
  this.livesElement.innerHTML = this.player.lives;
  this.scoreElement.innerHTML = this.score;
};