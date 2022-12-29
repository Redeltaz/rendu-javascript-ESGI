import css from "./SettingsToggle.css";
import html from "./SettingsToggle.html?raw";
import Config from "./Configuration.mjs"

export class SettingsToggle extends HTMLElement {
    constructor() {
        super();

        this.option = this.innerHTML;

        // Create a shadow DOM
        let shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        const style = document.createElement("style");
        style.textContent = css;

        shadow.appendChild(style);

        this.button = shadow.getElementById("click-me");
        this.button.innerHTML = `${this.option} = ${Config[this.option]}`;
        this.button.addEventListener("click", this.handleClick);
    }

    handleClick = () => {
        const currentValue = Config[this.option]
        if (typeof currentValue === "boolean") {
            Config[this.option] = !currentValue
            this.button.innerHTML = `${this.option} = ${!currentValue}`;
        }
    };
}
