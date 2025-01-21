Cypress.Commands.add('initialization', () => {
    Cypress.SelectorPlayground.defaults({
        selectorPriority: ['data-cy', 'data-test', 'data-testid', 'class', 'tag', 'attributes', 'nth-child']
    });
    cy.viewport(1920, 1080);
});


Cypress.Commands.add('userLogin', () => {
    Cypress.SelectorPlayground.defaults({
        selectorPriority: ['data-cy', 'data-test', 'data-testid', 'class', 'tag', 'attributes', 'nth-child']
    });
    cy.viewport(1920, 1080);

    cy.clearCookies();
    cy.clearAllSessionStorage();

    cy.fixture('initializationConfig').then((data) => {
        cy.log(JSON.stringify(data));

        cy.visit(data.websiteUrl);

        cy.get('#userName', { timeout: 30000 }).should('be.visible').type(Cypress.env('PLATFORM_USER_USERNAME_XRKL_PAYROLL_LUCA'));

        // Click the Next button
        cy.get('#nextButton', { timeout: 30000 }).should('be.visible').click();

        // Enter the password
        cy.get('#password', { timeout: 30000 }).should('be.visible').type(Cypress.env('PLATFORM_USER_PASSWORD_XRKL_PAYROLL_LUCA'));

        // Click on Login Button
        cy.get('#loginButton', { timeout: 30000 }).should('be.visible').click();
    });
});

Cypress.Commands.add('lucaVendorReportUserLogin', () => {
    Cypress.SelectorPlayground.defaults({
        selectorPriority: ['data-cy', 'data-test', 'data-testid', 'class', 'tag', 'attributes', 'nth-child']
    });
    cy.viewport(1920, 1080);

    cy.clearCookies();
    cy.clearAllSessionStorage();

    cy.fixture('luca-vendor-report').then((data) => {
        cy.log(JSON.stringify(data));

        cy.visit(data.websiteUrl);

        //Enter Username
        cy.get('#WebPatterns_wt5_block_wtUsername_wtUserNameInput', { timeout: 30000 })
            .should('be.visible')
            .type(Cypress.env('PLATFORM_USER_USERNAME_XRKL_PAYROLL_LUCA'));

        // Enter the password
        cy.get('#WebPatterns_wt5_block_wtPassword_wtPasswordInput', { timeout: 30000 })
            .should('be.visible')
            .type(Cypress.env('PLATFORM_USER_PASSWORD_XRKL_PAYROLL_LUCA'));

        // Click on Login Button
        cy.get('#WebPatterns_wt5_block_wtAction_wtLoginButton', { timeout: 30000 })
            .should('be.visible')
            .click();
    });
});


Cypress.Commands.add('clickKendoDropDown', (kendoTag, dropdownItemName) => {
    cy.get(kendoTag)
        .click()
        .then(() => {
            cy.get('.k-list-item').contains(dropdownItemName).click();
        });
});

Cypress.Commands.add('getAndTypeEnter', (tag, text) => {
    cy.get(tag, { timeout: 3000 }).type(text + '{enter}');
});

Cypress.Commands.add('getAndType', (tag, text) => {
    cy.get(tag).type(text);
});

Cypress.Commands.add('getClearAndTypeEnter', (tag, text) => {
    cy.get(tag)
        .clear()
        .type(text + '{enter}');
});

Cypress.Commands.add('getClearAndType', (tag, text) => {
    cy.get(tag).clear().type(text);
});

Cypress.Commands.add('getCheckboxSetCheck', (tag) => {
    cy.get(tag).then(($checkbox) => {
        if (!$checkbox.is(':checked')) {
            // If not checked, check it
            cy.get(tag).check();
        }
    });
});

Cypress.Commands.add('getCheckboxSetUnCheck', (tag) => {
    cy.get(tag).then(($checkbox) => {
        if ($checkbox.is(':checked')) {
            // If checked, uncheck it
            cy.get(tag).uncheck();
        }
    });
});

Cypress.Commands.add('getRandomSocialSecurityNumber', () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();

    // Generate a random 5-digit number
    const randomNumber = Math.floor(10000 + Math.random() * 90000);

    // Combine the date and the random number
    const result = `${day}${month}${randomNumber}`;

    return result;
});

Cypress.Commands.add('userLoginLuca', () => {
    Cypress.SelectorPlayground.defaults({
        selectorPriority: ['data-cy', 'data-test', 'data-testid', 'class', 'tag', 'attributes', 'nth-child']
    });
    cy.viewport(1920, 1080);

    cy.clearCookies();
    cy.clearAllSessionStorage();

    cy.fixture('initializationConfig').then((data) => {
        cy.log(JSON.stringify(data));

        cy.visit('/SimplyFastPA2/HomePage.aspx');
        //cy.pause();

        //Enter Username
        cy.get(':nth-child(1) > .OSFillParent').type(Cypress.env('PLATFORM_USER_USERNAME_XRKL_PAYROLL_LUCA_SMOKE_TEST'));
     
        // Enter the password
        cy.get(':nth-child(2) > .OSFillParent').type(Cypress.env('PLATFORM_USER_PASSWORD_XRKL_PAYROLL_LUCA_SMOKE_TEST'));

        // Click on Login Button
        cy.get('.Button').click();

        cy.get('.Button')
    });
});


Cypress.Commands.add('userLoginLucaCustomUser', (username, password) => {
    Cypress.SelectorPlayground.defaults({
        selectorPriority: ['data-cy', 'data-test', 'data-testid', 'class', 'tag', 'attributes', 'nth-child']
    });
    cy.viewport(1920, 1080);

    cy.clearCookies();
    cy.clearAllSessionStorage();

    cy.fixture('initializationConfig').then((data) => {
        cy.log(JSON.stringify(data));

        cy.visit('/SimplyFastPA2/HomePage.aspx');
        //cy.pause();

        //Enter Username
        cy.get(':nth-child(1) > .OSFillParent').type(username);
     
        // Enter the password
        cy.get(':nth-child(2) > .OSFillParent').type(password);

        // Click on Login Button
        cy.get('.Button').click();

        cy.get('.Button')
    });
});
