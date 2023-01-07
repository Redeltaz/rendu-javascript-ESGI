import css from "./TimerComponent.scss";
import html from "./TimerComponent.html?raw";

export class TimerComponent extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        // Import style
        const style = document.createElement("style");
        style.textContent = css;
        shadow.appendChild(style);

        this.inputs = shadow.getElementById("inputs");
        this.display = shadow.getElementById("display");

        this.hoursInput = shadow.getElementById("hours");
        this.minutesInput = shadow.getElementById("minutes");
        this.secondsInput = shadow.getElementById("seconds");

        this.startButton = shadow.getElementById("start-button");
        this.stopButton = shadow.getElementById("stop-button");

        this.time = 0;
        this.interval = null;

        this.startButton.addEventListener("click", () => this.startTimer());
        this.stopButton.addEventListener("click", () => this.resetTimer());
    }

    startTimer = () => {
        const hours = parseInt(this.hoursInput.value ? this.hoursInput.value : 0);
        const minutes = parseInt(this.minutesInput.value ? this.minutesInput.value : 0);
        const seconds = parseInt(this.secondsInput.value ? this.secondsInput.value : 0);
        this.time = hours * 3600 + minutes * 60 + seconds;

        // if countdown equal 0, then don't do anything
        if (!this.time) return;

        this.inputs.style.display = "none";
        this.display.style.display = "block";
        this.startButton.style.display = "none";
        this.stopButton.style.display = "block";

        let countdown = this.getTime(this.time);
        this.display.textContent = countdown;
        this.time -= 1;

        this.interval = setInterval(() => {
            countdown = this.getTime(this.time);
            this.display.textContent = countdown;

            if (this.time === 0) {
                this.resetTimer();
            }

            this.time -= 1;
        }, 1000);
    };

    // Return the total of seconds in HH:MM:SS format
    getTime = (s) => {
        const date = new Date(Date.UTC(0, 0, 0, 0, 0, s, 0));
        const completeDate = `${String(date.getUTCHours()).padStart(2, "0")}:${String(
            date.getUTCMinutes()
        ).padStart(2, "0")}:${String(date.getUTCSeconds()).padStart(2, "0")}`;

        return completeDate;
    };

    resetTimer = () => {
        clearInterval(this.interval);
        this.time = 0;

        this.inputs.style.display = "block";
        this.display.style.display = "none";
        this.stopButton.style.display = "none";
        this.startButton.style.display = "block";
    };
}
