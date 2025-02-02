import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

//block object class which represents the mining blocks
class BlockObject extends BaseGameObject {
    name = "BlockObject";
    blockGravityForces = true;
    hardness = 10;
    originalHardness;
    type = "iron";
    value = 50;

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

    
}

export {BlockObject};