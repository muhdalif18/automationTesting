describe('Cards - Load Unposted Transaction', ()=>{
    beforeEach(()=>{
        cy.userLoginLuca();
        cy.viewport(1920, 1080);
        cy.fixture('initializationConfig.json').as('initializationConfig');
    });

    it('TC44070', function () {
        /*
        Module: Cards
        Last Updated : Syed (9/1/2025)
        High Level Test Steps: 
        3. Select a transaction & look at the vertical scroll bar to the right of the screen.
        Expected: Only the application scroll bar displays if needed to see the entire screen. The grid scroll bar doesn't initially display.
        */
        cy.contains('Cards').click({force: true});
        cy.get('.open > .Menu_DropDownPanel > .Menu_SubItemsPlaceholder > .Link').click({force: true});
        cy.wait(2000);
        cy.scrollTo('bottom');
     });
    
     it('TC44071', function () {
        /*
        Module: Cards
        Last Updated : Syed (13/1/2025), Syed (9/1/2025)
        High Level Test Steps: 
        4. Look at the footer of the screen.
        Expected: Environment - ShowCode (i.e. Test - HideSeek)
        */
        cy.contains('Cards').click({force: true});
        cy.get('.open > .Menu_DropDownPanel > .Menu_SubItemsPlaceholder > .Link').click({force: true});
        cy.scrollTo('bottom');
        cy.get('[class="Footer"]').contains('Test - BlackFlies_OLD');
     });

})