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

        this.xWinsText = shadow.getElementById("x-win-local");
        this.oWinsText = shadow.getElementById("o-win-local");

        let storedResults = JSON.parse(localStorage.getItem("results")) || {
            X: 0,
            O: 0
        };

        localStorage.setItem("results", JSON.stringify(storedResults));

        this.updateLocalTextResults(storedResults);

        const resetButton = shadow.getElementById("reset");
        this.result = shadow.getElementById("result");
        this.buttons = shadow.querySelectorAll(".game-button");
        this.turn = 0;
        this.remainingTurn = 9;
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        this.result.textContent = "X player turn";
        for (let button of this.buttons) {
            button.addEventListener("click", this.newTurn);
        }
        resetButton.addEventListener("click", this.resetGame);
    }

    newTurn = (buttonEvent) => {
        const button = buttonEvent.target;
        const player = this.turn % 2 === 0 ? "X" : "O";

        button.textContent = player;
        this.turn++;
        this.remainingTurn--;

        button.removeEventListener("click", this.newTurn);

        if (this.checkWinner(player)) {
            this.result.textContent = `${player} won the game !`;
            this.updateLocalResults(player);

            // Disable possibility to continue playing if someone won
            for (let button of this.buttons) {
                button.removeEventListener("click", this.newTurn);
            }
        } else if (!this.remainingTurn) {
            this.result.textContent = "It's a draw !";
        } else {
            this.result.textContent = `${player === "X" ? "O" : "X"} player turn`;
        }
    };

    checkWinner = (player) => {
        // Check on all winning conditions if buttons containing {player} text match one of them
        const isWinner = this.winningConditions.some((condition) => {
            return condition.every((index) => {
                return this.buttons[index].textContent.includes(player);
            });
        });

        return isWinner;
    };

    updateLocalResults = (player) => {
        const results = JSON.parse(localStorage.getItem("results"));
        results[player]++;
        localStorage.setItem("results", JSON.stringify(results));
        this.updateLocalTextResults(results);
    };

    updateLocalTextResults = (results) => {
        this.xWinsText.textContent = `X won ${results.X} times !`;
        this.oWinsText.textContent = `O won ${results.O} times !`;
    };

    resetGame = () => {
        this.turn = 0;
        this.remainingTurn = 9;
        // Re add event listeners that were removed during the game
        this.buttons.forEach((button) => {
            button.textContent = "";
            button.addEventListener("click", this.newTurn);
        });
        this.result.textContent = "X player turn";
    };
}
