import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Player extends BaseGameObject {
    name = "Player";
    xVelocity = 0;
    yVelocity = 0;
    jetpackForce = 30;
    useGravityForces = true;
    miningSpeed= 15.0;
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
        deceleration: 250,   // How quickly jetpack force fades
        isFlying: false
    };

    getBoxBounds = function () {
        let bounds = {
            left: this.x + 10,
            right: this.x + this.width-10,
            top: this.y,
            bottom: this.y + this.height 
        }
        return bounds;
    }

    updateJetpack = function(deltaTime) {
        
        if (global.keys['w']) {
            this.jetpackData.isFlying = true;
            if(this.jetpackData.isFlying){
                global.playerObject.switchCurrentSprites(24, 26)
            }
            // Gradually increase jetpack force
            this.jetpackData.currentForce += this.jetpackData.acceleration * deltaTime;

            // Cap the force
            this.jetpackData.currentForce = Math.min(
                this.jetpackData.currentForce, 
                this.jetpackData.maxForce
            );
            global.playerObject.useGravityForces = false;


            
            // Apply upward force
            this.physicsData.fallVelocity = 0;

            this.yVelocity = -this.jetpackData.currentForce;
        }
         else if (this.jetpackData.isFlying) {
            global.playerObject.useGravityForces = true;

            // Gradually decrease jetpack force
            this.jetpackData.currentForce -= this.jetpackData.deceleration * deltaTime;
            
            // Ensure force doesn't go negative
            this.jetpackData.currentForce = Math.max(0, this.jetpackData.currentForce);
            // console.log(this.jetpackData.currentForce)
            if (this.jetpackData.currentForce <= 0) {
                this.jetpackData.isFlying = false;
            }
        }

        // Cap the vertical velocity
        this.physicsData.fallVelocity = Math.max(
            -this.physicsData.terminalVelocity * global.pixelToMeter,
            Math.min(
                this.physicsData.fallVelocity,
                this.physicsData.terminalVelocity * global.pixelToMeter
            )
        );
    }

    update = function(coll) {

        this.updateJetpack(global.deltaTime)
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        // global.playerObject.switchCurrentSprites(6, 10);

        if (this.xVelocity == 0 && this.yVelocity == 0 && !this.jetpackData.isFlying && !global.isDigging && !global.keys["a"] && !global.keys["s"] && !global.keys["w"] && !global.keys["d"]) {
            global.playerObject.switchCurrentSprites(10, 12);
            // console.log(this.animationData.firstSpriteIndex)
        }
    }

    /*draw = function () {
        global.ctx.fillStyle = "#000000";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }*/

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "BlockObject") {
            console.log("block")
            this.x = this.previousX;
            this.y = this.previousY;
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        //this.loadImages(["./images/apple.png"]);
        this.loadImagesFromSpritesheet("./images/DrillenDigman.png", 5, 6);
    }
}

export {Player}