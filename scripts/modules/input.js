import { global } from "./global.js";

let isFlying = false;

function move(event) {

    global.keys[event.key] = true;


    if (global.keys['d']) {
        if (global.playerObject.xVelocity == 0 && !global.isDigging) {
            global.playerObject.switchCurrentSprites(12, 17);
        }
        global.playerObject.xVelocity = global.playerObject.speed;
        global.playerObject.yVelocity = 0;
    } else if (global.keys['a']) {
        if (global.playerObject.xVelocity == 0 && !global.isDigging) {
            global.playerObject.switchCurrentSprites(18, 23);
        }
        global.playerObject.xVelocity = -global.playerObject.speed;;
        global.playerObject.yVelocity = 0;
    } else { global.playerObject.xVelocity = 0; }

    if (global.keys['e']) {
            populateResources();
            showUpgrades();
            showItems();
            showBuildings();
            renderPlayerStats();

            const shopVisible = global.shopDiv.style.display === "block";
            global.shopDiv.style.display = shopVisible ? "none" : "block";
                   
    }


}

function showItems() {
    global.itemDisplayDiv.innerHTML = "Items";
}

function showBuildings() {

    global.buildDisplayDiv.innerHTML = "buildings";

    const rocketButton = document.createElement("button");
    rocketButton.textContent = `Build Rocket ($100 + arkenstone)`;
    rocketButton.addEventListener("click", () => buyBuilding());
    global.buildDisplayDiv.appendChild(rocketButton);
}

function renderPlayerStats() {
    playerStatsDiv.innerHTML = `
        <p>Money: $${global.money}; 
        Mining Speed: ${global.playerObject.miningSpeed}x; 
        Health: ${global.playerObject.health}
        Energy: ${global.playerObject.energy}</p>
    `;
}

function populateResources() {
    // Clear existing content
    global.resourceDisplayDiv.innerHTML = "ressources";


    // Append each resource to the div
    for (const [key, value] of Object.entries(global.ressources)) {
        const resourceElement = document.createElement("p");
        resourceElement.textContent = `${key}: ${value}`;
        global.resourceDisplayDiv.appendChild(resourceElement);
    }
    const sellButton = document.createElement("button");
    sellButton.textContent = `sell ore`;
    sellButton.addEventListener("click", () => sellOres());
    global.resourceDisplayDiv.appendChild(sellButton);
    renderPlayerStats();
}

function showUpgrades() {
    // Clear existing content
    global.upgradeDisplayDiv.innerHTML = "upgrades";

    // Drill Upgrades
    const currentDrillLevel = global.playerObject.currentDrillLevel;
    if (currentDrillLevel < global.upgrades.drills.length) {
        const nextDrill = global.upgrades.drills[currentDrillLevel];
        const drillButton = document.createElement("button");
        drillButton.textContent = `Buy ${nextDrill.name} ($${nextDrill.cost})`;
        drillButton.addEventListener("click", () => purchaseUpgrade("drills"));
        upgradeDisplayDiv.appendChild(drillButton);
    }

    // Suit Upgrades
    const currentSuitLevel = global.playerObject.currentSuitLevel;
    if (currentSuitLevel < global.upgrades.suits.length) {
        const nextSuit = global.upgrades.suits[currentSuitLevel];
        const suitButton = document.createElement("button");
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
        console.log(global.playerObject[`current${capitalize(category)}Level`])

        // Re-render the upgrade div to show the next upgrade
        showUpgrades();
        renderPlayerStats();
    } else {
        alert("Not enough money to purchase this upgrade!");
    }
}

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
    if (!global.keys['s']) {
        // global.playerObject.yVelocity = 0;
    }

}

document.addEventListener("keydown", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);

global.shopCloseButton.addEventListener("click", closeShop);

global.shopSellButton.addEventListener("click", sellOres)

global.startGameButton.addEventListener("click", startGame)


// document.addEventListener("mousemove", (event) => {
//     console.log(`x= ${event.clientX}, Y=${event.clientY}`)
// })

function startGame() {
    global.startScreenDiv.style.display = "none"
}

function closeShop() {

    global.shopDiv.style.display = "none";
}

function sellOres() {

    let totalEarnings = 0;
    for (const [key, value] of Object.entries(global.ressources)) {
        const pricePerUnit = 20;
        console.log(key, ", ", value)
        totalEarnings += value * pricePerUnit
        global.ressources[key] = 0;
    }
    console.log(totalEarnings)

    global.money += totalEarnings;
    populateResources()

}



