'use strict'

const config = {
    parent: 'phaser-game',
    type: Phaser.AUTO,
    width: 640,
    height: 480,
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