import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class BlockObject extends BaseGameObject {
    blockGravityForces = true;
    items = ["./images/ball.png","./images/meat.png","./images/bomb.png","./images/trash.png"];
    damageAlreadyDone = false;
    xVelocity = 1;

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Skeleton") {
            // collidingObject.x = collidingObject.previousX;
            // collidingObject.y = collidingObject.previousY;
            if (this.items[this.index] === "./images/ball.png" || this.items[this.index] === "./images/meat.png") {
                global.score += 10;  // Player gains 10 points for catching ball or meat
            } 
            else if (this.items[this.index] === "./images/bomb.png" || this.items[this.index] === "./images/trash.png") {
                global.score -= 10;  // Player loses 10 points for catching bomb or trash
            }
            
        }
    }

   

    update = function() {
        this.y += 70 * global.deltaTime * this.xVelocity;
        
        if (this.y >= global.canvas.height - 30 && !this.damageAlreadyDone) {  
            if (this.items[this.index] === "./images/ball.png" || this.items[this.index] === "./images/meat.png") {
                global.lives--; 
                this.damageAlreadyDone = true;
                console.log(global.lives);
            }  
        }
        if (global.score >= 10) {
            this.xVelocity * 1.003;
        }
    }

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.index = Math.floor(Math.random() * this.items.length);
        this.loadImages([this.items[this.index]]);
        
    }
}

export {BlockObject};