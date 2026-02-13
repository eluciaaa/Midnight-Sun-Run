class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // add background image
        this.ocean = this.add.tileSprite(0, 0, 640, 480, 'ocean').setOrigin(0).setDepth(0)

        // add new Dolphin to scene (scene, x, y, key, frame, direction)
        this.dolphin = new Dolphin(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'dolphin').setOrigin(0.5, 0.85)

        // add new Shell to scene (scene, x, y, key, frame, direction)
        this.shell = new Shell(this, 320, 0, 'shell').setOrigin(0.5, 1).setDepth(1)

        this.score = 0

        let scoreLabelConfig = {
            fontFamily: 'Courier',
            fontSize: '30px',
            color: '#FFFFFF',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 180
        }

        this.scoreLabel = this.add.text(borderUISize + borderPadding, borderUISize + 
        borderPadding * 2, `Score: ${this.score}`, scoreLabelConfig).setOrigin(0.13, 0.75).setDepth(3)
    }

    update() {
        if(this.checkCollision(this.dolphin, this.shell)) {
            this.shell.reset()
        }

        // make sure we step (ie update) the dolphin's state machine
        this.dolphinFSM.step()
        this.ocean.tilePositionY -= 5
        this.shell.update()

        if (this.checkCollision(this.dolphin, this.shell)) {
        this.score += 10
        this.scoreLabel.text = `Score: ${this.score}`

        this.shell.reset()
    }
    }

    checkCollision(dolphin, shell) {
        if (dolphin.x < shell.x + shell.width &&
            dolphin.x + dolphin.width > shell.x &&
            dolphin.y < shell.y + shell.height &&
            dolphin.height + dolphin.y > shell.y) {
            return true
        } else {
            return false
        }
    }
}