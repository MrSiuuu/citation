// Service pour gérer les citations depuis un fichier JSON et localStorage
const STORAGE_KEY = 'citations_app_data';
const CATEGORIES_KEY = 'westaf_categories';
const JSON_FILE_PATH = '/citations.json';

// Initialiser les citations depuis le JSON si localStorage est vide
const initializeQuotes = async () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  // Charger depuis le fichier JSON
  try {
    const response = await fetch(JSON_FILE_PATH);
    if (!response.ok) throw new Error('Erreur lors du chargement du fichier JSON');
    const quotes = await response.json();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
    return quotes;
  } catch (error) {
    console.error('Erreur lors du chargement initial:', error);
    return [];
  }
};

// Obtenir toutes les citations depuis localStorage
const getAllQuotesFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Sauvegarder les citations dans localStorage
const saveQuotesToStorage = (quotes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
};

export const quoteService = {
  // Obtenir une citation aléatoire
  async getRandomQuote() {
    try {
      const quotes = getAllQuotesFromStorage();
      if (quotes.length === 0) {
        await initializeQuotes();
        const allQuotes = getAllQuotesFromStorage();
        if (allQuotes.length === 0) {
          throw new Error('Aucune citation disponible');
        }
        const randomIndex = Math.floor(Math.random() * allQuotes.length);
        return allQuotes[randomIndex];
      }
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Incrémenter le compteur de vues d'une citation
  async incrementViews(quoteId) {
    try {
      const quotes = getAllQuotesFromStorage();
      const index = quotes.findIndex(q => q.id === quoteId);
      if (index === -1) {
        console.warn('Citation non trouvée pour incrémenter les vues');
        return;
      }
      
      // Initialiser views à 0 si inexistant
      if (!quotes[index].views) {
        quotes[index].views = 0;
      }
      
      // Incrémenter le compteur
      quotes[index].views = (quotes[index].views || 0) + 1;
      saveQuotesToStorage(quotes);
      return quotes[index];
    } catch (error) {
      console.error('Erreur lors de l\'incrémentation des vues:', error);
      throw error;
    }
  },

  // Obtenir toutes les citations
  async getAllQuotes() {
    try {
      const quotes = getAllQuotesFromStorage();
      if (quotes.length === 0) {
        return await initializeQuotes();
      }
      return quotes.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Ajouter une nouvelle citation
  async addQuote(quote) {
    try {
      await initializeQuotes(); // S'assurer que les données sont initialisées
      const quotes = getAllQuotesFromStorage();
      const newQuote = {
        id: quotes.length > 0 ? Math.max(...quotes.map(q => q.id)) + 1 : 1,
        text: quote.text,
        author: quote.author,
        category: quote.category || 'Autre',
        views: 0, // Initialiser le compteur de vues à 0
        createdAt: new Date().toISOString()
      };
      quotes.push(newQuote);
      saveQuotesToStorage(quotes);
      return newQuote;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Supprimer une citation
  async deleteQuote(id) {
    try {
      const quotes = getAllQuotesFromStorage();
      const filteredQuotes = quotes.filter(q => q.id !== id);
      saveQuotesToStorage(filteredQuotes);
      return { success: true };
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Modifier une citation
  async updateQuote(id, quote) {
    try {
      const quotes = getAllQuotesFromStorage();
      const index = quotes.findIndex(q => q.id === id);
      if (index === -1) {
        throw new Error('Citation non trouvée');
      }
      quotes[index] = {
        ...quotes[index],
        text: quote.text,
        author: quote.author,
        category: quote.category || quotes[index].category || 'Autre',
        updatedAt: new Date().toISOString()
      };
      saveQuotesToStorage(quotes);
      return quotes[index];
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Gestion des catégories
  getCategories() {
    try {
      const stored = localStorage.getItem(CATEGORIES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Catégories par défaut
      const defaultCategories = ['Amour', 'Motivation', 'Vie', 'Sagesse', 'Succès', 'Bonheur', 'Philosophie', 'Humour'];
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
      return defaultCategories;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      return ['Amour', 'Motivation', 'Vie', 'Sagesse', 'Succès', 'Bonheur', 'Philosophie', 'Humour'];
    }
  },

  saveCategories(categories) {
    try {
      const categoriesArray = Array.isArray(categories) ? categories : [];
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categoriesArray));
      console.log('Catégories sauvegardées dans localStorage:', categoriesArray);
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des catégories:', error);
      return false;
    }
  },

  addCategory(categoryName) {
    try {
      const categories = this.getCategories();
      if (!categories.includes(categoryName.trim())) {
        categories.push(categoryName.trim());
        this.saveCategories(categories);
      }
      return categories;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la catégorie:', error);
      return this.getCategories();
    }
  },

  deleteCategory(categoryName) {
    try {
      const categories = this.getCategories();
      console.log('Catégories avant suppression:', categories, 'Catégorie à supprimer:', categoryName);
      const index = categories.indexOf(categoryName);
      if (index > -1) {
        categories.splice(index, 1);
        const saved = this.saveCategories(categories);
        console.log('Catégories après suppression:', categories, 'Sauvegarde réussie:', saved);
        return [...categories]; // Retourner une copie
      } else {
        console.warn('Catégorie non trouvée pour suppression:', categoryName);
      }
      return [...categories]; // Retourner une copie même si pas supprimée
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
      return [...this.getCategories()];
    }
  }
}; 