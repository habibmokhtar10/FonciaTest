# ⬇️Installation du projet
Installer les dépendances à l'aide de `npm i`

# ⬇️exécuter le test sur l'environement developpement
 `npm run cy:run:development`
# ⬇️exécuter le test sur l'environement staging
 `npm run cy:run:staging`
# ⬇️exécuter le test sur l'environement production
 `npm run cy:run:production`

# ⬇️Generer le rapport de test 
 `npm run allure:report`

# ⬇️Ouvrir le rapprt de test 
 `npm run allure:open`


# Note
*Tous les environnements ont la même URL car il n'y a pas d'autres URL à tester. Cependant, l'objectif est de démontrer la capacité à exécuter les tests sur différents environnements
*Si on execute npx cypress run/npx cypress open sans séléctionner l'environnement, le test va s'éxécuter sur l'environnement evelopment vue que s'est l'environnement selectionner de le fichier de configuration cypress
*Les screenshot sont génerer en cas de fail d'une étape(c le cas de la éxecution avec la 2éme lignes de donnés ou la liste n'était pas trié correctemen )
*Pour l'utisation des donnés de tests j'ai utilisé 2 methodes :
1-Récupération des donner a partir d'un fichier json
2-Utilisations de la Table de données dans le code gherkin pour essayer différents scénarios