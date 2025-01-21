import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Player extends BaseGameObject {
    name = "Player";
    xVelocity = 0;
    yVelocity = 0;
    jetpackForce = 30;
    useGravityForces = true;
    miningSpeed= 1.0;
    health = 100;
    energy = 100;
    currentDrillLevel = 0;
    currentSuitLevel = 0;
    speed = 200
    friction = 0.5

    jetpackData = {
        currentForce: 0,
        maxForce: 400,
        acceleration: 200,    // How quickly jetpack builds up
        deceleration: 40,   // How quickly jetpack force fades
        isFlying: false
    };

    getBoxBounds = function () {
        let bounds = {
            left: this.x +10,
            right: this.x + this.width-10,
            top: this.y -10,
            bottom: this.y + this.height
        }
        return bounds;
    }

    updateJetpack = function(deltaTime) {
        
        if (global.keys['w']) {
            this.jetpackData.isFlying = true;
            // Gradually increase jetpack force
            this.jetpackData.currentForce += this.jetpackData.acceleration * deltaTime;

            // Cap the force
            this.jetpackData.currentForce = Math.min(
                this.jetpackData.currentForce, 
                this.jetpackData.maxForce
            );


            
            // Apply upward force
            this.physicsData.fallVelocity = 0;

            this.yVelocity = -this.jetpackData.currentForce;
        }
        //  else if (this.jetpackData.isFlying) {
        //     // Gradually decrease jetpack force
        //     this.jetpackData.currentForce -= this.jetpackData.deceleration * deltaTime;
            
        //     // Ensure force doesn't go negative
        //     this.jetpackData.currentForce = Math.max(0, this.jetpackData.currentForce);
            
        //     if (this.jetpackData.currentForce <= 0) {
        //         this.jetpackData.isFlying = false;
        //     }
        // }

        // Cap the vertical velocity
        this.physicsData.fallVelocity = Math.max(
            -this.physicsData.terminalVelocity * global.pixelToMeter,
            Math.min(
                this.physicsData.fallVelocity,
                this.physicsData.terminalVelocity * global.pixelToMeter
            )
        );
    }

    update = function() {

        this.updateJetpack(global.deltaTime)
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        // global.playerObject.switchCurrentSprites(6, 10);

        if (this.xVelocity == 0) {
            global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
            // console.log(this.animationData.firstSpriteIndex)
        }
    }

    /*draw = function () {
        global.ctx.fillStyle = "#000000";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }*/

    reactToCollision = function(otherObject) {
        // if (otherObject.name == "BlockObject" && global.keys["s"]) {
        //     otherObject.active = false;
        // }
        // if (otherObject.name == "BlockObject" && global.keys["a"]) {
        //     otherObject.active = false;
        // }
        // if (otherObject.name == "BlockObject" && global.keys["d"]) {
        //     otherObject.active = false;
        // }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        //this.loadImages(["./images/apple.png"]);
        this.loadImagesFromSpritesheet("./images/DrillenDigman.png", 5, 6);
    }
}

export {Player}