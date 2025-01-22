import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class Shop extends BaseGameObject {
    name = "Shop";
    blockGravityForces = false;

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Player") {
            global.shopCollision = true; // Skeleton is colliding with the shop
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
    

    manageRessources = function () {
        const li = document.createElement("li")
        global.shopUl.appendChild(li)
    }


    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/Shop.png"]);
    }
}

export { Shop };