import css from "./TimerComponent.scss";
import html from "./TimerComponent.html?raw";
import audio from "../../../assets/mp3/timer.mp3"

export class TimerComponent extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        // Import style
        const style = document.createElement("style");
        style.textContent = css;
        shadow.appendChild(style);

        this.audio = audio

        this.inputs = shadow.getElementById("inputs");
        this.display = shadow.getElementById("display");

        this.hoursInput = shadow.getElementById("hours");
        this.minutesInput = shadow.getElementById("minutes");
        this.secondsInput = shadow.getElementById("seconds");

        this.isLaunched = false;
        this.actionButton = shadow.getElementById("action-button");

        this.time = 0;
        this.interval = null;

        this.actionButton.addEventListener("click", () => {
            this.isLaunched ? this.resetTimer() : this.startTimer();
        });
    }

    startTimer = () => {
        this.isLaunched = true;
        this.actionButton.textContent = "STOP";

        //Add a 0 before the value if it less than 10
        const hours = parseInt(
            this.hoursInput.value ?? 0
        );
        const minutes = parseInt(
            this.minutesInput.value ?? 0
        );
        const seconds = parseInt(
            this.secondsInput.value ?? 0
        );
        this.time = hours * 3600 + minutes * 60 + seconds;

        // if countdown equal 0, then don't do anything
        if (this.time <= 0) return;

        this.inputs.style.display = "none";
        this.display.style.display = "block";

        let countdown = this.getTime(this.time);
        this.display.textContent = countdown;
        this.time -= 1;

        this.interval = setInterval(() => {
            countdown = this.getTime(this.time);
            this.display.textContent = countdown;

            if (this.time === 0) {
                const audio = new Audio(this.audio);
                audio.play();

                this.resetTimer();
            }

            this.time--;
        }, 1000);
    };

    // Return the total of seconds in HH:MM:SS format
    getTime = (seconds) => {
        const date = new Date(Date.UTC(0, 0, 0, 0, 0, seconds, 0));
        const completeDate = `${String(date.getUTCHours()).padStart(2, "0")}:${String(
            date.getUTCMinutes()
        ).padStart(2, "0")}:${String(date.getUTCSeconds()).padStart(2, "0")}`;

        return completeDate;
    };

    resetTimer = () => {
        this.isLaunched = false;
        this.actionButton.textContent = "START";

        clearInterval(this.interval);
        this.time = 0;

        this.inputs.style.display = "block";
        this.display.style.display = "none";
    };
}
