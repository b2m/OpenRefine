describe(__filename, function () {
  it('Ensures a column is removed from the data-table', function () {
    cy.loadAndVisitProject('food.mini');

    cy.columnActionClick('Shrt_Desc', ['Remove column']);

    cy.assertNotificationContainingText('Remove column Shrt_Desc');

    cy.columnActionClick('Water', ['Remove column']);

    cy.assertNotificationContainingText('Remove column Water');

    cy.get('.data-table-header').find('th').should('have.length', 3);

    cy.assertGridEquals([
      ['NDB_No', 'Energ_Kcal'],
      ['01001', '717'],
      ['01002', '717'],
    ]);
  });
  it('Ensures a column is renamed in the data-table', function () {
    cy.loadProject('food.mini').then((projectId) => {
      cy.visit(
        Cypress.env('OPENREFINE_URL') + '/project?project=' + projectId);
    });
    cy.columnActionClick('Shrt_Desc', ['Facet', 'Text facet']);
    cy.getFacetContainer('Shrt_Desc').should('exist');

    cy.columnActionClick('Shrt_Desc', ['Rename column']);
    cy.waitForDialogPanel();
    cy.get('.dialog-container .dialog-body input').clear();
    cy.get('.dialog-container .dialog-body input').type('test_rename_butter');
    cy.get('.dialog-container .dialog-footer button').contains('OK').click();

    cy.assertNotificationContainingText('Rename column Shrt_Desc');
    cy.getFacetContainer('test_rename_butter')
        .find('.facet-choice')
        .should('have.length', 2);

    cy.assertCellEquals(0, 'test_rename_butter', 'BUTTER,WITH SALT');
    cy.assertCellEquals(1, 'test_rename_butter', 'BUTTER,WHIPPED,WITH SALT');
  });
});
