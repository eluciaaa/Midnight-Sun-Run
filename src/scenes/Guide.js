class Guide extends Phaser.Scene {
    constructor() {
        super("guideScene")
    }

    create() {
       let controlsTextConfig = {
            fontFamily: 'Brush Script MT',
            fontSize: '50px',
            color: '#FFFea7',
            align: 'right',
            padding: {
                top: 100,
                bottom: 100,
            },
            fixedWidth: 0
        }

         // place tile sprite
        this.controls = this.add.tileSprite(0, 0, 850, 640, 'controls').setOrigin(0, 0).setDepth(0)

        // display menu text
        this.add.text(426, 70, 'Use the arrow keys to swim between lanes', controlsTextConfig).setOrigin(0.5)
        this.add.text(430, 160, 'Collect shells               for points', controlsTextConfig).setOrigin(0.5)
        this.add.text(410, 270, 'But watch out for pufferfish!', controlsTextConfig).setOrigin(0.5)
        controlsTextConfig.fontSize = '45px'
        controlsTextConfig.color = '#ffffff'
        this.add.text(410, 350, 'click to start', controlsTextConfig).setOrigin(0.5)

        this.input.once('pointerdown', () => {
            this.sound.play('click')
            this.scene.start('playScene')
        })

    }

    update() {

    }
}