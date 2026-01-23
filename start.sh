#!/bin/sh

# Démarrer le backend Node.js en arrière-plan
node server/index.js &
BACKEND_PID=$!

# Attendre que le backend soit prêt
echo "⏳ Attente du démarrage du backend..."
sleep 3

# Vérifier que le backend est bien démarré
if ! kill -0 $BACKEND_PID 2>/dev/null; then
  echo "❌ Erreur: Le backend n'a pas démarré correctement"
  exit 1
fi

echo "✅ Backend démarré (PID: $BACKEND_PID)"
echo "🚀 Démarrage de nginx..."

# Démarrer nginx en mode foreground
exec nginx -g 'daemon off;'
