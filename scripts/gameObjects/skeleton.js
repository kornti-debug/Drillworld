import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Skeleton extends BaseGameObject {
    name = "Skeleton";
    xVelocity = 0;
    yVelocity = 0;
    jetpackForce = 30;
    useGravityForces = true;

    jetpackData = {
        currentForce: 0,
        maxForce: 400,
        acceleration: 200,    // How quickly jetpack builds up
        deceleration: 40,   // How quickly jetpack force fades
        isFlying: false
    };

    getBoxBounds = function () {
        let bounds = {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y + 14,
            bottom: this.y + this.height - 3
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


        if (this.xVelocity == 0) {
            global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
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
        this.loadImagesFromSpritesheet("./images/BODY_skeleton.png", 9, 4);
    }
}

export {Skeleton}