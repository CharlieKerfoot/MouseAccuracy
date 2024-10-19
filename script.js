// Timer

let time = 0, score = 0, highscore = 0, count = 0;

document.getElementById("custom-time").addEventListener("change", () => {
    time = document.getElementById("custom-time").value;
});

document.getElementById("start").addEventListener("click", () => {
    document.getElementById("start").innerText = "GAME ONGOING";

    let remaining = time;
    document.getElementById("timer").innerText = `Timer: ${remaining}`;
    document.getElementById("score").innerText = `Score: ${score}`;
    let timer = setInterval(function () {
        if (remaining > 0) {
            spawnTarget();
            document.getElementById("timer").innerText = `Timer: ${--remaining}`;
        } else {
            clearInterval(timer);
            removeTarget();
            document.getElementById("start").innerText = "RESTART";
            if (score >= highscore) {
                highscore = score;
                document.getElementById("highscore").innerText = `Highscore: ${highscore}`;
            }
            score = 0, count = 0;
        }
    }, 1000);

});

// spawn targets

function spawnTarget() {
    removeTarget();
    const target = document.createElement("button");
    target.id = "target"
    target.style.left = `${Math.random() * 80 + 10}vw`;
    target.style.top = `${Math.random() * 80 + 10}vh`;
    document.body.appendChild(target);
    
    target.addEventListener("click", () => {
        document.getElementById("target").remove();
        document.getElementById("score").innerText = `Score: ${++score}`;
        document.getElementById("accuracy").innerText = `Accuracy: ${score}/${++count} - ${Math.round(score/count * 100)}%`
    })
}

function removeTarget() {
    if (!!document.getElementById("target")) {
        document.getElementById("target").remove();
        document.getElementById("accuracy").innerText = `Accuracy: ${score}/${++count} - ${Math.round(score/count * 100)}%`;
    }
}