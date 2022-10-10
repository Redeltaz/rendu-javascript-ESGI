import css from "./Container.scss";
import html from "./Container.html?raw";

export class Container extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM
        let shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        // Import style
        const style = document.createElement("style");
        style.textContent = css;
        shadow.appendChild(style);
    }
}
