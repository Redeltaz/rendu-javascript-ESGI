import css from "./TicTacToe.scss";
import html from "./TicTacToe.html?raw";

export class TicTacToe extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        const style = document.createElement("style");
        style.textContent = css;
        shadow.appendChild(style);

        const buttons = shadow.querySelectorAll(".game-button")
        const players = ["X", "O"]
        this.turn = 0

        console.log(buttons)
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                button.innerHTML = this.turn % 2 === 0 ? "X" : "O"
                this.turn++
            })
        })
    }

}
