import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class Floor extends BaseGameObject {
    name = "Floor";
    blockGravityForces = true;



    draw = function () {
    }
    
    constructor (x, y, width, height) {
        super(x, y, width, height);
    }
}

export {Floor};