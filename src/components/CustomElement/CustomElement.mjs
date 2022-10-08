import css from "./CustomElement.css";
import html from "./CustomElement.html?raw";

export class CustomElement extends HTMLElement {
    constructor() {
        super();

        const content = this.innerHTML;

        // Create a shadow DOM
        let shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        const style = document.createElement("style");
        style.textContent = css;

        shadow.appendChild(style);

        const button = shadow.getElementById("click-me");
        button.innerHTML = content;
        button.addEventListener("click", this.handleClick);
    }

    handleClick = () => {
        window.location = this.getAttribute("app");
    };
}
