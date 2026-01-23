import express from 'express';
import cors from 'cors';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Chemin vers le fichier JSON des citations
const DATA_DIR = join(__dirname, 'data');
const CITATIONS_FILE = join(DATA_DIR, 'citations.json');
const CATEGORIES_FILE = join(DATA_DIR, 'categories.json');

// Middleware
app.use(cors());
app.use(express.json());

// Créer le dossier data s'il n'existe pas
if (!existsSync(DATA_DIR)) {
  const { mkdir } = await import('fs/promises');
  await mkdir(DATA_DIR, { recursive: true });
}

// Initialiser le fichier de citations s'il n'existe pas
async function initializeCitationsFile() {
  if (!existsSync(CITATIONS_FILE)) {
    try {
      // Le fichier devrait déjà être copié par le Dockerfile
      // Si ce n'est pas le cas, créer un fichier vide
      await writeFile(CITATIONS_FILE, '[]', 'utf-8');
      console.log('✅ Fichier de citations initialisé');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
      // Créer un fichier vide en dernier recours
      try {
        await writeFile(CITATIONS_FILE, '[]', 'utf-8');
      } catch (e) {
        console.error('Impossible de créer le fichier de citations:', e);
      }
    }
  } else {
    console.log('✅ Fichier de citations trouvé');
  }
}

// Initialiser au démarrage
await initializeCitationsFile();
await initializeCategoriesFile();

// Fonction pour initialiser le fichier de catégories
async function initializeCategoriesFile() {
  if (!existsSync(CATEGORIES_FILE)) {
    try {
      const defaultCategories = ['Amour', 'Motivation', 'Vie', 'Sagesse', 'Succès', 'Bonheur', 'Philosophie', 'Humour'];
      await writeFile(CATEGORIES_FILE, JSON.stringify(defaultCategories, null, 2), 'utf-8');
      console.log('✅ Fichier de catégories initialisé');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation des catégories:', error);
    }
  } else {
    console.log('✅ Fichier de catégories trouvé');
  }
}

// Fonction pour lire les catégories
async function readCategories() {
  try {
    if (existsSync(CATEGORIES_FILE)) {
      const data = await readFile(CATEGORIES_FILE, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la lecture des catégories:', error);
    return [];
  }
}

// Fonction pour sauvegarder les catégories
async function saveCategories(categories) {
  try {
    await writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des catégories:', error);
    return false;
  }
}

// Fonction pour lire les citations
async function readCitations() {
  try {
    if (existsSync(CITATIONS_FILE)) {
      const data = await readFile(CITATIONS_FILE, 'utf-8');
      return JSON.parse(data);
    }
    // Si le fichier n'existe pas, retourner un tableau vide
    return [];
  } catch (error) {
    console.error('Erreur lors de la lecture des citations:', error);
    return [];
  }
}

// Fonction pour sauvegarder les citations
async function saveCitations(citations) {
  try {
    await writeFile(CITATIONS_FILE, JSON.stringify(citations, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des citations:', error);
    return false;
  }
}

// Routes pour les citations
// GET /api/quotes - Récupérer toutes les citations
app.get('/api/quotes', async (req, res) => {
  try {
    const citations = await readCitations();
    res.json(citations);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des citations' });
  }
});

// GET /api/quotes/random - Récupérer une citation aléatoire
app.get('/api/quotes/random', async (req, res) => {
  try {
    const citations = await readCitations();
    if (citations.length === 0) {
      return res.status(404).json({ error: 'Aucune citation disponible' });
    }
    const randomIndex = Math.floor(Math.random() * citations.length);
    res.json(citations[randomIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la citation' });
  }
});

// GET /api/quotes/:id - Récupérer une citation par ID
app.get('/api/quotes/:id', async (req, res) => {
  try {
    const citations = await readCitations();
    const citation = citations.find(q => q.id === parseInt(req.params.id));
    if (!citation) {
      return res.status(404).json({ error: 'Citation non trouvée' });
    }
    res.json(citation);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la citation' });
  }
});

// POST /api/quotes - Ajouter une nouvelle citation
app.post('/api/quotes', async (req, res) => {
  try {
    const { text, author, category } = req.body;
    
    if (!text || !author) {
      return res.status(400).json({ error: 'Le texte et l\'auteur sont requis' });
    }

    const citations = await readCitations();
    const newId = citations.length > 0 ? Math.max(...citations.map(q => q.id)) + 1 : 1;
    
    const newCitation = {
      id: newId,
      text,
      author,
      category: category || 'Autre',
      views: 0,
      createdAt: new Date().toISOString()
    };

    citations.push(newCitation);
    await saveCitations(citations);
    
    res.status(201).json(newCitation);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la citation' });
  }
});

// PUT /api/quotes/:id - Modifier une citation
app.put('/api/quotes/:id', async (req, res) => {
  try {
    const { text, author, category } = req.body;
    const id = parseInt(req.params.id);

    const citations = await readCitations();
    const index = citations.findIndex(q => q.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Citation non trouvée' });
    }

    citations[index] = {
      ...citations[index],
      text: text || citations[index].text,
      author: author || citations[index].author,
      category: category || citations[index].category,
      updatedAt: new Date().toISOString()
    };

    await saveCitations(citations);
    res.json(citations[index]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la modification de la citation' });
  }
});

// DELETE /api/quotes/:id - Supprimer une citation
app.delete('/api/quotes/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const citations = await readCitations();
    const filtered = citations.filter(q => q.id !== id);
    
    if (filtered.length === citations.length) {
      return res.status(404).json({ error: 'Citation non trouvée' });
    }

    await saveCitations(filtered);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la citation' });
  }
});

// POST /api/quotes/:id/views - Incrémenter les vues
app.post('/api/quotes/:id/views', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const citations = await readCitations();
    const index = citations.findIndex(q => q.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Citation non trouvée' });
    }

    citations[index].views = (citations[index].views || 0) + 1;
    await saveCitations(citations);
    res.json(citations[index]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'incrémentation des vues' });
  }
});

// Routes d'authentification (basiques pour l'instant)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // TODO: Implémenter la logique d'inscription
    res.json({ message: 'Inscription réussie', user: { username } });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // TODO: Implémenter la logique de connexion
    res.json({ message: 'Connexion réussie', user: { username } });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});

// Routes pour les catégories
// GET /api/categories - Récupérer toutes les catégories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await readCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
  }
});

// POST /api/categories - Ajouter une catégorie
app.post('/api/categories', async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Le nom de la catégorie est requis' });
    }

    const categories = await readCategories();
    const categoryName = name.trim();
    
    if (categories.includes(categoryName)) {
      return res.status(400).json({ error: 'Cette catégorie existe déjà' });
    }

    categories.push(categoryName);
    await saveCategories(categories);
    
    res.status(201).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la catégorie' });
  }
});

// DELETE /api/categories/:name - Supprimer une catégorie
app.delete('/api/categories/:name', async (req, res) => {
  try {
    const categoryName = decodeURIComponent(req.params.name);
    const categories = await readCategories();
    const filtered = categories.filter(cat => cat !== categoryName);
    
    if (filtered.length === categories.length) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }

    await saveCategories(filtered);
    res.json({ success: true, categories: filtered });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la catégorie' });
  }
});

// GET /api/authors - Récupérer tous les auteurs uniques
app.get('/api/authors', async (req, res) => {
  try {
    const citations = await readCitations();
    const authors = [...new Set(citations.map(q => q.author).filter(Boolean))];
    res.json(authors.sort());
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des auteurs' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur backend démarré sur le port ${PORT}`);
});
