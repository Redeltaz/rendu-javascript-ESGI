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

        this.result = shadow.getElementById("result")
        this.buttons = shadow.querySelectorAll(".game-button")
        this.turn = 0
        this.remainingTurn = 9
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        this.result.textContent = "X player turn"
        this.buttons.forEach((button) => {
            button.addEventListener("click", this.newTurn)
        })
    }

    newTurn = (buttonEvent) => {
        const button = buttonEvent.target;
        const player = this.turn % 2 === 0 ? "X" : "O"

        button.textContent = player
        this.turn++

        button.removeEventListener("click", this.newTurn)

        if(this.checkWinner(player)) {
            //this.result.textContent = `${player} won the game !`
            alert(`${player} won the game !`)
            this.resetGame()
        } else if(!this.remainingTurn) {
            alert("It's a draw")
            this.resetGame()
        } else {
            this.result.textContent = `${player === "X" ? "O" : "X"} player turn`
            this.remainingTurn--
        }
    }

    checkWinner = (player) => {
        const isWinner = this.winningConditions.some(condition => {
            return condition.every(index => {
                return this.buttons[index].textContent.includes(player)
            })
        }) 

        return isWinner
    }

    resetGame = () => {
        this.turn = 0
        this.remainingTurn = 9
        this.buttons.forEach(button => {
            button.textContent = ""
            button.addEventListener("click", this.newTurn)
        })
    }
}
