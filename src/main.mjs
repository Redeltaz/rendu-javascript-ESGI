/*-----------------------*/
import { CustomElement } from "./components/CustomElement/CustomElement.mjs";
import "./scss/main.scss";
/*-----------------------*/

// Register custom elements here
customElements.define("custom-element", CustomElement);

alert("test");

function test() {
    console.log("test");
}

test();
