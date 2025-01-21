import "cypress-real-events"; 
import { func } from "joi";

describe('Cards - Verify', ()=>{
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
        tableHeaders: 'thead > tr > th'
    };

    const navigateEditCard = () => {
        cy.get(selectors.menu).click();
        cy.wait(2000);
        cy.get(selectors.subItemMenu).click();
    };

    it('TC44012', function(){
        /*
        Module: Cards
        Last Updated : Syed (9/1/2025)
        High Level Test Steps:
        13. Verify the default sort is by Trans #.  516300.
        Expected: -
        */

        navigateEditCard();
        cy.get("table[id= 'DublinTheme_wt71_block_wtMainContent_wtCDTable'] thead").find('th')
        cy.get('thead > tr > :nth-child(8)')
        .should('be.visible')
        .and('contain.text', 'Trans #')
        .click();
    });

    it('TC44013', function(){
        /*
        Module: Cards
        Last Updated : Syed (9/1/2025)
        High Level Test Steps: 
        14. Verify sorting for all columns.  516300.
        Expected: Able to sort by ascending and descending order for all columns.
        */
        navigateEditCard();

        const arrayTable =["ATTCH", "Card #", "Card Name", "Vendor Name", "Envelope #", "Trans #", "Status", "Amount", "Batch", "User Name"];

        arrayTable.forEach(element => {
            cy.get(selectors.table)
                .contains( "th",element, { timeout: 10000 }) // Adding timeout to handle delays
                .should('be.visible')
                .click({ force: true })
                .wait(2000);
            });
    });

    it('TC44014', function(){
        /*
        Module: Cards
        Last Updated : Syed (9/1/2025)
        High Level Test Steps: 
        15. Verify record count
        Expected: -
        */
       navigateEditCard();
       cy.get('.Counter_Message').then(($Counter_Message) => {
        const messageText = $Counter_Message.text();// Extract the text content

         // Display the message in the Cypress log
        cy.log('Extracted Message:', messageText);

        //Display the message to the browser console
        console.log('Extracted Message:', messageText);
       });
    });

    it('TC44015', function(){
        /*
        Module: Cards
        Last Updated : Syed (9/1/2025)
        High Level Test Steps: 
        16. Verify Trans Status default.
        Expected: Default is Not Posted and displays only those transactions.
        */
       navigateEditCard();
       cy.get('select.ThemeGrid_Width2').select('NOT POSTED'); // Trans Status is in NOT POSTED status
       cy.wait(2000);
       //verify that all displayed trans have the NOT POSTED status
       cy.get("#DublinTheme_wt71_block_wtMainContent_wtCDTable tbody tr").each(($row) => {
        cy.wrap($row)
        .find('td') //adjust selector to target status column
        .contains('NOT POSTED')
        .should('exist'); //ensure the row contains 'NOT POSTED'
       });
    });

    it('TC44016', function() {
        /*
        Module: Cards
        Last Updated : Syed (13/1/2025), Syed (9/1/2025)
        High Level Test Steps: 
        17. Select the All Trans Status.
        Expected:  All Posted and Not Posted transactions display. The Post and Audit Reports buttons don't display.
                Selecting a transaction then the Exit button returns back to the same status and buttons.
        */
        navigateEditCard();
        cy.get(selectors.transStatus).select('ALL'); 
        cy.wait(1000); 
    
        cy.get('.btn-danger > .btn-target').should('not.exist');  
        cy.get('.btn-primary > .btn-target').should('not.be.visible'); 
        
        // Verify that all transactions (Posted and Not Posted) are displayed
        cy.get(`${selectors.table} tbody tr`).each(($row) => {
            cy.wrap($row).find('td:nth-child(9)').invoke('text').then((status) => {
                // Check that the status is either "POSTED" or "NOT POSTED"
                expect(status.trim()).to.be.oneOf(['POSTED', 'NOT POSTED']);
            });
        }); 
        cy.wait(1000);
        // Click only the first transaction row
        cy.get(`${selectors.table} tbody tr:nth-child(1) > :nth-child(8) > div > .Link`)
            .should('be.visible')
            .click();
    
    
        // Verify that the "Exit" button exists before clicking it
        cy.get('.btn-warning > .btn-target')
            .should('be.visible') 
            .click();
    
        cy.wait(2000);

        // Verify that the status is still set to 'ALL' and that buttons are still not displayed
        cy.get(selectors.transStatus).should('have.value', 'ALL');
        cy.get('.btn-danger > .btn-target').should('not.be.visible'); 
        cy.get('.btn-primary > .btn-target').should('not.be.visible');
    });

    it('TC44017', function() {
        /*
        Module: Cards
        Last Updated : Syed (13/1/2025), Syed (9/1/2025)
        High Level Test Steps: 
        18. Select the Posted Trans Status.
        Expected: Only Posted transactions display.  The Post and Audit Reports buttons don't display.  
                Selecting a transaction then the Exit button returns back to the same status and buttons.
        */
        navigateEditCard();
        cy.get(selectors.transStatus).select('POSTED'); 
        cy.wait(1000);

        cy.get('.btn-danger > .btn-target').should('not.exist');  
        cy.get('.btn-primary > .btn-target').should('not.be.visible');
    
        // Verify that all transactions (Posted) is displayed
        cy.get(`${selectors.table} tbody tr`).each(($row) => {
            cy.wrap($row).find('td:nth-child(9)').invoke('text').then((status) => {
                // Check that the status is "POSTED"
                expect(status.trim()).to.equal('POSTED');
            });
        }); 
    
        // Click only the first transaction row
        cy.get(`${selectors.table} tbody tr:nth-child(1) > :nth-child(8) > div > .Link`)
            .should('be.visible')
            .click();
    
    
        // Verify that the "Exit" button exists before clicking it
        cy.get('.btn-warning > .btn-target')
            .should('be.visible') 
            .click();
    
        cy.wait(2000);

        // Verify that the status is still set to 'ALL' and that buttons are still not displayed
        cy.get(selectors.transStatus).should('have.value', 'ALL');
        cy.get('.btn-danger > .btn-target').should('not.be.visible'); 
        cy.get('.btn-primary > .btn-target').should('not.be.visible');
    });

    it('TC44018', function(){
        /*
        Module: Cards
        Last Updated : Syed (13/1/2025)
        High Level Test Steps: 
        19. Load transactions using every link for every transaction status.
        Expected: -
        */

        const statuses = ['ALL', 'POSTED', 'NOT POSTED'];

        statuses.forEach((status)=>{
            navigateEditCard();

            cy.get(selectors.transStatus).select(status);
            cy.wait(1000);
            
            cy.get(`${selectors.table} tbody tr`).each(($row) => {
                cy.wrap($row).find('td:nth-child(9)').invoke('text').then((text) => {
                    // When 'ALL' is selected, allow both 'POSTED' and 'NOT POSTED'
                    if (status === 'ALL') {
                        expect(text.trim()).to.be.oneOf(['POSTED', 'NOT POSTED']);
                    } else {
                        // For 'POSTED' or 'NOT POSTED'
                        expect(text.trim()).to.equal(status);
                    }
                });
            });
        });

        cy.get(`${selectors.table} tbody tr:nth-child(1) > :nth-child(8) > div > .Link`)
        .should('be.visible')
        .click();

        cy.get('.btn-warning > .btn-target')
            .should('be.visible') 
            .click();

        cy.wait(2000);

        cy.get(selectors.transStatus).select('ALL'); 
        cy.get('.btn-danger > .btn-target').should('not.exist'); 
        cy.get('.btn-primary > .btn-target').should('not.be.visible');
    });
});