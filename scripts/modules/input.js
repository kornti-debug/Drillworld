import { global } from "./global.js";

let isFlying = false;

function move(event) {

    global.keys[event.key] = true;
    // console.log(global.keys[event.key])
    // // if(global.keys)
    // console.log(global.keys['d'])

    if(global.keys['d']){
        global.playerObject.xVelocity = 500;
    }
    if(global.keys['a']){
        global.playerObject.xVelocity = -500;
    }
    if(global.keys['w']){
        // if(!isFlying)
            // console.log(global.playerObject.yVelocity)
            global.gravityForce = 0
             global.playerObject.yVelocity -= global.playerObject.jetpackForce
            // global.playerObject.yVelocity = -200;
                //          setTimeout(() => {
                //     global.playerObject.useGravityForces = false;
                //  }, 600);
    }
    if(global.keys['s']){
        global.playerObject.yVelocity = 500;
    }

   
    //Example Movement for the PacMan Game
    // switch(event.key) {
    //     case "d":
    //         if (global.playerObject.xVelocity == 0)
    //             global.playerObject.switchCurrentSprites(27, 35);
    //         global.playerObject.xVelocity = 200;
    //         global.playerObject.yVelocity = 0;
    //         console.log("velocity set");
    //         break;
    //     case "a":
    //         if (global.playerObject.xVelocity == 0)
    //             global.playerObject.switchCurrentSprites(9, 17);
    //         global.playerObject.xVelocity = -200;
    //         global.playerObject.yVelocity = 0;
    //         break;
    //     case "w":
    //         // if (!isFlying) {
    //         //     isFlying = true;
    //             global.playerObject.setJumpForce(.8);
    //             // setTimeout(() => {
    //             //     global.playerObject.useGravityForces = false;
    //             // }, 600);
    //             break;
    //         }
    //    /* case "s":
    //         global.playerObject.xVelocity = 0;
    //         global.playerObject.yVelocity = 100;
    //         global.playerObwject.switchCurrentSprites(3, 5);
    //         break; */
    // }
}

function stop(event) {

    global.keys[event.key] = false;

    if(!global.keys['d']){
        global.playerObject.xVelocity = 0;
    }
    if(!global.keys['a']){
        global.playerObject.xVelocity = 0;
    }
    if(!global.keys['w']){
        global.playerObject.yVelocity = -0;
        global.gravityForce = 4;
    }
    if(!global.keys['s']){
        global.playerObject.yVelocity = 0;
    }

    // switch(event.key) {
    //     case "d":
    //         global.playerObject.xVelocity = 0;
    //         break;
    //     case "a":
    //         global.playerObject.xVelocity = 0;
    //         break;   
    //     case "w":
    //         // global.playerObject.useGravityForces = true;
    //         isFlying = false;
    //         console.log(global.playerObject.useGravityForces);
    //         break;   
    // }
}


// function handleMovement(){

//     if(global.keys['d']){
//         global.playerObject.xVelocity = 200;
//     }
//     if(global.keys['a']){
//         global.playerObject.xVelocity = -200;
//     }
//     if(global.keys['w']){
//         global.playerObject.yVelocity = -200;
//     }
//     if(global.keys['s']){
//         global.playerObject.yVelocity = 200;
//     }

// }

document.addEventListener("keydown", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);

// document.addEventListener("mousemove", (event) => {
//     console.log(`x= ${event.clientX}, Y=${event.clientY}`)
// })