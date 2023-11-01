# language: fr
Fonctionnalité: Vérifier la Fonctionnalité de recherche
  Contexte : L'utilisateur est sur le site web d'une agence immobilière
  Scénario: L'utilisateur recherche un appartement à louer
    Étant donné que l'utilisateur est sur la page d'accueil
    Quand la bannière de cookies s'affiche
    Alors il clique sur le bouton 'Tout accepter'
    Et que la navigation contient les onglets 
    #la liste des onglets est bien definit dant le fichier testData.json sous fixtures
    Quand il change son rôle d'Acquéreur à Locataire
    Alors le contenu de la pop-up ci-dessous se met à afficher des informations liées aux locataires
    Quand il accède à la liste verticale 'Notre sélection de biens'
    Et que il appuie sur le bouton '>'
    Alors la liste se déplace vers la droite
    Quand l'utilisateur appuie sur le bouton '<'
    Alors la liste se déplace vers la gauche
    Quand l'utilisateur fait défiler jusqu'à la section de recherche
    Alors les deux options de recherche 'Rechercher un bien' et 'Rechercher un bien' sont présentes et accessibles
    Quand il sélectionne 'Rechercher un bien'
    Et sélectionne '<project>' dans la case Projet
    Et sélectionne '<typeOfPropertie>' dans la case Types de biens
    Et saisit '<maximumPrice>' dans la case Prix maximum
    Et saisit '<location>' dans la case Ville, département, région
    Et appuie sur le bouton 'Rechercher'
    Alors une liste de résultats est affichée
    Quand il appuie sur le bouton Filtrer
    Et sélectionne le tri par ordre croissant des prix
    Alors la liste est correctement triée dans l'ordre croissant des prix
    Exemples:
    |project       |typeOfPropertie   |maximumPrice   |location|
    |Louer         |Appartement       |1000           |Paris   |
    |Acheter       |Maison           |400000         |Lyon    |

