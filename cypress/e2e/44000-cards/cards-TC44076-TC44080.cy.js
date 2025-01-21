describe('Cards - Verify', () => {
    beforeEach(() => {
        cy.userLoginLuca();
        cy.fixture('initializationConfig.json').as('initializationConfig');
    });

    const selectors = {
        menu: ':nth-child(11) > .Menu_TopMenu > div > a',
        subItemMenu: '.open > .Menu_DropDownPanel > .Menu_SubItemsPlaceholder > .Link',
        trans: ':nth-child(2) > :nth-child(8) > div > .Link',
        effectiveDate: ':nth-child(2) > .erDate',
        vendorName: '.Panel_content > :nth-child(2) > .ThemeGrid_Width4',
        toastMessage: '.toast-message',
        FeedbackMessage: '.Feedback_Message_Error',
        description: ':nth-child(1) > .ThemeGrid_Width4',
        ddate: ':nth-child(1) > .erDate',
        nnumber: '[name="DublinTheme_wt242$block$wtMainContent$WebPatterns_wt23$block$wtColumn1$WebPatterns_wt192$block$wtPanelContent$wtLedgerTransaction_DocumentNumber"]'
    };

    const navigateEditCard = () => {
        cy.get(selectors.menu).click();
        cy.get(selectors.subItemMenu).click();
    };

    const validateToastMessage = (expectedText) => {
        cy.get(selectors.toastMessage).should('be.visible').and('have.text', expectedText);
    };

    const validateFeedbackMessage = (expectedText) => {
        cy.get(selectors.FeedbackMessage).should('be.visible').and('have.text', expectedText);
    };

    it('TC44076', function () {
        /*
        Module: Cards
        Last Updated : Syed(8/1/2025)
        High Level Test Steps:
        1. Verify Effective Date is required.
        Expected: Error displays:  Error: Month/Day is invalid.
        */
        navigateEditCard();
        cy.get(selectors.trans).click();
        cy.wait(1000);
        cy.get(selectors.effectiveDate).clear(); 
        cy.get('.DirtyItemsButton').click(); // save button
        cy.wait(2000);
        validateToastMessage('Error: Month/Day is invalid.Effective Date is invalid'); // Validate the error message
    });

    it('TC44077', function(){
        /*
        Module: Cards
        Last Updated : Syed(8/1/2025)
        High Level Test Steps:
        2. Verify Vendor is a required field.
        Expected: Can't save transaction without vendor with error message displaying: 
                  "Vendor is a required field and can not be empty."
        */
        navigateEditCard();
        cy.get(selectors.trans).click();
        cy.wait(1000);
        cy.get(selectors.vendorName).select('-');
        cy.get('.DirtyItemsButton').click(); // save button
        cy.wait(2000);
        validateFeedbackMessage("'Vendor' is a required field and can not be empty."); //typo 'field'
    });

    it('TC44078', function(){
        /*
        Module: Cards
        Last Updated : Syed(8/1/2025)
        High Level Test Steps:
        3. Verify Document Date is required.
        Expected: -
        */
        navigateEditCard();
        cy.get(selectors.trans).click();
        cy.wait(1000);
        cy.get(selectors.ddate).clear();
        cy.get('.DirtyItemsButton').click(); // save button
        cy.wait(2000);
        validateFeedbackMessage("'Date' is a required field and can not be empty."); //have typo 'field'
    });

    it('TC44079', function(){
        /*
        Module: Cards
        Last Updated : Syed(8/1/2025)
        High Level Test Steps:
        4. Verify Document Number is required.
        Expected: Can't save transaction without document number with error message displaying: 
                  "Number is a required field and can not be empty."  Save of change in field is retained.

        */
        navigateEditCard();
        cy.get(selectors.trans).click();
        cy.wait(1000);
        cy.get(selectors.nnumber).clear();
        cy.get('.DirtyItemsButton').click(); // save button
        cy.wait(2000);
        validateFeedbackMessage("'Number' is a required field and can not be empty."); //typo 'field'
    });

    it('TC44080', function(){
        /*
        Module: Cards
        Last Updated : Syed(8/1/2025)
        High Level Test Steps:
        5. Verify required Header Description field.
        Expected: Can't save transaction without desctiption with error message displaying:
                  "Description is a required field and can not be empty."
        */
        navigateEditCard();
        cy.get(selectors.trans).click();
        cy.wait(1000);
        cy.get(selectors.description).clear();
        cy.get('.DirtyItemsButton').click(); // save button
        cy.wait(2000);
        validateFeedbackMessage("'Description' is a required field and can not be empty."); // typo 'field'
    });
});
