# project-lazzzzer
Small browser based game using canvas, where the goal is to hit targets indirectly with a laser using the border the gamefield as reflecting surfaces. Shoot as many targets as possible without actually seeing the laser while aiming. You are successful if you correctly predict the reflections based on the starting positions.

## Game mechanism and rules:
- The player can manipulate the starting/ firing point of the laser by moving it horizontally and determins the first hit of reflecting wall by moving the raget point horicontally
- Every wall has to be hit in the order
    - from bottom to left side
    - from left side to top
    - from top to right side


# MVP
- Simple canvas in which the user can set the lazer using the reflecting walls (DONE)

# Planned Features
- Firing mechanism (DONE)
- Implement targets (DONE)
- Rounds with multiple tries per round (DONE)
- Score (DONE)
- Levels (DONE)
- Additional helpers (DONE)
- Animations (DISCARDED)

# Further, possible features 
- permantly saved Scores (DISCARDED)
- levels with increasing difficulty (DONE)
- steering with spoken commands via Web Speech API (DONE)

# Structure of functions and info

## main.js

### build DOM function

### main function
- createSplashScreen()
- removeSplashScreen()
- createGameScreen()
- removeGameScreen()
- createGameOverScreen()
- removeGameOverScreen()
- startGame()
- gameOver()

## game.js

Game Constructor

On prototpye following functions
- start
    - handleKeyDown
    - handleVoiceInput
- startLoop
- passGameOverCallback
- gameOver
- removeGameScreen
- roundHandling
- fire
- updateGameStats
- levelAdjust
- checkHitTarget

## laser.js

Laser Constructor

On prototpye following functions
- setAim
- calculatePath
- drawStartPoints
- drawPath

## target.js

Target constructor

On prototpye following functions
- changePosRandom
- changeXPosRandom
- changeYPosRandom
- draw

## speech.js

- speechRecognition
- speechGrammarlist
- speechRecognitionEvent
- commands
- currentCommand
- commandSpeech

## other files
- main.html
- style.css
- readme.md (this file)

# Links
- For Speech command initital JS MDN tutorial "Phrase matcher" was used and modified https://github.com/mdn/web-speech-api
- Trello: https://trello.com/b/7sCpdepV/ironhack-project-lazzzzer
- Presentations: https://docs.google.com/presentation/d/1nqcw0BwbSphT2_GYHffvkqR72sJnF2vHZ3LQcEdMUbo/edit?usp=sharing
- Live presentation: https://stefank2ff.github.io/project-lazzzzer/ 

