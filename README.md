DOCUMENTATION TECHNIQUE

Ce projet a été réalisé en cours, voici le sujet:
  Système de signalement de problèmes
  – Pour mieux être à l’écoute de la population, le 
  gouvernement a décidé de mettre en place une 
  application pour permettre à toutes personnes de 
  signaler les problèmes (route abimée, ordures, 
  accident, etc…) 
  – Les problèmes seront ensuite affecté par région et
  ils auront un statut (nouveau, en cours de 
  traitement, terminé

I.	Présentation du groupe
Les membres du groupe sont :
◦	ANDRIAMANARIVO Ericko
◦	RABIBIZAKA Laetitia
◦	RAOLOSON Henika Lucas
II.	Projet
II.1)	MCD
II.2)	Présentation des scénarios
a)	Mobile(Ionic/React)
La partie mobile du projet est celle dédiée aux utilisateurs qui souhaitent envoyer des signalements. Voici la liste des scénarios correspondants :
•	Login:
Interface de départ si l’utilisateur ne s’est pas encore connecté ou s’il s ‘est déconnecté de son compte. Il doit entrer son « login » ainsi que son mot de passe et accédera à l’interface d’accueil si les informations saisies sont justes. Par ailleurs, s’il ne possède pas encore de compte il devra cliquer sur le lien « s’inscrire » pour effectuer son inscription.

![image](https://user-images.githubusercontent.com/60751096/160457534-241bcb12-968e-41ce-a45a-d0ea778bf959.png)

•	Inscription :
 L’utilisateur devra entrer les informations suivantes pour créer un compte :
➔	Nom
➔	Prénom(s)
➔	Date de naissance
➔	Sexe
➔	Login (qui doit être en format d’ e-mail)
➔	Mot de passe (qui doit contenir 8 caractères au minimum et pas d’accents)
Après validation, son compte sera créer il pourra accéder à l’accueil
![image](https://user-images.githubusercontent.com/60751096/160457632-09f49e02-9c1f-481a-970a-12e6520e2136.png)

•	Accueil (Historique des signalements)
Dans cette interface se trouve la liste des signalements déjà effectués par l’utilisateur en cours avec les informations suivantes : le type du signalement, la date son envoie, son état actuel.
 Les signalements sont représentés différemment selon leurs états actuels :
➔	Vert : pour les signalements déjà traités
➔	Bleu : pour les signalements en cours de traitement
➔	Rouge : pour les nouveaux
En cliquant sur le bouton « voir«, l’utilisateur pourra voir en détail le signalement concerné.
![image](https://user-images.githubusercontent.com/60751096/160457702-95b42174-261a-4b02-8fb9-e9f3f4aea492.png)

•	Envoie de signalement
L’utilisateur doit entrer le type du signalement en choisissant à partir d’une liste prédéfinie puis saisir la description correspondante à ce signalement et enfin, prendre des photos à partir de son caméra. Les coordonnées de son emplacement ainsi que la date de l’envoie sont récupérées automatiquement. Après validation de l’envoie, le signalement sera envoyé à l’administrateur et ce nouveau signalement apparaîtra dans son historique de signalement.

![image](https://user-images.githubusercontent.com/60751096/160457759-18493c3a-9e64-4fba-a797-23993174f0c5.png)

•	Détail du signalement
En cliquant sur le bouton « Voir » dans la liste de signalements, l’utilisateur accedera dans la fiche. Dans cette interface se trouvent tous les détails concernant le signalement choisi, notamment :
➔	Le type de signalement
➔	La date de son envoie
➔	La description faite par l’utilisateur
➔	La localisation exacte : longitude et latitude
➔	La région concernée s’il a déjà été affecté
➔	Son état actuel : envoyé, en traitement ou terminé
➔	La date de début du traitement (« Non défini« si le signalement n’a pas encore été traité )
➔	La date de finition (« Non défini« si le signalement n’est pas encore terminé)
➔	Les images envoyées

![image](https://user-images.githubusercontent.com/60751096/160457809-966a6588-fc79-48da-9852-33c6351cb88f.png)


•	Notifications
L’ utilisateur reçoit une notification lorsque l’état de l’un de ses signalements a changé et la liste de toutes les notifications qu’il a déjà reçues est disponible dans son historique.

![image](https://user-images.githubusercontent.com/60751096/160457862-95fdca1d-44bb-4e0d-bd35-06767eecef81.png)
	
b)	Back-office (ReactJS)
La partie back-office est dédiée à l’administrateur. Voici la liste des scénarios correspondants :
•	Login
L’administrateur devra s’authentifier en entrant son identifiant et son mot passe et si les informations envoyées sont exactes, il accédera au page d’accueil :
![image](https://user-images.githubusercontent.com/60751096/160457965-54ce762b-f49d-4e34-a430-4df5c600c30f.png)

•	Page d’accueil
Dans cette page se trouve le statistique affichant le nombre de signalements par région et par état.
•	Statistiques
La page de statistique comporte deux onglets :
➔	La première, affichant la fréquence de signalement de chaque type de signalement.
![image](https://user-images.githubusercontent.com/60751096/160457999-7affd57b-a0aa-453d-862e-327669fe353f.png)


➔	La seconde, affichant l’efficacité à laquelle les différentes régions traitent leurs signalements.
![image](https://user-images.githubusercontent.com/60751096/160458120-985efe32-d554-46e8-b3d7-5870fddf2264.png)


•	Liste des signalements
Dans cette page sont listés les signalements envoyés par les utilisateurs affichant ainsi les informations suivantes sur chaque signalement : la date de l’envoie, le type du signalement, la région concernée si il a déjà été attribué et son statut actuel.
Les signalements peuvent être filtrés selon différents critères :
➔	Par région
➔	Par type
➔	Par état
➔	Date d’envois se trouvant entre deux dates définie
En cliquant sur le bouton voir, on accède au détail de ce signalement
![image](https://user-images.githubusercontent.com/60751096/160458093-bf4ba5e7-a14b-4648-82ef-0966eeb30f61.png)


•	Détail du signalement et affectation à une région
En accédant à cette page, l’administrateur pourra voir tous les détails concernant un signalement ainsi que sa position exacte représentée sur une carte pour faciliter le choix de l’affection à une région. L’affectation se trouve aussi dans cette même page et l’administrateur devra choisir une région parmi une liste prédéfinie.
![image](https://user-images.githubusercontent.com/60751096/160458155-57cd8703-39d8-4832-aa68-35cd9531b1c8.png)


•	Liste des utilisateurs
Dans cette page est affichée la liste de tous les utilisateurs.
![image](https://user-images.githubusercontent.com/60751096/160458184-64cd741d-34c5-40b6-bfc6-48b2e24595e7.png)


•	Gestion des chefs de région
Affichage de tous les chefs de région
![image](https://user-images.githubusercontent.com/60751096/160458198-931b1dfa-eb7f-48c1-954e-210c9c33bc2b.png)


![image](https://user-images.githubusercontent.com/60751096/160458226-236412b9-85f3-414e-8f20-e7b836b6a06e.png)

Après avoir cliquer sur le bouton « Créer« on bascule vers la page de création d’un compte de chef de région.  L’ administrateur choisi la région à laquelle il veut associer le compte et après validation, le compte est crée avec une configuration par défaut du login et du mot de passe.


•	Gestion des régions
Liste des régions
![image](https://user-images.githubusercontent.com/60751096/160458246-be18ce3a-e167-4ac0-ab1c-bcf0b4af1d16.png)



Pour créer un nouveaux région, l’administrateur doit cliquer sur le bouton « Créer » et il accédera à la page de création où il devra saisir les informations suivantes : nom du région, le nom du chef lieu de région, la longitude et la latitude.
![image](https://user-images.githubusercontent.com/60751096/160458289-aae2ab24-76b8-4d80-8d87-2c6ace369e27.png)

Pour modifier un région, il faut cliquer sur le bouton « edit » afin d’accéder à la page de modification.
![image](https://user-images.githubusercontent.com/60751096/160458313-503f5518-e0a1-43d1-ac0c-6e71c0165cdf.png)

![image](https://user-images.githubusercontent.com/60751096/160458365-9787e1bf-06fb-4275-8b0f-9d62b8c5315b.png)


Les régions peuvent êtres supprimées en cliquant sur l’icône de corbeille en rouge.
•	Gestion des types de signalement
Liste des types de signalements
![image](https://user-images.githubusercontent.com/60751096/160458451-4c6612b4-e58b-4335-9981-9eb7675a0050.png)

	Les types peuvent êtres supprimées en cliquant sur l’icône de corbeille en rouge.
Pour modifier un type, il faut cliquer sur le bouton « edit » afin d’accéder à la page de modification :

•	Déconnexion
Pour se déconnecter, il suffit de cliquer sur l’option « Déconnecter » dans l’icône de paramètre


c)	Front-office(React JS)
La partie front-office est dédiée aux chefs de région.
•	Login
Pour accéder à son compte, le chef de région devra fournir un « login » et un « mot de passe »et si les informations sont correctes, il pourra accéder au page d’accueil.
![image](https://user-images.githubusercontent.com/60751096/160458486-6eb1b557-5ed8-42bb-ab82-2e4c84a1ceac.png)

•	Accueil (liste des signalement et filtre)
La liste de tous les signalements affectés à son région se trouve dans cette pages mais ils sont représentés différemment selon l’onglet sélectionné :
➔	L’onglet « Carte » : les signalements sont représentés sur une carte selon leurs localisations et lorsqu’on clique sur un marqueur, un pop-up s’affiche pour montrer les détails de celui-ci. Les couleurs des marqueurs sont différentes pour chaque types de signalement
![image](https://user-images.githubusercontent.com/60751096/160458532-6322132b-5429-4de2-b234-bd99719d72fa.png)
![image](https://user-images.githubusercontent.com/60751096/160458559-25828d8f-c639-4c35-b44b-03d713fa55f2.png)


➔	L’onglet « Tableau » : les signalements sont représentés dans un tableau.
La liste peut être filtrer par type de signalement, par date d’envois et par état. Les résultats du filtre s’appliquent alors sur la carte ainsi que sur le tableau.


Un signalement peut être supprimé en cliquant sur l’icône de corbeille en rouge dans la colonne « Action » du tableau.
Pour modifier l’état d’un signalement, il faut cliquer sur le bouton « voir » dans la colonne « Action » du tableau.
•	Détail et modification d’état du signalement
Après avoir cliquer sur le bouton « Voir » dans le tableau, une page contenant les détails du signalement en question s’affiche montrant ainsi les informations suivantes :
➔	Son type
➔	La date de son envois
➔	Sa description
➔	Son état actuel
➔	La liste des images envoyées
C’est aussi dans cette page que le chef de région pourra changer l’état du signalement :
➔	De « nouveau » vers «en  traitement »
![image](https://user-images.githubusercontent.com/60751096/160458627-69c3e907-c6f7-42a1-a2cc-458ec20b36e2.png)

➔	De « en traitement » vers « Terminé »
![image](https://user-images.githubusercontent.com/60751096/160458660-b74a645a-60db-4c36-b46e-1707640d030d.png)


•	Déconnexion
Pour se déconnecter, il suffit de cliquer sur le lien « Déconnexion » dans le menu

