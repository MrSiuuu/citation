#!/bin/sh

# Démarrer le backend Node.js en arrière-plan
echo "🚀 Démarrage du backend..."
node server/index.js &
BACKEND_PID=$!

# Fonction pour vérifier si le backend répond
wait_for_backend() {
  max_attempts=30
  attempt=0
  
  while [ $attempt -lt $max_attempts ]; do
    if curl -f http://127.0.0.1:3000/api/health > /dev/null 2>&1; then
      return 0
    fi
    attempt=$((attempt + 1))
    sleep 1
  done
  
  return 1
}

# Attendre que le backend soit prêt
echo "⏳ Attente du démarrage du backend..."
if wait_for_backend; then
  echo "✅ Backend démarré et prêt (PID: $BACKEND_PID)"
else
  echo "❌ Erreur: Le backend n'a pas démarré dans les temps"
  kill $BACKEND_PID 2>/dev/null
  exit 1
fi

# Vérifier que le processus backend est toujours actif
if ! kill -0 $BACKEND_PID 2>/dev/null; then
  echo "❌ Erreur: Le backend s'est arrêté"
  exit 1
fi

echo "🚀 Démarrage de nginx..."

# Démarrer nginx en mode foreground
exec nginx -g 'daemon off;'
