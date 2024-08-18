let startTime = 0;
let updatedTime = 0;
let difference = 0;
let interval;
let isRunning = false;
let laps = [];
console.log("hello");

const startBtn = document.getElementById('startB');
const pauseBtn = document.getElementById('pauseB');
const resetBtn = document.getElementById('resetB');
const lapBtn = document.getElementById('lapB');

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');

function startTimer() {
    if (!isRunning) {
        startTime = new Date().getTime() - difference;
        interval = setInterval(updateDisplay, 10);
        isRunning = true;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(interval);
        difference = new Date().getTime() - startTime;
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(interval);
    startTime = 0;
    difference = 0;
    isRunning = false;
    laps = [];

    // Reset the display to 00:00:00
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';

    // Clear laps display
    renderLaps();
}

function lapTimer() {
    if (isRunning) {
        const lapTime = difference;
        laps.push(lapTime);
        renderLaps();
    }
}

function updateDisplay() {
    difference = new Date().getTime() - startTime;

    const minutes = Math.floor(difference / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
    millisecondsDisplay.textContent = milliseconds < 10 ? '0' + milliseconds : milliseconds;
}

function renderLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        const minutes = Math.floor(lap / 60000);
        const seconds = Math.floor((lap % 60000) / 1000);
        const milliseconds = Math.floor((lap % 1000) / 10);

        li.textContent = `Lap ${index + 1}: ${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}:${milliseconds < 10 ? '0' + milliseconds : milliseconds}`;
        lapsList.appendChild(li);
    });
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);

