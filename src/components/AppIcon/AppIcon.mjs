import css from "./AppIcon.scss";
import html from "./AppIcon.html?raw";
import calculatorIcon from "../../icons/calculator.svg?raw";
import gearIcon from "../../icons/gear.svg?raw";
import clockIcon from "../../icons/clock.svg?raw";

export class AppIcon extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM
        let shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        // Import style
        const style = document.createElement("style");
        style.textContent = css;
        shadow.appendChild(style);

        // Set icon
        const icons = {
            calculator: calculatorIcon,
            gear: gearIcon,
            clock: clockIcon,
        };

        const icon = this.getAttribute("icon");

        shadow.firstChild.innerHTML = icons[icon];

        // Handle click
        this.addEventListener("click", this.handleClick);
    }

    handleClick = () => {
        window.location = this.getAttribute("app");
    };
}
