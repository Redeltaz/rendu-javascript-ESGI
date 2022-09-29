import css from "./CustomElement.css";
import html from "./CustomElement.html?raw";

export class CustomElement extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM
        let shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        const style = document.createElement("style");
        style.textContent = css;

        shadow.appendChild(style);

        shadow
            .getElementById("click-me")
            .addEventListener("click", this.handleClick);
    }

    handleClick() {
        alert("Hello World!");
    }
}
