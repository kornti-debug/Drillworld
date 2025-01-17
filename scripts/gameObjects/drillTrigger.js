import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class DrillTrigger extends BaseGameObject {

    name = "DrillTrigger";
    blockGravityForces = false;
    offset = {
        "left": 0,
        "top": 0
    }


    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "BlockObject") {
            if(this.name == "leftDrillTrigger" && global.keys['a']){
                collidingObject.health --
                // console.log(collidingObject.health)
                if(collidingObject.health == 0) {
                collidingObject.active = false;
                global.ressources[collidingObject.ore]++
            }
            }
            if(this.name == "rightDrillTrigger" && global.keys['d']){
                collidingObject.health --
                if(collidingObject.health == 0) {
                collidingObject.active = false;
                global.ressources[collidingObject.ore]++
            }
            }
            if(this.name == "bottomDrillTrigger" && global.keys['s']){
                collidingObject.health --
                if(collidingObject.health == 0) {
                collidingObject.active = false;
                global.ressources[collidingObject.ore]++
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

    constructor (x, y, width, height) {
        super(x, y, width, height);
        //this.loadImages(["./images/wall.jpg"]);
    }


    draw = function () {
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    update = function(){
        this.x = global.playerObject.x + this.offset.left
        this.y = global.playerObject.y + this.offset.top
    }




}



export {DrillTrigger};