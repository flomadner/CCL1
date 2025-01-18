import { global } from "./global.js";
import { Skeleton } from "../gameObjects/skeleton.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { BlockObject } from "../gameObjects/blockObject.js";
import { Floor } from "../gameObjects/floor.js";

let lastSpawnTime = 0;

function spawnItems(totalRunningTime) {
    let spawnInterval = 3000; // Spawn a items every 3 seconds

    if (totalRunningTime - lastSpawnTime >= spawnInterval) {
        const randomX = Math.floor(Math.random() * global.canvas.width - 70); // Random x position
        new BlockObject(randomX+20, 0, 50, 50); // Create a new item
        lastSpawnTime = totalRunningTime; // Update the last spawn time
    }
   
}

function updateDisplay() {
    // Update Lives Display
    const healthDisplay = document.getElementById("healthDisplay");
    healthDisplay.innerHTML = `Lives: ${global.lives}`;

    // Update Score Display
    const scoreDisplay = document.getElementById("scoreDisplay");
    scoreDisplay.innerHTML = `Score: ${global.score}`;

    if (global.lives == 0) {
        global.gameOver = true;
    }

    if (global.score < 0) {
        global.gameOver = true;
    }
}


function gameLoop(totalRunningTime) { 
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime"

    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Clear the canvas

    if (global.gameOver == true) {
        console.log(global.gameOver);
        const healthDisplay = document.getElementById("healthDisplay");
        healthDisplay.innerHTML = "";

        const scoreDisplay = document.getElementById("scoreDisplay");
        scoreDisplay.innerHTML = "";

        global.ctx.font = "70px VT323";
        global.ctx.fillText("Game Over!", 200, 200);
        

    } else {
        
        // Spawn items periodically
        spawnItems(totalRunningTime);
    
        // Update all game objects
        for (var i = 0; i < global.allGameObjects.length; i++) {
            if (global.allGameObjects[i].active == true) {
                global.allGameObjects[i].storePrevPos();
                global.allGameObjects[i].update();
                global.checkCollisionWithAnyOther(global.allGameObjects[i]);
                global.allGameObjects[i].draw();
            }
        }
        updateDisplay();
    }

    requestAnimationFrame(gameLoop); // Keeps the gameLoop running indefinitely

}

function setupGame() {
    global.playerObject = new Skeleton(0, 430, 64, 64);
    new Floor(0, 400, 9000, 30);

    // Other setup logic can go here
}



setupGame();
requestAnimationFrame(gameLoop);
updateDisplay();