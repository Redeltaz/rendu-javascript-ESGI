/**
 * @typedef Configuration
 * @property {boolean} enableVibrations
 * @property {boolean} showVibrationStatus
 * @property {boolean} enableDarkMode
 * @property {boolean} showNetworkLatency
 * @property {string} pingServerAddress
 * @property {number} pingRefreshRate
 * @property {boolean} showHour
 * @property {boolean} showMinutes
 * @property {boolean} showSeconds
 * @property {boolean} showYear
 * @property {boolean} showMonth
 * @property {boolean} showDay
 * @property {boolean} showBattery
 */

/**
 * This is a helper function to generate the Config class body.
 */
export function generateConfigClassBody() {
    const str = `@property {boolean} enableVibrations
@property {boolean} showVibrationStatus
@property {boolean} enableDarkMode
@property {boolean} showNetworkLatency
@property {string} pingServerAddress
@property {number} pingRefreshRate
@property {boolean} showHour
@property {boolean} showMinutes
@property {boolean} showSeconds
@property {boolean} showYear
@property {boolean} showMonth
@property {boolean} showDay
@property {boolean} showBattery`;
    const rgx = RegExp(/\{(.*)\} (.*)/gm);
    const res = Array.from(str.matchAll(rgx)).map(([, type, name]) => `    /**
     * @returns {${type}}
     */
    static get ${name}() {
        return Config.configuration.${name}
    }

    /**
     * @param {${type}} value
     */
    static set ${name}(value) {
        if (typeof value !== "${type}") {
            throw "Invalid configuration value for '${name}', ${type} expected, got " + typeof value
        }

        Config.configuration.${name} = value
        Config.save()
        
        const event = new CustomEvent('configchange', { key: "${name}", newValue: value });
        document.dispatchEvent(event);
    }
    `);
    console.log(res.join("\n"));
}

export default class Config {
    /**
     * @type {Configuration}
     * @private
     */
    static defaultConfiguration = {
        enableVibrations: true,
        showVibrationStatus: true,
        enableDarkMode: true,
        showNetworkLatency: true,
        pingServerAddress: "/",
        pingRefreshRate: 2000,
        showHour: true,
        showMinutes: true,
        showSeconds: false,
        showYear: false,
        showMonth: true,
        showDay: true,
        showBattery: true,
    }

    /**
     * @type {Configuration}
     * @private
     */
    static configuration = JSON.parse(localStorage.getItem("configuration") ?? "null") ?? Config.defaultConfiguration;

    static save() {
        localStorage.setItem("configuration", JSON.stringify(Config.configuration));
    }

    /**
     * @returns {boolean}
     */
    static get enableVibrations() {
        return Config.configuration.enableVibrations
    }

    /**
     * @param {boolean} value
     */
    static set enableVibrations(value) {
        if (typeof value !== "boolean") {
            throw "Invalid configuration value for 'enableVibrations', boolean expected, got " + typeof value
        }

        Config.configuration.enableVibrations = value
        Config.save()

        const event = new CustomEvent('configchange', { key: "enableVibrations", newValue: value });
        document.dispatchEvent(event);
    }

    /**
     * @returns {boolean}
     */
    static get showVibrationStatus() {
        return Config.configuration.showVibrationStatus
    }

    /**
     * @param {boolean} value
     */
    static set showVibrationStatus(value) {
        if (typeof value !== "boolean") {
            throw "Invalid configuration value for 'showVibrationStatus', boolean expected, got " + typeof value
        }

        Config.configuration.showVibrationStatus = value
        Config.save()

        const event = new CustomEvent('configchange', { key: "showVibrationStatus", newValue: value });
        document.dispatchEvent(event);
    }

    /**
     * @returns {boolean}
     */
    static get enableDarkMode() {
        return Config.configuration.enableDarkMode
    }

    /**
     * @param {boolean} value
     */
    static set enableDarkMode(value) {
        if (typeof value !== "boolean") {
            throw "Invalid configuration value for 'enableDarkMode', boolean expected, got " + typeof value
        }

        Config.configuration.enableDarkMode = value
        Config.save()

        const event = new CustomEvent('configchange', { key: "enableDarkMode", newValue: value });
        document.dispatchEvent(event);
    }

    /**
     * @returns {boolean}
     */
    static get showNetworkLatency() {
        return Config.configuration.showNetworkLatency
    }

    /**
     * @param {boolean} value
     */
    static set showNetworkLatency(value) {
        if (typeof value !== "boolean") {
            throw "Invalid configuration value for 'showNetworkLatency', boolean expected, got " + typeof value
        }

        Config.configuration.showNetworkLatency = value
        Config.save()

        const event = new CustomEvent('configchange', { key: "showNetworkLatency", newValue: value });
        document.dispatchEvent(event);
    }

    /**
     * @returns {string}
     */
    static get pingServerAddress() {
        return Config.configuration.pingServerAddress
    }

    /**
     * @param {string} value
     */
    static set pingServerAddress(value) {
        if (typeof value !== "string") {
            throw "Invalid configuration value for 'pingServerAddress', string expected, got " + typeof value
        }

        Config.configuration.pingServerAddress = value
        Config.save()

        const event = new CustomEvent('configchange', { key: "pingServerAddress", newValue: value });
        document.dispatchEvent(event);
    }

    /**
     * @returns {number}
     */
    static get pingRefreshRate() {
        return Config.configuration.pingRefreshRate
    }

    /**
     * @param {number} value
     */
    static set pingRefreshRate(value) {
        if (typeof value !== "number") {
            throw "Invalid configuration value for 'pingRefreshRate', number expected, got " + typeof value
        }

        Config.configuration.pingRefreshRate = value
        Config.save()

        const event = new CustomEvent('configchange', { key: "pingRefreshRate", newValue: value });
        document.dispatchEvent(event);
    }

    /**
     * @returns {boolean}
     */
    static get showHour() {
        return Config.configuration.showHour
    }

    /**
     * @param {boolean} value
     */
    static set showHour(value) {
        if (typeof value !== "boolean") {
            throw "Invalid configuration value for 'showHour', boolean expected, got " + typeof value
        }

        Config.configuration.showHour = value
        Config.save()

        const event = new CustomEvent('configchange', { key: "showHour", newValue: value });
        document.dispatchEvent(event);
    }

    /**
     * @returns {boolean}
     */
    static get showMinutes() {
        return Config.configuration.showMinutes
    }

    /**
     * @param {boolean} value
     */
    static set showMinutes(value) {
        if (typeof value !== "boolean") {
            throw "Invalid configuration value for 'showMinutes', boolean expected, got " + typeof value
        }

        Config.configuration.showMinutes = value
        Config.save()

        const event = new CustomEvent('configchange', { key: "showMinutes", newValue: value });
        document.dispatchEvent(event);
    }

    /**
     * @returns {boolean}
     */
    static get showSeconds() {
        return Config.configuration.showSeconds
    }

    /**
     * @param {boolean} value
     */
    static set showSeconds(value) {
        if (typeof value !== "boolean") {
            throw "Invalid configuration value for 'showSeconds', boolean expected, got " + typeof value
        }

        Config.configuration.showSeconds = value
        Config.save()

        const event = new CustomEvent('configchange', { key: "showSeconds", newValue: value });
        document.dispatchEvent(event);
    }

    /**
     * @returns {boolean}
     */
    static get showYear() {
        return Config.configuration.showYear
    }

    /**
     * @param {boolean} value
     */
    static set showYear(value) {
        if (typeof value !== "boolean") {
            throw "Invalid configuration value for 'showYear', boolean expected, got " + typeof value
        }

        Config.configuration.showYear = value
        Config.save()

        const event = new CustomEvent('configchange', { key: "showYear", newValue: value });
        document.dispatchEvent(event);
    }

    /**
     * @returns {boolean}
     */
    static get showMonth() {
        return Config.configuration.showMonth
    }

    /**
     * @param {boolean} value
     */
    static set showMonth(value) {
        if (typeof value !== "boolean") {
            throw "Invalid configuration value for 'showMonth', boolean expected, got " + typeof value
        }

        Config.configuration.showMonth = value
        Config.save()

        const event = new CustomEvent('configchange', { key: "showMonth", newValue: value });
        document.dispatchEvent(event);
    }

    /**
     * @returns {boolean}
     */
    static get showDay() {
        return Config.configuration.showDay
    }

    /**
     * @param {boolean} value
     */
    static set showDay(value) {
        if (typeof value !== "boolean") {
            throw "Invalid configuration value for 'showDay', boolean expected, got " + typeof value
        }

        Config.configuration.showDay = value
        Config.save()

        const event = new CustomEvent('configchange', { key: "showDay", newValue: value });
        document.dispatchEvent(event);
    }

    /**
     * @returns {boolean}
     */
    static get showBattery() {
        return Config.configuration.showBattery
    }

    /**
     * @param {boolean} value
     */
    static set showBattery(value) {
        if (typeof value !== "boolean") {
            throw "Invalid configuration value for 'showBattery', boolean expected, got " + typeof value
        }

        Config.configuration.showBattery = value
        Config.save()

        const event = new CustomEvent('configchange', { key: "showBattery", newValue: value });
        document.dispatchEvent(event);
    }
}