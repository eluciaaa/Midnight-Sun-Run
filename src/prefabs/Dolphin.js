// Dolphin prefab
class Dolphin extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add Dolphin to existing scene

        // initialize state machine managing dolphin (initial state, possible states, state args[])
        scene.dolphinFSM = new StateMachine('idle', {
            idle: new IdleState(),
            jump: new JumpState(),
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM
    }
}

// dolphin-specific state classes
class IdleState extends State {
    enter(scene, dolphin) {
        dolphin.anims.play(`swim`)
    }
}

class JumpState extends State {
    enter(scene, dolphin) {
        dolphin.anims.play(`jump`)
    }
}