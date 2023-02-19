describe("Test calculator page", () => {
    it("Test if calculator working well", () => {
        cy.visit(Cypress.config("baseUrl") + "/calculator.html");

        cy.get("custom-container").should("exist");
        cy.get("custom-container").within(() => {
            cy.get("custom-calculator").should("exist");

            cy.get("custom-calculator").shadow().within(() => {
                cy.get("div.calculator__keys").should("exist");
                cy.get("div.calculator__display").should("exist");
                cy.get("div.calculator__key").should("exist");
                cy.get("div.calculator__operations").should("exist");

                cy.get("#1.calculator__key").click();
                cy.get("#plus.calculator__key").click();
                cy.get("#2.calculator__key").click();
                cy.get("#equals.calculator__key").click();

                cy.get("#result.calculator__result").should("contain", "3")
            });
        });
    });
});
