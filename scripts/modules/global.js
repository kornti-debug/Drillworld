const global = {};

global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");
global.ctx.imageSmoothingEnabled = false;
global.shopDiv = document.querySelector("#shop");
global.resourceDisplayDiv = document.querySelector("#resourceDisplayDiv")
global.shopCloseButton = document.querySelector("#shopClose")
global.shopSellButton = document.querySelector("#shopSell")
global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.playerObject = {};
global.keys = {};
global.backgroundShift = 0;
global.verticalBackgroundShift = 0;
global.backgroundMaxShift = -600;
global.gravityForce = 4;
global.pixelToMeter = 100;
global.leftMoveTrigger;
global.rightMoveTrigger;
global.drillTrigger;
global.shop;
global.shopCollision;
global.ressources = {
    iron: 0,
    copper: 0
};
global.money =0;

global.blockTypes = [
    { type: "iron", hardness: 20, value: 50, image: "./images/iron.jpg" },
    { type: "dirt", hardness: 10, value: 10, image: "./images/dirt.jpg" },
    { type: "copper", hardness: 30, value: 100, image: "./images/copper.jpg" },
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