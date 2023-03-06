// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html');
  })

  //#region aula 1
  it('1 - Verifica o título da aplicação', function() {
    cy.title().should('contain', 'Central de Atendimento ao Cliente TAT');
  })
  //#endregion

  //#region aula 2
  it('2 - Preenche os campos obrigatórios e envia o formulário', function() {
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

  it('2.2 EX - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
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

  it('2.3 EX - Digitar caracteres não numéricos no campo telefone não funciona', function() {
    cy.get('#phone')
      .type('kunekune')
      .should("be.empty");
  });

  it('2.4 EX - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
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

  it('2.5 EX - Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
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

  it('2.6 EX - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.contains('button','Enviar').click();


    cy.get('.error')
      .should("be.visible");
  });

  it('2.7 EX - Envia o formulário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit('Sorawo', 'Kamikoshi', 'skyfish@gmail.com', '🐟');
    cy.get('.success')
      .should("be.visible");
  });
  //#endregion

  //#region aula 3
  it('3 - Seleciona um produto (YouTube) por seu texto', function() {
    cy.get('#product')
      .select("YouTube")
      .should("have.value", "youtube");
  });

  it('3.1 EX - Seleciona um produto (Mentoria) por seu valor (value)', function() {
    cy.get('#product')
      .select("mentoria")
      .should("have.value", "mentoria");
  });

  it('3.2 EX - Seleciona um produto (Blog) por seu índice', function() {
    cy.get('#product')
      .select(1)
      .should("have.value", "blog");
  });
  //#endregion

  //#region aula 4
  it('4 - Marca o tipo de atendimento "Feedback', function() {
    cy.get('input[value="feedback"]')
      .check();
  })

  it('4.1 EX - Marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]').each(($el) => {
      cy.wrap($el).check();
    })
  })
  //#endregion

  //#region aula 5
  it('5 - Marca ambos checkboxes, depois desmarca o último', function() {
    cy.get('input[type="checkbox"]')
      .each(($el) => {
        cy.wrap($el)
          .check()
          .should("be.checked");
      })
      .last()
      .uncheck()
      .should("not.be.checked");
  })

  it('5.1 EX - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Sorawo');
    cy.get('#lastName').type('Kamikoshi');
    cy.get('#email').type('skyfish@gmail.com');

    cy.get('#product').select("YouTube");

    cy.get('#support-type input[value="feedback"]').check();

    cy.get('#check input[value="phone"]').check();

    cy.get('#open-text-area')
      .type("🐟");

    cy.contains('button','Enviar').click();

    cy.get('.error')
      .should("be.visible");  
  });
  //#endregion

  //#region aula 6
  it('6 - Seleciona um arquivo da pasta fixtures', function() {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      });
  });

  it('6.1 EX - Seleciona um arquivo simulando um drag-and-drop', function() {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      });
  });

  it('6.2 EX - Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    cy.fixture('example.json').as('sampleFile');
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      });
  });
  //#endregion

  //#region aula 7
  it('7 - Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank');
  });

  it('7.1 EX - Acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.contains('Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
        .title()
        .should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade');
  });
  //#endregion

  //#region aula 11
  Cypress._.times(4, function(n) {
    it(`11.1 EX - repeat ${n+1}`, function() {
      cy.log(`listen`);
    });
  });

  it('11.2 EX - Teste que força mensagens de sucesso e erro', function() {
    cy.get('.success')
      .invoke('show')
      .should('be.visible')
      .should('contain','Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible');

    cy.get('.error')
      .invoke('show')
      .should('be.visible')
      .should('contain','Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible');
  })

  it('11.3 EX - Preenche a area de texto usando o comando invoke', function() {
    cy.get('textarea')
      .invoke('val','🐟')
      .should('have.value','🐟');
  });

  it('11.4 EX - Faz uma requisição HTTP', function() {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').then(function(response) {
      expect(response.status).to.equal(200)
      expect(response.body).to.include('CAC TAT');
    });
  })
  //#endregion
})