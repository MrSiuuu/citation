// Service pour gérer les citations depuis un fichier JSON et localStorage
const STORAGE_KEY = 'citations_app_data';
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
  }
}; 