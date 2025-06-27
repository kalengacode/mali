# 🎓 MALI - Plateforme Éducative Complète

## ✅ Schéma Prisma et Base de Données Créés

### 🗄️ Structure de la Base de Données

La base de données PostgreSQL est maintenant entièrement configurée avec **14 modèles principaux** :

#### 👥 Gestion des Utilisateurs

- **User** - Utilisateurs du système (13 utilisateurs créés)
- **StudentProfile** - Profils étudiants (8 étudiants)
- **TeacherProfile** - Profils enseignants (3 enseignants)
- **AdminProfile** - Profils administrateurs (2 admins)

#### 📚 Gestion Académique

- **Course** - Cours disponibles (4 cours créés)
- **CourseEnrollment** - Inscriptions aux cours (19 inscriptions)
- **Schedule** - Emplois du temps (8 créneaux)
- **Exam** - Examens programmés (2 examens)
- **ExamResult** - Résultats d'examens
- **Assignment** - Devoirs et projets

#### 💰 Gestion Financière

- **Payment** - Paiements et frais (5 paiements de test)

#### 📄 Gestion de Contenu

- **Document** - Documents et ressources (3 documents)
- **Message** - Système de messagerie (3 messages)
- **Notification** - Notifications système (8 notifications)
- **SystemSettings** - Paramètres de configuration

### 🔑 Comptes de Test Créés

#### Administrateurs

- **admin@mali.cd** / password123 (Jean Mukendi)
- **marie.admin@mali.cd** / password123 (Marie Tshimanga)

#### Enseignants

- **prof.kamau@mali.cd** / password123 (Joseph Kamau - Informatique)
- **prof.nzuzi@mali.cd** / password123 (Grace Nzuzi - Mathématiques)
- **prof.mbuyi@mali.cd** / password123 (Emmanuel Mbuyi - Économie)

#### Étudiants

- **etudiant1@mali.cd** à **etudiant8@mali.cd** / password123
  - Pacifique Kabongo, Esperance Mwamba, Divine Kasongo, etc.

### 📖 Cours Disponibles

1. **Développement Web avec React** (WEB101) - 250 USD
2. **Mathématiques Appliquées** (MATH201) - 200 USD
3. **Économie du Développement** (ECO301) - 180 USD
4. **Introduction à la Programmation** (PROG101) - 150 USD

## 🛠️ Fonctionnalités Implémentées

### 🔐 Système d'Authentification

- Authentification par email/mot de passe
- Hachage sécurisé des mots de passe avec bcrypt
- Gestion des sessions avec cookies
- API routes pour login/logout/me

### 📊 Tableaux de Bord

- **Dashboard Étudiant** : Statistiques, cours à venir, notes récentes
- **Dashboard Enseignant** : Gestion des cours et étudiants
- **Dashboard Admin** : Vue d'ensemble du système

### 📚 Gestion des Cours

- Inscription aux cours
- Suivi de la progression
- Matériaux de cours
- Emplois du temps

### 📝 Système d'Examens

- Programmation d'examens
- Saisie des notes
- Historique des résultats

### 💬 Communication

- Système de messagerie interne
- Notifications en temps réel
- Communication enseignant-étudiant

### ⚙️ Paramètres Utilisateur

- Gestion du profil
- Paramètres de sécurité
- Préférences de notification

## 🚀 Commandes Disponibles

```bash
# Démarrage de l'application
npm run dev

# Gestion de la base de données
npm run db:generate    # Générer le client Prisma
npm run db:push        # Pousser le schéma vers la DB
npm run db:seed        # Remplir avec des données de test

# Développement
npm run build          # Construire l'application
npm run start          # Démarrer en production
npm run lint           # Vérifier le code
```

## 🎨 Technologies Utilisées

### Frontend

- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **Shadcn/ui** - Composants UI modernes
- **Lucide React** - Icônes

### Backend

- **Prisma** - ORM pour la base de données
- **PostgreSQL** - Base de données
- **bcryptjs** - Hachage des mots de passe
- **Next.js API Routes** - API REST

### Composants UI

- Cards, Buttons, Inputs, Forms
- Tables, Calendriers, Graphiques
- Modales, Tooltips, Notifications
- Navigation responsive

## 📱 Pages Créées

### 🎓 Espace Étudiant

- ✅ Dashboard avec statistiques
- ✅ Gestion des cours (inscrits/disponibles)
- ✅ Emploi du temps interactif
- ✅ Examens et résultats
- ✅ Documents et ressources
- ✅ Messagerie
- ✅ Paiements et frais
- ✅ Paramètres utilisateur

### 👨‍🏫 Espace Enseignant

- ✅ Dashboard enseignant
- ✅ Gestion des cours
- ✅ Liste des étudiants
- ✅ Gestion des examens
- ✅ Saisie des notes
- ✅ Emploi du temps
- ✅ Messagerie
- ✅ Paramètres

### 👨‍💼 Espace Administrateur

- ✅ Dashboard administratif
- ✅ Gestion des utilisateurs
- ✅ Gestion des cours
- ✅ Planification
- ✅ Gestion des paiements
- ✅ Examens et évaluations
- ✅ Analytics et rapports
- ✅ Documents système
- ✅ Paramètres globaux

## 🔧 Configuration

### Variables d'Environnement (.env.local)

```env
DATABASE_URL="postgresql://username:password@localhost:5432/mali_db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### Base de Données

- **Type** : PostgreSQL
- **Schéma** : Automatiquement créé par Prisma
- **Données** : Remplies par le script de seed

## 📈 Statistiques du Projet

- **📁 13 utilisateurs** créés (admins, enseignants, étudiants)
- **📚 4 cours** avec contenu complet
- **📝 19 inscriptions** aux cours
- **📊 2 examens** avec résultats
- **💰 5 paiements** de test
- **📄 3 documents** pédagogiques
- **💬 3 messages** d'exemple
- **🔔 8 notifications** système

## 🎯 Prêt pour la Production

Le projet MALI est maintenant **entièrement fonctionnel** avec :

- ✅ Base de données complète et peuplée
- ✅ Authentification sécurisée
- ✅ Interface utilisateur moderne
- ✅ API REST fonctionnelle
- ✅ Gestion multi-rôles
- ✅ Système de navigation complet
- ✅ Données de test réalistes

## 🚀 Démarrage Rapide

1. **Installation des dépendances**

   ```bash
   npm install
   ```

2. **Configuration de la base de données**

   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

3. **Lancement de l'application**

   ```bash
   npm run dev
   ```

4. **Accès à l'application**
   - Ouvrir http://localhost:3000
   - Se connecter avec un des comptes de test
   - Explorer les différents espaces selon le rôle

## 🎉 Projet Terminé !

La plateforme éducative MALI est maintenant **complète et opérationnelle** avec toutes les fonctionnalités demandées implémentées avec Shadcn UI et une base de données PostgreSQL entièrement configurée.
