import css from "./TabContainer.scss";

export class TabContainer extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM
        const shadow = this.attachShadow({ mode: "open" });

        const style = document.createElement("style");
        style.textContent = css;

        shadow.appendChild(style);

        const container = document.createElement("div");
        container.classList.add("container");
        container.innerHTML = this.innerHTML;
        this.innerHTML = "";

        shadow.appendChild(container);

        /**
         * @type {HTMLDivElement[]}
         */
        this.tabs = Array.from(container.querySelectorAll(".custom-tab"));
        this.activeTab = this.tabs[0];

        for (const tab of this.tabs) {
            const title = document.createElement("button");
            title.innerText = tab.getAttribute("data-title");
            title.classList.add("tab-button");
            title.addEventListener("click", () => {
                this.activeTab = tab;
            });
            container.prepend(title);
        }

        // Add style to component
        this.style.display = "flex";
        this.style.flexGrow = "1";
    }

    /**
     * Gets the currently shown tab.
     * @returns {HTMLDivElement}
     */
    get activeTab() {
        const index = parseInt(this.getAttribute("activeTab"));
        return this.tabs[index];
    }

    /**
     * Sets the currently shown tab.
     * @param {HTMLDivElement} value
     */
    set activeTab(value) {
        this.activeTab.classList.remove("active-tab");
        value.classList.add("active-tab");
        this.setAttribute("activeTab", this.tabs.indexOf(value).toString());
    }
}
