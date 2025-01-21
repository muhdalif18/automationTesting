describe('Cards', () => {
    beforeEach(() => {
        cy.userLoginLuca();
        cy.viewport(1920, 1080);
        cy.fixture('lucaURL.json').as('lucaURL');
    });

    const selectors = {
        menu: ':nth-child(11) > .Menu_TopMenu > div > a',
        cards: '.open > .Menu_DropDownPanel > .Menu_SubItemsPlaceholder > .Link',
        transactionLink: ':nth-child(2) > :nth-child(3) > div > .Link',
        table: 'table#DublinTheme_wt71_block_wtMainContent_wtCDTable.TableRecords.OSFillParent',
        tableHeaders: 'thead > tr > th',
        deleteButton: '[class="btn-target"]'
    };
    const navigateToCards = () => {
        cy.get(selectors.menu).click({ force: true });
        cy.get(selectors.cards).click({ force: true });
    };

    it('TC44124', function () {
        /*
        Module: Cards
        Last Updated: Syed (14/1/2025)
        High Level Test Step : 
        1. Select the Delete button for Unposted transaction.   
        Expected: Confirmation message displays:  Are you sure you would like to Delete this Transaction?
        */

        // Go to cards
        navigateToCards();

        // Click only the first transaction row
        cy.get(`${selectors.table} tbody tr:nth-child(1) > :nth-child(8) > div > .Link`).should('be.visible').click();
        cy.wait(2000);

        // Handle specific Cypress exception gracefully
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('Cannot read properties of null')) {
                return false;
            }
        });

        //click button delete
        cy.get('[class="btn-target"]').contains('Delete').click();

        // Handle and verify the confirmation dialog
        cy.on('window:confirm', (message) => {
            // Assert the message in the dialog
            expect(message).to.equal('Are you sure you would like to Delete this Transaction?');
            return true; // Click "OK"
        });
    });

    it('TC44127', function () {
        /*
        Module: Cards
        Last Updated: Syed (15/1/2025)
        High Level Test Step: 
        4. Select and/or press the Enter key on the OK button.   
        Expected: Confirmation message displays:  Transaction was successfully Deleted. Landing Page displays and transaction is no longer listed.
        */

        // Navigate to the Cards page
        navigateToCards();

        // Ensure the table has rows
        cy.get(`${selectors.table} tbody tr`).should('have.length.greaterThan', 0);

        // Capture the transaction ID of the first row dynamically
        cy.get(`${selectors.table} tbody tr:nth-child(1) > :nth-child(8) > div > .Link`) // Assuming 6th column contains transaction ID
            .invoke('text')
            .then((transactionId) => {
                const trimmedTransactionId = transactionId.trim();
                cy.log(`Transaction to Delete: ${trimmedTransactionId}`);

                // Click the delete link for the first transaction
                cy.get(`${selectors.table} tbody tr:nth-child(1) > :nth-child(8) > div > .Link`).should('be.visible').click();

                // Handle uncaught exception
                Cypress.on('uncaught:exception', (err, runnable) => {
                    if (err.message.includes('Cannot read properties of null')) {
                        return false;
                    }
                });

                // Click the delete button
                cy.get(selectors.deleteButton).contains('Delete').click();

                // Handle and verify the confirmation dialog
                cy.on('window:confirm', (message) => {
                    // Assert the message in the dialog
                    expect(message).to.equal('Are you sure you would like to Delete this Transaction?');
                    return true; // Click "OK"
                });

                // Verify the transaction no longer exists in the table
                cy.get(`${selectors.table} tbody`).should('not.contain', trimmedTransactionId);
            });
    });
});
