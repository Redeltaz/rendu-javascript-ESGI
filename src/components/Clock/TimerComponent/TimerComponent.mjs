import css from "./TimerComponent.scss";
import html from "./TimerComponent.html?raw";

export class ClockComponent extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        // Import style
        const style = document.createElement("style");
        style.textContent = css;
        shadow.appendChild(style);

        this.digitalClock = shadow.getElementById("timer");
    }
}
