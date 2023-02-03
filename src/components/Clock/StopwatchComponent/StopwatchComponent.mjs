import css from "./StopwatchComponent.scss";
import html from "./StopwatchComponent.html?raw";

export class StopwatchComponent extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        // Import style
        const style = document.createElement("style");
        style.textContent = css;
        shadow.appendChild(style);

        this.timerDisplay = shadow.getElementById("stopwatch-timer");
        this.lapTimer = shadow.getElementById("lap-timer");

        this.lapList = shadow.getElementById("lap-list");
        this.resetButton = shadow.getElementById("reset-stopwatch");
        this.startButton = shadow.getElementById("start-stopwatch");
        this.lapButton = shadow.getElementById("lap-stopwatch");

        this.isStarted = false;
        this.isPaused = false;
        this.time = 0;
        this.timer = null;
        this.timerLaps = [];

        //listeners
        this.startButton.addEventListener("click", () => {
            if (this.isStarted) {
                this.isPaused ? this.resumeTimer() : this.pauseTimer();
            } else {
                this.isStarted = true;
                this.time = 0;
                this.timerLaps.push(0);
                this.startTimer();
            }
        });

        this.resetButton.addEventListener("click", () => this.resetTimer());

        this.lapButton.addEventListener("click", () => this.isStarted && this.addLap());
    }

    addLap() {
        const lapSpan = document.createElement("span");
        lapSpan.textContent = String(this.timerLaps.length).padStart(2, "0");
        const spanContent = document.createElement("span");
        spanContent.textContent = this.getTime(this.time);
        const spanDiff = document.createElement("span");
        spanDiff.textContent = "+" + this.getTime(this.time - this.timerLaps.at(-1));
        const newLapFull = document.createElement("li");
        newLapFull.classList.add("laps");
        newLapFull.appendChild(lapSpan);
        newLapFull.appendChild(spanContent);
        newLapFull.appendChild(spanDiff);
        this.lapList.prepend(newLapFull);
        this.timerLaps.push(this.time);
    }

    getTime = (ms) => {
        const date = new Date(Date.UTC(0, 0, 0, 0, 0, 0, ms));
        const completeDate = `${String(date.getUTCMinutes()).padStart(2, "0")}:${String(
            date.getUTCSeconds()
        ).padStart(2, "0")}.${String(date.getUTCMilliseconds() / 10).padStart(2, "0")}`;

        return completeDate;
    };

    startTimer = () => {
        this.startButton.textContent = "STOP";

        this.timer = setInterval(() => {
            this.timerDisplay.textContent = this.getTime(this.time);
            this.lapTimer.textContent = this.getTime(this.time - this.timerLaps.at(-1));
            this.time += 10;
        }, 10);
    };

    pauseTimer = () => {
        this.startButton.textContent = "START";

        this.isPaused = true;
        clearInterval(this.timer);
        this.timer = null;
    };

    resumeTimer = () => {
        this.isPaused = false;
        this.startTimer();
    };

    resetTimer() {
        this.isPaused = false;
        if (this.isStarted) {
            this.isStarted = false;
            clearInterval(this.timer);
        }
        this.time = 0;
        this.timerLaps = [];
        this.lapList.innerHTML = "";
        this.timerDisplay.textContent = this.getTime(0);
        this.lapTimer.textContent = this.getTime(0);
        this.startButton.textContent = "START";
    }
}
