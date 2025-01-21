describe('Cards - Load Unposted Transaction', ()=>{
    beforeEach(()=>{
        cy.userLoginLuca();
        cy.viewport(1920, 1080);
        cy.fixture('initializationConfig.json').as('initializationConfig');
    });

    const selectors = {
        menu: ':nth-child(11) > .Menu_TopMenu > div > a',
        subItemMenu: '.open > .Menu_DropDownPanel > .Menu_SubItemsPlaceholder > .Link',
        trans: ':nth-child(2) > :nth-child(8) > div > .Link',
        transStatus: 'select.ThemeGrid_Width2',
        table: 'table#DublinTheme_wt71_block_wtMainContent_wtCDTable.TableRecords.OSFillParent',
        tableHeaders: 'thead > tr > th',
        vendorName: '.Panel_content > :nth-child(2) > .ThemeGrid_Width4',
        desc: ':nth-child(1) > .ThemeGrid_Width4',
        documentNumber: '[id="DublinTheme_wt242_block_wtMainContent_WebPatterns_wt23_block_wtColumn1_WebPatterns_wt192_block_wtPanelContent_wtLedgerTransaction_DocumentNumber"]',
        saveButton: '.DirtyItemsButton',
        postButton: '.btn-danger > .btn-target',
        continueButton: '.blue',
        noButtonPost: '.os-internal-ui-dialog-buttonset > :nth-child(2)'
    };

    const navigateEditCard = () => {
        cy.get(selectors.menu).click();
        cy.wait(2000);
        cy.get(selectors.subItemMenu).click();
    };

    function loadNotPostedTransaction(){
        navigateEditCard();
        cy.get(selectors.transStatus).select('NOT POSTED');
        cy.wait(1000);

        // Verify that all transactions (NOT POSTED) is displayed
        cy.get(`${selectors.table} tbody tr`).each(($row) => {
            cy.wrap($row).find('td:nth-child(9)').invoke('text').then((status) => {
                // Check that the status is "NOT POSTED"
                expect(status.trim()).to.equal('NOT POSTED');
            });
        });

        // Click only the first transaction row
        cy.get(`${selectors.table} tbody tr:nth-child(1) > :nth-child(8) > div > .Link`)
            .should('be.visible')
            .click();

        cy.wait(2000)
    }
    
    it('TC44072', function(){
        /*
        Module: Cards
        Last Updated : Syed (13/1/2025)
        High Level Test Steps:
        1. Load unposted transaction and select a Vendor.
        Expected: Able to select Vendor, and Vendor's address information displays.
        */
        loadNotPostedTransaction();

    });

    it('TC44073', function(){
        /*
        Module: Cards
        Last Updated : Syed (13/1/2025)
        High Level Test Steps:
        2. Add description, make a few edits, and save.
        Expected: Able to save edits and select the transaction to Post.
        */
        loadNotPostedTransaction();
        cy.get(selectors.vendorName).select('NICOLE SEBRING');
        cy.get(selectors.desc).clear().type('Smoke Testing');
        cy.get(selectors.documentNumber).clear().type('Envelop99');
        //cy.get('body').type('{ctrl}s'); ctrl + s to save
        cy.get(selectors.saveButton).click();
        cy.wait(2000);
        cy.get(`${selectors.table} tbody tr:nth-child(1) > [style=""] > div > input`).click();
        cy.get(selectors.postButton).click();
        cy.get(selectors.continueButton).click();
        cy.get(selectors.noButtonPost).click();
    });

    it('TC44074', function() {
        /*
        Module: Cards
        Last Updated: Syed (13/1/2025)
        High Level Test Steps:
        3. Verify Vendor offset line on Save.
        Expected: -
        */
    
        loadNotPostedTransaction();

        // Select a vendor
        cy.get(selectors.vendorName).select('NICOLE SEBRING'); // Replace with a valid vendor name

        cy.get(selectors.desc).clear().type('Smoke Testing');
        cy.get(selectors.documentNumber).clear().type('Envelop99');

        cy.get(selectors.saveButton).click();
        cy.wait(2000);

        // Loop through all rows in the table to verify the vendor name is not empty
        cy.get(`${selectors.table} tbody tr`).each(($row) => {
            // Verify vendor name in the 5th column (or adjust the column index accordingly)
            cy.wrap($row)
                .find('td:nth-child(5)') // Vendor column
                .invoke('text')
                .should('not.be.empty');
        });
    });

    it('TC44075', function(){
        /*
        Module: Cards
        Last Updated : Syed (13/1/2025), Syed(8/1/2025)
        High Level Test Steps:
        4. Save button and ctrl+s to save.
        Expected: -
        */
        loadNotPostedTransaction();
        cy.get(selectors.vendorName).select('NICOLE SEBRING');
        cy.get(selectors.desc).clear().type('Smoke Testing');
        cy.get(selectors.documentNumber).clear().type('Envelopno97');
        //cy.get('body').type('{ctrl}s');
        cy.get(selectors.saveButton).trigger('keydown', { ctrlKey: true, keyCode: 83 });

    });
})