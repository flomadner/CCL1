import { Sprite } from "../gameObjects/sprite.js";


const global = {};

global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");
global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.playerObject = {};
global.backgroundShift = 0;
global.backgroundMaxShift = -600;
global.gravityForce = 9.8;
global.pixelToMeter = 100;
global.leftMoveTrigger;
global.rightMoveTrigger;
global.lives = 1;
global.score = 0;
global.gameOver = false;
global.startGame = false;

global.gameOverSprite = new Sprite(320,300,170,170);
global.gameOverSprite.loadImagesFromSpritesheet("./images/gameover-fee.png", 2, 3);
global.gameOverSprite.switchCurrentSprites(0,5);

global.startScreenSprite = new Sprite(500,380,90,90);
global.startScreenSprite.loadImagesFromSpritesheet("./images/startscreen-fee.png", 2, 3);
global.startScreenSprite.switchCurrentSprites(0,5);



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