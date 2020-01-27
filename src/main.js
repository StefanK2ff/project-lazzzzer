'use strict';

function buildDom(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.children[0];
}

function main() {
  var game; // instance of the Game
  var splashScreen; // Start Screen
  var gameOverScreen; // Game Over Screen

  // -- splash screen

  function createSplashScreen() {
    splashScreen = buildDom(`
    <main>
      <div class="gameText">
        <h1>Project laZZZZer</h1>
        <button class="btn">Start</button>
      </div>
    </main>
  `);

    document.body.appendChild(splashScreen);

    var startButton = splashScreen.querySelector('button');
    startButton.addEventListener('click', function() {
      startGame();
    });
  }

  function removeSplashScreen() {
    splashScreen.remove();
  }

  // -- game screen

  function createGameScreen() {
    var gameScreen = buildDom(`
    <main class="game container">
      <header>
        <div class="level">
          <span class="label">Level:</span>
          <span class="value">1</span>
        </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value">0</span>
        </div>
        <div class="shots">
          <span class="label">Shots left:</span>
          <span class="value">3</span>
        </div>
      </header>
      <div class="canvas-container">
        <canvas></canvas>
      </div>
    </main>
  `);

    document.body.appendChild(gameScreen);
    return gameScreen;
  }

  function removeGameScreen() {
    game.removeGameScreen();
  }

  // -- game over screen

  function createGameOverScreen(score, level) {
    gameOverScreen = buildDom(`
      <main>
      <div class="gameText">
        <h1>Game over</h1>
        <p>Your score: <span class="final-score"></span></p>
        <p>You reached Level <span class="final-level"></span></p>
        <button class="btn">Restart</button>
      </div>
    </main>
    `);

    var button = gameOverScreen.querySelector('button');
    button.addEventListener('click', startGame);

    var span = gameOverScreen.querySelector('.final-score');
    span.innerText = score;

    var span = gameOverScreen.querySelector('.final-level');
    span.innerText = level;

    document.body.appendChild(gameOverScreen);
  }

  function removeGameOverScreen() {
    if (gameOverScreen) {
      gameOverScreen.remove();
    }
  }

  // -- Setting the game state

  function startGame() {
    removeSplashScreen();
    // later we need to add clearing of the gameOverScreen
    removeGameOverScreen();

    game = new Game();
    game.gameScreen = createGameScreen();
    game.start();

    // End the game
    game.passGameOverCallback(function() {
      gameOver(game.score, game.level);
    });
  }

  function gameOver(score, level) {
    removeGameScreen();
    createGameOverScreen(score, level);
  }

  // -- initialize Splash screen on initial start

  createSplashScreen();
}

window.addEventListener('load', main);
