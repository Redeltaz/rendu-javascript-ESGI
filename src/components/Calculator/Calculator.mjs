import css from "./Calculator.scss";
import html from "./Calculator.html?raw";

export class Calculator extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html;

        // Import style
        const style = document.createElement("style");
        style.textContent = css;
        shadow.appendChild(style);

        // Get elements
        this.result = shadow.getElementById("result");
        this.subResult = shadow.getElementById("sub-result");
        this.resetButton = shadow.getElementById("reset");
        this.resetAllButton = shadow.getElementById("reset-all");
        this.backButton = shadow.getElementById("back");
        this.sign = shadow.getElementById("sign");
        this.point = shadow.getElementById("point");
        this.divideButton = shadow.getElementById("divide");
        this.multiplyButton = shadow.getElementById("multiply");
        this.minusButton = shadow.getElementById("minus");
        this.plusButton = shadow.getElementById("plus");
        this.equalsButton = shadow.getElementById("equals");

        // Handle digits click
        const keys = shadow.querySelectorAll(".calculator__key");

        for (let key of keys) {
            if (/^\d+$/.test(key.id)) {
                key.addEventListener("click", this.addDigit);
            }
        }

        // Add event listeners
        this.resetButton.addEventListener("click", this.reset);
        this.resetAllButton.addEventListener("click", this.resetAll);
        this.sign.addEventListener("click", this.changeSign);
        this.point.addEventListener("click", (e) => this.addDigit(e, true));
        this.plusButton.addEventListener("click", () => this.operate("add"));
        this.equalsButton.addEventListener("click", this.submit);

        this.divideButton.addEventListener("click", () =>
            this.operate("divide")
        );
        this.multiplyButton.addEventListener("click", () =>
            this.operate("multiply")
        );
        this.minusButton.addEventListener("click", () =>
            this.operate("substract")
        );

        // Initialize
        this.resetAll();
    }

    reset = () => {
        this.vibrate();

        this.memory.numbers[1] = "";
        this.result.innerText = "";

        // Clear results if equals has just been clicked
        if (!this.memory.cleared) {
            this.resetAll();
        }
    };

    resetMemory = () => {
        this.memory = {
            cleared: true,
            numbers: ["", ""],
            operation: null,
        };
    };

    resetAll = () => {
        this.vibrate();

        this.result.innerText = "";
        this.subResult.innerText = "";

        this.resetMemory();
    };

    addDigit = (e, isPoint) => {
        this.vibrate();

        const char = isPoint ? "." : e.target.id;

        if (isPoint && this.result.innerText.includes(".")) {
            return;
        }

        // Clear results if equals has just been clicked
        if (!this.memory.cleared) {
            this.resetAll();
        }

        // Replace result if an operator has just been clicked
        if (this.memory.operation && this.memory.numbers[1] === "") {
            this.result.innerText = char;
        } else {
            this.result.innerText += char;
        }

        // Add number in memory if an operation is in progress
        if (this.memory.operation) {
            this.memory.numbers[1] += char;
        }
    };

    changeSign = () => {
        this.vibrate();

        const newNumber = parseFloat(this.result.innerText) * -1;

        this.result.innerText = newNumber;

        if (this.memory.operation && this.memory.numbers[1] === "") {
            this.memory.numbers[1] = newNumber;
        }
    };

    operate = (operation) => {
        this.vibrate();

        // Set operation numbers
        this.memory.numbers[0] = this.result.innerText;
        this.memory.numbers[1] = "";

        // Set operation type
        this.memory.operation = operation;

        // Set sub result text
        this.subResult.innerText = `${
            this.result.innerText
        } ${this.getOperationChar(operation)}`;

        this.memory.cleared = true;
    };

    getOperationChar = (operation) => {
        const chars = {
            divide: "/",
            multiply: "x",
            substract: "-",
            add: "+",
        };

        return chars[operation];
    };

    submit = () => {
        this.vibrate();

        const firstNumber = parseFloat(this.memory.numbers[0]);
        const secondNumber = parseFloat(this.memory.numbers[1]);
        const operation = this.memory.operation;

        if (!operation) {
            return;
        }

        let result = null;

        if (operation === "divide") {
            result = firstNumber / secondNumber;
        } else if (operation === "multiply") {
            result = firstNumber * secondNumber;
        } else if (operation === "substract") {
            result = firstNumber - secondNumber;
        } else if (operation === "add") {
            result = firstNumber + secondNumber;
        }

        this.memory.cleared = false;
        this.memory.numbers[0] = result;
        this.result.innerText = result;

        this.subResult.innerText = `${firstNumber} ${this.getOperationChar(
            operation
        )} ${secondNumber}`;
    };

    vibrate = () => {
        window.navigator.vibrate(100);
    };
}
