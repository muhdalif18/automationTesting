Cypress.Commands.add('userLogin', () => {
    Cypress.SelectorPlayground.defaults({
        selectorPriority: ['data-cy', 'data-test', 'data-testid', 'class', 'tag', 'attributes', 'nth-child']
    });
    cy.viewport(1920, 1080);

    cy.clearCookies();
    cy.clearAllSessionStorage();

    cy.fixture('initializationConfig').then((data) => {
        cy.log(JSON.stringify(data));

        cy.visit(data.websiteUrl);

        cy.get('#userName', { timeout: 30000 }).should('be.visible').type(Cypress.env('PLATFORM_USER_USERNAME'));

        // Click the Next button
        cy.get('#nextButton', { timeout: 30000 }).should('be.visible').click();

        // Enter the password
        cy.get('#password', { timeout: 30000 }).should('be.visible').type(Cypress.env('PLATFORM_USER_PASSWORD'));

        // Click on Login Button
        cy.get('#loginButton', { timeout: 30000 }).should('be.visible').click();
    });
});
