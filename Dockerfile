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

# Commande de démarrage modifiée
CMD ["sh", "-c", "cd backend && node app.js"] 