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
        this.load.image('conchshell', 'conchshell.png')
        this.load.image('seashell', 'seashell.png')
        this.load.image('pufferfish', 'pufferfish.png')
        this.load.image('menubackground', 'menubackground.png')
        this.load.image('controls', 'controls.png')
        this.load.image('splash', 'splash.png')
        this.load.audio('swim', 'water.wav')
        this.load.audio('collect', 'shellcollect.wav')
        this.load.audio('poked', 'poked.wav')
        this.load.audio('click', 'click.wav')
        this.load.audio('bgmusic', '248144__dpren__cgi-tropical-paradise-loop.wav')
    }

    create() {
        // dolphin animations
        if (!this.anims.exists('swim')) {
            this.anims.create({
                key: 'swim',
                frameRate: 4,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('swim', { start: 0, end: 2 }),
            })
        }

        document.fonts.load('100px BrushScript').then(() => {
            this.buildMenu()
        })
    }


    buildMenu() {
        let titleMenuConfig = {
            fontFamily: 'BrushScript',
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
            fontFamily: 'BrushScript',
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
            this.sound.play('click')
            this.scene.start('guideScene')
        })
    }

    update() {
    }
}