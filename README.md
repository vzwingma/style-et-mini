# Application Style & Mini

## Objectif du projet

L'objectif de ce projet est de créer une application mobile utilisant le framework [Expo](https://expo.dev). Cette application est conçue pour gérer un dressing virtuel, permettant aux utilisateurs d'ajouter, de modifier et de consulter des vêtements et leurs caractéristiques.

## Description de l'application

L'application "Style & Mini" permet aux utilisateurs de gérer leur dressing virtuel. Les fonctionnalités principales incluent :
- Ajouter et éditer des vêtements avec des détails tels que le type, la taille, les usages, les couleurs et la description.
- Visualiser les vêtements ajoutés dans différentes catégories.
- Paramétrer les types de vêtements, les tailles et les usages.
- Filtrer des vêtements par nom, type ou couleur.
- Ajouter des photos aux vêtements pour une meilleure visualisation.

L'application utilise le routage basé sur les fichiers pour une navigation fluide et est compatible avec les plateformes Android et Web.

## Comment construire et exécuter l'application

### Prérequis

Assurez-vous d'avoir installé les outils suivants :
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Étapes pour démarrer

1. Installer les dépendances

   ```bash
   npm install
   ```

2. Démarrer l'application

   ```bash
    npx expo start
   ```

3. Vérifier le code

   ```bash
   npm run lint
   ```

Toutes les commandes : 

```bash
npm install               # Installer les dépendances
npx expo start            # Démarrer en mode développement
npx expo start --android  # Démarrer sur émulateur Android
npx expo start --web      # Démarrer dans le navigateur
npm run lint              # Vérifier le code (ESLint)
npm test                  # Lancer les tests unitaires
```


Dans la sortie, vous trouverez des options pour ouvrir l'application dans un

- [build de développement](https://docs.expo.dev/develop/development-builds/introduction/)
- [émulateur Android](https://docs.expo.dev/workflow/android-studio-emulator/)
- [simulateur iOS](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), un bac à sable limité pour essayer le développement d'applications avec Expo

Vous pouvez commencer à développer en modifiant les fichiers à l'intérieur du répertoire **app**. Ce projet utilise le [routage basé sur les fichiers](https://docs.expo.dev/router/introduction).

## En savoir plus

Pour en savoir plus sur le développement de votre projet avec Expo, consultez les ressources suivantes :

- [Documentation Expo](https://docs.expo.dev/): Apprenez les fondamentaux ou approfondissez les sujets avancés avec nos [guides](https://docs.expo.dev/guides).

## Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes (préfixées `EXPO_PUBLIC_` pour être accessibles côté client) :

```
EXPO_PUBLIC_BACKEND_URL=http://192.168.x.x:3000/
EXPO_PUBLIC_BACKEND_AUTH=user
EXPO_PUBLIC_BACKEND_PWD=password
EXPO_PUBLIC_S3_URL=https://xxxxx.cloudfront.net/
```

> ⚠️ Remplacez `192.168.x.x` par l'adresse IP locale de la machine hébergeant le backend.

## Structure du projet

```
app/
  (tabs)/
    index.tsx          → Écran d'accueil / connexion backend
    dressing.tsx       → Écran principal du dressing
    reglages.tsx       → Paramétrage des référentiels
  _layout.tsx          → Layout racine (Expo Router)
components/            → Composants UI par domaine
  commons/             → Composants partagés
  dressing/            → Composants de gestion du dressing
  home/                → Composants de l'écran d'accueil
  reglages/            → Composants de paramétrage
  synthese/            → Composants de synthèse / statistiques
controllers/           → Logique métier, orchestration des appels API
services/              → AppContextProvider (état global), ClientHTTP, ClientS3
models/                → Interfaces TypeScript (modèles de données)
constants/             → Enums, URLs API, couleurs, définitions des onglets
```


## Conventions clés

### Nommage des fichiers

**Frontend :**
- Composants : `nom-fonctionnel.component.tsx` (ex: `dressingList.component.tsx`)
- Styles : `nom-fonctionnel.style.ts` (ex: `vetementForm.styles.tsx`)
- Controllers : `nom-fonctionnel.controller.tsx` ou `.ts`
- Services : `NomService.service.ts` (ex: `ClientHTTP.service.ts`)
- Models : `nom-fonctionnel.model.ts` (ex: `vetements.model.ts`)
- Constantes/Enums : `NomDomaine.ts` (ex: `AppEnum.ts`, `APIconstants.ts`)

### TypeScript

- Mode strict activé.
- Interfaces pour tous les modèles de données (pas de classes), avec le suffixe `Model`
- Enums avec suffixe `Enum` : `StatutVetementEnum`, `SaisonVetementEnum`
- Props de composants avec suffixe `Props` : `DressingComponentProps`
- Propriétés immuables marquées `readonly` dans les interfaces
- Pas de `any` sauf pour les objets MongoDB bruts (avec conversion immédiate)
- Éviter le type `Function` non typé — utiliser des signatures précises

### Composants

- Composants fonctionnels uniquement avec `React.FC<Props>`
- Export nommé (pas `export default`) : `export const DressingComponent`
- Interface de props dédiée juste avant le composant : `export type DressingComponentProps = {...}`
- Accès au contexte global via `useContext(AppContext)!`
- Logique métier dans les controllers (`/controllers`), pas dans les composants
- Styles dans un fichier `.style.ts` séparé si nombreux, sinon `StyleSheet` inline

## Tests

```bash
npm test
```

Framework : Jest + `react-test-renderer`. Les tests sont dans `app/components/__tests__/`.

| Suite | Description |
|-------|-------------|
| `AppEnum.test.ts` | Fonctions utilitaires `getLibelleXxx()` — catégories, saisons, statuts, tailles (16 tests) |
| `APIconstants.test.ts` | Fonction `getUrlAPIParametres()` — tous types + edge cases (8 tests) |
| `ThemedText-test.tsx` | Snapshot du composant ThemedText (1 test) |