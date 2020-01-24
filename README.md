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

# Further, possible features 
- permantly saved Scores
- Data structure
- Levels with increasing difficulty

# Structure of functions and info

## main.js
createSplashScreen(){...}
removeSplashScreen(){...}

createGameScreen(){...}
removeGameScreen(){...}

createGameOverScreen(){...}
removeGameOverScreen(){...}

startGame(){...}
gameOver(){...}

## game.js

Game

On Prorotype
start
startLoop
checkTargetHit

clearCanvas = function(){}
updateCanvas = function(){}
drawCanvas = function(){

## laser.js

On Prototype
- calculatePath
- draw
- valid path

## target.js

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
