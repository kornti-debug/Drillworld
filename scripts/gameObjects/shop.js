import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class Shop extends BaseGameObject {
    name = "Shop";
    blockGravityForces = false;

    reactToCollision = function (collidingObject) {
    //     if (collidingObject.name == "Skeleton" && global.shopCollsion == false) {

    //         // manageRessources();
    //         global.enterShopDiv.style.display = "block"
    //         global.shopCollsion = true;
    //     } else if (collidingObject.name != "Skeleton") {
    //         // global.enterShopDiv.style.display = "none"
    //         global.shopCollsion = false
    //     }
    }

    // checkCollisionStatus = function () {
    //     if (!global.currentlyCollidingWithShop) {
    //         global.enterShopDiv.style.display = "none";
    //     }
    //     // Reset the flag for the next frame
    //     global.currentlyCollidingWithShop = false;
    // };
    
    // Call `checkCollisionStatus` at the end of each frame or update cycle
    // setInterval(checkCollisionStatus, 16);

    manageRessources = function () {
        const li = document.createElement("li")
        global.shopUl.appendChild(li)
    }


    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/wall.jpg"]);
    }
}

export { Shop };