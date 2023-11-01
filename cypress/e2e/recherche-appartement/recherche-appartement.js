const {
    Given,
    When,
    Then,
  } = require("@badeball/cypress-cucumber-preprocessor");
const { Homepage } = require("../../pages/Homepage");
const { NavigationBar } = require("../../pages/navigationBar");
let baseUrl;

if (Cypress.env("environment") === "production") {
  baseUrl = "https://fr.foncia.com/";
} else if (Cypress.env("environment") === "staging") {
  baseUrl = "https://fr.foncia.com/";
} else {
  baseUrl = Cypress.config("baseUrl");
}



Given("l'utilisateur est sur la page d'accueil",()=>{
  cy.visit(baseUrl)
});
When("la bannière de cookies s'affiche",()=>{
  Homepage.checkElementExistance('app-foncia-cookie-banner')
});
When("il clique sur le bouton 'Tout accepter'",()=>{
  cy.clickButton('Tout accepter') // j'ai créer une commande cypress pour appuier sur les boutton ,sa déclaration est dans cypress\support\commands.js
});
When("la navigation contient les onglets",()=>{
  cy.fixture('testData.json').then((elements) => {
    NavigationBar.checkNavigationBarContent(elements.navigationBarElements); // les elements de la bar de navigation sont impoté du fichier json sous Fixtures
  });
});
When("il change son rôle d'Acquéreur à Locataire",()=>{
 Homepage.isRoleActive('Acquéreur',true)
 Homepage.isRoleActive('Locataire',false)
 Homepage.selectRole('Locataire')
 Homepage.isRoleActive('Locataire',true)
 Homepage.isRoleActive('Acquéreur',false)
});
Then("le contenu de la pop-up ci-dessous se met à afficher des informations liées aux locataires",()=>{
Homepage.checkCardTitleContent('Locataire')
});
When("il accède à la liste verticale 'Notre sélection de biens'",()=>{
Homepage.scrollToElement('app-home-suggestion')  
});
When("il appuie sur le bouton '>'",()=>{
  Homepage.isAnnouceCardVisible(3,true) // on  vérifie que la carte numéro 3 est visible avant le click vers la droite
  Homepage.clickArrow('right')
});
Then("la liste se déplace vers la droite",()=>{
  Homepage.isAnnouceCardVisible(3,false) // on vérifie que la carte numéro 3 est devenue invisible aprés le click vers la droite

});
When("l'utilisateur appuie sur le bouton '<'",()=>{
  Homepage.clickArrow('left')
});
Then("la liste se déplace vers la gauche",()=>{
  Homepage.isAnnouceCardVisible(3,true) //on vérifie que la carte numéro 3 est de retour visible aprés le click vers la gauche
});
When("l'utilisateur fait défiler jusqu'à la section de recherche",()=>{
  Homepage.scrollToElement('.research-bar-tabs')  
});
Then("les deux options de recherche 'Rechercher un bien' et 'Rechercher un bien' sont présentes et accessibles",()=>{
  Homepage.checkSearchOptionAccessibility('Estimer')
  Homepage.checkSearchOptionAccessibility('Rechercher')
});
When("il sélectionne 'Rechercher un bien'",()=>{
  Homepage.selectSearchOption('Rechercher')
});
When("sélectionne {string} dans la case Projet",(project)=>{
  Homepage.selectRatioButton('Projet',project)
});
When("sélectionne {string} dans la case Types de biens",(typeOfPropertie)=>{
  Homepage.selectCheckBox('Types de biens',typeOfPropertie)
});
When("saisit {string} dans la case Prix maximum",(maximumPrice)=>{
  Homepage.typePrice(maximumPrice)
});
When("saisit {string} dans la case Ville, département, région",(location)=>{
  Homepage.typeLocation(location)
  Homepage.selectFromulSuggestionList(1) //j'ai sélectionner la premiére suggestion de la liste
});
When("appuie sur le bouton 'Rechercher'",()=>{
  cy.get('body').click({force:true,multiple:true})
  cy.clickButton('Rechercher')
});
Then("une liste de résultats est affichée",()=>{
  Homepage.checkElementExistance('app-annonce-card')
});
When("il appuie sur le bouton Filtrer",()=>{
  cy.clickButton('Filtrer')
});
When("sélectionne le tri par ordre croissant des prix",()=>{
  Homepage.sortResults('Par ordre croissant','price')
  cy.clickButton('Actualiser la recherche')

});
When("la liste est correctement triée dans l'ordre croissant des prix",()=>{
  cy.wait(5000)
  Homepage.isPricesSortedCorrectly('Ascending')

});



