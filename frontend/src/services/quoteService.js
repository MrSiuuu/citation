// Service pour gérer les citations via l'API backend
// - En dev: Vite proxy /api -> backend (recommandé)
// - En prod: définir VITE_API_BASE_URL (ex: https://api.monsite.com)
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const API_URL = `${API_BASE_URL}/api/quotes`;
const CATEGORIES_API_URL = `${API_BASE_URL}/api/categories`;
const AUTHORS_API_URL = `${API_BASE_URL}/api/authors`;

// Fonction utilitaire pour les appels API
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Erreur serveur' }));
      throw new Error(error.error || `Erreur HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

export const quoteService = {
  // Obtenir une citation aléatoire
  async getRandomQuote() {
    try {
      return await apiCall('/random');
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Incrémenter le compteur de vues d'une citation
  async incrementViews(quoteId) {
    try {
      return await apiCall(`/${quoteId}/views`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Erreur lors de l\'incrémentation des vues:', error);
      throw error;
    }
  },

  // Obtenir toutes les citations
  async getAllQuotes() {
    try {
      const quotes = await apiCall('');
      // Trier par date de création (plus récent en premier)
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

  // Obtenir une citation par ID
  async getQuoteById(id) {
    try {
      return await apiCall(`/${id}`);
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Ajouter une nouvelle citation
  async addQuote(quote) {
    try {
      const newQuote = await apiCall('', {
        method: 'POST',
        body: JSON.stringify({
          text: quote.text,
          author: quote.author,
          category: quote.category || 'Autre'
        })
      });
      return newQuote;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Supprimer une citation
  async deleteQuote(id) {
    try {
      return await apiCall(`/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Modifier une citation
  async updateQuote(id, quote) {
    try {
      return await apiCall(`/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          text: quote.text,
          author: quote.author,
          category: quote.category || 'Autre'
        })
      });
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Gestion des catégories (via API backend)
  async getCategories() {
    try {
      const response = await fetch(CATEGORIES_API_URL);
      if (!response.ok) throw new Error('Erreur lors de la récupération des catégories');
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      // Catégories par défaut en fallback
      return ['Amour', 'Motivation', 'Vie', 'Sagesse', 'Succès', 'Bonheur', 'Philosophie', 'Humour'];
    }
  },

  async addCategory(categoryName) {
    try {
      const response = await fetch(CATEGORIES_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de l\'ajout de la catégorie');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la catégorie:', error);
      throw error;
    }
  },

  async deleteCategory(categoryName) {
    try {
      const encodedName = encodeURIComponent(categoryName);
      const response = await fetch(`${CATEGORIES_API_URL}/${encodedName}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la suppression de la catégorie');
      }
      const data = await response.json();
      return data.categories || [];
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
      throw error;
    }
  },

  // Récupérer tous les auteurs uniques
  async getAuthors() {
    try {
      const response = await fetch(AUTHORS_API_URL);
      if (!response.ok) throw new Error('Erreur lors de la récupération des auteurs');
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des auteurs:', error);
      return [];
    }
  }
};
