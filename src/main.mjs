import "./scss/main.scss";

import { AppIcon } from "./components/AppIcon/AppIcon.mjs";
import { Calculator } from "./components/Calculator/Calculator.mjs";
import { Container } from "./components/Container/Container.mjs";
import { CustomElement } from "./components/CustomElement/CustomElement.mjs";
import { HomeButton } from "./components/HomeButton/HomeButton.mjs";
import { NavBar } from "./components/NavBar/NavBar.mjs";

// Register custom elements here
customElements.define("app-icon", AppIcon);
customElements.define("custom-calculator", Calculator);
customElements.define("custom-container", Container);
customElements.define("custom-element", CustomElement);
customElements.define("home-button", HomeButton);
customElements.define("nav-bar", NavBar);
