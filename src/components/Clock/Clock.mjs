import css from "./Clock.scss";
import html from "./Clock.html?raw";

export class Clock extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        // Import style
        const style = document.createElement("style");
        style.textContent = css;
        shadow.appendChild(style);

        this.clockPage = shadow.getElementById("clock-page");
        this.stopwatchPage = shadow.getElementById("stopwatch-page");
        this.timerPage = shadow.getElementById("timer-page");
        this.pageButtons = shadow.querySelectorAll(".clock-menu-button");

        this.pageButtons.forEach((button) => {
            const page = button.dataset.argument;
            button.addEventListener("click", () => this.changePage(page));
        });
    }

    changePage = (pageName) => {
        this.clockPage.style.display = "none";
        this.stopwatchPage.style.display = "none";
        this.timerPage.style.display = "none";

        switch (pageName) {
            case "clock":
                this.clockPage.style.display = "block";
                break;
            case "stopwatch":
                this.stopwatchPage.style.display = "block";
                break;
            case "timer":
                this.timerPage.style.display = "block";
                break;
            default:
                console.log("erreur");
        }
    };

    displayTime = () => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let dayTime = "AM";

        if (hours == 0) {
            hours = 12;
        }

        if (hours > 12) {
            hours = hours - 12;
            dayTime = "PM";
        }

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        let time = hours + ":" + minutes + ":" + seconds + " " + dayTime;
        this.digitalClock.innerText = time;
        this.digitalClock.textContent = time;

        setTimeout(this.displayTime, 1000);
    };
}
