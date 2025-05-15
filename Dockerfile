FROM node:18-alpine

WORKDIR /app

# Installer les dépendances du backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Installer les dépendances du frontend
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copier tous les fichiers
COPY . .

# Construire le frontend
RUN cd frontend && npm run build

# Exposer le port
EXPOSE 3000

# Démarrer le backend
CMD ["node", "backend/app.js"] 