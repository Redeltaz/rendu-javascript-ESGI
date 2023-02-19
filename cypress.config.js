import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: "http://localhost:8000",
        specPattern: [
            "cypress/e2e/home.cy.js",
            "cypress/e2e/tictactoe.cy.js",
            "cypress/e2e/calculator.cy.js",
        ]
    },
});
