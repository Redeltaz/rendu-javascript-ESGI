import "./scss/main.scss";
import { CustomElement } from "./components/CustomElement/CustomElement.mjs";
import { NarBar } from "./components/NavBar/NavBar.mjs";

// Register custom elements here
customElements.define("custom-element", CustomElement);
customElements.define("nav-bar", NarBar);
