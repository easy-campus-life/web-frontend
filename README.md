# Easy Campus Life - Application Web Frontend

![Easy Campus Life](https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)

## 📋 Description du Projet

**Easy Campus Life** est une application web moderne conçue pour améliorer l'expérience étudiante à l'ESTIAM. Cette plateforme centralise toutes les informations et services essentiels à la vie étudiante, permettant aux étudiants de rester informés, connectés et engagés dans leur campus.

## 🚀 Fonctionnalités Principales

### 🏠 Page d'Accueil
- Vue d'ensemble des événements à venir
- Informations sur l'affluence en temps réel des espaces du campus
- Accès rapide aux mentors disponibles pour de l'aide académique

### 📊 Gestion de l'Affluence
- Visualisation en temps réel de l'occupation des salles
- Statistiques d'affluence pour les différents espaces du campus
- Possibilité de réserver des espaces d'étude

### 🎉 Événements Sociaux
- Découverte des événements à venir sur le campus
- Filtrage par catégorie (Social, Tech, Académique, etc.)
- Participation aux événements avec un simple clic

### 👨‍🏫 Système de Mentorat
- Mise en relation avec des mentors spécialisés
- Demande de sessions de mentorat
- Suivi des demandes de mentorat

### 🤖 Assistant Virtuel
- Chatbot intégré pour répondre aux questions fréquentes
- Assistance en temps réel pour naviguer dans l'application

## 🛠️ Technologies Utilisées

- **Frontend**: React.js, TailwindCSS
- **Backend**: FastAPI (Python), hébergé sur Railway
- **Authentification**: JWT (JSON Web Tokens)
- **Déploiement**: Vercel (Frontend)

## 📡 API et Services

L'application communique avec un backend via une API REST hébergée à l'adresse:
```
https://backend-production-ecb4.up.railway.app
```

Services disponibles:
- Authentification et gestion des utilisateurs
- Gestion des événements
- Système de mentorat
- Suivi de l'affluence des salles
- Gestion des présences

## 🔧 Installation et Configuration

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn

### Installation

1. Cloner le dépôt
```bash
git clone https://github.com/easy-campus-life/web-frontend.git
cd web-frontend
```

2. Installer les dépendances
```bash
npm install
# ou
yarn install
```

3. Configurer les variables d'environnement
Créez un fichier `.env` à la racine du projet avec les variables suivantes :
```
VITE_API_BASE_URL=https://backend-production-ecb4.up.railway.app
VITE_APP_ENV=development
```

4. Lancer l'application en mode développement
```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible à l'adresse [http://localhost:5173](http://localhost:5173)

### Fichiers nécessaires à l'exécution

Assurez-vous que les fichiers suivants sont présents et correctement configurés :

- `package.json` : Contient les dépendances et scripts npm
- `.env` : Variables d'environnement pour le développement local
- `vite.config.js` ou `webpack.config.js` : Configuration du bundler
- `tailwind.config.js` : Configuration de TailwindCSS
- `index.html` : Template HTML principal dans le dossier public

## 📦 Structure du Projet

```
├── public/                  # Ressources statiques
│   ├── favicon.ico         # Favicon du site
│   ├── index.html          # Template HTML principal
│   └── manifest.json       # Manifest pour PWA
│
├── src/                    # Code source de l'application
│   ├── components/         # Composants réutilisables
│   │   ├── ChatBotModal.jsx  # Modal pour l'assistant virtuel
│   │   ├── Header.jsx        # En-tête de l'application
│   │   ├── Footer.jsx        # Pied de page de l'application
│   │   └── ...               # Autres composants
│   │
│   ├── features/           # Fonctionnalités organisées par domaine
│   │   ├── home/           # Page d'accueil
│   │   │   └── HomePage.jsx  # Composant principal de la page d'accueil
│   │   │
│   │   ├── affluence/      # Gestion de l'affluence
│   │   │   └── AffluencePage.jsx  # Page d'affluence
│   │   │
│   │   ├── social/         # Événements sociaux
│   │   │   └── SocialPage.jsx  # Page des événements sociaux
│   │   │
│   │   └── ...             # Autres fonctionnalités
│   │
│   ├── services/           # Services (API, authentification)
│   │   └── apiService.js   # Service pour les appels API
│   │
│   ├── assets/             # Images, icônes, etc.
│   │
│   ├── utils/              # Utilitaires et fonctions d'aide
│   │
│   ├── App.jsx             # Composant racine de l'application
│   ├── index.jsx           # Point d'entrée de l'application
│   └── routes.jsx          # Configuration des routes
│
├── .env                    # Variables d'environnement (local)
├── .env.production         # Variables d'environnement (production)
├── package.json            # Dépendances et scripts npm
├── tailwind.config.js      # Configuration de TailwindCSS
├── vite.config.js          # Configuration de Vite (si utilisé)
└── README.md               # Documentation du projet
```

## 🔐 Authentification

L'application utilise JWT pour l'authentification. Les tokens sont stockés dans le localStorage et automatiquement inclus dans les en-têtes des requêtes API.

## 🌐 Déploiement

### Frontend (Vercel)

L'application frontend est déployée sur Vercel. Pour déployer une nouvelle version :

1. Assurez-vous que votre code est poussé sur GitHub
2. Connectez-vous à votre compte Vercel
3. Importez le projet depuis GitHub
4. Configurez les variables d'environnement nécessaires
5. Déployez l'application

Vous pouvez également déployer manuellement avec les commandes suivantes :

```bash
# Installation de l'outil CLI Vercel (si nécessaire)
npm install -g vercel

# Construction pour la production
npm run build

# Déploiement sur Vercel
vercel --prod
```

### Backend (FastAPI)

Le backend est développé avec FastAPI (Python) et est hébergé sur Railway. Le code source du backend est disponible dans un dépôt séparé.

## 📝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add some amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence [MIT](LICENSE).

---

© 2025 Easy Campus Life - Améliorer l'expérience étudiante à l'ESTIAM

## 🔗 Liens Utiles

- [Application déployée](https://web-frontend-lake-omega.vercel.app/)
- [Documentation API Backend](https://backend-production-ecb4.up.railway.app/docs)
- [Dépôt GitHub Frontend](https://github.com/easy-campus-life/web-frontend)
- [Dépôt GitHub Backend](https://github.com/easy-campus-life/backend)