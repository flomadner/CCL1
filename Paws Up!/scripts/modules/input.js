import { global } from "./global.js";

function move(event) {

    switch(event.key) {
        case "d":
            if (global.playerObject.xVelocity == 0)
                global.playerObject.switchCurrentSprites(7, 8, 9, 10, 11, 12);
            global.playerObject.xVelocity = 200;
            global.playerObject.yVelocity = 0;
            console.log("velocity set");
            break;
        case "a":
            if (global.playerObject.xVelocity == 0)
                global.playerObject.switchCurrentSprites(1, 2, 3, 4, 5, 6);
            global.playerObject.xVelocity = -200;
            global.playerObject.yVelocity = 0;
            break;
    }
}

function stop(event) {
    switch(event.key) {
        case "d":
            global.playerObject.xVelocity = 0;
            break;
        case "a":
            global.playerObject.xVelocity = 0;
            break;   
    }
}

document.addEventListener("keypress", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);