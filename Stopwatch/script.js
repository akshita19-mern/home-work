let hours = 0;
let minutes = 0;
let seconds = 0;

let timer = null;

const hrs = document.getElementById("hours");
const mins = document.getElementById("minutes");
const secs = document.getElementById("seconds");

function updateDisplay() {
    hrs.textContent = String(hours).padStart(2, "0");
    mins.textContent = String(minutes).padStart(2, "0");
    secs.textContent = String(seconds).padStart(2, "0");
}

function stopwatch() {
    seconds++;

    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    updateDisplay();
}

document.getElementById("start").addEventListener("click", () => {
    if (timer !== null) return;
    timer = setInterval(stopwatch, 1000);
});

document.getElementById("stop").addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(timer);
    timer = null;

    hours = 0;
    minutes = 0;
    seconds = 0;

    updateDisplay();
});

updateDisplay();