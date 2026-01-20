<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 py-8">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <!-- En-tête Admin -->
        <div class="bg-white rounded-sm shadow-2xl p-6 mb-6 border-2 border-green-300">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-yellow-500 bg-clip-text text-transparent">
                Espace Administrateur
              </h1>
              <p class="text-sm sm:text-base text-gray-600">Gestion complète de Westaf-Vibe</p>
            </div>
            <button
              @click="handleLogout"
              class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-sm transition-all duration-300 hover:scale-105"
            >
              Déconnexion
            </button>
          </div>
        </div>

        <!-- Statistiques -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-white rounded-sm shadow-lg p-6 border-2 border-green-300">
            <h3 class="text-gray-600 text-sm font-medium mb-2">Total Citations</h3>
            <p class="text-4xl font-bold text-green-400">{{ quotes.length }}</p>
          </div>
          <div class="bg-white rounded-sm shadow-lg p-6 border-2 border-green-300">
            <h3 class="text-gray-600 text-sm font-medium mb-2">Catégories</h3>
            <p class="text-4xl font-bold text-green-400">{{ uniqueCategories.length }}</p>
          </div>
          <div class="bg-white rounded-sm shadow-lg p-6 border-2 border-green-300">
            <h3 class="text-gray-600 text-sm font-medium mb-2">Statut</h3>
            <p class="text-2xl font-bold text-green-400">Actif</p>
          </div>
        </div>

        <!-- Gestion des citations -->
        <div class="bg-white rounded-sm shadow-2xl p-6 mb-6 border-2 border-green-300">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Gestion des Citations</h2>
            <button
              @click="showAddForm = !showAddForm"
              class="bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded-sm transition-all duration-300 hover:scale-105"
            >
              {{ showAddForm ? 'Annuler' : 'Ajouter une citation' }}
            </button>
          </div>

          <!-- Formulaire d'ajout -->
          <div v-if="showAddForm" class="mb-6 p-4 bg-green-50 rounded-sm border-2 border-green-300">
            <h3 class="text-xl font-bold mb-4 text-gray-800">Nouvelle Citation</h3>
            <form @submit.prevent="handleAddQuote" class="space-y-4">
              <div>
                <label class="block text-gray-700 mb-2">Texte de la citation</label>
                <textarea
                  v-model="newQuote.text"
                  rows="3"
                  class="w-full px-4 py-2 bg-white border-2 border-green-200 rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                ></textarea>
              </div>
              <div>
                <label class="block text-gray-700 mb-2">Auteur</label>
                <input
                  v-model="newQuote.author"
                  type="text"
                  class="w-full px-4 py-2 bg-white border-2 border-green-200 rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label class="block text-gray-700 mb-2">Catégorie</label>
                <select
                  v-model="newQuote.category"
                  class="w-full px-4 py-2 bg-white border-2 border-green-200 rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option v-for="cat in allCategories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>
              <button
                type="submit"
                class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-2 px-6 rounded-sm transition-all duration-300 hover:scale-105"
              >
                Ajouter
              </button>
            </form>
          </div>

          <!-- Liste des citations -->
          <div v-if="loading" class="text-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          </div>

          <div v-else-if="error" class="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-sm mb-4">
            {{ error }}
          </div>

          <div v-else class="space-y-4 max-h-96 overflow-y-auto">
            <div v-if="quotes.length === 0" class="text-center py-8 text-gray-600">
              Aucune citation disponible.
            </div>
            <div
              v-for="quote in quotes"
              :key="quote.id"
              class="bg-white rounded-sm p-4 border-2 border-green-200 hover:border-green-500 transition-all duration-300"
            >
              <div class="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div class="flex-1">
                  <p class="text-base sm:text-lg italic text-gray-800 mb-2">"{{ quote.text }}"</p>
                  <div class="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                    <span class="text-green-400 font-semibold">— {{ quote.author }}</span>
                    <span class="px-3 py-1 bg-green-900 text-green-300 rounded-full text-xs">
                      {{ quote.category }}
                    </span>
                  </div>
                </div>
                <div class="flex gap-2 sm:ml-4 w-full sm:w-auto">
                  <button
                    @click="handleEdit(quote)"
                    class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-sm transition-all duration-300 hover:scale-105 flex-1 sm:flex-none"
                    title="Modifier"
                  >
                    Modifier
                  </button>
                  <button
                    @click="handleDelete(quote.id)"
                    class="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium rounded-sm transition-all duration-300 hover:scale-105 flex-1 sm:flex-none"
                    title="Supprimer"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Gestion des catégories -->
          <div class="bg-white rounded-sm shadow-2xl p-6 border-2 border-green-300">
            <h2 class="text-xl sm:text-2xl font-bold mb-6 text-gray-800">Gestion des Catégories</h2>
          
          <div class="mb-4">
            <input
              v-model="newCategory"
              type="text"
              placeholder="Nom de la nouvelle catégorie"
              class="w-full md:w-auto px-4 py-2 bg-white border-2 border-green-200 rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 mr-2"
            />
            <button
              @click="addCategory"
              class="mt-2 md:mt-0 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-sm transition-all duration-300 hover:scale-105"
            >
              Ajouter
            </button>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div
              v-for="category in uniqueCategories"
              :key="category"
              class="bg-green-50 rounded-sm p-3 border-2 border-green-200 flex justify-between items-center hover:border-green-500 transition-all duration-300"
            >
              <span class="text-gray-800 font-medium">{{ category }}</span>
              <button
                @click="deleteCategory(category)"
                class="text-red-400 hover:text-red-600 transition-colors"
                title="Supprimer"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { quoteService } from '../services/quoteService';

const router = useRouter();

const quotes = ref([]);
const loading = ref(true);
const error = ref(null);
const showAddForm = ref(false);
const newCategory = ref('');
const newQuote = ref({
  text: '',
  author: '',
  category: 'Humour'
});

const allCategories = ref(['Amour', 'Motivation', 'Vie', 'Sagesse', 'Succès', 'Bonheur', 'Philosophie', 'Humour']);

const uniqueCategories = computed(() => {
  const cats = new Set();
  quotes.value.forEach(q => {
    if (q.category) cats.add(q.category);
  });
  allCategories.value.forEach(cat => cats.add(cat));
  return Array.from(cats).sort();
});

const loadQuotes = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await quoteService.getAllQuotes();
    quotes.value = response;
  } catch (err) {
    error.value = "Erreur lors du chargement des citations";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const handleAddQuote = async () => {
  try {
    await quoteService.addQuote(newQuote.value);
    newQuote.value = { text: '', author: '', category: 'Humour' };
    showAddForm.value = false;
    await loadQuotes();
  } catch (err) {
    error.value = "Erreur lors de l'ajout de la citation";
    console.error(err);
  }
};

const handleEdit = (quote) => {
  newQuote.value = { ...quote };
  showAddForm.value = true;
  // Scroll to form
  setTimeout(() => {
    document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
};

const handleDelete = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette citation ?')) return;
  
  try {
    await quoteService.deleteQuote(id);
    await loadQuotes();
  } catch (err) {
    error.value = "Erreur lors de la suppression de la citation";
    console.error(err);
  }
};

const addCategory = () => {
  if (newCategory.value.trim() && !allCategories.value.includes(newCategory.value.trim())) {
    allCategories.value.push(newCategory.value.trim());
    newCategory.value = '';
  }
};

const deleteCategory = (category) => {
  if (confirm(`Supprimer la catégorie "${category}" ? Les citations de cette catégorie ne seront pas supprimées.`)) {
    const index = allCategories.value.indexOf(category);
    if (index > -1) {
      allCategories.value.splice(index, 1);
    }
  }
};

const handleLogout = () => {
  localStorage.removeItem('admin_authenticated');
  sessionStorage.removeItem('dashboard_access');
  sessionStorage.removeItem('dashboard_timestamp');
  sessionStorage.removeItem('quote_code_entered');
  sessionStorage.removeItem('quote_code_timestamp');
  router.push('/');
};

// Vérifier si l'accès est encore valide (10 minutes)
const checkAccessValidity = () => {
  const hasDashboardAccess = sessionStorage.getItem('dashboard_access') === 'true';
  if (hasDashboardAccess) {
    const timestamp = parseInt(sessionStorage.getItem('dashboard_timestamp') || '0');
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000;
    
    if (timestamp && (now - timestamp) >= tenMinutes) {
      // Expiré, rediriger
      handleLogout();
      return false;
    }
  }
  return true;
};

onMounted(() => {
  if (!checkAccessValidity()) {
    return;
  }
  loadQuotes();
  
  // Vérifier toutes les minutes si l'accès est encore valide
  setInterval(() => {
    if (!checkAccessValidity()) {
      router.push('/admin/login');
    }
  }, 60000); // Vérifier toutes les minutes
});
</script>
