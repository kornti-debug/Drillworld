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