// Timer

document.getElementById("start").addEventListener("click", () => {
    document.getElementById("start").innerText = "GAME ONGOING";

    let remaining = parseInt(document.getElementById("timer").innerText);
    let timer = setInterval(function () {
        if (remaining > 0) {
            remaining--;
            document.getElementById("timer").innerText = remaining;
            spawnTarget();
        } else {
            clearInterval(timer);
            document.getElementById("start").innerText = "GAME FINISHED";
        }

    }, 1000);

});

// spawn targets

function spawnTarget() {
    if(!! document.getElementById("target")) document.getElementById("target").remove();
    const target = document.createElement("button");
    target.style.height = "100px"
    target.style.width = "100px"
    target.style.position = "absolute";
    target.style.left = `${Math.random() * 80 + 10}vw`;
    target.style.top = `${Math.random() * 80 + 10}vh`;
    target.id = "target"
    document.body.appendChild(target);
}