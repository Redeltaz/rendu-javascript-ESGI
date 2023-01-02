import css from "./ClockComponent.scss";
import html from "./ClockComponent.html?raw";

export class ClockComponent extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        // Import style
        const style = document.createElement("style");
        style.textContent = css;
        shadow.appendChild(style);

        this.digitalClock = shadow.getElementById("clock");
        this.displayTime();
    }

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
