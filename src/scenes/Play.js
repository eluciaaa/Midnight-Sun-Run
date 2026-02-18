class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // add background image
        this.ocean = this.add.tileSprite(0, 0, 850, 640, 'ocean').setOrigin(0).setDepth(0)

        // create game over image, then hide it
        this.splash = this.add.image(20, 0, 'splash').setOrigin(0).setDepth(4)
        this.splash.alpha = 0

        // add new dolphin to scene (scene, x, y, key, frame, direction)
        this.dolphin = new Dolphin(this, 320, 600, 'dolphin').setOrigin(0.5, 0.85)

        // add new shells to scene (scene, x, y, key, frame, direction)
        this.conchshell = new ConchShell(this, 90, 200, 'conchshell').setOrigin(0.5, 1).setDepth(1)
        this.seashell = new SeaShell(this, 550, 200, 'seashell').setOrigin(0.5, 1).setDepth(1)

        // add new Pufferfish to scene (scene, x, y, key, frame, direction)
        this.pufferfish = new Pufferfish(this, 320, 200, 'pufferfish').setOrigin(0.5, 1).setDepth(2)

        this.score = 0
        this.conchShellsCollected = 0
        this.seaShellsCollected = 0
        this.pufferfishSwamInto = 0
        this.isInvincible = false
        this.lane1 = 90
        this.lane2 = 320
        this.lane3 = 550

        this.scoreLabelConfig = {
            fontFamily: 'Brush Script MT',
            fontSize: '70px',
            color: '#FFFea7',
            padding: {
                top: 5,
                bottom: 5,
                right: 15
            },
        }

        // all stat tracking labels for the side panel
        this.scoreLabel = this.add.text(690, 100, `Score: `, this.scoreLabelConfig).setOrigin(0.13, 0.75).setDepth(3)
        this.scoreNumber = this.add.text(730, 170, this.score, this.scoreLabelConfig).setOrigin(0.13, 0.75).setDepth(3)
        this.scoreLabelConfig.fontSize = '38px'
        this.highScoreLabel = this.add.text(695, 250, `High Score: `, this.scoreLabelConfig).setOrigin(0.13, 0.75).setDepth(3)
        this.highScoreNumber = this.add.text(740, 300, game.highscore, this.scoreLabelConfig).setOrigin(0.13, 0.75).setDepth(3)
        this.scoreLabelConchShells = this.add.text(685, 415, 'Conch Shells \nCollected: ', this.scoreLabelConfig).setOrigin(0.13, 0.75).setDepth(3)
        this.scoreNumberConchShells = this.add.text(815, 426, this.conchShellsCollected, this.scoreLabelConfig).setOrigin(0.13, 0.75).setDepth(3)
        this.scoreLabelSeaShells = this.add.text(685, 535, 'Sea Shells \nCollected: ', this.scoreLabelConfig).setOrigin(0.13, 0.75).setDepth(3)
        this.scoreNumberSeaShells = this.add.text(815, 548, this.seaShellsCollected, this.scoreLabelConfig).setOrigin(0.13, 0.75).setDepth(3)

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyRESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        this.time.addEvent({
            delay: 5000,
            callback: this.speedUp,
            callbackScope: this,
            loop: true
        })

        // GAME OVER flag
        this.gameOver = false
    }

    update() {
         if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // move dolphin left 1 lane
            if (this.dolphin.x === this.lane2) {
                this.dolphin.x = this.lane1
            } else if (this.dolphin.x === this.lane3) {
                this.dolphin.x = this.lane2
            }
        }

         if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // move dolphin right 1 lane
            if (this.dolphin.x === this.lane1) {
                this.dolphin.x = this.lane2
            } else if (this.dolphin.x === this.lane2) {
                this.dolphin.x = this.lane3
            }
        }

        this.highScoreNumber.text = game.highScore

        if(!this.gameOver) {
            this.dolphinFSM.step()
            this.conchshell.update()
            this.seashell.update()
            this.pufferfish.update()
        }

        if(this.gameOver) {
            this.dolphin.anims.pause()
        }

        if (this.checkCollision(this.dolphin, this.conchshell)) {
            this.score += 10
            this.conchshell.y = -100
            this.scoreNumber.text = this.score
            this.conchShellsCollected += 1
            this.scoreNumberConchShells.text = this.conchShellsCollected

            this.conchshell.reset()
        }

        if (this.checkCollision(this.dolphin, this.seashell)) {
            this.score += 5
            this.seashell.y = -100
            this.scoreNumber.text = this.score
            this.seaShellsCollected += 1
            this.scoreNumberSeaShells.text = this.seaShellsCollected

            this.seashell.reset()
        }

        if (this.checkCollision(this.dolphin, this.pufferfish)) {
            this.gameOver = true
            this.splash.alpha = 1
            this.scoreNumber.text = this.score
            if (this.score > game.highScore) {
                game.highScore = this.score
            }
            this.scoreLabelConfig.fontSize = '120px'
            this.scoreLabelConfig.color = '#ffffff'
            this.add.text(330, 90, 'Game Over!', this.scoreLabelConfig).setOrigin(0.5).setDepth(5)
            this.scoreLabelConfig.fontSize = '50px'
            this.add.text(325, 200, 'You got poked by a pufferfish!', this.scoreLabelConfig).setOrigin(0.5).setDepth(5)
            this.add.text(330, 320, 'Press (R) to Restart \n  or (M) for Menu', this.scoreLabelConfig).setOrigin(0.5).setDepth(5)
        }

        if (this.gameOver && (Phaser.Input.Keyboard.JustDown(keyRESTART))) {
            this.scene.start('playScene')
        }

        if (this.gameOver && (Phaser.Input.Keyboard.JustDown(keyMENU))) {
            this.scene.start('menuScene')
        }
    }

    checkCollision(obj1, obj2) {
        return (
            obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y
        )
    }

    getRandomLane() {
    return Phaser.Utils.Array.GetRandom([
        this.lane1,
        this.lane2,
        this.lane3
    ])}

    speedUp() {
        this.conchshell.moveSpeed += 0.1
        this.seashell.moveSpeed += 0.1
        this.pufferfish.moveSpeed += 0.1
    }
}