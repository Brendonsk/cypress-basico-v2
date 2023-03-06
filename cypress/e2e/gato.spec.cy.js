// <reference types="Cypress" />

//#region aula 12
it('Achar gato visível', function() {
  cy.visit('./src/index.html');
  cy.contains('🐈');
})
//#endregion