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
              class="w-24 h-24 md:w-28 md:h-28 object-contain"
            />
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 to-yellow-500 bg-clip-text text-transparent">
              À propos de
              <span class="inline-flex items-center align-middle ml-2 sm:ml-3">
                <img
                  src="/favicon1.png"
                  alt="Logo Westaf-Vibe"
                  class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
                />
              </span>
            </h1>
          </div>
          <p class="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto px-4">
            Votre source quotidienne d'inspiration et de sagesse à travers les plus belles citations
          </p>
        </div>

        <!-- Section Mission -->
        <section class="mb-16">
          <div class="bg-white rounded-sm p-8 border-2 border-green-300 shadow-2xl">
            <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-green-400">
              Notre Mission
            </h2>
            <div class="text-gray-700 text-base sm:text-lg leading-relaxed space-y-4">
              <p>
                Westaf-Vibes, c’est pas né dans un grand bureau avec des réunions et des PowerPoints non hein.
              </p>
              <p>
                C’est né un jour où je m’ennuyais fort en cours d’algo à l’ADATA.
                Le prof parlait, moi je regardais le vide… puis j’ai eu une idée.
              </p>
              <p>
                J’ai ouvert mon PC, j’ai lancé mon IDE… et j’ai commencé à coder comme si ma vie dépendait du projet.
              </p>
              <p>
                Depuis ce jour, l’objectif est simple :
              </p>
              <p class="font-semibold text-gray-800">
                rassembler les citations les plus drôles, les phrases qu’on entend chez nous, les punchlines qui font rire,
                et les partager au monde entier.
              </p>
              <p>
                Parce que parfois une citation, ça motive…
                Mais chez nous aussi, une citation peut juste te faire exploser de rire.
              </p>
              <p>
                Bienvenue dans Westaf-Vibes : les vibes de chez nous, mais pour tout le monde.
              </p>
            </div>
          </div>
        </section>

        <!-- Section Fonctionnalités -->
        <section class="mb-16">
          <h2 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-green-400 px-4">Ce qui nous rend uniques</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="bg-white rounded-sm p-5 sm:p-6 border-2 border-green-200 hover:border-green-500 transition-all duration-300 hover:scale-105"
            >
              <h3 class="text-xl font-bold mb-3 text-gray-800 text-center">{{ feature.title }}</h3>
              <p class="text-gray-600 text-center">{{ feature.description }}</p>
            </div>
          </div>
        </section>

        <!-- Section Équipe -->
        <section class="mb-16">
          <h2 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-green-400 px-4">L'Équipe</h2>
          <div class="bg-white rounded-2xl p-8 border-2 border-green-300 shadow-2xl text-center">
            <div class="mb-6">
              <div class="w-44 h-44 md:w-52 md:h-52 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden p-1">
                <img
                  src="/favicon1.png"
                  alt="Logo"
                  class="w-full h-full object-cover"
                />
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-2">MrSIUUU</h3>
              <p class="text-green-600 font-medium mb-6">Data Engineer & Développeur</p>
              <div class="text-gray-700 max-w-2xl mx-auto space-y-4 text-left">
                <p>
                  Passionné par l'argent, le bonheur et tout ce qui rend la vie plus simple (sans oublier la tech, l'IA et le développement), j'ai créé Westaf-Vibe un jour où je m'ennuyais sévère.
                </p>
                <p>
                  J'avais plein de pensées drôles en tête, et je voyais aussi trop de pépites sur TikTok… du coup j'ai décidé de les coder pour les partager proprement.
                </p>
                <p>
                  Parce que pour moi, les citations trop sérieuses à longueur de journée, c'est non.
                  On ne peut pas passer sa vie à faire semblant d'être profond… on va tous mourir, donc pourquoi stresser ?
                </p>
                <p>
                  Westaf-Vibe, c'est juste un endroit pour rire, souffler, et partager les phrases qui font du bien… mais version drole et debile.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Section Contact -->
        <section class="mb-16">
          <div class="bg-gradient-to-r from-green-600 to-yellow-500 rounded-sm p-8 text-center shadow-2xl">
            <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-white px-4">Ne me rejoignez pas</h2>
            <div class="text-white text-base sm:text-lg space-y-4 max-w-2xl mx-auto text-left px-4">
              <p>
                Franchement… pas besoin de "rejoindre" quoi que ce soit.
                Ici tu viens, tu lis, tu rigoles et tu repars tranquille.
              </p>
              <p>
                Et si tu veux partager une citation, il te faut un code.
                Ce code, c'est moi qui l'ai.
              </p>
              <p>
                Donc s'il te plaît, évite de venir avec des citations de philosophes trop sérieux pour gâcher l'ambiance.
                On n'est pas là pour souffrir, OK ? (Ceux qui ont la ref)
              </p>
              <p>
                Contente-toi d'apprécier, partager, et laisser la vibe circuler.
              </p>
              <p class="text-right font-semibold mt-6">
                Cordialement.
              </p>
            </div>
          </div>
        </section>
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
