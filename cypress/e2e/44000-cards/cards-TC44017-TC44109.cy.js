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
        tableHeaders: 'thead > tr > th'
    };
    const navigateToCards = () => {
        cy.get(selectors.menu).click({ force: true });
        cy.get(selectors.cards).click({ force: true });
    };

    it('TC44107', function () {
        /*
        Module: Cards
        Last Updated: Syed (14/1/2025)
        High Level Test Step : 
        1. Look at all the columns that display by default.
        Expected: Hamburger, Acct soft label, Error, Prod/Memo/Ins soft labels, 3rd Pty Ven, Amount, Description, Merchant, CF soft label + 5 columns.
        */

        //Go to cards
        navigateToCards();

        //Click one of the Card#
        cy.get(`${selectors.table} tbody tr:nth-child(1) > :nth-child(8) > div > .Link`).should('be.visible').click();
        cy.wait(2000);

        //Click Hamburger and verify
        cy.get('[class="column-picker-icon glyphicon glyphicon-cog"]').click({ force: true });
        cy.get('[role="option"]').contains('Error').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]').contains('LO*').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]').contains('EPI').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]').contains('ST').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]').contains('M1').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]').contains('M2').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]').contains('M3').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]').contains('M4').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]').contains('IN').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]').contains('Tax Code').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked');
        cy.get('[role="option"]')
            .contains('3rd Pty Ven')
            .find('[type="checkbox"]')
            .should('be.visible')
            .invoke('removeAttr', 'checked')
            .click();
        cy.get('[role="option"]')
            .contains('Merchant')
            .find('[type="checkbox"]')
            .should('be.visible')
            .invoke('removeAttr', 'checked')
            .click();

        //Verify all column in the table by default
        cy.get('[id="DublinTheme_wt242_block_wtMainContent_DataGridComponent_wtpayrollGrid_block_wtGridCont"]');
        cy.get('[draggable="true"]').contains('MAJR*').should('be.visible');
        cy.get('[draggable="true"]').contains('Error').should('be.visible');
        cy.get('[draggable="true"]').contains('LO*').should('be.visible');
        cy.get('[draggable="true"]').contains('EPI').should('be.visible');
        cy.get('[draggable="true"]').contains('ST').should('be.visible');
        cy.get('[draggable="true"]').contains('M1').should('be.visible');
        cy.get('[draggable="true"]').contains('M2').should('be.visible');
        cy.get('[draggable="true"]').contains('M3').should('be.visible');
        cy.get('[draggable="true"]').contains('M4').should('be.visible');
        cy.get('[draggable="true"]').contains('IN').should('be.visible');
        cy.get('[draggable="true"]').contains('3rd Pty Ven').should('be.visible');
        cy.get('[draggable="true"]').contains('Amount').should('be.visible');
        cy.get('[draggable="true"]').contains('Description').should('be.visible');
        cy.get('[draggable="true"]').contains('Merchant').should('be.visible');
    });

    it('TC44108', function () {
        /*
        Module: Cards
        Last Updated: Syed (14/1/2025)
        High Level Test Step : 
        2. Verify hamburger columns.
        Expected: Error, Prod/Memo soft labels for codes used by tenant, Tax Code, 3rd Pty Ven, Merchant columns display.  Selecting/De-selecting column determines what displays in the grid.
        */

        //Go to cards
        navigateToCards();

        //Click one of the Card#
        cy.get(`${selectors.table} tbody tr:nth-child(1) > :nth-child(8) > div > .Link`).should('be.visible').click();
        cy.wait(2000);

        //Click Hamburger. Deselecting and selecting
        cy.get('[class="column-picker-icon glyphicon glyphicon-cog"]').click({ force: true });
        cy.get('[role="option"]').contains('Error').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]').contains('LO*').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]').contains('EPI').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]').contains('ST').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]').contains('M1').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]').contains('M2').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]').contains('M3').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]').contains('M4').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]').contains('IN').find('[type="checkbox"]').should('be.visible').invoke('removeAttr', 'checked').click();
        cy.get('[role="option"]')
            .contains('Tax Code')
            .find('[type="checkbox"]')
            .should('be.visible')
            .invoke('removeAttr', 'checked')
            .click();
        cy.get('[role="option"]')
            .contains('3rd Pty Ven')
            .find('[type="checkbox"]')
            .should('be.visible')
            .invoke('removeAttr', 'checked')
            .click();
        cy.get('[role="option"]')
            .contains('Merchant')
            .find('[type="checkbox"]')
            .should('be.visible')
            .invoke('removeAttr', 'checked')
            .click();

        //Verify what display on grid based on item that are click on hamburger option
        cy.get('[id="DublinTheme_wt242_block_wtMainContent_DataGridComponent_wtpayrollGrid_block_wtGridCont"]');
        cy.get('[draggable="true"]').contains('MAJR*').should('be.visible');
        cy.get('[draggable="true"]').contains('Error').should('be.visible');
        cy.get('[draggable="true"]').contains('LO*').should('be.visible');
        cy.get('[draggable="true"]').contains('EPI').should('be.visible');
        cy.get('[draggable="true"]').contains('ST').should('be.visible');
        cy.get('[draggable="true"]').contains('M1').should('be.visible');
        cy.get('[draggable="true"]').contains('M2').should('be.visible');
        cy.get('[draggable="true"]').contains('M3').should('be.visible');
        cy.get('[draggable="true"]').contains('M4').should('be.visible');
        cy.get('[draggable="true"]').contains('IN').should('be.visible');
        cy.get('[draggable="true"]').contains('Tax Code').should('be.visible');
        cy.get('[draggable="true"]').contains('3rd Pty Ven').should('be.visible');
        cy.get('[draggable="true"]').contains('Amount').should('be.visible');
        cy.get('[draggable="true"]').contains('Description').should('be.visible');
        cy.get('[draggable="true"]').contains('Merchant').should('be.visible');
    });

    it('TC44109', function () {
        /*
        Module: Cards
        Last Updated: Syed (14/1/2025)
        High Level Test Step : 
        3. Verify the vertical scroll bar to the right of the distribution grid.
        Expected: The distribution grid scroll bar doesn't initially display until it's needed.
        */

        //Go to cards
        navigateToCards();

        //Click one of the Card#
        cy.get(`${selectors.table} tbody tr:nth-child(1) > :nth-child(8) > div > .Link`).should('be.visible').click();
        cy.wait(2000);

        //Verify the grid is NOT scrollable initially
        cy.get('[wj-part="root"]').then(($el) => {
            const element = $el[0];

            // Check if the element is NOT scrollable
            const isScrollable = element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
            expect(isScrollable).to.be.false; // Assert that the element is not scrollable
        });

        //Add multiple rows dynamically
        for (let index = 0; index < 25; index++) {
            cy.get(
                '[class="wj-cell AccountCells"], [class="wj-cell wj-alt ErrStyle cell-dirty"], [class="wj-cell ErrStyle cell-dirty"], [class="wj-cell ErrStyle"]'
            )
                .first()
                .rightclick({ force: true });

            // Click the 'Insert 1 Blank Row' option
            cy.get('[class="wj-menu-cell"]').contains('Insert 1 Blank Row').click();
        }

        //Verify the grid becomes scrollable after adding rows
        cy.get('[wj-part="root"]').then(($el) => {
            const element = $el[0];

            // Check if the element is Scrollable
            const isScrollable = element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
            expect(isScrollable).to.be.true; // Assert that the element is  scrollable
        });

        // Scroll from top to bottom
        cy.get('[wj-part="root"]')
            .scrollTo('top') // Scroll to the top of the grid
            .wait(500);

        cy.get('[wj-part="root"]')
            .scrollTo('bottom') // Scroll to the bottom of the grid
            .wait(500);

        // Assert scrolling success by checking the scroll position
        cy.get('[wj-part="root"]').then(($el) => {
            const element = $el[0];
            expect(element.scrollTop).to.be.greaterThan(0); // Verify grid was scrolled
        });
    });
});
