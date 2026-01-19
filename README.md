# Application de Citations

Application web frontend pour afficher et gérer des citations. Les citations sont stockées dans un fichier JSON et persistées dans le localStorage du navigateur.

## 🚀 Démarrage rapide

### Prérequis
- Node.js (version 16 ou supérieure)
- npm

### Installation et démarrage

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd citation
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer l'application**
```bash
npm run dev
```

L'application sera accessible sur **http://localhost:5173**

## 📊 Structure du projet

- **Frontend**: Vue.js 3 avec Composition API
- **Styling**: Tailwind CSS
- **Routing**: Vue Router
- **Données**: Fichier JSON (`public/citations.json`) + localStorage

## 📋 Fonctionnalités

- ✅ Afficher une citation aléatoire
- ✅ Voir toutes les citations
- ✅ Ajouter une nouvelle citation
- ✅ Modifier une citation existante
- ✅ Supprimer une citation
- ✅ Persistance des données dans le localStorage

## 📁 Fichiers importants

- `public/citations.json` - Fichier JSON contenant les citations initiales
- `src/services/quoteService.js` - Service pour gérer les citations (charge depuis JSON, sauvegarde dans localStorage)

## 🔧 Commandes utiles

```bash
# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la build de production
npm run preview

# Linter le code
npm run lint

# Formater le code
npm run format
```

## 💾 Gestion des données

Les citations sont initialement chargées depuis le fichier `public/citations.json`. Toutes les modifications (ajout, modification, suppression) sont sauvegardées dans le **localStorage** du navigateur.

Pour réinitialiser les données :
1. Ouvrez la console du navigateur (F12)
2. Exécutez : `localStorage.removeItem('citations_app_data')`
3. Rechargez la page

## 🎨 Technologies utilisées

- **Vue.js 3** - Framework JavaScript progressif
- **Vite** - Build tool rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **Vue Router** - Router officiel pour Vue.js

## 📝 Format des citations

Chaque citation dans le fichier JSON doit avoir la structure suivante :

```json
{
  "id": 1,
  "text": "Le texte de la citation",
  "author": "Nom de l'auteur",
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```
