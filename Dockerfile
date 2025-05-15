FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY . .

# Construire le frontend
RUN cd frontend && npm run build

# Exposer le port du backend
EXPOSE 3000

# Utiliser une commande qui fonctionne dans le conteneur
CMD ["node", "backend/app.js"] 