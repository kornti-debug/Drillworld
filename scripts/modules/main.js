import { global } from "./global.js";
import { Player } from "../gameObjects/player.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { BlockObject } from "../gameObjects/blockObject.js";
import { DrillTrigger } from "../gameObjects/drillTrigger.js";
import { VerticalMoveTrigger } from "../gameObjects/verticalMoveTrigger.js";
import { Shop } from "../gameObjects/shop.js";

function gameLoop(totalRunningTime) { 
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 
    
    for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (global.allGameObjects[i].active == true) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.allGameObjects[i].applyGravity();
            if (global.allGameObjects[i].checkCollisions) {
                global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            }

            global.allGameObjects[i].draw();
        }
    }
    
    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function setupGame() {
    global.playerObject = new Player(700, 250, 64, 64);
    global.leftMoveTrigger = new MoveTrigger(100, 100, 20, 400);
    global.rightMoveTrigger = new MoveTrigger(800, 100, 20, 400);
    global.topMoveTrigger = new VerticalMoveTrigger(100, 100, 700, 20);
    global.bottomMoveTrigger = new VerticalMoveTrigger(100, 480, 700, 20);
    global.playerObject.checkCollisions = true;
    global.leftMoveTrigger.checkCollisions = true;
    global.rightMoveTrigger.checkCollisions = true;
    global.topMoveTrigger.checkCollisions = true;
    global.bottomMoveTrigger.checkCollisions = true;
    global.topMoveTrigger.name = "topMoveTrigger";
    global.bottomMoveTrigger.name = "bottomMoveTrigger";

    global.leftDrillTrigger = new DrillTrigger(0,0,10,10)
    global.rightDrillTrigger = new DrillTrigger(0,0,10,10)
    global.topDrillTrigger = new DrillTrigger(0,0,10,10)
    global.bottomDrillTrigger = new DrillTrigger(0,0,10,10)
    global.shop = new Shop(400,250, 100,100);

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
    global.leftDrillTrigger.checkCollisions = true;
    global.rightDrillTrigger.checkCollisions = true;
    global.bottomDrillTrigger.checkCollisions = true;
    global.topDrillTrigger.checkCollisions = true;


    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 50; j++) { // 50 rows for deeper levels
            const blockType = getBlockTypeForRow(j);
    
            // Skip creating a block for empty tiles
            if (blockType.type === "empty") {
                continue;
            }
    
            // Create a block with the chosen type and properties
            new BlockObject(
                i * 75,               // x position
                340 + j * 75,         // y position
                75,                   // width
                75,                   // height
                blockType.hardness,   // health/hardness
                blockType.type,       // type (e.g., "iron", "dirt", etc.)
                blockType.value,      // value
                blockType.image       // image path
            );
        }
    }
    
    // for(let i = 0; i<30; i++){
    //     for(let j = 0; j<50; j++){
    // new BlockObject(i*50, 340+j*50, 50, 50, 20, "iron", 5, "./images/iron.jpg");
    // console.log()
    //     }
    // }

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

function getBlockTypeForRow(row) {
    let probabilities;

    if (row < 5) {
        // Higher levels: Mostly iron, dirt, and empty blocks
        probabilities = {
            iron: 0.1,
            dirt: 0.8,
            empty: 0.1
        };
    } else if (row <10 && row >5) {
        // Deeper levels: Introduce copper, reduce common ores
        probabilities = {
            iron: 0.1,
            dirt: 0.7,
            copper: 0.1,
            empty: 0.1
        };
    } else {
        probabilities = {
            iron: 0.2,
            dirt: 0.5,
            copper: 0.2,
            empty: 0.1
        };
    }

    
    // Choose a block type based on probabilities
    const random = Math.random();
    let cumulative = 0;

    for (const [type, probability] of Object.entries(probabilities)) {
        cumulative += probability;
        if (random < cumulative) {
            return global.blockTypes.find(block => block.type === type);
        }
    }

    // Default to empty if no match (should not happen with proper probabilities)
    return global.blockTypes.find(block => block.type === "empty");
}



setupGame();
requestAnimationFrame(gameLoop);



