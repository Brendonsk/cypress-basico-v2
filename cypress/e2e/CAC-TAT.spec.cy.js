// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html');
  })

  //#region aula 1
  it('verifica o título da aplicação', function() {
    cy.title().should('contain', 'Central de Atendimento ao Cliente TAT');
  })
  //#endregion

  //#region aula 2
  it('1 EX - preenche os campos obrigatórios e envia o formulário', function() {
    cy.get('#firstName').type('Sorawo');
    cy.get('#lastName').type('Kamikoshi');
    cy.get('#email').type('skyfish@gmail.com');
    cy.get('#phone').type('00123451234');

    cy.get('#product').select("YouTube");

    cy.get('#support-type input[value="feedback"]').check();

    cy.get('#check input[value="email"]').check();

    cy.get('#open-text-area')
      .type(
        "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test",
        {delay: 0}
      );

    cy.contains('button','Enviar').click();


    cy.get('.success')
      .should("be.visible");
  })

  it('2 EX - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#firstName').type('Sorawo');
    cy.get('#lastName').type('Kamikoshi');
    cy.get('#email').type('skyfish');
    cy.get('#phone').type('00123451234');

    cy.get('#product').select("YouTube");

    cy.get('#support-type input[value="feedback"]').check();

    cy.get('#check input[value="email"]').check();

    cy.get('#open-text-area')
      .type(
        "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test",
        {delay: 0}
      );

    cy.contains('button','Enviar').click();

    cy.get('.error')
      .should("be.visible");
  });

  it('3 EX - digitar caracteres não numéricos no campo telefone não funciona', function() {
    cy.get('#phone')
      .type('kunekune')
      .should("be.empty");
  });

  it('4 EX - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Sorawo');
    cy.get('#lastName').type('Kamikoshi');
    cy.get('#email').type('skyfish@gmail.com');

    cy.get('#product').select("YouTube");

    cy.get('#support-type input[value="feedback"]').check();

    cy.get('#check input[value="phone"]').check();

    cy.get('#open-text-area')
      .type(
        "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test",
        {delay: 0}
      );

    cy.contains('button','Enviar').click();


    cy.get('.error')
      .should("be.visible");
  });

  it('5 EX - preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('#firstName')
      .type('Sorawo')
      .should('have.value', 'Sorawo')
      .clear()
      .should('be.empty');

    cy.get('#lastName')
      .type('Kamikoshi')
      .should('have.value', 'Kamikoshi')
      .clear()
      .should('be.empty');

    cy.get('#email')
      .type('skyfish@gmail.com')
      .should('have.value', 'skyfish@gmail.com')
      .clear()
      .should('be.empty');

    cy.get('#phone')
      .type('00123451234')
      .should('have.value', '00123451234')
      .clear()
      .should('be.empty');
  });

  it('6 EX - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.contains('button','Enviar').click();


    cy.get('.error')
      .should("be.visible");
  });

  it('7 EX - envia o formulário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit('Sorawo', 'Kamikoshi', 'skyfish@gmail.com', '🐟');
    cy.get('.success')
      .should("be.visible");
  });
  //#endregion

  //#region aula 3
  it('seleciona um produto (YouTube) por seu texto', function() {
    cy.get('#product')
      .select("YouTube")
      .should("have.value", "youtube");
  });

  it('1 EX - seleciona um produto (Mentoria) por seu valor (value)', function() {
    cy.get('#product')
      .select("mentoria")
      .should("have.value", "mentoria");
  });

  it('2 EX - seleciona um produto (Blog) por seu índice', function() {
    cy.get('#product')
      .select(1)
      .should("have.value", "blog");
  });
  //#endregion

  //#region aula 4
  it('marca o tipo de atendimento "Feedback', function() {
    cy.get('input[value="feedback"]')
      .check();
  })

  it('1 EX - marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]').each(($el) => {
      cy.wrap($el).check();
    })
  })
  //#endregion
})