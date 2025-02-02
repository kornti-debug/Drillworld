import { global } from "./global.js";
import { Player } from "../gameObjects/player.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { BlockObject } from "../gameObjects/blockObject.js";
import { DrillTrigger } from "../gameObjects/drillTrigger.js";
import { VerticalMoveTrigger } from "../gameObjects/verticalMoveTrigger.js";
import { Shop } from "../gameObjects/shop.js";
import { Rocket } from "../gameObjects/rocket.js"

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
//check shop collsionStatus is called all the time to check if the player collides with the shop to show the "enter shop" div
    global.shop.checkShopCollisionStatus()


    //reacting to player keypresses in the gameloop felt smoother 
    if (global.keys['d']) {
        if (global.playerObject.xVelocity == 0 && !global.isDigging){
            global.playerObject.switchCurrentSprites(12, 17);    
        }
        global.playerObject.xVelocity = global.playerObject.speed;
        global.playerObject.yVelocity = 0;
    } else if (global.keys['a']) {
        if (global.playerObject.xVelocity == 0 && !global.isDigging){
            global.playerObject.switchCurrentSprites(18, 23);    }
        global.playerObject.xVelocity = -global.playerObject.speed;;
        global.playerObject.yVelocity = 0;
 } else {global.playerObject.xVelocity = 0;}
    
 //render player stats on the top left screen, make sure to show the player the stats all the time
 renderPlayerStats()
 
 requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function renderPlayerStats() {
    playerStatsDiv.innerHTML = `
        <p>Money: $${global.money}; 
        Mining Speed: ${global.playerObject.miningSpeed}x; 
        Health: ${global.playerObject.health}
        Energy: ${global.playerObject.energy}</p>
    `;
}   


function setupGame() {
    /*setting up the whole game with every object of the game*/
    global.playerObject = new Player(500, 250, 64, 64);
    global.shop = new Shop(200,175, 200,150);
    global.rocket = new Rocket(600,50, 200,275);

    //setting up move and drill triggers
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
    global.leftMoveTrigger.name = "leftMoveTrigger";
    global.rightMoveTrigger.name = "rightMoveTrigger";

    global.leftDrillTrigger = new DrillTrigger(0,0,1,1)
    global.rightDrillTrigger = new DrillTrigger(0,0,1,1)
    global.bottomDrillTrigger = new DrillTrigger(0,0,1,1)

    global.leftDrillTrigger.offset.left = 0;
    global.leftDrillTrigger.offset.top = global.playerObject.height / 2
    global.rightDrillTrigger.offset.left = global.playerObject.width;
    global.rightDrillTrigger.offset.top = global.playerObject.height / 2
    global.bottomDrillTrigger.offset.left = global.playerObject.width / 2;
    global.bottomDrillTrigger.offset.top = global.playerObject.height

    global.leftDrillTrigger.name = "leftDrillTrigger";
    global.rightDrillTrigger.name = "rightDrillTrigger";
    global.bottomDrillTrigger.name = "bottomDrillTrigger";
    global.leftDrillTrigger.checkCollisions = true;
    global.rightDrillTrigger.checkCollisions = true;
    global.bottomDrillTrigger.checkCollisions = true;

    // Randomly generate a position for the arkenstone
    const arkenstonePosition = {
        i: Math.floor(Math.random() * 10 + 5), // Random column index (5 to 14)
        j: Math.floor(Math.random() * 10 +15) // Random row index (15 to 24)
    };


    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 30; j++) { // 50 rows for deeper levels


            // Check if this position matches the arkenstone position
        if (i === arkenstonePosition.i && j === arkenstonePosition.j) {
            // Create the arkenstone block
            new BlockObject(
                i * 75,               // x position
                325 + j * 75,         // y position
                75,                   // width
                75,                   // height
                100,                  // health/hardness
                "arkenstone",         // type
                1000,                 // value (high value for rare ore)
                ["./images/ores/arkenstone1.png","./images/ores/arkenstone2.png","./images/ores/arkenstone3.png"] // image path
            );
            continue; // Skip the normal block creation for this position
        }


            const blockType = getBlockTypeForRow(j);
    
            // Skip creating a block for empty tiles
            if (blockType.type === "empty") {
                continue;
            }
    
            // Create a block with the chosen type and properties
            new BlockObject(
                i * 75,               // x position
                325 + j * 75,         // y position
                75,                   // width
                75,                   // height
                blockType.hardness,   // health/hardness
                blockType.type,       // type (e.g., "iron", "dirt", etc.)
                blockType.value,      // value
                blockType.image       // image path
            );
        }
    }
}

function getBlockTypeForRow(row) {
    let probabilities;

    if (row < 5) {
        // Higher levels: Mostly  dirt blocks
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
/*
If Math.random() gives 0.35, we process:

Iron:
Cumulative = 0.1
random (0.35) > 0.1 → Continue
Dirt:
Cumulative = 0.1 + 0.7 = 0.8
random (0.35) < 0.8 → Choose "dirt"! ✅
If Math.random() was 0.95, the sequence would pick empty.*/
    
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



