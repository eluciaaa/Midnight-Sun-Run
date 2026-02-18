// Abigail Chase
// Midnight Sun Run
// It took about 18 hours

// Creative Tilt Technical: The game is a three-lane endless runner using a 
// creative system I came up with where instead of the camera moving, the player 
// stays on the same y axis and snaps between lanes, while the objects move down the 
// lane. The spawns are also randomized both lane-wise and time-wise, and the 
// difficulty gets harder over time, all of which I figured out how to do myself.

// Creative Tilt Visual: I made all my own art assets and sfx, going for a 
// Zara Larsson's song/music video "Midnight Sun" inspired girly ocean vibe, 
// where the player is a dolphin that collects shells and avoids getting poked by 
// pufferfish. I thought this was a fun twist on the classic endless runner game
// which is usually a human running from something and collecting coins.

'use strict'

const config = {
    parent: 'phaser-game',
    type: Phaser.AUTO,
    width: 850,
    height: 640,
    resolution: window.devicePixelRatio,
    pixelArt: true,
    zoom: 2,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [ Menu, Guide, Play ],
    fps: {
        target: 60,
        forceSetTimeOut: true
    }
}

let game = new Phaser.Game(config)

game.highScore = 0;

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let keyLEFT, keyRIGHT, keyRESTART, keyMENU