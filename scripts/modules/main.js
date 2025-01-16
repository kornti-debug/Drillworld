import { global } from "./global.js";
import { Skeleton } from "../gameObjects/skeleton.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { BlockObject } from "../gameObjects/blockObject.js";
import { Floor } from "../gameObjects/floor.js";
import { DrillTrigger } from "../gameObjects/drillTrigger.js";
import { VerticalMoveTrigger } from "../gameObjects/verticalMoveTrigger.js";

function gameLoop(totalRunningTime) { 
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 
    
    for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (global.allGameObjects[i].active == true) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].applyGravity();
            global.allGameObjects[i].draw();
        }
    }
    
    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function setupGame() {
    global.playerObject = new Skeleton(700, 250, 56, 64);
    global.leftMoveTrigger = new MoveTrigger(100, 100, 20, 900);
    global.rightMoveTrigger = new MoveTrigger(800, 100, 20, 900);
    global.topMoveTrigger = new VerticalMoveTrigger(100, 100, 700, 20);
    global.bottomMoveTrigger = new VerticalMoveTrigger(100, 480, 700, 20);
    global.leftDrillTrigger = new DrillTrigger(0,0,10,10)
    global.rightDrillTrigger = new DrillTrigger(0,0,10,10)
    global.topDrillTrigger = new DrillTrigger(0,0,10,10)
    global.bottomDrillTrigger = new DrillTrigger(0,0,10,10)

    global.leftDrillTrigger.offset.left = 0;
    global.leftDrillTrigger.offset.top = global.playerObject.height / 2
    global.rightDrillTrigger.offset.left = global.playerObject.width;
    global.rightDrillTrigger.offset.top = global.playerObject.height / 2
    global.topDrillTrigger.offset.left = global.playerObject.width / 2;
    global.topDrillTrigger.offset.top = 0
    global.bottomDrillTrigger.offset.left = global.playerObject.width / 2;
    global.bottomDrillTrigger.offset.top = global.playerObject.height

    global.leftDrillTrigger.name = "leftDrillTrigger";
    global.rightDrillTrigger.name = "rightDrillTrigger";
    global.topDrillTrigger.name = "topDrillTrigger";
    global.bottomDrillTrigger.name = "bottomDrillTrigger";

    
    for(let i = 0; i<30; i++){
        for(let j = 0; j<10; j++){
    new BlockObject(i*50, 340+j*50, 50, 50);
        }
    }

    //new Floor(0, 400, 9000, 40);

// }
    //new BlockObject(300, 400, 50, 50);
    // setup your game here - means: Create instances of the GameObjects that belong to your game.
    // e.g.: 
    /*    
                global.playerObject = new PacMan(200, 300, 60, 60);
                new Wall(0, 0, 100, 100);
                new Candy(100, 100, 100, 100);
    }*/
   
}

setupGame();
requestAnimationFrame(gameLoop);



