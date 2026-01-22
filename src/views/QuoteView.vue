<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto">
        <!-- Logo et titre -->
        <div class="text-center mb-8">
          <RouterLink to="/" class="inline-block mb-4">
            <img 
              src="/favicon1.png" 
              alt="Westaf-Vibe Logo" 
              class="w-20 h-20 mx-auto object-contain hover:scale-110 transform transition-all duration-300"
            />
          </RouterLink>
          <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent mb-2">
            Westaf-Vibe
          </h1>
          <p class="text-sm sm:text-base text-gray-600">Ta dose quotidienne de débilité</p>
        </div>

        <!-- Citation -->
        <div v-if="quote" class="bg-white border-2 border-green-300 rounded-sm shadow-2xl p-8 md:p-12 transform transition-all duration-500">
          <!-- Logo du site -->
          <div class="text-center mb-6">
            <div class="inline-block w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center animate-wiggle p-1 bg-white shadow-lg overflow-hidden">
              <img 
                src="/favicon1.png" 
                alt="Westaf-Vibe Logo" 
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Texte de la citation -->
          <blockquote class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif italic text-gray-800 mb-6 text-center leading-relaxed px-2">
            "{{ quote.text }}"
          </blockquote>

          <!-- Auteur -->
          <p class="text-right text-lg font-semibold text-green-400 mb-6">
            — {{ quote.author }}
          </p>

          <!-- Catégorie -->
          <div class="text-center mb-8">
            <span class="inline-block px-4 py-2 bg-gradient-to-r from-green-900 to-yellow-900 text-green-300 rounded-full text-sm font-medium border border-green-700">
              {{ quote.category }}
            </span>
          </div>

          <!-- Message de redirection -->
          <div class="bg-gradient-to-r from-green-50 to-yellow-50 border-2 border-green-200 rounded-sm p-6 text-center">
            <p class="text-gray-700 mb-4">
              Découvrez des milliers d'autres citations inspirantes sur
            </p>
            <RouterLink 
              to="/"
              class="inline-block bg-gradient-to-r from-green-600 via-yellow-500 to-orange-500 hover:from-green-700 hover:via-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-sm font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Visiter Westaf-Vibe
            </RouterLink>
          </div>
        </div>

        <!-- Loading -->
        <div v-else-if="loading" class="bg-white border-2 border-green-300 rounded-sm shadow-2xl p-12 text-center">
          <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent"></div>
          <p class="mt-4 text-gray-600">Chargement de la citation...</p>
        </div>

        <!-- Erreur -->
        <div v-else class="bg-white border-2 border-red-300 rounded-sm shadow-2xl p-8 text-center">
          <p class="text-red-600 mb-4">Citation introuvable</p>
          <RouterLink 
            to="/"
            class="inline-block bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white px-6 py-3 rounded-sm font-semibold hover:scale-105 transform transition-all duration-300"
          >
            Retour à l'accueil
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { quoteService } from '../services/quoteService';

const route = useRoute();
const quote = ref(null);
const loading = ref(true);

onMounted(async () => {
  const quoteId = route.params.id;
  
  try {
    loading.value = true;
    // Essayer de récupérer la citation par ID
    const allQuotes = await quoteService.getAllQuotes();
    
    // Convertir quoteId en nombre pour la comparaison
    const quoteIdNum = parseInt(quoteId, 10);
    
    // Chercher par ID numérique d'abord
    let foundQuote = allQuotes.find(q => q.id === quoteIdNum || String(q.id) === quoteId);
    
    // Si pas trouvé par ID, essayer par texte (fallback)
    if (!foundQuote) {
      try {
        const decodedId = decodeURIComponent(quoteId);
        foundQuote = allQuotes.find(q => 
          q.text.substring(0, 50).toLowerCase().includes(decodedId.toLowerCase())
        );
      } catch (e) {
        // Si le décodage échoue, on continue sans fallback
      }
    }
    
    if (foundQuote) {
      quote.value = foundQuote;
    }
  } catch (err) {
    console.error('Erreur lors du chargement de la citation:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style>
@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

.animate-wiggle {
  animation: wiggle 2s ease-in-out infinite;
}
</style>
