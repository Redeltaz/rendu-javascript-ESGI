describe("Test tictactoe page", () => {
    it("Test tictactoe game", () => {
        cy.visit(Cypress.config("baseUrl") + "/tictactoe.html");

        cy.get("custom-container").should("exist");
        cy.get("custom-container").within(() => {
            cy.get("custom-tictactoe").should("exist");

            cy.get("custom-tictactoe").shadow().within(() => {
                cy.get("div.tictactoe-container").should("exist");
                
                cy.get("div.tictactoe-container").within(() => {
                    cy.get("div#local-results").should("exist");
                    cy.get("div#game").should("exist");
                    cy.get("p#result").should("exist");
                    cy.get("button#reset").should("exist");

                    cy.get("button.game-button[aria-label='1']").click();
                    cy.get("button.game-button[aria-label='1']").should("contain", "X");
                    cy.get("p#result").should("contain", "O player turn")

                    cy.get("button.game-button[aria-label='4']").click();
                    cy.get("button.game-button[aria-label='2']").click();
                    cy.get("button.game-button[aria-label='5']").click();
                    cy.get("button.game-button[aria-label='3']").click();

                    cy.get("p#result").should("contain", "X won the game !")
                });
            });
        });
    });
});
