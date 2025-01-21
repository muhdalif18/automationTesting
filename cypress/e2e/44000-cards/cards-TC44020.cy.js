describe('Cards', () => {
    beforeEach(() => {
        cy.userLoginLuca();
        cy.viewport(1920, 1080);
        cy.fixture('lucaURL.json').as('lucaURL');
    });

    const selectors = {
        menu: ':nth-child(11) > .Menu_TopMenu > div > a',
        cards: '.open > .Menu_DropDownPanel > .Menu_SubItemsPlaceholder > .Link'
    };

    const navigateToCards = () => {
        cy.get(selectors.menu).click({ force: true });
        cy.get(selectors.cards).click({ force: true });
    };

    it('TC44020', function () {
        /*
        Module: Cards
        Last Updated: Syed (9/1/2025)
        High Level Test Step : 
        1. Select the Get Cashet File button.
        Expected: Button is disabled.
        */

        //Go to cards
        navigateToCards();

        //"Get Cashet File" button is disable
        cy.get('[value="Get Cashet File"]').should('be.disabled'); // Assert that the button is disabled
    });
});
