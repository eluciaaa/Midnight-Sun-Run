class Shell extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = 10
        this.moveSpeed = 3
    }

    update() {
        // move shell down
        this.y += this.moveSpeed

        // wrap from left to right edge
        if(this.y <= 0 - this.height) {
            this.y = 0 - game.config.height
        }
    }

    // reset position
    reset() {
        this.y = 0
    }
}