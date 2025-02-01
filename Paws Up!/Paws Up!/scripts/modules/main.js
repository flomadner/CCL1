import { global } from "./global.js";
import { Skeleton } from "../gameObjects/skeleton.js";
import { BlockObject } from "../gameObjects/blockObject.js";
import { Floor } from "../gameObjects/floor.js";
const backgroundImage = new Image();
let lastSpawnTime = 0;

// Define the main game background image
const mainBackgroundImage = new Image();
mainBackgroundImage.src = "./images/main-screen.png"; // Path to main-screen.png

// Function to draw the main game background
function drawMainGameBackground() {
    if (mainBackgroundImage.complete) { // Ensure the image is loaded
        global.ctx.drawImage(mainBackgroundImage, 0, 0, global.canvas.width, global.canvas.height);
    }
}

const gameOverImage = new Image();
gameOverImage.src = "./images/gameover-image.png";

function drawGameOverImage() {
    if(gameOverImage.complete) {
        global.ctx.drawImage(gameOverImage, 0, 0, global.canvas.width, global.canvas.height);
    }
}

// Function to spawn items at random positions
function spawnItems(totalRunningTime) {
    const spawnInterval = 1500; // Spawn an item every 3 seconds
    const itemWidth = 50;  // Width of the spawned item (adjust as necessary)

    if (totalRunningTime - lastSpawnTime >= spawnInterval) {
        // Generate a random X position, ensuring the item is within canvas bounds
        const maxX = global.canvas.width - itemWidth;  // Maximum possible X value
        const randomX = Math.floor(Math.random() * maxX);  // Random X position within valid range

        // Create a new item at the random position
        new BlockObject(randomX + 10, 0, itemWidth, itemWidth); // Spawns item at random X
        lastSpawnTime = totalRunningTime; // Update the last spawn time
    }
}

const globalLivesImage = new Image();
globalLivesImage.src = "./images/heart.png";
// Function to update the display (lives and score)
function updateDisplay() {
    // Set font and text style for displaying score and lives
    global.ctx.font = "25px VT323";
    global.ctx.fillStyle = "white";
    global.ctx.textAlign = "left"; // Align text to the left

    // Display lives and score on the canvas
   // Draw lives as images instead of text
   for (let i = 0; i < global.lives; i++) {
    global.ctx.drawImage(globalLivesImage, 10 + i * 40, 10, 30, 30); // Adjust spacing as needed
    }
    
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
     // Create a new image object
    backgroundImage.src = "./images/title-screen.png"; // Set the path to your PNG file

    backgroundImage.onload = function () {
        // Clear the canvas first
        global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

        // Draw the background image
        
        // Create Start Game button
        const startButton = document.createElement("button");
        startButton.textContent = "Start Game";
        startButton.id = "startButton";
        document.body.appendChild(startButton);

        // Attach event listener to start the game when clicked
        startButton.addEventListener("click", () => { 
            global.startGame = true;
            // Remove the Start Game button
            startButton.remove();

            // Start the game
            setupGame();
             // Start the game loop
        });
    };
}

// Main game loop function
function gameLoop(totalRunningTime) {
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime"

    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Clear the canvas
    
    if (global.gameOver === true) {
        console.log("Game Over");
        drawGameOverImage();
        global.gameOverSprite.draw();
        
        // Display Game Over message
        global.ctx.font = "100px VT323";
        global.ctx.textAlign = "center";
        global.ctx.fillText("Game Over !", global.canvas.width / 2, global.canvas.height / 2 - 50);

        // Create the "Play Again" button if it doesn't exist already
        if (!document.getElementById("playAgainButton")) {
            createGameOverScreen();
        }

    } else if (global.startGame === false) {
        global.ctx.drawImage(backgroundImage, 0, 0, global.canvas.width, global.canvas.height);
        global.startScreenSprite.draw();
        global.ctx.font = "100px VT323";
        global.ctx.fillStyle = "white";
        global.ctx.textAlign = "center";
        global.ctx.fillText("Paws Up !", global.canvas.width / 2, global.canvas.height / 2 - 50); // Centered title


    } else {
        // Draw the main game background
        drawMainGameBackground();

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
    global.playerObject = new Skeleton(0, 410, 100, 90); // Initialize the player object
    new Floor(0, 380, 9000, 30); // Initialize the floor

    
    // Other setup logic can go here (add more objects as needed)
}

// Start by creating the Start Screen
window.onload = function () {
    createStartScreen(); // Show the start screen when the page is loaded
};
requestAnimationFrame(gameLoop);
