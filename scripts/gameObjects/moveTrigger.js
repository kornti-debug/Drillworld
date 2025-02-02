import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class MoveTrigger extends BaseGameObject {
    backGroundDiv = null;

    update = function () {


        // setting x and y values of each move trigger, considering the other move triggers
        this.backGroundDiv.style.backgroundPositionX = global.backgroundShift + "px";
        global.canvas.style.marginLeft =  global.backgroundShift  + "px";
        global.topMoveTrigger.x = global.rightMoveTrigger.x - global.topMoveTrigger.width
        global.bottomMoveTrigger.x = global.rightMoveTrigger.x - global.topMoveTrigger.width
        global.leftMoveTrigger.y = global.topMoveTrigger.y
        global.rightMoveTrigger.y = global.topMoveTrigger.y

    
        
    }

    draw = function () {
    //    global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    reactToCollision = function (collidingObject)   {


        if (collidingObject.name == "Player") {
            let shiftBy = collidingObject.xVelocity * global.deltaTime;

            global.backgroundShift += shiftBy * -1;

            if (global.backgroundShift < global.horizontalBackgroundMaxShift) {
                global.backgroundShift = global.horizontalBackgroundMaxShift;
                collidingObject.x = collidingObject.previousX;
            }
            else if (global.backgroundShift > 0) {
                global.backgroundShift = 0;
                collidingObject.x = collidingObject.previousX;

            }
            else {
                global.leftMoveTrigger.x += shiftBy;
                global.rightMoveTrigger.x += shiftBy;
            }
        }

    

    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.backGroundDiv = document.querySelector("#background");

    }
}

export {MoveTrigger}