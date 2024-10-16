// Timer

document.getElementById("start").addEventListener("click", () => {
    document.getElementById("start").innerText = "GAME ONGOING";

    let remaining = parseInt(document.getElementById("timer").innerText);
    let timer = setInterval(function () {
        if (remaining > 0) {
            remaining--;
            document.getElementById("timer").innerText = remaining;
        } else {
            clearInterval(timer);
            document.getElementById("start").innerText = "GAME FINISHED";
        }

    }, 1000);

});