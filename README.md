# project-lazzzzer
Small browser based game using canvas, where the goal is to hit targets indirectly with a laser using the border the gamefield as reflecting surfaces.

## Game mechanism and rules:
- The player can manipulate the starting/ firing point of the laser by moving it horizontally and determins the first hit of reflecting wall by moving the raget point horicontally
- Eery wall has to be hit once

# MVP
- Simple canvas in which the user can set the lazer using the reflecting walls

# Planned Features
- Firing mechanism
- Implement targets
- Rounds with multiple tries per round
- Score
- Levels
- 

# Further, possible featers 
- permantly saved Scores
- Data structure
- Levels with increasing difficulty

# Structure of functions and info

## main.js
buildSplashScreen(){}

buildGameScreen(){ }

buildGameOverScreen(){
}

## game.js

Game() {}
  name
  score

Game.prototype.startLoop(){}

Game.prototype.checkCollisions{}

Game.prototype.clearCanvas = function(){}

Game.prototype.updateCanvas = function(){}

Game.prototype.drawCanvas = function(){

##laser.js

- startpoint
- firstReflektion
- path
- draw
- valid path

##target.js

- random x
- random y
- size


# States and state transitions
- splashScreen()
  - buildSplash()
  - addEventListener(startGame)
  
- startGame()
  - create new Game()
  - game.start()
  
- gameOver()
  - buildGameOver()
  - addEventListener(startGame) 

#Links
##Trello

##Slides
URls for the project presentation (slides) Link Slides.com
