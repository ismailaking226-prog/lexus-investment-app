# Lexus Investment App

Application d'investissement mobile inspirée de la marque Lexus, pensée pour le marché francophone (Bénin, Cameroun, Côte d’Ivoire, Burkina Faso, Niger).

## Stack
- Next.js 14
- React 18
- TypeScript
- CSS modules/custom CSS

## Fonctionnalités incluses
- page d'accueil mobile
- popup d'information à chaque connexion
- dépôt mobile money avec validation manuelle
- retrait avec frais et minimum
- produits d'investissement 180 jours
- historique des dépôts et retraits
- backoffice admin complet (tableau de bord, utilisateurs, demandes, produits, paiement, Telegram, parrainage, paramètres de solde)
- design inspiré de Lexus avec palette premium

## Démarrage rapide

```bash
npm install
npm run dev
```

Puis ouvrez : http://localhost:3000

## Routes clés
- `/` : accueil utilisateur
- `/depot` : dépôt avec formulaire de confirmation
- `/retrait` : retrait
- `/investir` : produits d'investissement
- `/moi` : profil / paramètres
- `/admin` : tableau de bord admin
- `/admin/demandes` : demandes en attente
- `/admin/utilisateurs` : gestion utilisateurs
- `/admin/produits` : CRUD produits
- `/admin/paiement` : lien de paiement
- `/admin/telegram` : gestion Telegram
- `/admin/historique` : historiques

## Notes
Cette version est une base intégrée et fonctionnelle de démonstration, avec logique front et backoffice intégrés. Pour un usage en production réel, il faudra ajouter une vraie auth, une base de données, des webhooks de paiement et un vrai système de notifications.
