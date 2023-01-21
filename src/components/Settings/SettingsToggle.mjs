import css from "./SettingsToggle.scss";
import html from "./SettingsToggle.html?raw";
import Config from "./Configuration.mjs"

export class SettingsToggle extends HTMLElement {
    constructor() {
        super();

        this.option = this.getAttribute("parameter");

        const type = typeof Config[this.option];
        if (type !== "boolean") {
            throw "This component cannot be used with parameter of type" + type;
        }

        // Create a shadow DOM
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        const style = document.createElement("style");
        style.textContent = css;

        shadow.appendChild(style);

        this.checkbox = shadow.getElementById("toggle");
        shadow.getElementById("label").innerText = this.innerText;
        this.checkbox.addEventListener("click", this.handleClick);
        this.checkbox.checked = Config[this.option];
    }

    handleClick = () => {
        const currentValue = Config[this.option]
        if (typeof currentValue === "boolean") {
            Config[this.option] = !currentValue
            this.checkbox.checked = !currentValue;
        }
    };
}
