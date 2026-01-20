<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
    <!-- Header intégré au décor -->
    <header class="bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 sticky top-0 z-50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <!-- Logo à gauche -->
          <div class="flex-shrink-0">
            <RouterLink to="/" class="flex items-center group">
              <img 
                src="/favicon1.png" 
                alt="Westaf-Vibe Logo" 
                class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain group-hover:scale-105 transform transition-all duration-300 rounded-full"
              />
            </RouterLink>
          </div>
          
          <!-- Menu au milieu -->
          <nav class="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 flex-1">
            <RouterLink 
              to="/" 
              class="text-gray-700 hover:text-green-600 transition-colors font-medium text-sm sm:text-base relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-green-600 after:to-yellow-500 hover:after:w-full after:transition-all after:duration-300"
            >
              Accueil
            </RouterLink>
            <RouterLink 
              to="/about" 
              class="text-gray-700 hover:text-green-600 transition-colors font-medium text-sm sm:text-base relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-green-600 after:to-yellow-500 hover:after:w-full after:transition-all after:duration-300"
            >
              À propos
            </RouterLink>
          </nav>

          <!-- Bouton Ajouter Citation à droite -->
          <div class="flex-shrink-0">
            <RouterLink
              to="/contribute"
              class="bg-gradient-to-r from-green-600 via-yellow-500 to-orange-500 hover:from-green-700 hover:via-yellow-600 hover:to-orange-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm font-semibold text-xs sm:text-sm hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Ajouter Citation
            </RouterLink>
          </div>
        </div>
      </div>
    </header>
    
    <main>
      <RouterView />
    </main>
    
    <!-- Footer -->
    <footer class="bg-gradient-to-r from-green-600 to-yellow-500 border-t border-green-400 text-white py-8 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
          <div class="flex justify-center md:justify-start">
            <img 
              src="/favicon1.png" 
              alt="Westaf-Vibe Logo" 
              class="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
            />
          </div>
          <div class="text-center sm:text-left">
            <h4 class="font-bold mb-4 text-white text-lg">Navigation</h4>
            <ul class="space-y-2 text-white opacity-90">
              <li><RouterLink to="/" class="hover:text-yellow-200 transition-colors">Accueil</RouterLink></li>
              <li><RouterLink to="/about" class="hover:text-yellow-200 transition-colors">À propos</RouterLink></li>
            </ul>
          </div>
          <div class="text-center sm:text-left">
            <h4 class="font-bold mb-4 text-white text-lg">Catégories</h4>
            <ul class="space-y-2 text-white opacity-90">
              <li>Motivation</li>
              <li>Amour</li>
              <li>Sagesse</li>
              <li>Succès</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-green-400 pt-6 sm:pt-8 text-center text-white opacity-90">
          <p class="text-sm sm:text-base px-4">© {{ new Date().getFullYear() }} Westaf-Vibe. Tous droits réservés. | MrSIUUU</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router';
</script>

<style>
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
  line-height: 1.6;
}
</style>

