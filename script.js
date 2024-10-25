// Timer

window.onload = function setTimeFunction() {
    document.getElementById("custom-time").value = 10;
    consoleWidth = 340;
    document.getElementById("console").style.width = `${consoleWidth}px`;
    document.getElementById("gameArea").style.visibility = "hidden";

    //    const c = document.getElementById("aim");
    // const ctx = c.getContext("2d");
    // ctx.beginPath();
    // ctx.arc(50, 50, 50, 0, 1 * Math.PI);
    // ctx.stroke();

    document.getElementById("mouseTarget").style.visibility = "hidden";
}

let time = 10, score = 0, highscore = 0, count = 0, gameX = 0

let playing = false;

document.getElementById("custom-time").addEventListener("change", () => {
    time = document.getElementById("custom-time").value;
});

document.getElementById("start").addEventListener("click", () => {
    playing = true;
    validatingOS();
});

function startListenerAfterLoading() {
    document.getElementById("gameStatus").innerText = "STATUS:  MISSION ONGOING";

    gameArea();

    let remaining = time;
    document.getElementById("timer").innerText = `TIMER: ${remaining}`;
    document.getElementById("score").innerText = `SCORE: ${score}`;
    let timer = setInterval(function () {
        if (remaining > 0) {
            spawnTarget();
            document.getElementById("timer").innerText = `TIMER: ${--remaining}`;
        } else {
            document.body.style.backgroundColor = "rgb(255,255,255)"
            clearInterval(timer);
            removeTarget();
            document.getElementById("gameStatus").innerText = "STATUS:  CLICK START TO RESTART";
            if (score >= highscore) {
                highscore = score;
                document.getElementById("highscore").innerText = `HIGHSCORE: ${highscore}`;
            }
            score = 0, count = 0;
            document.getElementById("gameArea").style.visibility = "hidden";
            document.getElementById("mouseTarget").style.visibility = "hidden";
        }
    }, 1000);

}

function gameArea() {
    document.getElementById("gameArea").style.visibility = "visible";
    document.getElementById("mouseTarget").style.visibility = "visible";
    limiter = Math.min(window.innerWidth - consoleWidth - 70, window.innerHeight);
    gameX = limiter * 0.9;
    const gameArea = document.getElementById("gameArea");
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


function spawnTarget() {
    removeTarget();
    const target = document.createElement("button");


    target.id = "target"
    resetTarget();
    target.style.position = "absolute";
    target.style.left = `${leftTarget}%`;
    target.style.top = `${topTarget}%`;
    target.style.backgroundColor = color;
    document.getElementById("gameArea").appendChild(target);

    target.addEventListener("click", () => {
        splatter();
        document.getElementById("target").remove();
        document.getElementById("score").innerText = `SCORE: ${++score}`;
        document.getElementById("accuracy").innerText = `Accuracy: ${score}/${++count} - ${Math.round(score / count * 100)}%`
    })
}

function removeTarget() {
    if (!!document.getElementById("target")) {
        document.getElementById("target").remove();
        document.getElementById("accuracy").innerText = `ACCURACY: ${score}/${++count} - ${Math.round(score / count * 100)}%`;
    }
}

function splatter() {
    let splatterTimer = Math.random() * 4 + 2;
    let splatNumber = Math.ceil(Math.random() * 5) + 2;

    let dotList = [];
    let splatMag = [];
    let splatDir = [];

    for (let i = 0; i < splatNumber; i++) {

        dotList[i] = document.createElement("div");
        dotList[i].style.position = "absolute";
        dotList[i].style.left = `${leftTarget - ((document.getElementById("target").style.width * 100) / (2 * window.innerWidth))}vw`;
        dotList[i].style.top = `${leftTarget - ((document.getElementById("target").style.width * 100) / (2 * window.innerHeight))}vh`;

        document.getElementById("gameArea").appendChild(dotList[i]);

        splatMag[i] = Math.random() * 2;
        splatDir[i] = Math.random() * 2 * Math.PI;

        dotList[i].style.backgroundColor = "red";
        dotList[i].style.height = "30px";
        dotList[i].style.width = "30px";
        dotList[i].style.borderRadius = "50%";
    }

    let elapsed = 0;

    let leftSaved = leftTarget - ((document.getElementById("target").style.width * 100) / (2 * window.innerWidth));
    let topSaved = topTarget - ((document.getElementById("target").style.height * 100) / (2 * window.innerHeight));
    let opacityValue = 1;
    let elapsedInterval = 50;

    let splatTimer = setInterval(function () {
        elapsed += elapsedInterval;

        if (splatterTimer * 1000 > elapsed) {
            for (let i = 0; i < splatNumber; i++) {


                //let leftSaved = dotList[i].style.left;
                //let topSaved = dotList[i].style.top;
                dotList[i].style.left = `${leftSaved + ((elapsed / 30) * splatMag[i] * Math.cos(splatDir[i]))}%`;
                dotList[i].style.top = `${topSaved + ((elapsed / 30) * splatMag[i] * Math.sin(splatDir[i]))}%`;
                dotList[i].style.opacity = `${opacityValue}`;

            }
            opacityValue -= 1 / ((splatterTimer * 1000) / elapsedInterval);
        }
        else {

            for (let i = 0; i < splatNumber; i++) {
                document.getElementById("gameArea").removeChild(dotList[i]);
            }

            clearInterval(splatTimer);
        }

    }, 50);
}

function validatingOS() {
    let symbols = ["|", "/", "-", "\\", "|", "/", "-", "\\", "|", "|"];
    let i = 0;
    let OSTimer = setInterval(function () {
        document.getElementById("gameStatus").innerText = "Validating OS  " + symbols[i];
        i++;
        if (i > symbols.length) {
            clearInterval(OSTimer);
            eatingBanana();
        }
    }, 200);
}

function eatingBanana() {


    let progress = 0;
    let bananaTimer = setInterval(function () {
        document.getElementById("gameStatus").innerText = "EATING A BANANA  " + progress + "%";
        progress++;
        if (progress > 100) {
            clearInterval(bananaTimer);
            startListenerAfterLoading()
        }
    }, 20);

}

const mouseTarg = document.getElementById("mouseTarget");

window.addEventListener('mousemove', (event) => {
    mouseTarg.style.left = `${event.clientX - 50}px`;
    mouseTarg.style.top = `${event.clientY - 50}px`;
})

window.addEventListener('mousedown', (event) => {
    document.getElementById("horizLine1").style.color = "red";
    document.getElementById("vertLine1").style.color = "red";
    document.getElementById("horizLine2").style.color = "red";
    document.getElementById("vertLine2").style.color = "red";
})

window.addEventListener('mouseout', (event) => {
    document.getElementById("horizLine1").style.color = "rgb(30, 226, 53)";
    document.getElementById("vertLine1").style.color = "rgb(30, 226, 53)";
    document.getElementById("horizLine2").style.color = "rgb(30, 226, 53)";
    document.getElementById("vertLine2").style.color = "rgb(30, 226, 53)";
})



