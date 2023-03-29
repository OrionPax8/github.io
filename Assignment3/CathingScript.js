"use strict"

// Script for running the cathcing game

// Initialize values
let score = 0;
let delay = 2000;
let myGame = setInterval(dummyFunction, 10000); // This needs to call a function so I created one that does nothing

// Select the game object
let gameObject = document.getElementById("gameObject");

// Select score display
let scoreBox = document.getElementById("score");

window.addEventListener("load",startGame)

function startGame() {
    // Start the game once loaded
    console.log("Game started");

    gameObject.onclick = catchObject;
    myGame = setInterval(moveObject, delay);
}

function moveObject() {
    // Randomize a new position for the object
    let newTop = Math.floor(Math.random() * 381);
    let newLeft = Math.floor(Math.random() * 881);

    // Move object to new position
    gameObject.style.left = newLeft + "px";
    gameObject.style.top = newTop + "px";

    // Display object if user scored
    gameObject.style.display = 'block';
}

function catchObject() {

    // Increment and update score
    score += 1;
    updateScore();

    delay -= 100;
    clearInterval(myGame);
    myGame = setInterval(moveObject, delay);

    // Hide object and disable scoring temporarily

    gameObject.style.display = "none";
} 

function updateScore(){


    // Change score display
    scoreBox.value = score;
}

// Add the reset buttons

let resetScoreButton = document.getElementById("resetScore");
let resetSpeedButton = document.getElementById("resetSpeed");

resetScoreButton.addEventListener("click",  function() {
    // Reset and update score
    score = 0;
    updateScore(); 
});

resetSpeedButton.addEventListener("click", function() {
    // Reset and update speed
    delay = 2000;
    clearInterval(myGame);
    myGame = setInterval(moveObject, delay);
});

function dummyFunction() {
    // This is intentionally empty
}