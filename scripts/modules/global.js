const global = {};

global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");
global.ctx.imageSmoothingEnabled = false;
global.shopDiv = document.querySelector("#shop");
global.enterShopDiv = document.querySelector("#enterShopDiv");
global.playerStatsDiv = document.querySelector("#playerStatsDiv")
global.resourceDisplayDiv = document.querySelector("#resourceDisplayDiv")
global.upgradeDisplayDiv = document.querySelector("#upgradeDisplayDiv")
global.buildDisplayDiv = document.querySelector("#buildDisplayDiv")
global.itemDisplayDiv = document.querySelector("#itemDisplayDiv")
global.startScreenDiv = document.querySelector("#startScreen")
global.winScreenDiv = document.querySelector("#winScreen")
global.gameOverDiv = document.querySelector("#gameOverScreen")
global.shopCloseButton = document.querySelector("#shopClose")
global.shopSellButton = document.querySelector("#shopSell")
global.startGameButton = document.querySelector("#startGame")
global.instructionsButton = document.querySelector("#instructions")
global.restartButton = document.querySelector("#restart")
global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.playerObject = {};
global.keys = {};
global.backgroundShift = 0;
global.verticalBackgroundShift = 0;
global.backgroundMaxShift = -2000;
global.gravityForce = 4;
global.pixelToMeter = 100;
global.leftMoveTrigger;
global.rightMoveTrigger;
global.drillTrigger;
global.isDigging = false;
global.shop;
global.shopCollision = false;
global.money =0;

global.ressources = {
    iron: 0,
    copper: 0
};

global.arkenstone = false;

global.upgrades = {
    drills: [
        {
            name: "Basic Drill",
            cost: 100,
            miningSpeed: 30, // Baseline speed multiplier
            description: "A basic drill with average mining speed.",
        },
        {
            name: "Advanced Drill",
            cost: 300,
            miningSpeed: 50,
            description: "Faster mining for more efficient digging.",
        },
        {
            name: "Diamond Drill",
            cost: 800,
            miningSpeed: 100,
            description: "Unstoppable speed for mining rare ores.",
        },
    ],
    suits: [
        {
            name: "Basic Suit",
            cost: 200,
            healthBonus: 10,
            description: "Standard suit with decent protection.",
        },
        {
            name: "Reinforced Suit",
            cost: 500,
            healthBonus: 25,
            description: "Extra armor for improved survivability.",
        },
        {
            name: "Exoskeleton Suit",
            cost: 1000,
            healthBonus: 50,
            description: "Maximum protection and enhanced strength.",
        },
    ],
};


global.blockTypes = [
    { type: "iron", hardness: 20, value: 50, image: "./images/ores/iron1.png" },
    { type: "dirt", hardness: 10, value: 10, image: "./images/ores/dirt1.png" },
    { type: "copper", hardness: 30, value: 100, image: "./images/ores/copper1.png" },
    { type: "arkenstone", hardness: 200, value: 1000, image: "./images/ores/arkenstone1.png" },
    { type: "empty" } // Represents an empty tile
];


global.getCanvasBounds = function () {
    let bounds =  {
        "left": 0,
        "right": this.canvas.width,
        "top": 0, 
        "bottom": this.canvas.height
    }

    return bounds;
}

global.checkCollisionWithAnyOther = function (givenObject) {
    for (let i = givenObject.index; i < global.allGameObjects.length; i++) {
        let otherObject = global.allGameObjects[i];
        if (otherObject.active == true) {
            let collisionHappened = this.detectBoxCollision(givenObject, otherObject);
            if (collisionHappened) {
                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);
            }
        }
    }
}


global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    if (gameObject1 != gameObject2) {
        if (box1.top <= box2.bottom && 
            box1.left <= box2.right && 
            box1.bottom >= box2.top &&
            box1.right >= box2.left)
        {
            return true;
        }
    }
    return false;
}


export { global }