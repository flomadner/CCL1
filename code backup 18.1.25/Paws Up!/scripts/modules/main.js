import { global } from "./global.js";
import { Skeleton } from "../gameObjects/skeleton.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { BlockObject } from "../gameObjects/blockObject.js";
import { Floor } from "../gameObjects/floor.js";

let lastSpawnTime = 0;

// Function to spawn items at random positions
function spawnItems(totalRunningTime) {
    const spawnInterval = 3000; // Spawn an item every 3 seconds
    const itemWidth = 50;  // Width of the spawned item (adjust as necessary)

    if (totalRunningTime - lastSpawnTime >= spawnInterval) {
        // Generate a random X position, ensuring the item is within canvas bounds
        const maxX = global.canvas.width - itemWidth;  // Maximum possible X value
        const randomX = Math.floor(Math.random() * maxX);  // Random X position within valid range

        // Create a new item at the random position
        new BlockObject(randomX + 20, 0, itemWidth, itemWidth); // Spawns item at random X
        lastSpawnTime = totalRunningTime; // Update the last spawn time
    }
}

// Function to update the display (lives and score)
function updateDisplay() {
    // Set font and text style for displaying score and lives
    global.ctx.font = "25px VT323";
    global.ctx.fillStyle = "white";
    global.ctx.textAlign = "left"; // Align text to the left

    // Display lives and score on the canvas
    global.ctx.fillText(`Lives: ${global.lives}`, 10, 30); // Text at 10px from the left, 30px from the top
    global.ctx.fillText(`Score: ${global.score}`, 10, 60); // Text at 10px from the left, 60px from the top

    // Check for game-over conditions
    if (global.lives === 0 || global.score < 0) {
        global.gameOver = true;
    }
}

// Function to reset the game state
function resetGame() {
    // Reset global state
    global.lives = 3; // Reset lives
    global.score = 0; // Reset score
    global.gameOver = false;
    global.allGameObjects = []; // Clear game objects

    // Reinitialize player and other objects
    setupGame();

    // Start the game loop again
    requestAnimationFrame(gameLoop);
}

// Function to create the Game Over screen and Play Again button
function createGameOverScreen() {
    
    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    playAgainButton.id = "playAgainButton";
    document.body.appendChild(playAgainButton);

    // Attach event listener to restart the game
    playAgainButton.addEventListener("click", () => {
        // Remove the button
        playAgainButton.remove();

        // Reset and restart the game
        resetGame();
    });
}

// Function to create the Start Screen with title and "Start Game" button
function createStartScreen() {
    // Clear the canvas first
    const backgroundImage = new Image(); // Create a new image object
    backgroundImage.src = "./images/title-screen.png"; // Set the path to your PNG file

    backgroundImage.onload = function () {
        // Clear the canvas first
     global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

        // Draw the background image
    global.ctx.drawImage(backgroundImage, 0, 0, global.canvas.width, global.canvas.height);

    // Display the title
    global.ctx.font = "100px VT323";
    global.ctx.fillStyle = "white";
    global.ctx.textAlign = "center";
    global.ctx.fillText("Paws Up !", global.canvas.width / 2, global.canvas.height / 2 -50); // Centered title

    // Create Start Game button
    const startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.id = "startButton";
    document.body.appendChild(startButton);

    // Attach event listener to start the game when clicked
    startButton.addEventListener("click", () => {
        // Remove the Start Game button
        startButton.remove();

        // Start the game
        setupGame();
        requestAnimationFrame(gameLoop); // Start the game loop
    });
    }
}

// Main game loop function
function gameLoop(totalRunningTime) {
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime"

    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Clear the canvas

    if (global.gameOver === true) {
        console.log("Game Over");

        // Display Game Over message
        global.ctx.font = "100px VT323";
        global.ctx.textAlign = "center";
        global.ctx.fillText("Game Over !", global.canvas.width / 2, global.canvas.height / 2 -50);

        // Create the "Play Again" button if it doesn't exist already
        if (!document.getElementById("playAgainButton")) {
            createGameOverScreen();
        }
    } else {
        // Spawn items periodically
        spawnItems(totalRunningTime);

        // Update and draw all active game objects
        for (let i = 0; i < global.allGameObjects.length; i++) {
            if (global.allGameObjects[i].active === true) {
                global.allGameObjects[i].storePrevPos();
                global.allGameObjects[i].update();
                global.checkCollisionWithAnyOther(global.allGameObjects[i]);
                global.allGameObjects[i].draw();
            }
        }
        // Update the display of lives and score
        updateDisplay();
    }

    requestAnimationFrame(gameLoop); // Keep the game loop running indefinitely
}

// Function to initialize the game state (called when starting or restarting the game)
function setupGame() {
    global.playerObject = new Skeleton(0, 430, 64, 64); // Initialize the player object
    new Floor(0, 400, 9000, 30); // Initialize the floor

    // Other setup logic can go here (add more objects as needed)
}

// Start by creating the Start Screen
window.onload = function() {
    createStartScreen(); // Show the start screen when the page is loaded
};
