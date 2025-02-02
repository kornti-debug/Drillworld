import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";



 /*
 Rocket class, inherits from basegameobject. just a rocket object which is similar to the shop object
 */
class Rocket extends BaseGameObject {
    name = "Rocket";
    blockGravityForces = false;

    reactToCollision = function (collidingObject) {
    }


    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/Rocket.png"]);
    }
}

export { Rocket };