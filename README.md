# ChatBot Node.js

## Présentation
Ce projet est un assistant virtuel développé en Node.js, capable de répondre à des messages, d'envoyer des fichiers PDF, et de fournir un menu interactif. Il fonctionne 24h/24 et propose plusieurs services automatisés.

## Fonctionnalités principales
- Réponse automatique aux messages
- Envoi de fichiers PDF selon la demande
- Menu interactif pour découvrir les services
- Historique des messages
- Gestion des erreurs et messages d'accueil personnalisés

## Structure du projet
```
ChatBot/
├── db.js                  # Gestion de la base de données
├── fusionPdf.js           # Fusion et gestion des fichiers PDF
├── index.js               # Point d'entrée principal
├── messageHandler.js      # Gestion des messages et logique métier
├── media/                 # Dossier contenant les fichiers PDF
├── tokens/                # Dossier pour les tokens et caches navigateur
├── package.json           # Dépendances et scripts npm
├── .gitignore             # Fichiers/dossiers ignorés par git
```

## Prérequis
- Node.js version 18 ou supérieure (recommandé)
- npm (généralement inclus avec Node.js)

## Installation
1. **Cloner le dépôt**
   ```bash
   git clone <url-du-repo>
   cd ChatBot
   ```
2. **Installer les dépendances**
   ```bash
   npm install
   ```

## Lancement du projet
1. **Configurer les variables d'environnement**
   - Si besoin, créez un fichier `.env` à la racine pour vos variables sensibles (API keys, etc).
2. **Démarrer le serveur**
   ```bash
   node index.js
   ```
   ou, pour un développement avec rechargement automatique :
   ```bash
   npx nodemon index.js
   ```
3. **Utilisation**
   - Le bot est maintenant actif et prêt à répondre aux messages selon la logique définie dans `messageHandler.js`.

## Conseils
- Vérifiez que le port utilisé dans `index.js` n'est pas déjà occupé.
- Les fichiers PDF à envoyer doivent être placés dans le dossier `media/`.
- Consultez le code source pour personnaliser les réponses ou ajouter de nouveaux services.

## Licence
Ce projet est fourni à titre d'exemple et peut être adapté selon vos besoins.