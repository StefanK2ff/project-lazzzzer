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
        <h1>Project la<span class="highlight">ZZ<span id="offset">Z</span>Z</span>er</h1>
      </div>
      <div class="instructions">
        <strong>Instructions:</strong>
          <p>Hit as many targets with the laser reflected by the walls before running out of shots. You will not see the laser during aiming, you have to guess where he will be reflected! </p>
          <strong>Commands (keyboard):</strong>
          <ul>
            <li>Use the arrow keys to adjust the first part of the laser (green)</li>
            <li>Use spacebar to fire the laser against the left wall</li>
          </ul>
          <strong>Commands (voice):</strong>
          <p>If you grant the browser access to you microphone, you're able to use these spoken commands:</p>
          <ul>
            <li>"Fire" or "Shoot" to fire the laser</li>
            <li>"Move up" / .."down" / .."left" / .."right" to move the laser </li>
          </ul>
      </div>
      <div class="gameText">
        <button class="btn" id="start">START</button>
      </div>
    </main>
  `);

    document.body.appendChild(splashScreen);

    var startButton = splashScreen.querySelector('button');

    startButton.addEventListener('click', function() {
      startGame();
    });
    startButton.addEventListener('click', commandSpeech);
  }

  function removeSplashScreen() {
    splashScreen.remove();
  }

  // -- game screen

  function createGameScreen() {
    var gameScreen = buildDom(`
    <main class="game container" id="container">
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
          <button class="btn" id="start">RESTART</button>
        </div>
        <table id="stats">
          <thead>
            <tr>
              <th>Date</th>
              <th>Level</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody id="statsgrid">
            
          </tbody>
        </table>
      </main>
    `);

    var button = gameOverScreen.querySelector('button');
    button.addEventListener('click', startGame);

    var span = gameOverScreen.querySelector('.final-score');
    span.innerText = score;

    var span = gameOverScreen.querySelector('.final-level');
    span.innerText = level;

    var statsTable = gameOverScreen.querySelector('#statsgrid');
    showStats(statsTable, getScores());

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
    setScore(score, level);
  }

  // -- initialize Splash screen on initial start

  createSplashScreen();
}

window.addEventListener('load', main);