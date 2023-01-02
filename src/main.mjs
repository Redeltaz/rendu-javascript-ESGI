import "./scss/main.scss";

import { AppIcon } from "./components/AppIcon/AppIcon.mjs";
import { Calculator } from "./components/Calculator/Calculator.mjs";
import { Container } from "./components/Container/Container.mjs";
import { CustomElement } from "./components/CustomElement/CustomElement.mjs";
import { NavBar } from "./components/NavBar/NavBar.mjs";
import { SettingsToggle } from "./components/Settings/SettingsToggle.mjs";
import { SettingsInput } from "./components/Settings/SettingsInput.mjs";

// Register custom elements here
customElements.define("custom-element", CustomElement);
customElements.define("nav-bar", NavBar);
customElements.define("app-icon", AppIcon);
customElements.define("custom-calculator", Calculator);
customElements.define("custom-container", Container);
customElements.define("settings-toggle", SettingsToggle);
customElements.define("settings-input", SettingsInput);
