describe('The positive timecard and fringes should be system calculated', () => {
    beforeEach(() => {
        cy.userLogin();
        cy.fixture('initializationConfig.json').as('initializationConfig');
    });
});
