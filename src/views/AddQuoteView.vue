<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 py-12">
    <div class="container mx-auto px-4">
      <!-- Formulaire de code d'accès -->
      <div v-if="!isCodeValid" class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <!-- Formulaire à gauche -->
          <div class="bg-white border-2 border-green-300 shadow-2xl rounded-sm p-8">
            <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 text-center">
              Entrez le code
            </h2>
            <p class="text-sm sm:text-base text-gray-600 text-center mb-6">
              Pour ajouter une citation ou accéder au dashboard
            </p>
            
            <form @submit.prevent="checkCode" class="space-y-4">
              <div>
                <input
                  v-model="accessCode"
                  type="text"
                  class="w-full px-4 py-3 bg-green-50 border-2 border-green-300 rounded-sm text-gray-800 text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Code simple ou code dashboard..."
                  required
                  autofocus
                />
              </div>

              <div v-if="errorMessage" class="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-sm text-center font-bold animate-shake">
                {{ errorMessage }}
              </div>

              <button
                type="submit"
                class="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white font-bold py-3 px-4 rounded-sm transition-all duration-300 hover:scale-105 disabled:opacity-50"
                :disabled="loading"
              >
                {{ loading ? 'Vérification...' : 'Vérifier' }}
              </button>
            </form>
          </div>

          <!-- Image à droite -->
          <div class="hidden md:block">
            <div class="bg-white border-2 border-green-300 rounded-sm p-6 shadow-2xl">
              <img 
                src="/ChatGPT Image 19 janv. 2026, 14_54_57.png" 
                alt="Illustration" 
                class="w-full h-auto rounded-sm object-cover scale-110"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Formulaire d'ajout de citation -->
      <div v-else class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8 items-start">
          <!-- Formulaire à gauche -->
          <div>
            <h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 border-b-2 border-green-300 pb-3 sm:pb-4">
              Ajouter une citation
            </h2>
            
            <div class="bg-white border-2 border-green-300 shadow-2xl rounded-sm p-4 sm:p-6">
              <div v-if="error" class="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-sm mb-4">
                {{ error }}
              </div>
              
              <div v-if="successMessage" class="bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded-sm mb-4">
                {{ successMessage }}
              </div>
              
              <form @submit.prevent="addQuote" class="space-y-4">
                <div>
                  <label for="quote-text" class="block text-sm font-medium text-gray-700 mb-2">Texte de la citation</label>
                  <textarea
                    id="quote-text"
                    v-model="newQuote.text"
                    class="w-full px-4 py-3 bg-green-50 border-2 border-green-200 rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows="4"
                    placeholder="Entrez le texte de la citation"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label for="quote-author" class="block text-sm font-medium text-gray-700 mb-2">Auteur</label>
                  <div class="relative">
                    <input
                      id="quote-author"
                      v-model="newQuote.author"
                      type="text"
                      class="w-full px-4 py-3 bg-green-50 border-2 border-green-200 rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Nom de l'auteur"
                      required
                      @focus="showAuthorsList = true"
                      @blur="setTimeout(() => showAuthorsList = false, 200)"
                    />
                    <!-- Liste des auteurs existants -->
                    <div 
                      v-if="showAuthorsList && availableAuthors.length > 0 && !newQuote.author"
                      class="absolute z-10 w-full mt-1 bg-white border-2 border-green-300 rounded-sm shadow-lg max-h-48 overflow-y-auto"
                    >
                      <button
                        v-for="author in availableAuthors"
                        :key="author"
                        type="button"
                        @click="selectAuthor(author)"
                        class="w-full text-left px-4 py-2 hover:bg-green-50 text-gray-800 transition-colors"
                      >
                        {{ author }}
                      </button>
                    </div>
                  </div>
                  <!-- Afficher les auteurs récents si le champ est vide -->
                  <div v-if="!newQuote.author && availableAuthors.length > 0" class="mt-2">
                    <p class="text-xs text-gray-600 mb-1">Auteurs récents :</p>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="author in availableAuthors.slice(0, 8)"
                        :key="author"
                        type="button"
                        @click="selectAuthor(author)"
                        class="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 text-gray-700 rounded-sm transition-colors"
                      >
                        {{ author }}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label for="quote-category" class="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                  <select
                    id="quote-category"
                    v-model="newQuote.category"
                    class="w-full px-4 py-3 bg-green-50 border-2 border-green-200 rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option v-for="cat in availableCategories" :key="cat" :value="cat">{{ cat }}</option>
                  </select>
                </div>
                
                <div class="flex justify-center mt-6">
                  <button
                    type="submit"
                    class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-sm transition-all duration-300 hover:scale-105 disabled:opacity-50"
                    :disabled="isSubmitting"
                  >
                    <span v-if="isSubmitting">Ajout en cours...</span>
                    <span v-else>Ajouter la citation</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Image à droite -->
          <div class="hidden md:block">
            <div class="bg-white border-2 border-green-300 rounded-sm p-6 shadow-2xl sticky top-24">
              <img 
                src="/ChatGPT Image 19 janv. 2026, 14_54_57.png" 
                alt="Illustration" 
                class="w-full h-auto rounded-sm object-cover scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { quoteService } from '../services/quoteService'

const router = useRouter()

const ACCESS_CODE = import.meta.env.VITE_ACCESS_CODE
const DASHBOARD_CODE = import.meta.env.VITE_DASHBOARD_CODE
const accessCode = ref('')
const isCodeValid = ref(false)
const isDashboardAccess = ref(false)
const loading = ref(false)
const errorMessage = ref(null)
const attemptCount = ref(0)

// Messages d'erreur aléatoires
const errorMessages = [
  "Sale batard, t'as pas le code et tu veux ajouter une citation ?",
  "T'abuses, force pas, demande le code c'est mieux",
  "Sale chien, casse-toi si t'as pas le code"
]

const availableCategories = ref([])
const availableAuthors = ref([])
const showAuthorsList = ref(false)

const newQuote = ref({
  text: '',
  author: '',
  category: 'Humour'
})
const isSubmitting = ref(false)
const error = ref(null)
const successMessage = ref(null)

const selectAuthor = (author) => {
  newQuote.value.author = author
  showAuthorsList.value = false
}

const loadCategories = async () => {
  try {
    availableCategories.value = await quoteService.getCategories()
    if (availableCategories.value.length > 0 && !newQuote.value.category) {
      newQuote.value.category = availableCategories.value[0]
    }
  } catch (err) {
    console.error('Erreur lors du chargement des catégories:', err)
  }
}

const loadAuthors = async () => {
  try {
    availableAuthors.value = await quoteService.getAuthors()
  } catch (err) {
    console.error('Erreur lors du chargement des auteurs:', err)
  }
}

const checkCode = () => {
  loading.value = true
  errorMessage.value = null

  setTimeout(() => {
    // Vérifier le code dashboard (accès complet)
    if (accessCode.value === DASHBOARD_CODE) {
      isDashboardAccess.value = true
      isCodeValid.value = true
      errorMessage.value = null
      attemptCount.value = 0
      const timestamp = Date.now()
      sessionStorage.setItem('dashboard_access', 'true')
      sessionStorage.setItem('dashboard_timestamp', timestamp.toString())
      sessionStorage.setItem('quote_code_entered', 'true')
      sessionStorage.setItem('quote_code_timestamp', timestamp.toString())
      // Rediriger vers le dashboard
      router.push('/admin')
    } 
    // Vérifier le code simple (ajout de citation seulement)
    else if (accessCode.value === ACCESS_CODE) {
      isCodeValid.value = true
      isDashboardAccess.value = false
      errorMessage.value = null
      attemptCount.value = 0
      const timestamp = Date.now()
      sessionStorage.setItem('quote_code_entered', 'true')
      sessionStorage.setItem('quote_code_timestamp', timestamp.toString())
    } else {
      attemptCount.value++
      // Sélectionner un message aléatoire
      const randomIndex = Math.floor(Math.random() * errorMessages.length)
      errorMessage.value = errorMessages[randomIndex]
      accessCode.value = ''
    }
    loading.value = false
  }, 500)
}

// Vérifier si le code est encore valide (10 minutes = 600000 ms)
const isCodeStillValid = () => {
  const codeEntered = sessionStorage.getItem('quote_code_entered') === 'true'
  const dashboardAccess = sessionStorage.getItem('dashboard_access') === 'true'
  
  if (!codeEntered && !dashboardAccess) return false
  
  const timestamp = dashboardAccess 
    ? parseInt(sessionStorage.getItem('dashboard_timestamp') || '0')
    : parseInt(sessionStorage.getItem('quote_code_timestamp') || '0')
  
  const now = Date.now()
  const tenMinutes = 10 * 60 * 1000 // 10 minutes en millisecondes
  
  if (timestamp && (now - timestamp) < tenMinutes) {
    return true
  } else {
    // Expiré, nettoyer
    sessionStorage.removeItem('quote_code_entered')
    sessionStorage.removeItem('quote_code_timestamp')
    sessionStorage.removeItem('dashboard_access')
    sessionStorage.removeItem('dashboard_timestamp')
    return false
  }
}

const addQuote = async () => {
  // Validation basique
  if (!newQuote.value.text || !newQuote.value.author) {
    error.value = "Le texte et l'auteur sont requis"
    return
  }

  isSubmitting.value = true
  error.value = null
  successMessage.value = null

  try {
    await quoteService.addQuote(newQuote.value)
    
    // Réinitialiser le formulaire
    newQuote.value = { text: '', author: '', category: availableCategories.value[0] || 'Humour' }
    
    // Recharger les auteurs pour inclure le nouvel auteur
    await loadAuthors()
    
    // Afficher un message de succès
    successMessage.value = 'Citation ajoutée avec succès !'
    
    // Effacer le message de succès après 3 secondes
    setTimeout(() => {
      successMessage.value = null
    }, 3000)
  } catch (err) {
    error.value = err.message || "Erreur lors de l'ajout de la citation"
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  // Charger les catégories et auteurs depuis l'API
  await loadCategories()
  await loadAuthors()
  
  // Vérifier si le code est encore valide (10 minutes)
  if (isCodeStillValid()) {
    const dashboardAccess = sessionStorage.getItem('dashboard_access') === 'true'
    isCodeValid.value = true
    // Si c'est un accès dashboard, rediriger
    if (dashboardAccess) {
      router.push('/admin')
    }
  } else {
    // Code expiré ou non valide, s'assurer qu'on affiche le formulaire de code
    isCodeValid.value = false
  }
  
  // Vérifier toutes les minutes si le code est encore valide
  setInterval(async () => {
    if (!isCodeStillValid()) {
      isCodeValid.value = false
    }
    // Recharger les catégories et auteurs au cas où ils ont été modifiés
    await loadCategories()
    await loadAuthors()
  }, 60000) // Vérifier toutes les minutes
})
</script>

<style>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px) rotate(-2deg); }
  75% { transform: translateX(10px) rotate(2deg); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>
