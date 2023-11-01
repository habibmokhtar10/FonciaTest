export class NavigationBar{
    static checkNavigationBarContent(content) {
        cy.get('.header-tab-link').should('exist').each(($element, index) => {
            cy.wrap($element).should('contain.text', content[index]);
          });
      }
}