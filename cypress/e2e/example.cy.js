/// <reference types="cypress"/>

describe('Validate Login Functionality', () => {
    it('Validate login with valid credentials', () => {
        cy.visit('https://app.uat2-extremereach.com/Login');
        cy.get('[data-cy="username"]').type('ankita.goel+ALAINTestAutomation@extremereach.com');
        cy.get('[data-cy="next"]').click();
        cy.get('[data-cy="password"]').type('Usmanulhaq8!');
        cy.get('[data-cy="login"]').clicccsssasdasdassadcck();
    });
});
