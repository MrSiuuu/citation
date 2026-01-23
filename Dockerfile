# Stage 1: Build du frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Build du frontend
RUN npm run build

# Stage 2: Image finale avec frontend + backend + nginx
FROM node:20-alpine

# Installer nginx
RUN apk add --no-cache nginx

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer uniquement les dépendances de production pour le backend
RUN npm ci --only=production

# Copier le code du backend
COPY server/ ./server/

# Copier le frontend buildé depuis le stage précédent
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Copier la configuration nginx
COPY nginx.conf /etc/nginx/http.d/default.conf

# Copier le script de démarrage
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Créer le dossier data pour les citations
RUN mkdir -p /app/server/data

# Copier les citations initiales depuis le stage de build (si elles existent)
COPY --from=frontend-builder /app/public/citations.json /app/server/data/citations.json

# Exposer le port 80
EXPOSE 80

# Démarrer le script qui lance backend + nginx
CMD ["/start.sh"]
