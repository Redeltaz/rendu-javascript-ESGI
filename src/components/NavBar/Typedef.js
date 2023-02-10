/**
 * @name navigator.getBattery
 * @function
 * @returns Promise<BatteryManager>
 */

/**
 * The `BatteryManager` interface of the [Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API)
 * provides information about the system's battery charge level. The [`navigator.getBattery()`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getBattery) method returns a promise that
 * resolves with a `BatteryManager` interface.
 *
 * @typedef {EventTarget} BatteryManager
 * @property {boolean} charging A Boolean value indicating whether the battery is currently being charged.
 * @property {boolean} chargingTime A number representing the remaining time in seconds until the battery is fully charged, or 0 if the battery is already fully charged.
 * @property {boolean} dischargingTime A number representing the remaining time in seconds until the battery is completely discharged and the system suspends.
 * @property {boolean} level A number representing the system's battery charge level scaled to a value between 0.0 and 1.0.
 *
 * @event chargingchange Fired when the battery charging state (the charging property) is updated.
 * @event chargingtimechange Fired when the battery charging time (the chargingTime property) is updated.
 * @event dischargingtimechange Fired when the battery discharging time (the dischargingTime property) is updated.
 * @event levelchange Fired when the battery level (the level property) is updated.
 */
