import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class BlockObject extends BaseGameObject {
    name = "BlockObject";
    blockGravityForces = true;
    hardness = 10;
    ore = "iron";
    value = 50;

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Skeleton") {
            // console.log("huh")
            collidingObject.x = collidingObject.previousX;
            collidingObject.y = collidingObject.previousY;
        }
    }

    constructor (x, y, width, height, health, ore, value, imagePath) {
        super(x, y, width, height);
        this.loadImages([imagePath]);
        this.health = health
        this.ore = ore
        this.value = value
    }
}

export {BlockObject};