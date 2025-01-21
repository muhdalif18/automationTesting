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

    it('TC44029', function () {
        /*
        Module: Cards
        Last Updated: Syed (9/1/2025)
        High Level Test Step : 
        1. Select the "Template" button.
        Expected: CardnoEnvelopeno.xlsx file is downloaded to your machine.
        */

        //Go to cards
        navigateToCards();

        //Click "Template" button
        cy.get('[value="Template"]').click({
            force: true
        });

        // Wait for the file to be downloaded
        const downloadedFilePath = 'cypress/downloads/CardnoEnvelopeno.xlsx';
        cy.readFile(downloadedFilePath, { timeout: 10000 }).should('exist');
    });
});
