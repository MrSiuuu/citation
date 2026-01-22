<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-sm shadow-2xl p-8 border-2 border-green-300">
        <!-- Logo/Titre -->
        <div class="text-center mb-8">
          <div class="flex items-center justify-center gap-3 mb-4">
            <img
              src="/favicon1.png"
              alt="Westaf-Vibe Logo"
              class="w-12 h-12 object-contain"
            />
            <h1 class="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-yellow-500 bg-clip-text text-transparent">
              "Westaf-Vibe
            </h1>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Accès Administrateur</h2>
          <p class="text-sm sm:text-base text-gray-600">Entrez le code d'accès pour continuer</p>
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-gray-700 mb-2 font-medium">Code d'accès</label>
            <input
              v-model="accessCode"
              type="password"
              class="w-full px-4 py-3 bg-green-50 border-2 border-green-200 rounded-sm text-gray-800 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••••"
              required
              autofocus
            />
          </div>

          <div v-if="error" class="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-sm">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white font-bold py-3 px-4 rounded-sm transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Vérification...' : 'Accéder à l\'administration' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <RouterLink to="/" class="text-gray-600 hover:text-green-600 transition-colors text-sm">
            ← Retour à l'accueil
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const accessCode = ref('');
const error = ref(null);
const loading = ref(false);

const ADMIN_CODE = import.meta.env.VITE_ADMIN_CODE;

const handleLogin = () => {
  error.value = null;
  loading.value = true;

  setTimeout(() => {
    if (accessCode.value === ADMIN_CODE) {
      localStorage.setItem('admin_authenticated', 'true');
      router.push('/admin');
    } else {
      error.value = 'Code d\'accès incorrect';
      accessCode.value = '';
    }
    loading.value = false;
  }, 500);
};
</script>
