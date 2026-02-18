class SeaShell extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.moveSpeed = 2.5
    }

    update() {
        if (!this.active) return

        // move shell down
        this.y += this.moveSpeed

        // wrap from edge
        if(this.y >= 700) {
            this.reset()
        }
    }

    // reset position
    reset() {
        this.active = false
        this.visible = false

        this.y = 200

        let delay = Phaser.Math.Between(0, 1000)

        this.scene.time.delayedCall(delay, () => {
            this.y = 200
            this.x = this.scene.getRandomLane()
            this.active = true
            this.visible = true
        })
    }
}