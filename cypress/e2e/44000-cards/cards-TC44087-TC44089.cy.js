describe('Cards', () => {
    beforeEach(() => {
        cy.userLoginLuca();
        cy.viewport(1920, 1080);
        cy.fixture('lucaURL.json').as('lucaURL');
    });

    const selectors = {
        menu: ':nth-child(11) > .Menu_TopMenu > div > a',
        cards: '.open > .Menu_DropDownPanel > .Menu_SubItemsPlaceholder > .Link',
        dateField: ':nth-child(2) > .erDate',
        mandatoryField: '.ThemeGrid_Width6.Mandatory',
        toastMessage: '.toast',
        feedbackText: '.Feedback_Message_Success',
        transactionLink: ':nth-child(2) > :nth-child(3) > div > .Link',
        saveButton: '.DirtyItemsButton',
        table: 'table#DublinTheme_wt71_block_wtMainContent_wtCDTable.TableRecords.OSFillParent',
        tableHeaders: 'thead > tr > th'
    };
    const navigateToCards = () => {
        cy.get(selectors.menu).click({ force: true });
        cy.get(selectors.cards).click({ force: true });
    };

    const saveWithCtrlS = (format, shouldPass) => {
        // Enter date format and save using Ctrl+S
        cy.get(selectors.dateField).clear().type(format);
        cy.get(selectors.mandatoryField).type('{ctrl}s');
        verifyFeedback(shouldPass);
        verifyRetainedValue(format, shouldPass);
    };

    const validateDateFormat = (format, shouldPass) => {
        // Step 1: Click transaction link, enter date format, and save using Ctrl+S
        //cy.get(selectors.transactionLink).click();
        cy.get(`${selectors.table} tbody tr:nth-child(1) > :nth-child(8) > div > .Link`).should('be.visible').click();
        cy.get(selectors.dateField).clear().type(format);
        cy.get(selectors.dateField).type('{ctrl}s');
        verifyFeedback(shouldPass);

        // Step 2: Navigate back to transaction list
        // cy.visit('https://extremereachinc-tst.outsystemsenterprise.com/SimplyFastPA2/PurchaseOrderTransactions.aspx?(Not.Licensed.For.Production)=&PageTenantID=252');

        // Step 3: Click transaction link again, re-enter date format, and save using the button
        // cy.get(selectors.transactionLink).click();
        cy.get(selectors.dateField).clear().type(format);
        cy.get(selectors.saveButton).click();
        verifyFeedback(shouldPass);
    };

    const verifyFeedback = (shouldPass) => {
        if (shouldPass) {
            cy.get('.Feedback_Message_Success', { timeout: 5000 }).should('be.visible');
        } else {
            cy.get('.toast').contains('Date must be between 6/20/2023 and 6/27/2023');
        }
    };

    const verifyRetainedValue = (format, shouldPass) => {
        if (shouldPass) {
            // Ensure the saved value persists after reloading
            cy.reload();
            //cy.get(selectors.transactionLink).click();
            cy.get(`${selectors.table} tbody tr:nth-child(1) > :nth-child(8) > div > .Link`).should('be.visible').click();
            cy.get(selectors.dateField).should('have.value', format);
        }
    };

    const saveWithButton = (format, shouldPass) => {
        // Re-enter date format and save using the Save Button
        cy.get(selectors.dateField).clear().type(format);
        cy.get(selectors.saveButton).click();
        verifyFeedback(shouldPass);
        verifyRetainedValue(format, shouldPass);
    };

    const validateToastMessage = (expectedText) => {
        cy.get(selectors.toastMessage).should('be.visible').and('have.text', expectedText);
    };

    it('TC44087', function () {
        /*
        Module: Cards
        Last Updated: Syed (9/1/2025)
        High Level Test Step : 
        7. For Eff. Date show, verify error message for dates outside of the Period date range.
        Expected: Error message displays:  "Date must be between XXX and XXX".
        */

        //Go to cards
        navigateToCards();

        //Click one of the Vendor name
        cy.get('#DublinTheme_wt71_block_wtMainContent_wtCDTable_ctl03_wt185').click({ force: true });

        //Click on the Effective Date field
        cy.get(
            '#DublinTheme_wt242_block_wtMainContent_WebPatterns_wt23_block_wtColumn1_WebPatterns_wt182_block_wtPanelContent_wtLedgerTransaction_EffectiveDate'
        ).click({ force: true });

        //Change date on Effective Date field
        cy.get(
            '#DublinTheme_wt242_block_wtMainContent_WebPatterns_wt23_block_wtColumn1_WebPatterns_wt182_block_wtPanelContent_wtLedgerTransaction_EffectiveDate'
        )
            .clear()
            .type('06/27/2024');
        cy.wait(1000);
        cy.get('#DublinTheme_wt242_block_wtMainContent_WebPatterns_wt23_block_wtColumn1_WebPatterns_wt182_block_wtPanelContent').click({
            force: true
        });

        //Error message appear
        cy.get('.toast-message').should('be.visible').and('contain.text', 'Date must be between 6/20/2023 and 6/27/2023');
        cy.wait(1000);
    });

    it('TC44088', function () {
        /*
        Module: Cards
        Last Updated: Syed (13/1/2025)
        High Level Test Step : 
        8. Verify the effective date field - calendar
        Expected: 1.  Able to save (Ctrl+S and button) updates with/without focus in the field.
                  2.  Date is not blank when loading the transaction again.
        */

        //Go to cards
        navigateToCards();

        //Click one of the Vendor name
        cy.get(`${selectors.table} tbody tr:nth-child(1) > :nth-child(8) > div > .Link`).should('be.visible').click();
        cy.get(selectors.dateField).clear();
        //cy.wait(1000);
        cy.get('.DirtyItemsButton').type('{ctrl}s');
        cy.wait(1000);
        validateToastMessage('×Effective Date is invalid');
        cy.wait(10000);
        cy.get('.DirtyItemsButton').click();
        validateToastMessage('×Error: Month/Day is invalid.×Effective Date is invalid');
        cy.wait(10000);
        cy.get(selectors.dateField).type('06/25/2023');
        cy.wait(1000);
        cy.get('[style="min-height: 60px;"] > .Columns > .ColLast > :nth-child(1)').click();
        cy.get('.DirtyItemsButton').click({ force: true });
        cy.wait(10000);
        cy.get(`${selectors.table} tbody tr:nth-child(1) > :nth-child(8) > div > .Link`).click({ force: true });
        cy.get(selectors.dateField).should('have.value', '06/25/2023');

        // Handle specific Cypress exception gracefully
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('Cannot read properties of undefined')) {
                return false;
            }
        });
    });

    it('TC44089', function () {
        /*
        Module: Cards
        Last Updated: Syed (13/1/2025)
        High Level Test Step : 
        8. Verify the effective date field - calendar
        Expected: 1.  Able to save (Ctrl+S and button) updates with/without focus in the field.
                  2.  Date is not blank when loading the transaction again.
        */

        //Go to cards
        navigateToCards();
        const validFormats = ['12292024', '122924', '12/29/2024', '12/29/24'];

        // Handle specific Cypress exception gracefully
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('Cannot read properties of undefined')) {
                return false;
            } else if (err.message.includes('Cannot read properties of null')) {
                return false;
            }
        });

        // Validate each date format
        validFormats.forEach((format) => {
            validateDateFormat(format, false);
        });
    });
});
