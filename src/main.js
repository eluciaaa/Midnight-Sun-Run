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
    scene: [ Load, Play ]
}

let game = new Phaser.Game(config)

game.highScore = 0;

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let keyLEFT, keyRIGHT