import css from "./NavBar.scss";
import html from "./NavBar.html?raw";

export class NarBar extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM
        let shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        const style = document.createElement("style");
        style.textContent = css;

        shadow.appendChild(style);

        this.battery = shadow.getElementById("battery");
        this.date = shadow.getElementById("date");
        this.time = shadow.getElementById("time");
        this.ping = shadow.getElementById("ping");

        this.interval = setInterval(this.refresh, 1000);

        navigator.getBattery().then((battery) => {
            battery.addEventListener("levelchange", () => {
                this.battery.innerText = (battery.level * 100) + "%";
            });
            this.battery.innerText = (battery.level * 100) + "%";
        });
    }

    // Use an arrow function to keep the context to NavBar instance
    refresh = () => {
        const date = new Date();

        fetch("/")
            .finally(res => {
                this.ping.innerText = `${new Date() - date} ms`;
            })

        this.time.innerText = date.toLocaleTimeString();
        this.date.innerText = date.toLocaleDateString();
    };
}
