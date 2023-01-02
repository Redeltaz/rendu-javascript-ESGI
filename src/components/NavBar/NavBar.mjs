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
import phone from "../../icons/phone.svg?raw";
import phoneVibrate from "../../icons/phone-vibrate.svg?raw";
import Config from "../Settings/Configuration.mjs";

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
        this.ping = shadow.getElementById("ping");
        this.pingIcon = shadow.getElementById("ping-icon");
        this.time = shadow.getElementById("time");
        this.vibrationStatus = shadow.getElementById("vibration-status");

        document.addEventListener("configchange", () => {
            this.render()
        })

        this.render()
    }

    render() {
        clearInterval(this.pingInterval)
        clearInterval(this.timeInterval)

        // If device has no battery or if icon is hidden, remove icon
        if (!navigator.getBattery || !Config.showBattery) {
            this.batteryIcon.style.display = "none";
        } else {
            this.batteryIcon.style.display = "";

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

        if (Config.showNetworkLatency) {
            this.pingIcon.style.display = ""
            this.ping.style.display = ""
            this.pingInterval = setInterval(this.refreshPing, Config.pingRefreshRate);
            this.refreshPing();
        } else {
            this.pingIcon.style.display = "none"
            this.ping.style.display = "none"
        }

        if (Config.showVibrationStatus) {
            this.vibrationStatus.style.display = ""
            if (Config.enableVibrations) {
                this.vibrationStatus.innerHTML = phoneVibrate
            } else {
                this.vibrationStatus.innerHTML = phone
            }
        } else {
            this.vibrationStatus.style.display = "none"
        }

        this.updateFormatter();
        this.timeInterval = setInterval(this.refreshTime, 1000);
        this.refreshTime();
    }

    updateFormatter() {
        /**
         * @type {DateTimeFormatOptions}
         */
        const options = {};

        if (Config.showHour) {
            options.hour = "numeric";
        }

        if (Config.showMinutes) {
            options.minute = "numeric";
        }

        if (Config.showSeconds) {
            options.second = "numeric";
        }

        if (Config.showDay) {
            options.day = "numeric";
        }

        if (Config.showMonth) {
            options.month = "short";
        }

        if (Config.showYear) {
            options.year = "numeric";
        }

        this.formatter = new Intl.DateTimeFormat(navigator.language, options);
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
    refreshPing = () => {
        const date = new Date();

        fetch(Config.pingServerAddress)
            .then(() => {
                this.updateNetworkIcon(new Date() - date);
            })
            .catch(() => {
                this.ping.innerText = "";
                this.updateNetworkIcon(null);
            });
    };

    refreshTime = () => {
        const date = new Date();

        this.time.innerText = this.formatter.format(date);
    }
}
