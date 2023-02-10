import css from "./SettingsToggle.scss";
import Config from "./Configuration.mjs";

export class SettingsInput extends HTMLElement {
    constructor() {
        super();

        this.option = this.getAttribute("parameter");

        // Create a shadow DOM
        const shadow = this.attachShadow({ mode: "open" });

        const style = document.createElement("style");
        style.textContent = css;

        shadow.appendChild(style);

        this.input = document.createElement("input");
        this.input.value = Config[this.option];
        this.input.addEventListener("change", this.handleChange);
        this.input.type = this.getAttribute("type");
        shadow.appendChild(this.input);
    }

    handleChange = () => {
        const currentValue = Config[this.option];
        if (typeof currentValue === "number" && typeof this.input.value === "string") {
            Config[this.option] = parseInt(this.input.value);
        } else if (typeof currentValue !== "boolean") {
            Config[this.option] = this.input.value;
        }
    };
}
