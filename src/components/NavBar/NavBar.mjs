import css from "./NavBar.scss";
import html from "./NavBar.html?raw";

// Icons
import batteryEmptyIcon from "../../icons/battery.svg?raw";
import batteryChargingIcon from "../../icons/battery-charging.svg?raw";
import batteryFullIcon from "../../icons/battery-full.svg?raw";
import batteryHalfIcon from "../../icons/battery-half.svg?raw";
import reception0Icon from "../../icons/reception-0.svg?raw";
import reception1Icon from "../../icons/reception-1.svg?raw";
import reception2Icon from "../../icons/reception-2.svg?raw";
import reception3Icon from "../../icons/reception-3.svg?raw";
import reception4Icon from "../../icons/reception-4.svg?raw";

export class NavBar extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM
        let shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        const style = document.createElement("style");
        style.textContent = css;

        shadow.appendChild(style);

        this.battery = shadow.getElementById("battery");
        this.batteryIcon = shadow.getElementById("battery-icon");
        this.time = shadow.getElementById("time");
        this.ping = shadow.getElementById("ping");
        this.pingIcon = shadow.getElementById("ping-icon");

        this.formatter = new Intl.DateTimeFormat(navigator.language, {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        });

        this.interval = setInterval(this.refresh, 2000);
        this.refresh();

        // If device has no battery, remove icon
        if (!navigator.getBattery) {
            this.batteryIcon.style.display = "none";
            return;
        }

        navigator.getBattery().then((battery) => {
            this.updateBatteryIcon(battery);

            battery.addEventListener("chargingchange", () => {
                this.updateBatteryIcon(battery);
            });

            battery.addEventListener("levelchange", () => {
                this.updateBatteryIcon(battery);
            });
        });
    }

    /**
     * Updates the battery status icon
     * @param {BatteryManager} battery
     */
    updateBatteryIcon(battery) {
        if (battery.charging) {
            this.batteryIcon.innerHTML = batteryChargingIcon;
        } else if (battery.level > 75) {
            this.batteryIcon.innerHTML = batteryFullIcon;
        } else if (battery.level > 1) {
            this.batteryIcon.innerHTML = batteryHalfIcon;
        } else {
            this.batteryIcon.innerHTML = batteryEmptyIcon;
        }

        this.battery.innerText = battery.level * 100 + "%";
    }

    /**
     * Updates the network ping icon, null for no connection
     * @param {number | null} ping
     */
    updateNetworkIcon(ping) {
        if (ping === null) {
            this.pingIcon.innerHTML = reception0Icon;
        } else {
            this.ping.innerText = `${ping} ms`;

            if (ping < 25) {
                this.pingIcon.innerHTML = reception4Icon;
            } else if (ping < 50) {
                this.pingIcon.innerHTML = reception3Icon;
            } else if (ping < 100) {
                this.pingIcon.innerHTML = reception2Icon;
            } else {
                this.pingIcon.innerHTML = reception1Icon;
            }
        }
    }

    // Use an arrow function to keep the context to NavBar instance
    refresh = () => {
        const date = new Date();

        fetch("/")
            .then(() => {
                this.updateNetworkIcon(new Date() - date);
            })
            .catch(() => {
                this.ping.innerText = "";
                this.updateNetworkIcon(null);
            });

        this.time.innerText = this.formatter.format(date);
    };
}
