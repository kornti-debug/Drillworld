import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class Shop extends BaseGameObject {
    name = "Shop";
    blockGravityForces = false;

    reactToCollision = function (collidingObject) {
        console.log("test")
        if (collidingObject.name == "Player") {
            global.shopCollision = true;
            global.enterShopDiv.style.display = "block";
        }
    };

    checkShopCollisionStatus = function () {
        if (!global.shopDiv.style.display || global.shopDiv.style.display === "none"){
        if (!global.shopCollision) {
            global.enterShopDiv.style.display = "none";
        }
        // Reset the flag for the next frame
        if (!global.shopDiv.style.display || global.shopDiv.style.display === "none") {
            global.shopCollision = false;
        }
    }
};
    

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/Shop.png"]);
    }
}

export { Shop };