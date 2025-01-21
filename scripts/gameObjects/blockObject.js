import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class BlockObject extends BaseGameObject {
    name = "BlockObject";
    blockGravityForces = true;
    hardness = 10;
    type = "iron";
    value = 50;

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Player") {

            console.log("collided")

        //     // Calculate the overlaps
        // const overlapX = Math.min(
        //     this.x + this.width - collidingObject.x,
        //     collidingObject.x + collidingObject.width - this.x
        // );
        // const overlapY = Math.min(
        //     this.y + this.height - collidingObject.y,
        //     collidingObject.y + collidingObject.height - this.y
        // );

        // // Determine collision direction based on smaller overlap
        // if (overlapX < overlapY) {
        //     // Horizontal collision
        //     if (collidingObject.x < this.x) {
        //         // Player hits the left side of the block
        //         collidingObject.x = this.x - collidingObject.width;
        //     } else {
        //         // Player hits the right side of the block
        //         collidingObject.x = this.x + this.width;
        //     }
        //     collidingObject.velocityX = 0; // Stop horizontal movement
        // } else {
        //     // Vertical collision
        //     if (collidingObject.y < this.y) {
        //         // Player lands on top of the block
        //         collidingObject.y = this.y - collidingObject.height;
        //         collidingObject.velocityY = 0; // Stop vertical movement
        //         collidingObject.onGround = true; // Ensure player is marked as on ground
        //     } else {
        //         // Player hits the bottom of the block
        //         collidingObject.y = this.y + this.height;
        //         collidingObject.velocityY = 0; // Stop upward movement
        //     }
        // }
            // console.log("huh")
            collidingObject.x = collidingObject.previousX;
            collidingObject.y = collidingObject.previousY;


        }
    }

    constructor (x, y, width, height, hardness, type, value, imagePath) {
        super(x, y, width, height);
        this.loadImages([imagePath]);
        this.hardness = hardness
        this.type = type
        this.value = value
    }
}

export {BlockObject};