// A coupel things to run beforehand

window.onload = function setTimeFunction() 
    //Set the custom time initially - you can change it late
    document.getElementById("custom-time").value = 10;

    //Give a wisth to the console
    consoleWidth = 340;
    document.getElementById("console").style.width = `${consoleWidth}px`;

    //Make the game area invisable
    document.getElementById("gameArea").style.visibility = "hidden";

    //    const c = document.getElementById("aim");
    // const ctx = c.getContext("2d");
    // ctx.beginPath();
    // ctx.arc(50, 50, 50, 0, 1 * Math.PI);
    // ctx.stroke();


    //Make the target icon invisable

    document.getElementById("mouseTarget").style.visibility = "hidden";
}

//A couple values to set at the begining
let time = 10, score = 0, highscore = 0, count = 0, gameX = 0

//Well it's not playing at the begining anyways - is it?
let playing = false;

//Change the custom time value if the custom time is changed
document.getElementById("custom-time").addEventListener("change", () => {
    time = document.getElementById("custom-time").value;
});

//start the game if the start button is pressed
document.getElementById("start").addEventListener("click", () => {
    //Then it is playing
    playing = true;

    //go to the validating OS function, it will point to other functions to complete the starting sequence.
    validatingOS();
});


//What to do when the game starts
function startListenerAfterLoading() {
    
    document.getElementById("gameStatus").innerText = "STATUS:  MISSION ONGOING";

    //Set the Game Area
    gameArea();

    //Time function
    let remaining = time;
    //Get values for the 
    document.getElementById("timer").innerText = `TIMER: ${remaining}`;
    document.getElementById("score").innerText = `SCORE: ${score}`;
    let timer = setInterval(function () {
        if (remaining > 0) {
            //Spawn a target if there is more time
            spawnTarget();
            
            //Increase the score
            document.getElementById("timer").innerText = `TIMER: ${--remaining}`;
        } else {
            //When out of time stop the timer
            clearInterval(timer);
            removeTarget();

            //Change the STATUS element and update the highscore if score is a new highscore
            document.getElementById("gameStatus").innerText = "STATUS:  CLICK START TO RESTART";
            if (score >= highscore) {
                highscore = score;
                document.getElementById("highscore").innerText = `HIGHSCORE: ${highscore}`;
            }

            //Reset the values and make the game pieces (the game area and the target visual) disapear.
            score = 0, count = 0;
            document.getElementById("gameArea").style.visibility = "hidden";
            document.getElementById("mouseTarget").style.visibility = "hidden";
        }
    }, 1000);

}

//Define the game area to play within and spawn targets within
//This is rerun every time the game is generated so if the widow changes the game area can change correspondingly
function gameArea() {
    document.getElementById("gameArea").style.visibility = "visible";
    document.getElementById("mouseTarget").style.visibility = "visible";
    
    //is the height or width smaller
    limiter = Math.min(window.innerWidth - consoleWidth - 70, window.innerHeight);
    //Decrease the game's size a little for some extra space
    gameX = limiter * 0.9;
    const gameArea = document.getElementById("gameArea");

    //Set the values of the game area 
    gameArea.style.width = `${gameX}px`;
    gameArea.style.height = `${gameX}px`;
    gameArea.style.position = "absolute"
    gameArea.style.left = `${consoleWidth * 1.2}px`;
    gameArea.style.top = "10px"
}

// spawn targets

let color = ""

document.getElementById("custom-color").addEventListener("change", () => {
    color = document.getElementById("custom-color").value;
});

let leftTarget;
let topTarget

function resetTarget() {

    //Setting location, ofsetting for the fact that the point that the target moves on is the corner
    leftTarget = Math.random() * 90;
    topTarget = Math.random() * 90;
}

//Creats the target
function spawnTarget() {
    removeTarget();
    const target = document.createElement("button");


    target.id = "target"
    resetTarget();
    //Give some positions
    target.style.position = "absolute";
    target.style.left = `${leftTarget}%`;
    target.style.top = `${topTarget}%`;
    target.style.backgroundColor = color;
    document.getElementById("gameArea").appendChild(target);

    //Function to remove a target
    target.addEventListener("click", () => {
        //Creat a particle system
        splatter();
        document.getElementById("target").remove();
        document.getElementById("score").innerText = `SCORE: ${++score}`;
        document.getElementById("accuracy").innerText = `Accuracy: ${score}/${++count} - ${Math.round(score / count * 100)}%`
    })
}

//Removes the target
function removeTarget() {
    //If there is a target
    if (!!document.getElementById("target")) {
        //Get rid of the target and update the score values
        document.getElementById("target").remove();
        document.getElementById("accuracy").innerText = `ACCURACY: ${score}/${++count} - ${Math.round(score / count * 100)}%`;
    }
}


//The function below creats the particle system

function splatter() {
    let splatterTimer = Math.random() * 4 + 2;
    let splatNumber = Math.ceil(Math.random() * 5) + 2;

    //Creating some arrays
    let dotList = [];
    let splatMag = [];
    let splatDir = [];

    for (let i = 0; i < splatNumber; i++) {

        //Creats a bunch of particles and gives them some style
        dotList[i] = document.createElement("div");
        dotList[i].style.position = "absolute";
        dotList[i].style.left = `${leftTarget - ((document.getElementById("target").style.width * 100) / (2 * window.innerWidth))}vw`;
        dotList[i].style.top = `${leftTarget - ((document.getElementById("target").style.width * 100) / (2 * window.innerHeight))}vh`;
        dotList[i].style.backgroundColor = "red";
        dotList[i].style.height = "30px";
        dotList[i].style.width = "30px";
        dotList[i].style.borderRadius = "50%";
        
        document.getElementById("gameArea").appendChild(dotList[i]);

        //Setting the random directions and magnitudes of the vectors descriping the particles positions.
        splatMag[i] = Math.random() * 2;
        splatDir[i] = Math.random() * 2 * Math.PI;

        
    }

    let elapsed = 0;

    //Saving some values before a new target is created
    let leftSaved = leftTarget - ((document.getElementById("target").style.width * 100) / (2 * window.innerWidth));
    let topSaved = topTarget - ((document.getElementById("target").style.height * 100) / (2 * window.innerHeight));
    let opacityValue = 1;
    let elapsedInterval = 50;

    let splatTimer = setInterval(function () {
        //Timer to move the particles
        elapsed += elapsedInterval;

        if (splatterTimer * 1000 > elapsed) {
            for (let i = 0; i < splatNumber; i++) {


                //let leftSaved = dotList[i].style.left;
                //let topSaved = dotList[i].style.top;

                //This moves each object depending on how much time has elapsed. It divides a vector in to x and y componants and multiplies them by a magnitude and the time that has passed.
                dotList[i].style.left = `${leftSaved + ((elapsed / 30) * splatMag[i] * Math.cos(splatDir[i]))}%`;
                dotList[i].style.top = `${topSaved + ((elapsed / 30) * splatMag[i] * Math.sin(splatDir[i]))}%`;

                //Changing the oppacity as well for a neat visual effect
                dotList[i].style.opacity = `${opacityValue}`;

            }
            opacityValue -= 1 / ((splatterTimer * 1000) / elapsedInterval);
        }
        else {
            
            //When the timer is done remove all the elements
            for (let i = 0; i < splatNumber; i++) {
                document.getElementById("gameArea").removeChild(dotList[i]);
            }

            clearInterval(splatTimer);
        }

    }, 50);
}


//Validating the OS function

function validatingOS() {
    //Array of loading symbols two times
    let symbols = ["|", "/", "-", "\\", "|", "/", "-", "\\", "|", "|"];
    let i = 0;
    let OSTimer = setInterval(function () {
        //Going through each symbol each run of this timer
        document.getElementById("gameStatus").innerText = "Validating OS  " + symbols[i];
        i++;

        //If have exhausted the array
        if (i > symbols.length) {
            clearInterval(OSTimer);

            //Then runs the eating Banana function
            
            eatingBanana();
        }
    }, 200);
}

//This function tuns the eating of the Banana piece

function eatingBanana() {


    let progress = 0;
    let bananaTimer = setInterval(function () {
        //Write "eating a banana" and a percentage
        document.getElementById("gameStatus").innerText = "EATING A BANANA  " + progress + "%";
        progress++;

        //If the percentage is greater than 100, then stop the timer
        if (progress > 100) {
            clearInterval(bananaTimer);

            //Then runs the remainder of the starting of the game function
            
            startListenerAfterLoading()
        }
    }, 20);

}

const mouseTarg = document.getElementById("mouseTarget");


//The below functions are for the target visual around the mouse

//follow the mouse
window.addEventListener('mousemove', (event) => {
    mouseTarg.style.left = `${event.clientX - 50}px`;
    mouseTarg.style.top = `${event.clientY - 50}px`;
})

//When clicked turn red
window.addEventListener('mousedown', (event) => {
    document.getElementById("horizLine1").style.color = "red";
    document.getElementById("vertLine1").style.color = "red";
    document.getElementById("horizLine2").style.color = "red";
    document.getElementById("vertLine2").style.color = "red";
})

//When released turn green
window.addEventListener('mouseout', (event) => {
    document.getElementById("horizLine1").style.color = "rgb(30, 226, 53)";
    document.getElementById("vertLine1").style.color = "rgb(30, 226, 53)";
    document.getElementById("horizLine2").style.color = "rgb(30, 226, 53)";
    document.getElementById("vertLine2").style.color = "rgb(30, 226, 53)";
})



