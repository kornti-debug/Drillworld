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

    if(global.keys['e']){
        populateResources();
        if(global.shopDiv.style.display == "none"){
                    global.shopDiv.style.display = "block"} else {global.shopDiv.style.display = "none"}
    }


   
}

function populateResources() {
    // Clear existing content
    global.resourceDisplayDiv.innerHTML = "";

    // Append each resource to the div
    for (const [key, value] of Object.entries(global.ressources)) {
        const resourceElement = document.createElement("p");
        resourceElement.textContent = `${key}: ${value}`;
        global.resourceDisplayDiv.appendChild(resourceElement);
    }

    const moneyElement = document.createElement("p");
    moneyElement.textContent = `${global.money}`;
    global.resourceDisplayDiv.appendChild(moneyElement);
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

}

document.addEventListener("keydown", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);

global.shopCloseButton.addEventListener("click", closeShop);

global.shopSellButton.addEventListener("click", sellOres)


// document.addEventListener("mousemove", (event) => {
//     console.log(`x= ${event.clientX}, Y=${event.clientY}`)
// })

function closeShop(){

    global.shopDiv.style.display = "none";
}

function sellOres(){

    let totalEarnings = 0;
    for(const [key, value] of Object.entries(global.ressources)){
        const pricePerUnit = 5;
        console.log(key,", ",value)
        totalEarnings += value * pricePerUnit
        global.ressources[key] = 0;
    }
    console.log(totalEarnings)

    global.money += totalEarnings;
    populateResources()

}



