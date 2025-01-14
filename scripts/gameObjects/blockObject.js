import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class BlockObject extends BaseGameObject {
    name = "BlockObject";
    blockGravityForces = true;

    reactToCollision = function (collidingObject)   {
        // if (collidingObject.name == "Skeleton") {
        //     // console.log("huh")
        //     collidingObject.x = collidingObject.previousX;
        //     collidingObject.y = collidingObject.previousY;
        // }
    }

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/wall.jpg"]);
    }
}

export {BlockObject};