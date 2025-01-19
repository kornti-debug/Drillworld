import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class DrillTrigger extends BaseGameObject {

    name = "DrillTrigger";
    blockGravityForces = false;
    offset = {
        "left": 0,
        "top": 0
    }


    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "BlockObject") {
            if (this.name == "leftDrillTrigger" && global.keys['a']) {
                if (this.checkIfBlockCanBeMined(collidingObject)) {
                    this.isDigging(collidingObject);
                }
            }
            if (this.name == "rightDrillTrigger" && global.keys['d']) {
                if (this.checkIfBlockCanBeMined(collidingObject)) {
                    this.isDigging(collidingObject);
                }
            }

            if (this.name == "bottomDrillTrigger" && global.keys['s']) {
                if (this.checkIfBlockCanBeMined(collidingObject)) {
                    this.isDigging(collidingObject);
                }
            }
            // if(this.name == "leftDrillTrigger" && global.keys['a']){
            //     collidingObject.active = false;
            // }
            //     collidingObject.x = collidingObject.previousX;
            //     collidingObject.y = collidingObject.previousY;
            // }
        }
    }

    checkIfBlockCanBeMined = function (collidingObject) {
        if (collidingObject.type == "dirt") {
            return true;
        }
        if (collidingObject.type == "iron") {
            return true;
        }
        if (collidingObject.type == "copper" && global.playerObject.currentDrillLevel > 0) {
            return true;
        }
        if (collidingObject.type == "arkenstone" && global.playerObject.currentDrillLevel > 1) {
            return true;ij
        }



    }

    isDigging = function (collidingObject) {
        collidingObject.hardness = collidingObject.hardness - global.playerObject.miningSpeed
        if (collidingObject.hardness <= 0) {
            collidingObject.active = false;
            if (collidingObject.type != "dirt" && collidingObject.type != "arkenstone")
                global.ressources[collidingObject.type]++
            if (collidingObject.type == "arkenstone") { }
            global.arkenstone = true;
        }
    }


constructor(x, y, width, height) {
    super(x, y, width, height);
    //this.loadImages(["./images/wall.jpg"]);
}


draw = function () {
    global.ctx.fillRect(this.x, this.y, this.width, this.height);
};

update = function () {
    this.x = global.playerObject.x + this.offset.left
    this.y = global.playerObject.y + this.offset.top
}



}



export { DrillTrigger };