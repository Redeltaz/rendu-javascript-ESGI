describe("Test home page", () => {
    it("Check home page components", () => {
        cy.visit(Cypress.config("baseUrl"));

        cy.get("nav-bar").should("exist");
        cy.get("nav-bar").shadow().within(() => {
            cy.get("div.navbar").should("exist");
        })

        cy.get("custom-container").should("exist");
        cy.get("custom-container").within(() => {
            cy.get("div.main").should("exist");

            cy.get("div.main").within(() => {
                cy.get("app-icon").should("exist");

                cy.get("app-icon[app='/settings.html']").click();
                cy.url().should("include", "/settings.html");
            });
        });
    });
});
