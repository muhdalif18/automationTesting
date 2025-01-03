/// <reference types="cypress"/>

describe("Validate Login Functionality", () => {
  it("Validate login with valid credentials", () => {
    cy.visit("https://app.uat2-extremereach.com/Login");
    cy.get('[data-cy="username"]').type(
      "ankita.goel+ALAINTestAutomation@extremereach.com"
    );
    cy.get('[data-cy="next"]').click();
    cy.get('[data-cy="password"]').type("Usmanulhaq8!");
    cy.get('[data-cy="login"]').click();
    cy.get(
      '[data-sidebar-item-id="5060"] > [data-sidebar-header=""] > .er-sidebar-toggle'
    ).click();
    cy.get(
      '[data-sidebar-item-id="6070"] > .er-sidebar-link > .er-sidebar-label'
    ).click();
    cy.get(".form-section__row-no-gap > :nth-child(1) > .ng-pristine").type(
      "157168"
    );
  });
});
