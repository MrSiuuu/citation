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
                class="w-14 h-14 md:w-16 md:h-16 object-contain group-hover:scale-105 transform transition-all duration-300 rounded-full"
              />
            </RouterLink>
          </div>
          
          <!-- Menu au milieu -->
          <nav class="flex flex-wrap justify-center gap-8 md:gap-12 flex-1">
            <RouterLink 
              to="/" 
              class="text-gray-700 hover:text-green-600 transition-colors font-medium text-base relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-green-600 after:to-yellow-500 hover:after:w-full after:transition-all after:duration-300"
            >
              Accueil
            </RouterLink>
            <RouterLink 
              to="/about" 
              class="text-gray-700 hover:text-green-600 transition-colors font-medium text-base relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-green-600 after:to-yellow-500 hover:after:w-full after:transition-all after:duration-300"
            >
              À propos
            </RouterLink>
          </nav>

          <!-- Bouton Ajouter Citation à droite -->
          <div class="flex-shrink-0">
            <RouterLink
              to="/contribute"
              class="bg-gradient-to-r from-green-600 via-yellow-500 to-orange-500 hover:from-green-700 hover:via-yellow-600 hover:to-orange-600 text-white px-5 py-2.5 rounded-sm font-semibold text-sm hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-lg"
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
        <div class="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <img 
                src="/favicon1.png" 
                alt="Westaf-Vibe Logo" 
                class="w-10 h-10 object-contain"
              />
              <h3 class="text-2xl font-bold bg-gradient-to-r from-green-400 to-yellow-500 bg-clip-text text-transparent">
                "Westaf-Vibe
              </h3>
            </div>
            <p class="text-white opacity-90">
              Votre source quotidienne d'inspiration et de sagesse à travers les plus belles citations.
            </p>
          </div>
          <div>
            <h4 class="font-bold mb-4 text-white">Navigation</h4>
            <ul class="space-y-2 text-white opacity-90">
              <li><RouterLink to="/" class="hover:text-yellow-200 transition-colors">Accueil</RouterLink></li>
              <li><RouterLink to="/about" class="hover:text-yellow-200 transition-colors">À propos</RouterLink></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-4 text-white">Catégories</h4>
            <ul class="space-y-2 text-white opacity-90">
              <li><a href="#" class="hover:text-yellow-200 transition-colors">Motivation</a></li>
              <li><a href="#" class="hover:text-yellow-200 transition-colors">Amour</a></li>
              <li><a href="#" class="hover:text-yellow-200 transition-colors">Sagesse</a></li>
              <li><a href="#" class="hover:text-yellow-200 transition-colors">Succès</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-green-400 pt-8 text-center text-white opacity-90">
          <p>© {{ new Date().getFullYear() }} Westaf-Vibe. Tous droits réservés. | KOUYATE Issa</p>
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

