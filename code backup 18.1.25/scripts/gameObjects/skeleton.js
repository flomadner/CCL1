import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Skeleton extends BaseGameObject {
    name = "Skeleton";
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
        if (this.x <= -20 || this.x >= global.canvas.width-50) {
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

    /*draw = function () {
        global.ctx.fillStyle = "#000000";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }*/

    constructor(x, y, width, height) {
        super(x, y, width, height);
        //this.loadImages(["./images/apple.png"]);
        this.loadImagesFromSpritesheet("./images/BODY_skeleton.png", 9, 4);
    }
}

export { Skeleton }