export class Homepage{
    static checkElementExistance(element) {
        cy.get(element).should('exist').and('be.visible');
    }
    static selectRole(roleName) {
        cy.get('.profile-btn').filter(':contains("' + roleName + '")').scrollIntoView().should('exist').click({ force: true, multiple: true });
    }
    static checkCardTitleContent(roleName) {
        cy.get('.content-container app-foncia-card').should('exist').and('contain.text', roleName);
    }
    static isRoleActive(roleName,response) {
        if(response){
            cy.get('.profile-btn').filter(':contains("' + roleName + '")').scrollIntoView().should('have.class', 'active');}
        else{
            cy.get('.profile-btn').filter(':contains("' + roleName + '")').scrollIntoView().should('not.have.class', 'active',);

        }
    }
    static scrollToElement(element) {
        cy.get(element).scrollIntoView().should('exist');
    }
    static clickArrow(direction) {
        cy.get(`.pi-angle-${direction}`).click({ force: true, multiple: true });
    }
    static isAnnouceCardVisible(annouceCardNumber,response) {
        if (response){
        cy.get('app-annonce-card').eq(annouceCardNumber - 1).should(($element) => {
         const style = $element.attr('style');
         expect(style).to.be.oneOf([undefined, 'opacity: 1;']);
         }); // si les bouttons move gauche/droite ne sont pas cliquer l'attribue style ne sera pas affiché ds le code  html,sinon l'attribue style sera affiché avec la valeur 1 pourles carte visible et l'attribu 0 pour les carte invisibles  
 
        }
        else {
            cy.get(`app-annonce-card`).eq(annouceCardNumber-1).should('have.attr','style','opacity: 0;');
             }
    }
    static selectSearchOption(serchOption) {
        cy.get(`label`).filter(':contains("' + serchOption + '")').should('exist').click({ force: true, multiple: true });
    }
    static checkSearchOptionAccessibility(serchOption) {
        Homepage.selectSearchOption(serchOption)
        if (serchOption==='Rechercher'){
            cy.get(`label`).filter(':contains("Projet")').should('exist')
            cy.get(`label`).filter(':contains("Types de biens")').should('exist')
            cy.get(`label`).filter(':contains("Prix max")').should('exist')
            cy.get(`label`).filter(':contains("Ville, département, région")').should('exist')
        }
        if (serchOption==='Estimer'){
            cy.get(`label`).filter(':contains("Estimation")').should('exist')
            cy.get(`label`).filter(':contains("Votre adresse")').should('exist')
            cy.get(`label`).filter(':contains("Type de bien")').should('exist')
            cy.get(`label`).filter(':contains("Nombre de pièces")').should('exist')
        }
    


    }
    static selectRatioButton(dropDownButton,option) {
        cy.get(`.dropdown`).filter(':contains("' + dropDownButton + '")').scrollIntoView().find('button').should('exist').click({ force: true, multiple: true });
        cy.get(`.dropdown-button`).filter((index, el) => {
            return Cypress.$(el).text().trim() === option;
          }).find('.p-radiobutton-box').click({ force: true,multiple:true});
    }
    static selectCheckBox(dropDownButton,option) {
        cy.get(`.dropdown`).filter(':contains("' + dropDownButton + '")').scrollIntoView().find('button').should('exist').click({ force: true, multiple: true });
        cy.get(`.dropdown-button`).filter((index, el) => {
            return Cypress.$(el).text().trim() === option;
          }).find('.p-checkbox-box').click({ force: true,multiple:true});
    }
    static typePrice(text) {
        cy.get(`#price`).type(text)
    }
    static typeLocation(text) {
        cy.get(`.city`).find('input').first().type(text,{force: true})
    }
    static selectFromulSuggestionList(suggestionNumber) {
        cy.get(`.ng-trigger`).should('exist').find('li').eq(suggestionNumber).click({ force: true, multiple: true });
        
    }
    static sortResults(order,sortOption) {
        if (sortOption==='price'){
            cy.get(`p-radiobutton`).eq(0).filter((index, el) => {
                return Cypress.$(el).text().trim() === order;
              }).find('.p-radiobutton-box').click({ force: true,multiple:true});
        }
        if (sortOption==='area'){
            cy.get(`p-radiobutton`).eq(2).filter((index, el) => {
                return Cypress.$(el).text().trim() === order;
              }).find('.p-radiobutton-box').click({ force: true,multiple:true});
        }
        if (sortOption==='rooms'){
            cy.get(`p-radiobutton`).eq(4).filter((index, el) => {
                return Cypress.$(el).text().trim() === order;
              }).find('.p-radiobutton-box').click({ force: true,multiple:true});
        }
        
    }
    static isPricesSortedCorrectly(sortingOrder) {
        // Sélectionnez tous les éléments de prix
        cy.get('.foncia-card-price').then(($elements) => {
          const elementValues = [];
      
          // Parcourir chaque élément et extraire les valeurs numériques
          $elements.each((index, element) => {
            // Extrait le texte de l'élément
            const text = element.textContent.trim();
            // Convertit le texte en une valeur numérique en supprimant les caractères non numériques
            const numericValue = parseFloat(text.replace(/[^\d.,]/g, '').replace(',', '.'));
            // Ajoute la valeur numérique à un tableau
            elementValues.push(numericValue);
          });
      
          // Créez une copie triée des valeurs pour la comparaison
          const sortedValues = [...elementValues];
          if (sortingOrder === 'Ascending') {
            sortedValues.sort((a, b) => a - b);
          } else if (sortingOrder === 'Descending') {
            sortedValues.sort((a, b) => b - a);
          }
      
           // Comparez les valeurs triées avec les valeurs d'origine
          if (JSON.stringify(elementValues) !== JSON.stringify(sortedValues)) {
          // Si la comparaison échoue, affichez la position de l'élément
            cy.log(`L'erreur est apparue à l'élément à la position : ${elementValues.findIndex((value, index) => value !== sortedValues[index])}`);
      }
  
           // Effectue l'assertion pour vérifier si les valeurs sont triées correctement
           expect(JSON.stringify(elementValues)).to.equal(JSON.stringify(sortedValues));
        });
      }
      
}