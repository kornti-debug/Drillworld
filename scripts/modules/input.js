import { global } from "./global.js";

let isFlying = false;

function move(event) {

    //set keys to true if pressed in key object
    global.keys[event.key] = true;


    if (global.keys['d']) {
        if (global.playerObject.xVelocity == 0 && !global.isDigging && !global.playerObject.jetpackData.isFlying) {
            global.playerObject.switchCurrentSprites(12, 17);
        }
        global.playerObject.xVelocity = global.playerObject.speed;
        global.playerObject.yVelocity = 0;
    } else if (global.keys['a']) {
        if (global.playerObject.xVelocity == 0 && !global.isDigging && !global.playerObject.jetpackData.isFlying ) {
            global.playerObject.switchCurrentSprites(18, 23);
        }
        global.playerObject.xVelocity = -global.playerObject.speed;
        global.playerObject.yVelocity = 0;
    } else { global.playerObject.xVelocity = 0; }

   
    //shop logic
    if (global.keys['e']) {
            populateResources();
            showUpgrades();
            showItems();
            showBuildings();

            const shopVisible = global.shopDiv.style.display === "block";
            global.shopDiv.style.display = shopVisible ? "none" : "block";
                   
    }


}

function showItems() {
    global.itemDisplayDiv.innerHTML = `<p>Items</p>`;
}

//show buildings to buy in the shop
function showBuildings() {

    global.buildDisplayDiv.innerHTML = `<p>Buildings</p>`;

    const rocketButton = document.createElement("button");
    rocketButton.className = "button-9"
    rocketButton.textContent = `Build Rocket ($100 + arkenstone)`;
    rocketButton.addEventListener("click", () => buyBuilding());
    global.buildDisplayDiv.appendChild(rocketButton);
}

//show inventory/resources to sell
function populateResources() {
    // Clear existing content
    global.resourceDisplayDiv.innerHTML = `<p>Ressources</p>`;


    // Append each resource to the div
    for (const [key, value] of Object.entries(global.ressources)) {
        const resourceElement = document.createElement("p");
        resourceElement.textContent = `${key}: ${value}`;
        global.resourceDisplayDiv.appendChild(resourceElement);
    }
    const sellButton = document.createElement("button");
    sellButton.className = "button-9"
    sellButton.textContent = `sell ore`;
    sellButton.addEventListener("click", () => sellOres());
    global.resourceDisplayDiv.appendChild(sellButton);
}

function showUpgrades() {
    // Clear existing content
    global.upgradeDisplayDiv.innerHTML = `<p>Upgrades</p>`;

    // Drill Upgrades
    const currentDrillLevel = global.playerObject.currentDrillLevel;
    if (currentDrillLevel < global.upgrades.drills.length) {
        const nextDrill = global.upgrades.drills[currentDrillLevel];
        const drillButton = document.createElement("button");
        drillButton.className = "button-9"
        drillButton.textContent = `Buy ${nextDrill.name} ($${nextDrill.cost})`;
        drillButton.addEventListener("click", () => purchaseUpgrade("drills"));
        upgradeDisplayDiv.appendChild(drillButton);
    }

    // Suit Upgrades
    const currentSuitLevel = global.playerObject.currentSuitLevel;
    if (currentSuitLevel < global.upgrades.suits.length) {
        const nextSuit = global.upgrades.suits[currentSuitLevel];
        const suitButton = document.createElement("button");
        suitButton.className = "button-9"
        suitButton.textContent = `Buy ${nextSuit.name} ($${nextSuit.cost})`;
        suitButton.addEventListener("click", () => purchaseUpgrade("suits"));
        upgradeDisplayDiv.appendChild(suitButton);
    }

}

function buyBuilding() {

    if (global.money >= 100 && global.arkenstone == true) {
        winGame();
    } else {
        alert("Not enough money or ressources to purchase this building!");
    }
}

function purchaseUpgrade(category) {
    const currentLevel = global.playerObject[`current${capitalize(category)}Level`];
    const nextUpgrade = global.upgrades[category][currentLevel];


    if (global.money >= nextUpgrade.cost) {
        // Deduct money
        global.money -= nextUpgrade.cost;

        // Apply the upgrade effects
        if (category === "drills") {

            global.playerObject.miningSpeed = nextUpgrade.miningSpeed;
        } else if (category === "suits") {
            global.playerObject.health += nextUpgrade.healthBonus;
        }

        // Advance to the next level
        global.playerObject[`current${capitalize(category)}Level`]++;

        // Re-render the upgrade div to show the next upgrade
        showUpgrades();
    } else {
        alert("Not enough money to purchase this upgrade!");
    }
}
//changing drills to Drill -> to match the variable currentDrillLevel. same goes for suits
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1, -1);

}


function winGame() {
    global.winScreenDiv.style.display = "block"
}



function stop(event) {

    global.keys[event.key] = false;

    if (!global.keys['d']) {
        global.playerObject.xVelocity = 0;
    }
    if (!global.keys['a']) {
        global.playerObject.xVelocity = 0;
    }
    if (!global.keys['w']) {
        global.playerObject.yVelocity = -0;
        global.gravityForce = 4;
    }
}

document.addEventListener("keydown", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);

document.addEventListener("visibilitychange", () => {
    if (!document.hidden){
        global.prevTotalRunningTime = performance.now();
    }
})

global.shopCloseButton.addEventListener("click", closeShop);


global.startGameButton.addEventListener("click", startGame)

global.instructionsButton.addEventListener("click", showInstructions)

global.backToStartScreenButton.addEventListener("click", backToStartScreenButton)


function startGame() {
    global.startScreenDiv.style.display = "none"
}

function showInstructions(){
    global.startScreenDiv.style.display = "none"
    global.instructionsScreenDiv.style.display = "grid"
}
function backToStartScreenButton(){

    global.instructionsScreenDiv.style.display = "none"
        global.startScreenDiv.style.display = "block"
}

function closeShop() {

    global.shopDiv.style.display = "none";
}

//sell ores function, checks all resources and sell them with 20 per unit
function sellOres() {

    let totalEarnings = 0;
    for (const [key, value] of Object.entries(global.ressources)) {
        const pricePerUnit = 20;
        totalEarnings += value * pricePerUnit
        global.ressources[key] = 0;
    }

    global.money += totalEarnings;
    populateResources()

}



