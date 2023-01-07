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
        const date = new Intl.DateTimeFormat(navigator.language, {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        });

        let newDate = new Date();
        this.digitalClock.innerText = date.format(newDate);

        setInterval(() => {
            newDate = new Date();

            this.digitalClock.innerText = date.format(newDate);
        }, 1000);
    };
}
