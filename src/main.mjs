import "./scss/main.scss";

import { AppIcon } from "./components/AppIcon/AppIcon.mjs";
import { Calculator } from "./components/Calculator/Calculator.mjs";
import { Container } from "./components/Container/Container.mjs";
import { CustomElement } from "./components/CustomElement/CustomElement.mjs";
import { NavBar } from "./components/NavBar/NavBar.mjs";
import { Clock } from "./components/Clock/Clock.mjs";
import { ClockComponent } from "./components/Clock/ClockComponent/ClockComponent.mjs";
import { TimerComponent } from "./components/Clock/TimerComponent/TimerComponent.mjs";

// Register custom elements here
customElements.define("custom-element", CustomElement);
customElements.define("nav-bar", NavBar);
customElements.define("app-icon", AppIcon);
customElements.define("custom-calculator", Calculator);
customElements.define("custom-container", Container);
customElements.define("custom-clock", Clock);
customElements.define("custom-clock-component", ClockComponent);
customElements.define("custom-timer-component", TimerComponent);
