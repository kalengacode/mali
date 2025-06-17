# 🚀 Mali – Plateforme d’Apprentissage Moderne

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-brightgreen)

Bienvenue sur **Mali**, la plateforme nouvelle génération dédiée à l’éducation, à la gestion des enseignants, étudiants et administrateurs. Mali offre une expérience fluide, moderne et intuitive pour tous les acteurs de l’apprentissage.

---

## 🌍 Vision

Chez Mali, nous croyons que l’accès à une éducation de qualité doit être simple, inclusif et innovant. Notre ambition est de transformer l’apprentissage numérique en Afrique et au-delà, en mettant la technologie au service de la réussite de chacun.

---

## ✨ Fonctionnalités Clés

- Tableaux de bord personnalisés pour enseignants, étudiants et administrateurs
- Gestion intelligente des cours, notes, emplois du temps et notifications
- Interface utilisateur élégante, moderne et responsive
- Sécurité, confidentialité et performance au cœur de l’application
- Extensible, modulaire et facile à maintenir
- Notifications en temps réel et messagerie interne
- Recherche avancée et filtres puissants
- Statistiques et rapports dynamiques

---

## 🚀 Installation Rapide

> ⚠️ Avant de commencer, assurez-vous d’avoir **Node.js >= 18** et **PostgreSQL** installés sur votre machine.

```bash
# 1. Clonez le dépôt
git clone https://github.com/ton-utilisateur/mali.git
cd mali

# 2. Installez les dépendances
npm install

# 3. Copiez le fichier .env.example et configurez vos variables d’environnement
cp .env.example .env
# Modifiez le fichier .env pour ajouter vos clés, URL de base de données, etc.

# 4. Initialisez la base de données avec Prisma
npx prisma generate
npx prisma migrate dev --name init

# 5. Lancez le serveur en développement
npm run dev
