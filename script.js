let mode = 'stopwatch';
let running = false;
let interval;
let hours = 0;
let minutes = 0;
let seconds = 0;
let totalSeconds = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const dialog = document.getElementById('dialog');
const setTimerBtn = document.getElementById('setTimerBtn');
const hoursDisplay = document.getElementById('hoursDisplay');
const minutesDisplay = document.getElementById('minutesDisplay');
const secondsDisplay = document.getElementById('secondsDisplay');
const modeStopwatch = document.getElementById('modeStopwatch');
const modeTimer = document.getElementById('modeTimer');

modeStopwatch.addEventListener('click', switchToStopwatch);
modeTimer.addEventListener('click', switchToTimer);
startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
display.addEventListener('click', openDialog);
setTimerBtn.addEventListener('click', setTimer);

function switchToStopwatch() {
    mode = 'stopwatch';
    reset();
    dialog.style.display = 'none';
}

function switchToTimer() {
    mode = 'timer';
    reset();
    dialog.style.display = 'block';
}

function start() {
    if (running) return;
    running = true;

    if (mode === 'stopwatch') {
        interval = setInterval(updateStopwatch, 1000);
    } else if (mode === 'timer') {
        interval = setInterval(updateTimer, 1000);
    }
}

function stop() {
    running = false;
    clearInterval(interval);
}

function reset() {
    running = false;
    clearInterval(interval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    totalSeconds = 0;
    display.textContent = '00:00:00';
}

function updateStopwatch() {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
    }
    display.textContent = formatTime(hours, minutes, seconds);
}

function updateTimer() {
    if (totalSeconds <= 0) {
        stop();
        return;
    }
    totalSeconds--;
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    display.textContent = formatTime(hrs, mins, secs);
}

function formatTime(hours, minutes, seconds) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}

function openDialog() {
    if (mode === 'timer') {
        dialog.style.display = 'block';
    }
}

function setTimer() {
    hours = parseInt(hoursDisplay.textContent);
    minutes = parseInt(minutesDisplay.textContent);
    seconds = parseInt(secondsDisplay.textContent);
    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    display.textContent = formatTime(hours, minutes, seconds);
    dialog.style.display = 'none';
}

document.addEventListener('dblclick', (event) => {
    const target = event.target;
    const interactiveElements = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'LABEL'];

    if (!interactiveElements.includes(target.tagName)) {
        toggleFullScreen();
    }
});

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

window.addEventListener('click', (event) => {
    if (event.target === dialog) {
        dialog.style.display = 'none';
    }
});
document.getElementById('hoursUp').addEventListener('click', () => {
    hours = (hours + 1) % 24;
    hoursDisplay.textContent = pad(hours);
});

document.getElementById('hoursDown').addEventListener('click', () => {
    hours = (hours - 1 + 24) % 24;
    hoursDisplay.textContent = pad(hours);
});

document.getElementById('minutesUp').addEventListener('click', () => {
    minutes = (minutes + 1) % 60;
    minutesDisplay.textContent = pad(minutes);
});

document.getElementById('minutesDown').addEventListener('click', () => {
    minutes = (minutes - 1 + 60) % 60;
    minutesDisplay.textContent = pad(minutes);
});

document.getElementById('secondsUp').addEventListener('click', () => {
    seconds = (seconds + 1) % 60;
    secondsDisplay.textContent = pad(seconds);
});

document.getElementById('secondsDown').addEventListener('click', () => {
    seconds = (seconds - 1 + 60) % 60;
    secondsDisplay.textContent = pad(seconds);
});


