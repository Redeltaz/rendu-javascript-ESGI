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
         * @type {CustomTab[]}
         */
        this.tabs = Array.from(container.querySelectorAll("custom-tab"));
        this.activeTab = this.tabs[0];

        for (const tab of this.tabs) {
            const title = document.createElement("button");
            title.innerText = tab.getAttribute("title");
            title.classList.add("tab-button");
            title.addEventListener("click", () => {
                this.activeTab = tab;
            });
            container.prepend(title);
        }
    }

    /**
     * Gets the currently shown tab.
     * @returns {CustomTab}
     */
    get activeTab() {
        const index = parseInt(this.getAttribute("activeTab"));
        return this.tabs[index];
    }

    /**
     * Sets the currently shown tab.
     * @param {CustomTab} value
     */
    set activeTab(value) {
        this.activeTab.classList.remove("active-tab");
        value.classList.add("active-tab");
        this.setAttribute("activeTab", this.tabs.indexOf(value).toString());
    }
}
