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

    it('TC44002', function () {
        /*
        Module: Cards
        Last Updated: Syed (7/1/2025)]
        High Level Test Step:
        3. Look at the focus.
        Expected: Cursor focus is in the Search field.
        */

        //Go go cards
        navigateToCards();
        cy.get('input.ThemeGrid_Width2').should('be.focused');
    });

    it('TC44003', function () {
        /*
        Module: Cards
        Last Update : Syed (7/1/2025)
        High Level Test Step:
        4. Verify bubble help message when cursor hovers over search field.
        Expected: Type the Card Name, Envelope #, Transaction, Card Description, or Account Code
        */

        //Go to cards
        navigateToCards();

        //Hover mouse at search field
        cy.get('input.ThemeGrid_Width2')
            .trigger('mouseover')
            .eq(0)
            .invoke('show')
            .trigger('mouseover')
            .should('have.attr', 'title', 'Type the Card Name, Envelope #, Transaction, Card Description, or Account Code');
    });

    it('TC44004', function () {
        /*
        Module: Cards
        Last Updated: Syed (7/1/2025)
        High Level Test Step:
        5. Do a partial/full search for Card Name.
        Expected: -
        */

        //Go to cards
        navigateToCards();

        // Partial search
        cy.get('input.ThemeGrid_Width2').type('ALEX');
        cy.get('.searchicon').click();
        cy.wait(2000);
        cy.get('tbody tr').should('have.length.at.least', 1);
        cy.get('tbody').contains('ALEX PEACE POWER');
        cy.get('input.ThemeGrid_Width2').clear();

        // Full search
        cy.get('input.ThemeGrid_Width2').type('ALEX PEACE POWER');
        cy.get('.searchicon').click();
        cy.get('tbody tr').should('have.length.at.least', 1);
        cy.get('tbody').contains('ALEX PEACE POWER');
    });

    it('TC44005', function () {
        /*
        Module: Cards
        Last Updated: Syed (8/1/2025)
        High Level Test Step : 
        6. Do a partial/full search for Envelope #.
        Expected: -
        */

        //Go to cards
        navigateToCards();

        // Partial search
        cy.get('input.ThemeGrid_Width2').type('Env');
        cy.get('.searchicon').click();
        cy.wait(2000);
        cy.get('tbody tr').should('have.length.at.least', 1);
        cy.get('tbody').contains('Envelopeno');
        cy.get('input.ThemeGrid_Width2').clear();

        // Full search
        cy.get('input.ThemeGrid_Width2').type('Envelopeno');
        cy.get('.searchicon').click();
        cy.get('tbody tr').should('have.length.at.least', 1);
        cy.get('tbody').contains('Envelopeno');
    });

    it('TC44006', function () {
        /*
        Module: Cards
        Last Updated: Syed (8/1/2025)
        High Level Test Step : 
        7. Do a full search for Transaction.
        Expected: -
        */
        navigateToCards();

        // Full search
        cy.get('input.ThemeGrid_Width2').type('1475');
        cy.get('.searchicon').click();
        cy.get('tbody tr').should('have.length.at.least', 1);
        cy.get('tbody').contains('1475');
    });
});
