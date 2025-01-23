import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class BlockObject extends BaseGameObject {
    name = "BlockObject";
    blockGravityForces = true;
    hardness = 10;
    originalHardness;
    type = "iron";
    value = 50;
    // staticImage = true; // New property to identify static blocks
    hasBeenDrawn = false; // Tracks if the block has already been drawn

constructor (x, y, width, height, hardness, type, value, imagePaths) {
        super(x, y, width, height);
        this.loadImages(imagePaths);
        this.hardness = hardness
        this.originalHardness = hardness
        this.type = type
        this.value = value
    }

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Player") {
            collidingObject.x = collidingObject.previousX;
            collidingObject.y = collidingObject.previousY;
        }
    }

    draw = function () {

        let sprite = this.getNextSprite();
        global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    };
    // draw = function() {
    //     console.log("test2")

        // if (this.hasBeenDrawn) {
        //     // Skip drawing if the block is static and already drawn
        //     return;
        // }

        // let sprite = this.getNextSprite();
        // global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);

        //     this.hasBeenDrawn = true; // Mark as drawn after the first frame
    // }

    
}

export {BlockObject};