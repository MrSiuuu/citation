<script setup>
import { ref, computed } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import { useAuth } from '../src/components/Auth.js';

const { logout, user, initAuth } = useAuth();

initAuth();

const handleLogout = () => {
  logout();
};

const isAuthenticated = computed(() => !!user.value);
console.log("isAuthenticated:", isAuthenticated.value);

</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div class="flex flex-col md:flex-row w-full max-w-4xl justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Générateur de Citations</h1>
          <nav class="flex space-x-8">
            <RouterLink to="/" class="text-gray-600 hover:text-blue-600 transition-colors">Accueil</RouterLink>
            <RouterLink to="/add" class="text-gray-600 hover:text-blue-600 transition-colors">Ajouter une citation</RouterLink>
            <RouterLink to="/about" class="text-gray-600 hover:text-blue-600 transition-colors">À propos</RouterLink>
          </nav>
          <div>
              <button v-if="isAuthenticated" @click="handleLogout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Déconnexion</button>

              <RouterLink v-else to="/login" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"> Connexion </RouterLink>
          </div>

        </div>
      </div>
    </div>
    
    <main class="py-8 flex justify-center">
      <div class="w-full max-w-4xl px-4">
        <RouterView />
      </div>
    </main>
    
    <footer class="bg-white shadow-sm py-4 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
        <p> KOUYATE Issa  © {{ new Date().getFullYear() }}</p>
      </div>
    </footer>
  </div>
</template>

<style>
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
  line-height: 1.6;
}
</style>

