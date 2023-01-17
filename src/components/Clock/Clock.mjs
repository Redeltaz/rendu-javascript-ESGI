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
            button.addEventListener("click", () => this.changePage(page, shadow));
        });
    }

    changePage = (pageName, shadow) => {
        this.clockPage.style.display = "none";
        this.stopwatchPage.style.display = "none";
        this.timerPage.style.display = "none";

        this[`${pageName}Page`].style.display = "block";

        [...shadow.querySelectorAll("[data-argument]")].map((button) => {
            button.classList.remove("active");
        });

        shadow.querySelector(`[data-argument='${pageName}']`).classList.add("active");
    };
}
