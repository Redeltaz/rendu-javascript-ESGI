import Config from "./Configuration.mjs";

export class ExportSettings extends HTMLElement {
    constructor() {
        super();

        const button = document.createElement("button");
        button.innerText = "Export settings";
        button.addEventListener("click", () => {
            const url = window.URL.createObjectURL(Config.blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "configuration.json";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        });

        this.appendChild(button);
    }
}
