import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class VerticalMoveTrigger extends BaseGameObject {
    backGroundDiv = null;
    blockGravityForces = false;
    name = "verticalMoveTrigger";

    update = function () {
            this.backGroundDiv.style.backgroundPositionY = global.verticalBackgroundShift + "px";
            global.canvas.style.marginTop = global.verticalBackgroundShift  + "px";
    }

    draw = function () {
    //    global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    reactToCollision = function (collidingObject)   {


        if (collidingObject.name == "Player") {
            let shiftBy;
            if (this.name == "topMoveTrigger"){
                shiftBy = collidingObject.yVelocity * global.deltaTime;
            } else {
                shiftBy = collidingObject.physicsData.prevFallingVelocity;
            }
            global.verticalBackgroundShift += shiftBy * -1;

            // console.log(shiftBy,", ", global.backgroundShift)

            if (global.verticalBackgroundShift < global.verticalBackgroundMaxShift) {
                global.verticalBackgroundShift = global.verticalBackgroundMaxShift;
                collidingObject.y = collidingObject.previousY;
            }
            else if (global.verticalBackgroundShift > 0) {
                global.verticalBackgroundShift = 0;
                collidingObject.y = collidingObject.previousY;
            }
            else {
                global.topMoveTrigger.y += shiftBy ;
                global.bottomMoveTrigger.y += shiftBy;
            }
        }

    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        //this.loadImages(["./images/apple.png"]);
        this.backGroundDiv = document.querySelector("#background");

    }
}

export {VerticalMoveTrigger}