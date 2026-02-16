class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        // load assets
        this.load.path = './assets/'
        this.load.spritesheet('swim', 'swimsheet.png', {
            frameWidth: 130,
            frameHeight: 130,
        })
        this.load.image('ocean', 'ocean.png')
        this.load.image('dolphin', 'dolphin.png')
        this.load.image('shell', 'shell2.png')
        this.load.image('pufferfish', 'pufferfish.png')
        this.load.image('menubackground', 'menubackground.png')
    }

    create() {
        // dolphin animations
        this.anims.create({
            key: 'swim',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('swim', { start: 0, end: 2 }),
        })
        
        // this.scene.start('playScene')

        let titleMenuConfig = {
            fontFamily: 'Brush Script MT',
            fontSize: '100px',
            color: '#FFFea7',
            align: 'right',
            padding: {
                top: 100,
                bottom: 100,
            },
            fixedWidth: 0
        }

        let menuConfig = {
            fontFamily: 'Brush Script MT',
            fontSize: '100px',
            color: '#ff0098',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // place tile sprite
        this.menubackground = this.add.tileSprite(0, 0, 850, 640, 'menubackground').setOrigin(0, 0).setDepth(0)

        // display menu text
        this.add.text(426, 260, 'Midnight Sun Run', titleMenuConfig).setOrigin(0.5)
        this.add.text(420, 260, 'Midnight Sun Run', menuConfig).setOrigin(0.5)
        titleMenuConfig.fontSize = '55px'
        this.add.text(422, 420, 'click anywhere to start!', titleMenuConfig).setOrigin(0.5)
        

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.input.once('pointerdown', () => {
            this.scene.start('playScene')
        })
    }

        update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                normalSpaceshipSpeed: 3,
                fastSpaceshipSpeed: 4,
                gameTimer: 60000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                normalSpaceshipSpeed: 4,
                fastSpaceshipSpeed: 5,
                gameTimer: 45000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}