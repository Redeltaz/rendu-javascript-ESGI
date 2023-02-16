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
        this.input = shadow.getElementById("input");
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
        const keys = shadow.querySelectorAll(".calculator__digits .calculator__key");

        for (let key of keys) {
            if (/^\d+$/.test(key.id)) {
                key.addEventListener("click", this.addDigit);
            }
        }

        // Add event listeners
        this.point.addEventListener("click", (e) => this.addDigit(e, true));

        this.resetAllButton.addEventListener("click", this.resetAll);

        this.sign.addEventListener("click", this.changeSign);

        this.divideButton.addEventListener("click", () => this.operate("divide"));
        this.minusButton.addEventListener("click", () => this.operate("substract"));
        this.multiplyButton.addEventListener("click", () => this.operate("multiply"));
        this.plusButton.addEventListener("click", () => this.operate("add"));

        this.equalsButton.addEventListener("click", this.submit);

        // Initialize
        this.resetAll();
    }

    resetMemory = () => {
        this.memory = {
            numbers: [],
            operations: [],
        };
    };

    resetAll = () => {
        this.vibrate();

        this.result.innerText = "";
        this.input.innerText = "";

        this.resetMemory();
    };

    addDigit = (e, isPoint) => {
        this.vibrate();

        const char = isPoint ? "." : e.target.id;

        // Add first digit if memory is empty
        if (this.memory.numbers.length === 0) {
            this.memory.numbers.push("");
        }

        // Add new digit if there is an operation
        if (this.memory.operations.length === this.memory.numbers.length) {
            this.memory.numbers.push("");
        }

        // Add digit
        this.memory.numbers[this.memory.numbers.length - 1] += char;

        // Hide result if not empty
        if (this.result.innerText !== "") {
            this.result.innerText = "";
        }

        // Show digit
        this.input.innerText += char;

        // Show result
        if (this.memory.numbers.length >= 2) {
            this.result.innerText = this.getResult();
        }
    };

    changeSign = () => {
        this.vibrate();

        if (this.memory.numbers.length !== 0 || this.memory.operations.length !== 0) {
            return;
        }

        this.result.innerText = parseFloat(this.result.innerText) * -1;
    };

    operate = (operation) => {
        this.vibrate();

        // Check if memory is empty
        if (this.memory.numbers.length < 1) {
            if (this.result.innerText === "") {
                return;
            } else {
                this.memory.numbers.push(this.result.innerText);
                this.input.innerText = this.result.innerText;
            }
        }

        // Set operation type
        this.memory.operations.push(operation);

        // Add operation character
        this.input.innerText += this.getOperationChar(operation);
    };

    getOperationChar = (operation) => {
        const chars = {
            add: "+",
            divide: "/",
            multiply: "x",
            substract: "-",
        };

        return chars[operation];
    };

    getResult = () => {
        const numbers = this.memory.numbers;
        const operations = this.memory.operations;
        let result = parseFloat(this.memory.numbers[0]);

        for (let i = 0; i < operations.length; i++) {
            if (operations[i] === "add") {
                result += parseFloat(numbers[i + 1]);
            } else if (operations[i] === "divide") {
                result /= parseFloat(numbers[i + 1]);
            } else if (operations[i] === "multiply") {
                result *= parseFloat(numbers[i + 1]);
            } else if (operations[i] === "substract") {
                result -= parseFloat(numbers[i + 1]);
            }
        }

        return result;
    };

    submit = () => {
        this.vibrate();

        if (this.memory.numbers.length < 2 || this.memory.numbers.length <= this.memory.operations.length) {
            return;
        }

        this.resetMemory();
        this.input.innerText = "";
    };

    vibrate = () => {
        window.navigator.vibrate(100);
    };
}
