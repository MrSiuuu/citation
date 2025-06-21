const API_BASE_URL = import.meta.env.VITE_API_URL;

// Service API centralisé
const api = {
  async getQuotes() {
    const response = await fetch(`${API_BASE_URL}/api/quotes`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des citations');
    return response.json();
  },
  
  async getRandomQuote() {
    const response = await fetch(`${API_BASE_URL}/api/quotes/random`);
    if (!response.ok) throw new Error('Erreur lors de la récupération d\'une citation aléatoire');
    return response.json();
  },
  
  async addQuote(quote) {
    const response = await fetch(`${API_BASE_URL}/api/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quote)
    });
    if (!response.ok) throw new Error('Erreur lors de l\'ajout de la citation');
    return response.json();
  },
  
  async deleteQuote(id) {
    const response = await fetch(`${API_BASE_URL}/api/quotes/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression de la citation');
    return response.json();
  }
};

export default api; 