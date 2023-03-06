// <reference types="Cypress" />

//#region aula 7
it('7.2 EX - Testa a página da política de privacidade de forma independente', function() {
    cy.visit('./src/privacy.html');
    cy.contains('Talking About Testing').should('be.visible');
})
//#endregion