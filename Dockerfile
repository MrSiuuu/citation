FROM node:18-alpine

WORKDIR /app

# Installer les dépendances du backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Installer les dépendances du frontend et construire
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copier tous les fichiers source
COPY . .

# Construire le frontend
RUN cd frontend && npm run build

# Installer Nginx
RUN apk add --no-cache nginx supervisor

# Configurer Nginx
COPY frontend/nginx.conf /etc/nginx/http.d/default.conf

# Créer le répertoire pour les fichiers statiques
RUN mkdir -p /usr/share/nginx/html
RUN cp -r frontend/dist/* /usr/share/nginx/html/

# Configurer supervisord pour gérer les processus
RUN mkdir -p /etc/supervisor.d/
COPY supervisord.conf /etc/supervisor.d/supervisord.ini

# Exposer le port que Railway utilise
EXPOSE 80

# Démarrer supervisord qui lancera Nginx et Node.js
CMD ["supervisord", "-c", "/etc/supervisor.d/supervisord.ini"] 