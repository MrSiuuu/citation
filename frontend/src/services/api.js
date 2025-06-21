// Service API centralisé
const api = {
  async getQuotes() {
    try {
      const response = await fetch('/api/quotes');
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Erreur API:', errorData);
        throw new Error(`Erreur lors de la récupération des citations: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Erreur réseau:', error);
      throw error;
    }
  },
  
  async getRandomQuote() {
    try {
      const response = await fetch('/api/quotes/random');
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Erreur API:', errorData);
        throw new Error(`Erreur lors de la récupération d'une citation aléatoire: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Erreur réseau:', error);
      throw error;
    }
  },
  
  async addQuote(quote) {
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quote)
      });
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Erreur API:', errorData);
        throw new Error(`Erreur lors de l'ajout de la citation: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Erreur réseau:', error);
      throw error;
    }
  },
  
  async deleteQuote(id) {
    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Erreur API:', errorData);
        throw new Error(`Erreur lors de la suppression de la citation: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Erreur réseau:', error);
      throw error;
    }
  }
};

export default api; 