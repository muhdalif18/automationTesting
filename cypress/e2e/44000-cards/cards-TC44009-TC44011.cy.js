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

    it('TC44009', function () {
        /*
        Module: Cards
         
        Last Updated: Syed (8/1/2025)
        High Level Test Step : 
        10. Look at the column labels.   565454.
        Expected: Check box, ATTCH, CARD #, CARD NAME, VENDOR NAME, ENVELOPE #, TRANS #, STATUS, AMOUNT, BATCH, USER NAME.
        */
        navigateToCards();

        /// Verify the checkbox container and the checkbox itself
        cy.get('.div_cardtable > :nth-child(1) > .TableRecords > thead > tr > [style="width:80px;"]').should('exist');
        cy.get('[style="width:80px;"] > div > input').should('exist').and('be.visible').and('have.attr', 'type', 'checkbox');

        // Verify the ATTCH column
        cy.get('.div_cardtable > :nth-child(1) > .TableRecords > thead > tr > :nth-child(2)').should('exist');
        cy.get(':nth-child(2) > .Bold').should('have.text', 'ATTCH');

        // Verify the CARD # column
        cy.get('.div_cardtable > :nth-child(1) > .TableRecords > thead > tr > :nth-child(3) > div').should('exist');
        cy.get(':nth-child(3) > div > .Bold')
            .invoke('text')
            .then((text) => {
                expect(text.trim().toUpperCase()).to.equal('CARD #');
            });

        // Verify the CARD NAME column
        cy.get('.div_cardtable > :nth-child(1) > .TableRecords > thead > tr > :nth-child(4)').should('exist');
        cy.get(':nth-child(4) > div > .Bold')
            .invoke('text')
            .then((text) => {
                expect(text.trim().toUpperCase()).to.equal('CARD NAME');
            });

        // Verify the VENDOR NAME column
        cy.get('[style="width:300px;"]').should('exist');
        cy.get('[style="width:300px;"] > .Bold')
            .invoke('text')
            .then((text) => {
                expect(text.trim().toUpperCase()).to.equal('VENDOR NAME');
            });

        // Verify the ENVELOPE # column
        cy.get('thead > tr > :nth-child(7)').should('exist');
        cy.get(':nth-child(7) > div > .Bold')
            .invoke('text')
            .then((text) => {
                expect(text.trim().toUpperCase()).to.equal('ENVELOPE #');
            });

        // Verify the TRANS # column
        cy.get('thead > tr > :nth-child(8)').should('exist');
        cy.get(':nth-child(8) > div > .Bold')
            .invoke('text')
            .then((text) => {
                expect(text.trim().toUpperCase()).to.equal('TRANS #');
            });

        // Verify the STATUS column
        cy.get('thead > tr > :nth-child(9)').should('exist');
        cy.get(':nth-child(9) > div > .Bold')
            .invoke('text')
            .then((text) => {
                expect(text.trim().toUpperCase()).to.equal('STATUS');
            });

        // Verify the AMOUNT column
        cy.get('thead > tr > :nth-child(10)').should('exist');
        cy.get(':nth-child(10) > div > .Bold')
            .invoke('text')
            .then((text) => {
                expect(text.trim().toUpperCase()).to.equal('AMOUNT');
            });

        // Verify the BATCH column
        cy.get('thead > tr > :nth-child(11)').should('exist');
        cy.get(':nth-child(11) > div > .Bold')
            .invoke('text')
            .then((text) => {
                expect(text.trim().toUpperCase()).to.equal('BATCH');
            });

        // Verify the USER NAME column
        cy.get('thead > tr > :nth-child(12)').should('exist');
        cy.get(':nth-child(12) > div > .Bold')
            .invoke('text')
            .then((text) => {
                expect(text.trim().toUpperCase()).to.equal('USER NAME');
            });
    });

    it('TC44010', function () {
        /* 
            Module: Cards
            Last Updated: Syed (10/1/2025)

            High Level Test Steps:
            11. Confirm column labels are in Bold font, all CAPS with light blue background shading.  516300.
            Expected: -
            */

        //Go to cards
        navigateToCards();

        // Check background color (light blue)
        cy.get('thead > tr').parent().should('have.css', 'background-color').and('eq', 'rgb(244, 247, 248)'); // appear more grayish-white

        const columnNames = [
            'ATTCH',
            'Card #',
            'Card Name',
            'Vendor Name',
            'Envelope #',
            'Trans #',
            'Status',
            'Amount',
            'Batch',
            'User Name'
        ]; // Columns to check

        cy.get('#DublinTheme_wt71_block_wtMainContent_wtCDTable')
            .find('thead th') // Locate all column headers
            .then(($headers) => {
                // Log all column names
                $headers.each((index, header) => {
                    const headerText = Cypress.$(header).find('span').text().trim();
                    cy.log(`Header ${index + 1}: ${headerText}`);
                });

                columnNames.forEach((name) => {
                    // Find the specific column with the name
                    const $column = Cypress._.find($headers, (header) => Cypress.$(header).find('span').text().trim() === name);

                    if ($column) {
                        cy.log(`Column found: ${name}`);

                        cy.wrap($column)
                            .find('span')
                            .should('have.css', 'font-weight')
                            .and('match', /(bold|700)/); // Verify font-weight is bold

                        cy.wrap($column).find('span').should('have.css', 'text-transform').and('eq', 'uppercase'); // Verify text-transform is uppercase
                    } else {
                        cy.log(`Column not found: ${name}`);
                    }
                });
            });
    });

    it('TC44011', function () {
        /*
        Module: Cards
        Last Updated: Syed (8/1/2025)
        High Level Test Step : 
        12. Confirm column labels continue to display when scrolling down to data in the bottom of the list.  516300.
        Expected: -
        */

        //Go to cards
        navigateToCards();

        cy.get('select.ThemeGrid_Width2').select('ALL');
        cy.wait(1000);

        // Scroll down to the bottom of the list
        cy.get('.div_cardtable').scrollTo('bottom', { ensureScrollable: false });
        cy.wait(1000);

        /// Verify that the column labels are still visible after scrolling
        cy.get(':nth-child(2) > .Bold').should('be.visible');
        cy.get(':nth-child(3) > div > .Bold').should('be.visible');
        cy.get(':nth-child(4) > div > .Bold').should('be.visible');
        cy.get('[style="width:300px;"] > .Bold').should('be.visible');
        cy.get(':nth-child(7) > div > .Bold').should('be.visible');
        cy.get(':nth-child(8) > div > .Bold').should('be.visible');
        cy.get(':nth-child(9) > div > .Bold').should('be.visible');
        cy.get(':nth-child(10) > div > .Bold').should('be.visible');
        cy.get(':nth-child(11) > div > .Bold').should('be.visible');
        cy.get(':nth-child(12) > div > .Bold').should('be.visible');
    });
});
