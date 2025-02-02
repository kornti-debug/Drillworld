import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class DrillTrigger extends BaseGameObject {

    name = "DrillTrigger";
    blockGravityForces = false;
    offset = {
        "left": 0,
        "top": 0
    }

/* drill trigger reacts to mining block. if key is pressed, player is on the ground and check of if block can be mined, the block will be mined*/
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
        }
    }

    //check if block can be mined depending on the block type current drill level
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

    //switching to respective drill sprites -> set digging to true and decrease hardness/health of the block until its gone.
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
        
        //switch to respective block sprites if the block is lower a certain health
        if(collidingObject.hardness <= collidingObject.originalHardness*0.66){
            collidingObject.switchCurrentSprites(1,1)
        }
        if(collidingObject.hardness <= collidingObject.originalHardness*0.33){
            collidingObject.switchCurrentSprites(2,2)
        }

        if (collidingObject.hardness <= 0) {
            collidingObject.active = false;
            global.isDigging = false

            //add resource to inventory
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
    //  global.ctx.fillRect(this.x, this.y, this.width, this.height);
};

update = function () {
    this.x = global.playerObject.x + this.offset.left
    this.y = global.playerObject.y + this.offset.top
}



}



export { DrillTrigger };