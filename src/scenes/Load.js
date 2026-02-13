class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // load the visual goodz
        this.load.path = './assets/'
        this.load.spritesheet('swim', 'swimsheet.png', {
            frameWidth: 130,
            frameHeight: 130,
        })
        this.load.image('ocean', 'ocean.png')
        this.load.image('dolphin', 'dolphin.png')
        this.load.image('shell', 'shell2.png')
        this.load.image('pufferfish', 'pufferfish.png')
    }

    create() {
        // dolphin animations
        this.anims.create({
            key: 'swim',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('swim', { start: 0, end: 2 }),
        })
        //this.anims.create({
            //key: 'walk-right',
            //frameRate: 8,
            //repeat: -1,
            //frames: this.anims.generateFrameNumbers('hero', { start: 4, end: 7 }),
        //})

        // proceed once loading completes
        this.scene.start('playScene')
    }
}