'use strict';

function Laser(canvas, shots) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.shots = shots;
  this.fireposX = 100
  this.fireposY = 25;
  this.firstHitX = 0;
  this.firstHitY = 75
}

Laser.prototype.setDirection = function(direction) {
  // +1 down  -1 up
  if (direction === 'up') this.direction = -1;
  else if (direction === 'down') this.direction = 1;
};

// Player.prototype.didCollide = function(enemy) {
//   var playerLeft = this.x;
//   var playerRight = this.x + this.size;
//   var playerTop = this.y;
//   var playerBottom = this.y + this.size;

//   var enemyLeft = enemy.x;
//   var enemyRight = enemy.x + enemy.size;
//   var enemyTop = enemy.y;
//   var enemyBottom = enemy.y + enemy.size;

//   var crossRight = enemyLeft <= playerRight && enemyLeft >= playerLeft;
//   var crossLeft = enemyRight >= playerLeft && enemyRight <= playerRight;
//   var crossTop = enemyBottom >= playerTop && enemyBottom <= playerBottom;
//   var crossBottom = enemyTop <= playerBottom && enemyTop >= playerTop;

//   if ((crossRight || crossLeft) && (crossBottom || crossTop)) {
//     return true;
//   }
//   return false;
// };

// Player.prototype.handleScreenCollision = function() {
//   this.y = this.y + this.direction * this.speed;
//   var screenTop = 0;
//   var screenBottom = this.canvas.height;

//   if (this.y > screenBottom) this.direction = -1;
//   else if (this.y < screenTop) this.direction = 1;
// };

// Player.prototype.removeLife = function() {
//   this.lives -= 1;
// };

// Player.prototype.draw = function() {
//   this.ctx.fillStyle = '#66D3FA';
//   // fillRect(x, y, width, height)
//   this.ctx.fillRect(this.x, this.y, this.size, this.size);
// };
