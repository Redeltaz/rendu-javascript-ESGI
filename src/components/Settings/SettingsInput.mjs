import css from "./SettingsToggle.css";
import html from "./SettingsInput.html?raw";
import Config from "./Configuration.mjs"

export class SettingsInput extends HTMLElement {
    constructor() {
        super();

        this.option = this.innerHTML;

        // Create a shadow DOM
        let shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        const style = document.createElement("style");
        style.textContent = css;

        shadow.appendChild(style);

        /**
         * @type {HTMLInputElement}
         */
        this.input = shadow.getElementById("click-me");
        this.input.value = Config[this.option];
        this.input.addEventListener("change", this.handleChange);
        this.input.type = this.getAttribute("type")
    }

    handleChange = () => {
        const currentValue = Config[this.option]
        if (typeof currentValue === "number" && typeof this.input.value === "string") {
            Config[this.option] = parseInt(this.input.value)
        } else if (typeof currentValue !== "boolean") {
            Config[this.option] = this.input.value
        }
    };
}
