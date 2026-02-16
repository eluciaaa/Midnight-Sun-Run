class SeaShell extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = 5
        this.moveSpeed = 3
    }

    update() {
        // move shell down
        this.y += this.moveSpeed

        // wrap from edge
        if(this.y >= 1000) {
            this.y = 200
        }
    }

    // reset position
    reset() {
        this.active = false
        this.visible = false

        let delay = Phaser.Math.Between(0, 3000)

        this.scene.time.delayedCall(delay, () => {
            this.y = 200
            this.x = this.scene.getRandomLane()
            this.active = true
            this.visible = true
        })
    }
}