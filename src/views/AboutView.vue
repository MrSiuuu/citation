<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <div class="flex items-center justify-center gap-4 mb-6">
            <img 
              src="/favicon1.png" 
              alt="Westaf-Vibe Logo" 
              class="w-16 h-16 object-contain"
            />
            <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-yellow-500 bg-clip-text text-transparent">
              À propos de Westaf-Vibe
            </h1>
          </div>
          <p class="text-xl text-gray-700 max-w-2xl mx-auto">
            Votre source quotidienne d'inspiration et de sagesse à travers les plus belles citations
          </p>
        </div>

        <!-- Section Mission -->
        <section class="mb-16">
          <div class="bg-white rounded-sm p-8 border-2 border-green-300 shadow-2xl">
            <h2 class="text-3xl font-bold mb-6 text-green-400">
              Notre Mission
            </h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              Westaf-Vibe est né d'une passion pour les mots qui inspirent, motivent et éclairent notre quotidien. 
              Nous croyons que chaque citation peut être une étincelle qui allume une flamme dans nos cœurs.
            </p>
            <p class="text-gray-700 text-lg leading-relaxed">
              Notre mission est de rassembler les plus belles pensées, les mots les plus sages, et les réflexions 
              les plus profondes pour créer une collection unique qui nourrit l'âme et l'esprit.
            </p>
          </div>
        </section>

        <!-- Section Fonctionnalités -->
        <section class="mb-16">
          <h2 class="text-3xl font-bold mb-8 text-center text-green-400">Ce qui nous rend uniques</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="bg-white rounded-sm p-6 border-2 border-green-200 hover:border-green-500 transition-all duration-300 hover:scale-105"
            >
              <h3 class="text-xl font-bold mb-3 text-gray-800 text-center">{{ feature.title }}</h3>
              <p class="text-gray-600 text-center">{{ feature.description }}</p>
            </div>
          </div>
        </section>

        <!-- Section Histoire -->
        <section class="mb-16">
          <div class="bg-white rounded-sm p-8 border-2 border-green-300 shadow-2xl">
            <h2 class="text-3xl font-bold mb-6 text-green-400">
              Notre Histoire
            </h2>
            <div class="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Westaf-Vibe a été créé avec l'idée simple que les mots ont le pouvoir de transformer nos vies. 
                Chaque citation que nous partageons a été soigneusement sélectionnée pour sa capacité à inspirer, 
                à motiver ou simplement à apporter un sourire.
              </p>
              <p>
                Nous croyons en la diversité des pensées et en la richesse des différentes perspectives. 
                C'est pourquoi notre collection couvre une multitude de catégories : de l'amour à la sagesse, 
                de la motivation au bonheur, en passant par la philosophie et l'humour.
              </p>
              <p>
                Rejoignez-nous dans cette aventure où chaque jour apporte une nouvelle source d'inspiration, 
                une nouvelle raison de sourire, ou une nouvelle perspective sur la vie.
              </p>
            </div>
          </div>
        </section>

        <!-- Section Équipe -->
        <section class="mb-16">
          <h2 class="text-3xl font-bold mb-8 text-center text-green-400">L'Équipe</h2>
          <div class="bg-white rounded-2xl p-8 border-2 border-green-300 shadow-2xl text-center">
            <div class="mb-6">
              <div class="w-32 h-32 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <img 
                  src="/favicon1.png" 
                  alt="Logo" 
                  class="w-20 h-20 object-contain"
                />
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">KOUYATE Issa</h3>
              <p class="text-green-400 font-medium mb-4">Créateur & Développeur</p>
              <p class="text-gray-700 max-w-2xl mx-auto">
                Passionné par le développement web et les technologies modernes, 
                j'ai créé Westaf-Vibe pour partager ma passion pour les citations inspirantes 
                et créer une communauté autour des mots qui nous touchent.
              </p>
            </div>
          </div>
        </section>

        <!-- Section Contact -->
        <section class="mb-16">
          <div class="bg-gradient-to-r from-green-600 to-yellow-500 rounded-sm p-8 text-center shadow-2xl">
            <h2 class="text-3xl font-bold mb-4 text-white">Rejoignez-nous</h2>
            <p class="text-white text-lg mb-6 opacity-90">
              Partagez vos citations préférées, découvrez de nouvelles inspirations, 
              et faites partie de notre communauté grandissante.
            </p>
            <RouterLink
              to="/"
              class="inline-block bg-white text-green-600 font-bold py-3 px-8 rounded-full hover:scale-110 transform transition-all duration-300 shadow-lg"
            >
              Commencer l'aventure →
            </RouterLink>
          </div>
        </section>

        <!-- Footer de la page -->
        <div class="text-center text-gray-600">
          <p class="text-lg mb-2">© {{ new Date().getFullYear() }} Westaf-Vibe. Tous droits réservés.</p>
          <p class="text-sm">Fait avec passion et dévouement</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const features = [
  {
    title: 'Citations Aléatoires',
    description: 'Découvrez chaque jour de nouvelles citations inspirantes sélectionnées pour vous'
  },
  {
    title: 'Catégories Variées',
    description: 'Explorez des milliers de citations organisées par thèmes et catégories'
  },
  {
    title: 'Expérience Unique',
    description: 'Une interface moderne et intuitive pour une expérience de lecture exceptionnelle'
  }
];
</script>
