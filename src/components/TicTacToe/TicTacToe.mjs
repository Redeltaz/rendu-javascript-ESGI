import css from "./TicTacToe.scss";
import html from "./TicTacToe.html?raw";

export class TicTacToe extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

    }

}
