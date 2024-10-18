// Timer

let time = 0;

document.getElementById("submit-time").addEventListener("click", () => {
    time = document.getElementById("custom-time").value;
});

let score = 0;

document.getElementById("start").addEventListener("click", () => {
    document.getElementById("start").innerText = "GAME ONGOING";

    let remaining = time;
    document.getElementById("timer").innerText = `Timer: ${remaining}`;
    document.getElementById("score").innerText = `Score: ${score}`;
    let timer = setInterval(function () {
        if (remaining > 0) {
            remaining--;
            document.getElementById("timer").innerText = `Timer: ${remaining}`;
            spawnTarget();
        } else {
            clearInterval(timer);
            document.getElementById("start").innerText = "RESTART";
        }
    }, 1000);

});

// spawn targets

function spawnTarget() {
    if (!!document.getElementById("target")) document.getElementById("target").remove();
    const target = document.createElement("button");
    target.style.height = "100px"
    target.style.width = "100px"
    target.style.position = "absolute";
    target.style.left = `${Math.random() * 80 + 10}vw`;
    target.style.top = `${Math.random() * 80 + 10}vh`;
    target.id = "target"
    document.body.appendChild(target);
    target.addEventListener("click", () => {
        document.getElementById("target").remove();
        score++;
        document.getElementById("score").innerText = `Score: ${score}`;
    })

}