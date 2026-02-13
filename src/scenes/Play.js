class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // add background image
        this.ocean = this.add.tileSprite(0, 0, 850, 640, 'ocean').setOrigin(0).setDepth(0)

        // add new Dolphin to scene (scene, x, y, key, frame, direction)
        this.dolphin = new Dolphin(this, 320, 600, 'dolphin').setOrigin(0.5, 0.85)

        // add new Shell to scene (scene, x, y, key, frame, direction)
        this.shell = new Shell(this, 320, 200, 'shell').setOrigin(0.5, 1).setDepth(1)

        // add new Pufferfish to scene (scene, x, y, key, frame, direction)
        this.pufferfish = new Pufferfish(this, 325, 200, 'pufferfish').setOrigin(0.5, 1).setDepth(2)

        this.score = 0
        this.isInvincible = false
        this.lane1 = 90
        this.lane2 = 320
        this.lane3 = 550

        let scoreLabelConfig = {
            fontFamily: 'Courier',
            fontSize: '40px',
            color: '#FFFFFF',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 180
        }

        this.scoreLabel = this.add.text(700, 80, `Score: `, scoreLabelConfig).setOrigin(0.13, 0.75).setDepth(3)
        this.scoreNumber = this.add.text(730, 140, this.score, scoreLabelConfig).setOrigin(0.13, 0.75).setDepth(3)

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
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

        // make sure we step (ie update) the dolphin's state machine
        this.dolphinFSM.step()
        this.shell.update()
        this.pufferfish.update()

        if (this.checkCollision(this.dolphin, this.shell)) {
            this.score += 10
            this.shell.y = -100
            this.scoreNumber.text = this.score

            this.shell.reset()
        }

        if (!this.isInvincible && this.checkCollision(this.dolphin, this.pufferfish)) {
            this.score -= 30
            this.pufferfish.y = -100
            this.scoreNumber.text = this.score

            this.isInvincible = true
            this.pufferfish.reset()

            this.tweens.add({
                targets: this.dolphin,
                alpha: 0.2,
                duration: 200,
                yoyo: true,
                repeat: 3
            })

            this.time.delayedCall(2000, () => {
                this.isInvincible = false
                this.dolphin.setAlpha(1)
            })

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
    ])
}
}