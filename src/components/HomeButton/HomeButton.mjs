import css from "./HomeButton.scss";
import html from "./HomeButton.html?raw";

export class HomeButton extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        // Import style
        const style = document.createElement("style");
        style.textContent = css;
        shadow.appendChild(style);

        // Handle click
        this.addEventListener("click", this.handleClick);
    }

    handleClick = () => {
        window.location = "";
    };
}
