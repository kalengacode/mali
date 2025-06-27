# Configuration de la Base de Données MALI

## Prérequis

1. **PostgreSQL** installé sur votre système
2. **Node.js** version 18 ou supérieure
3. **npm** ou **yarn**

## Configuration

### 1. Variables d'environnement

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```env
# Base de données PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/mali_db?schema=public"

# Clés de chiffrement
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Configuration de l'application
APP_NAME="MALI - Plateforme Éducative"
APP_URL="http://localhost:3000"
```

### 2. Installation des dépendances

```bash
npm install
```

### 3. Configuration de la base de données

```bash
# Générer le client Prisma
npm run db:generate

# Pousser le schéma vers la base de données
npm run db:push

# Remplir la base avec des données de test
npm run db:seed
```

## Comptes de test créés

Après avoir exécuté le seed, vous aurez accès aux comptes suivants :

### Administrateur

- **Email :** admin@mali.cd
- **Mot de passe :** password123
- **Permissions :** Gestion complète du système

### Enseignants

- **Email :** prof.kamau@mali.cd (Informatique)
- **Email :** prof.nzuzi@mali.cd (Mathématiques)
- **Email :** prof.mbuyi@mali.cd (Économie)
- **Mot de passe :** password123

### Étudiants

- **Email :** etudiant1@mali.cd à etudiant8@mali.cd
- **Mot de passe :** password123

## Données générées

Le script de seed créera automatiquement :

- ✅ **8 étudiants** avec profils complets
- ✅ **3 enseignants** spécialisés dans différents domaines
- ✅ **2 administrateurs** avec différents niveaux d'accès
- ✅ **4 cours** actifs avec inscriptions
- ✅ **Emplois du temps** pour tous les cours
- ✅ **Examens** programmés et terminés avec résultats
- ✅ **Paiements** en différents statuts
- ✅ **Documents** pédagogiques et administratifs
- ✅ **Messages** entre utilisateurs
- ✅ **Notifications** système
- ✅ **Paramètres** de configuration

## Structure de la Base de Données

### Modèles principaux

1. **User** - Utilisateurs du système (étudiants, enseignants, admins)
2. **StudentProfile** - Profils spécifiques aux étudiants
3. **TeacherProfile** - Profils spécifiques aux enseignants
4. **AdminProfile** - Profils spécifiques aux administrateurs
5. **Course** - Cours disponibles
6. **CourseEnrollment** - Inscriptions aux cours
7. **Schedule** - Emplois du temps
8. **Exam** - Examens programmés
9. **ExamResult** - Résultats des examens
10. **Assignment** - Devoirs et projets
11. **Payment** - Paiements et frais
12. **Document** - Documents et ressources
13. **Message** - Système de messagerie
14. **Notification** - Notifications système

## Commandes utiles

```bash
# Voir l'état de la base de données
npx prisma studio

# Réinitialiser la base de données
npx prisma db push --force-reset
npm run db:seed

# Générer le client après modification du schéma
npm run db:generate
```

## Dépannage

### Erreur de connexion à PostgreSQL

1. Vérifiez que PostgreSQL est démarré
2. Vérifiez les identifiants dans DATABASE_URL
3. Assurez-vous que la base de données existe

### Erreur lors du seed

1. Vérifiez que le schéma est à jour : `npm run db:push`
2. Vérifiez les dépendances : `npm install`
3. Supprimez et recréez la base si nécessaire

## Sécurité

⚠️ **Important :** Les mots de passe par défaut sont `password123`. Changez-les en production !

Les mots de passe sont hachés avec bcrypt pour la sécurité.
