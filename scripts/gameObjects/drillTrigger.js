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
                global.playerObject.x = global.playerObject.previousX;
                if (this.checkIfBlockCanBeMined(collidingObject) && global.playerObject.physicsData.isGrounded && !global.playerObject.jetpackData.isFlying) {
                    this.isDigging(collidingObject);
                }
            }
            else if (this.name == "rightDrillTrigger" && global.keys['d']) {
                global.playerObject.x = global.playerObject.previousX;
                if (this.checkIfBlockCanBeMined(collidingObject) && global.playerObject.physicsData.isGrounded && !global.playerObject.jetpackData.isFlying) {
                    this.isDigging(collidingObject);
                }
            }

            else if (this.name == "bottomDrillTrigger" && global.keys['s']) {
                if (this.checkIfBlockCanBeMined(collidingObject) && global.playerObject.physicsData.isGrounded && !global.playerObject.jetpackData.isFlying) {
                    this.isDigging(collidingObject);
                }
            }
            global.isDigging = false
 
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
            return true;
        }



    }

    isDigging = function (collidingObject) {

        if(!global.isDigging){
        if(this.name == "bottomDrillTrigger"){
            console.log("test1")
                global.playerObject.switchCurrentSprites(0, 2);
        }
        if(this.name == "leftDrillTrigger"){
                // console.log("test")
                global.playerObject.switchCurrentSprites(6, 8);
        }
        if(this.name == "rightDrillTrigger"){

                global.playerObject.switchCurrentSprites(3, 5);
        }}
        global.isDigging = true;
        collidingObject.hardness = collidingObject.hardness - global.playerObject.miningSpeed * global.deltaTime
        if(collidingObject.hardness <= collidingObject.originalHardness*0.66){
            collidingObject.switchCurrentSprites(1,1)
        }
        if(collidingObject.hardness <= collidingObject.originalHardness*0.33){
            collidingObject.switchCurrentSprites(2,2)
        }

        if (collidingObject.hardness <= 0) {
            collidingObject.active = false;
            global.isDigging = false
            // global.playerObject.switchCurrentSprites(10, 10);

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