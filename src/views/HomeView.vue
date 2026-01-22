<template>
  <div class="min-h-screen">
    <!-- Loader avec logo au centre -->
    <div v-if="isLoading" class="fixed inset-0 bg-gradient-to-br from-green-400 via-yellow-400 to-orange-400 flex items-center justify-center z-50">
      <div class="text-center">
        <div class="relative inline-block">
          <!-- Cercle de rotation -->
          <div class="absolute inset-0 border-8 border-white border-t-transparent rounded-full animate-spin"></div>
          <!-- Logo au centre -->
          <div class="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
            <img
              src="/favicon1.png"
              alt="Westaf-Vibe Logo"
              class="w-full h-full object-contain animate-pulse"
            />
          </div>
        </div>
        <p class="mt-6 text-white text-xl font-bold animate-pulse">Westaf-Vibe</p>
      </div>
    </div>

    <!-- Contenu principal -->
    <div v-show="!isLoading">
    <!-- Hero Section avec dégradé Westaf -->
    <section class="relative bg-gradient-to-br from-green-400 via-yellow-400 to-orange-400 text-white py-20 overflow-hidden">
      <!-- Logo qui rebondit en fond -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- Tous les logos sur desktop, seulement 2-3 sur mobile -->
        <img
          src="/favicon1.png"
          alt="Logo"
          class="hidden md:block absolute top-10 left-10 w-32 h-32 object-contain rounded-full animate-bounce opacity-20"
          style="animation-delay: 0s; animation-duration: 3s;"
        />
        <img
          src="/favicon1.png"
          alt="Logo"
          class="hidden md:block absolute top-40 right-20 w-28 h-28 object-contain rounded-full animate-bounce opacity-40"
          style="animation-delay: 1s; animation-duration: 4s;"
        />
        <img
          src="/favicon1.png"
          alt="Logo"
          class="hidden md:block absolute bottom-20 left-1/4 w-36 h-36 object-contain rounded-full animate-bounce opacity-40"
          style="animation-delay: 2s; animation-duration: 5s;"
        />
        <img
          src="/favicon1.png"
          alt="Logo"
          class="hidden md:block absolute top-1/2 right-1/3 w-24 h-24 object-contain rounded-full animate-bounce opacity-40"
          style="animation-delay: 1.5s; animation-duration: 3.5s;"
        />
        <img
          src="/favicon1.png"
          alt="Logo"
          class="hidden md:block absolute bottom-40 right-1/4 w-32 h-32 object-contain rounded-full animate-bounce opacity-40"
          style="animation-delay: 0.5s; animation-duration: 4.5s;"
        />
        <img
          src="/favicon1.png"
          alt="Logo"
          class="hidden md:block absolute top-1/4 left-1/3 w-28 h-28 object-contain rounded-full animate-bounce opacity-40"
          style="animation-delay: 2.5s; animation-duration: 4s;"
        />
        <img
          src="/favicon1.png"
          alt="Logo"
          class="hidden md:block absolute bottom-10 left-10 w-32 h-32 object-contain rounded-full animate-bounce opacity-40"
          style="animation-delay: 1.2s; animation-duration: 3.8s;"
        />
        <img
          src="/favicon1.png"
          alt="Logo"
          class="hidden md:block absolute top-3/4 right-10 w-28 h-28 object-contain rounded-full animate-bounce opacity-40"
          style="animation-delay: 0.8s; animation-duration: 4.2s;"
        />
        <img
          src="/favicon1.png"
          alt="Logo"
          class="hidden md:block absolute top-20 right-1/2 w-36 h-36 object-contain rounded-full animate-bounce opacity-40"
          style="animation-delay: 3s; animation-duration: 5.5s;"
        />
        <img
          src="/favicon1.png"
          alt="Logo"
          class="hidden md:block absolute bottom-1/3 left-1/2 w-32 h-32 object-contain rounded-full animate-bounce opacity-40"
          style="animation-delay: 1.8s; animation-duration: 4.8s;"
        />
        <!-- Logos réduits sur mobile/tablette (seulement 2-3) -->
        <img
          src="/favicon1.png"
          alt="Logo"
          class="md:hidden absolute top-20 right-10 w-16 h-16 object-contain rounded-full animate-bounce opacity-30"
          style="animation-delay: 1s; animation-duration: 4s;"
        />
        <img
          src="/favicon1.png"
          alt="Logo"
          class="md:hidden absolute bottom-20 left-10 w-20 h-20 object-contain rounded-full animate-bounce opacity-30"
          style="animation-delay: 2s; animation-duration: 5s;"
        />
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <!-- Logo animé -->
          <div class="mb-8 animate-bounce" style="animation-duration: 2s;">
            <div class="inline-block w-32 h-32 bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm p-4 shadow-xl">
              <img
                src="/favicon1.png"
                alt="Westaf-Vibe Logo"
                class="w-full h-full object-contain"
              />
            </div>
          </div>

          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up px-4">
            Découvrez l'inspiration quotidienne
          </h1>
          <p class="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 opacity-90 animate-fade-in-up px-4" style="animation-delay: 0.2s;">
            Votre source quotidienne d'inspiration et de débilité, à travers les citations les plus drôles.
          </p>

          <!-- (Bouton déplacé dans la carte de citation) -->
        </div>
      </div>
    </section>

    <!-- Section Citation Principale -->
    <section class="py-12 bg-gradient-to-br from-green-50 to-yellow-50">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <div
            v-if="randomQuote"
            class="relative bg-white border-2 border-green-300 rounded-sm shadow-2xl p-6 sm:p-8 md:p-12 transform transition-all duration-500 hover:scale-105 hover:border-green-500 hover:shadow-green-200"
            :class="{ 'animate-shake': isShaking }"
          >
            <!-- Partager (en haut à droite) -->
            <div class="absolute top-6 right-6 z-20">
              <div class="relative share-menu-container">
                <button
                  @click="showShareMenu = !showShareMenu"
                  class="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-white bg-opacity-80 hover:bg-opacity-100 text-green-600 rounded-full shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 border-2 border-green-300"
                  title="Partager"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>

                <!-- Menu de partage -->
                <div v-if="showShareMenu" class="absolute top-full right-0 mt-2 bg-white border-2 border-green-300 rounded-sm shadow-2xl p-4 min-w-[280px]">
                  <div class="space-y-3">
                    <button
                      @click="shareOnWhatsApp"
                      class="w-full flex items-center justify-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-sm font-medium transition-all duration-300 hover:scale-105"
                    >
                      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Partager sur WhatsApp
                    </button>
                    <button
                      @click="copyLink"
                      class="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white rounded-sm font-medium transition-all duration-300 hover:scale-105"
                    >
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copier le lien
                    </button>
                  </div>
                  <p class="text-xs text-gray-500 text-center mt-3">
                    Partagez cette citation sur Westaf-Vibe
                  </p>
                </div>
              </div>
            </div>

            <!-- Logo du site -->
            <div class="text-center mb-6">
              <div
                class="inline-block w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center animate-wiggle p-1 bg-white shadow-lg overflow-hidden"
                :class="{ 'logo-spin-once': isTopLogoSpinning }"
              >
                <img
                  src="/favicon1.png"
                  alt="Westaf-Vibe Logo"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>

            <!-- Texte de la citation -->
            <blockquote class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif italic text-gray-800 mb-6 text-center leading-relaxed px-2">
              "{{ randomQuote.text }}"
            </blockquote>

            <!-- Auteur -->
            <p class="text-right text-base sm:text-lg font-semibold text-green-400 mb-6">
              — {{ randomQuote.author }}
            </p>

            <!-- Action (nouvelle citation) -->
            <div class="flex items-center justify-center mt-2 mb-4">
              <button
                @click="fetchRandomQuote"
                :disabled="randomLoading"
                class="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white border-2 border-green-300 rounded-full hover:scale-115 transform transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden p-2"
                title="Nouvelle citation"
              >
                <img
                  src="/favicon1.png"
                  alt="Nouvelle citation"
                  class="w-full h-full object-cover transition-transform duration-300"
                  :class="{ 'animate-spin-slow': randomLoading }"
                />
              </button>
            </div>

            <!-- Catégorie et compteur de vues en bas -->
            <div class="flex justify-between items-center mt-4">
              <!-- Compteur de vues à gauche -->
              <div class="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span class="font-medium">{{ randomQuote.views || 0 }} vue{{ (randomQuote.views || 0) > 1 ? 's' : '' }}</span>
              </div>
              <!-- Catégorie à droite -->
              <span class="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-green-900 to-yellow-900 text-green-300 rounded-full text-xs sm:text-sm font-medium border border-green-700">
                {{ randomQuote.category }}
              </span>
            </div>
          </div>

          <!-- Loading state -->
          <div v-if="randomLoading" class="bg-white border-2 border-green-300 rounded-sm shadow-2xl p-12 text-center">
            <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent"></div>
            <p class="mt-4 text-gray-700">Chargement d'une citation hilarante...</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Catégories -->
    <section class="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 px-4">Explorez par catégorie</h2>
          <p class="text-base sm:text-lg md:text-xl text-gray-600 px-4">Trouvez l'inspiration qui vous correspond</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto px-2">
          <div
            v-for="category in categories"
            :key="category.name"
            @click="filterByCategory(category.name)"
            class="relative overflow-hidden rounded-sm p-4 sm:p-5 md:p-6 text-white cursor-pointer transform transition-all duration-300 hover:scale-110 hover:rotate-2 hover:z-10 shadow-lg"
            :style="{ background: category.gradient }"
          >
            <div class="text-center">
              <h3 class="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">{{ category.name }}</h3>
              <p class="text-xs sm:text-sm opacity-90">{{ category.count }} citations</p>
            </div>
            <!-- Effet de brillance au survol -->
            <div class="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section "Pourquoi Westaf-Vibe ?" -->
    <section class="py-16 bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 px-4">Pourquoi Westaf-Vibe ?</h2>
          <p class="text-base sm:text-lg md:text-xl text-gray-600 px-4">Une expérience unique pour découvrir et partager des citations</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="bg-white border-2 border-green-200 rounded-sm p-6 sm:p-7 md:p-8 shadow-lg transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:border-green-500 hover:shadow-green-200"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <h3 class="text-lg sm:text-xl font-bold text-center mb-3 text-gray-800">{{ feature.title }}</h3>
            <p class="text-sm sm:text-base text-gray-600 text-center">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { quoteService } from '../services/quoteService';

const randomQuote = ref(null);
const randomLoading = ref(false);
const randomError = ref(null);
const isShaking = ref(false);
const showShareMenu = ref(false);
const isTopLogoSpinning = ref(false);

const quotes = ref([]);
const isLoading = ref(true);

// Catégories avec icônes et dégradés
const categories = computed(() => {
  const categoryCounts = quotes.value.reduce((acc, quote) => {
    const cat = quote.category || 'Autre';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const categoryData = {
    'Amour': { gradient: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)' },
    'Motivation': { gradient: 'linear-gradient(135deg, #4ecdc4, #44a08d)' },
    'Vie': { gradient: 'linear-gradient(135deg, #a8e063, #56ab2f)' },
    'Sagesse': { gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    'Succès': { gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
    'Bonheur': { gradient: 'linear-gradient(135deg, #fbc2eb, #a6c1ee)' },
    'Philosophie': { gradient: 'linear-gradient(135deg, #89f7fe, #66a6ff)' },
    'Humour': { gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)' }
  };

  return Object.keys(categoryData).map(name => ({
    name,
    ...categoryData[name],
    count: categoryCounts[name] || 0
  })).filter(cat => cat.count > 0);
});

const features = [
  {
    title: 'Chaque refresh c’est un nouveau “hein??”',
    description: 'Découvre des citations au hasard… parfois sages, parfois juste dangereuses.',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)'
  },
  {
    title: 'Y’a des citations… faut pas les perdre.',
    description: 'Garde tes meilleures pépites ici, sinon demain tu vas dire “c’était quoi déjà la phrase là ?”',
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)'
  },
  {
    title: 'Tu ris, tu partages, tu déclenches le groupe WhatsApp.',
    description: 'Envoie tes citations préférées sur les réseaux en 2 secondes.',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)'
  }
];

const fetchRandomQuote = async () => {
  try {
    randomLoading.value = true;
    randomError.value = null;
    isShaking.value = true;
    isTopLogoSpinning.value = true;

    const response = await quoteService.getRandomQuote();
    randomQuote.value = response;
    showShareMenu.value = false;

    // Incrémenter le compteur de vues
    if (response && response.id) {
      const updatedQuote = await quoteService.incrementViews(response.id);
      // Mettre à jour la citation affichée avec le nouveau compteur
      if (updatedQuote) {
        randomQuote.value.views = updatedQuote.views;
      }
    }

    // Animation de secousse drôle
    setTimeout(() => {
      isShaking.value = false;
    }, 500);
    // Tourner le logo du haut à chaque nouvelle citation
    setTimeout(() => {
      isTopLogoSpinning.value = false;
    }, 800);
  } catch (err) {
    randomError.value = "Erreur lors de la récupération de la citation";
    console.error(err);
  } finally {
    randomLoading.value = false;
  }
};

// Générer le lien de partage
const getShareLink = () => {
  if (!randomQuote.value) return '';
  const baseUrl = window.location.origin;
  // Utiliser l'ID de la citation ou encoder le début du texte comme identifiant
  const quoteId = randomQuote.value.id || encodeURIComponent(randomQuote.value.text.substring(0, 50).replace(/[^a-zA-Z0-9]/g, ''));
  return `${baseUrl}/quote/${quoteId}`;
};

// Générer le texte de partage (fonction commune)
const getShareText = () => {
  if (!randomQuote.value) return '';
  return `"${randomQuote.value.text}"\n\n${getShareLink()}`;
};

// Partager sur WhatsApp
const shareOnWhatsApp = () => {
  if (!randomQuote.value) return;

  const shareText = getShareText();
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  window.open(whatsappUrl, '_blank');
  showShareMenu.value = false;
};

// Copier le lien
const copyLink = async (event) => {
  if (!randomQuote.value) return;

  const shareText = getShareText();

  try {
    await navigator.clipboard.writeText(shareText);
    // Afficher un message de confirmation
    const button = event.target.closest('button');
    if (button) {
      const originalText = button.innerHTML;
      button.innerHTML = '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>Lien copié !';
      button.classList.add('bg-green-600');
      setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('bg-green-600');
        showShareMenu.value = false;
      }, 2000);
    } else {
      showShareMenu.value = false;
    }
  } catch (err) {
    console.error('Erreur lors de la copie:', err);
    alert('Lien copié ! Partagez-le avec vos amis.');
    showShareMenu.value = false;
  }
};

const filterByCategory = (categoryName) => {
  // TODO: Implémenter le filtrage par catégorie
  console.log('Filtrer par:', categoryName);
};

const loadQuotes = async () => {
  try {
    const response = await quoteService.getAllQuotes();
    quotes.value = response;
  } catch (err) {
    console.error('Erreur lors du chargement des citations:', err);
  }
};

// Fermer le menu de partage si on clique en dehors
const handleClickOutside = (event) => {
  const shareMenu = document.querySelector('.share-menu-container');
  if (showShareMenu.value && shareMenu && !shareMenu.contains(event.target)) {
    showShareMenu.value = false;
  }
};

onMounted(async () => {
  // Afficher le loader pendant 1 seconde
  isLoading.value = true;

  // Charger les données en parallèle
  await Promise.all([
    loadQuotes(),
    fetchRandomQuote()
  ]);

  // Attendre 1 seconde pour afficher le loader
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);

  // Ajouter l'écouteur pour fermer le menu
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px) rotate(-5deg); }
  75% { transform: translateX(10px) rotate(5deg); }
}

@keyframes heart-beat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@keyframes pulse-once {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.animate-wiggle {
  animation: wiggle 2s ease-in-out infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-heart-beat {
  animation: heart-beat 0.6s ease-in-out;
}

.animate-pulse-once {
  animation: pulse-once 2s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

.logo-spin-once {
  animation: spin-slow 0.8s linear 1;
}

.animate-bounce-on-hover:hover {
  animation: bounce 0.6s ease-in-out;
}
</style>
