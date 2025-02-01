import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Skeleton extends BaseGameObject {
    name = "Skeleton"; //had to keep the name because otherwise it messes everything up;
    xVelocity = 0;
    yVelocity = 0;
    prevX = 0;
    prevY = 0;
    useGravityForces = true;

    getBoxBounds = function () {
        let bounds = {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y + 14,
            bottom: this.y + this.height - 3
        }
        return bounds;
    }

    edgeCollision = function () {
        if (this.x <= - 0 || this.x >= global.canvas.width - 58) {
            this.x = this.prevX
        }
    }

    storePrevPos = function () {
        this.prevX = this.x;
        this.prevY = this.y;
    }
    update = function () {

        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;

        if (this.xVelocity == 0) {
            global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
        }
        this.edgeCollision();
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/fee-walking-sprite.png", 6, 2);
    }
}

export { Skeleton }