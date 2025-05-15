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

# Installer Nginx
RUN apk add --no-cache nginx

# Copier la configuration Nginx
COPY frontend/nginx.conf /etc/nginx/http.d/default.conf

# Copier les fichiers de build du frontend
RUN mkdir -p /usr/share/nginx/html
RUN cp -r frontend/dist/* /usr/share/nginx/html/

# Exposer le port
EXPOSE 8080

# Script de démarrage pour exécuter à la fois Nginx et Node.js
RUN echo '#!/bin/sh\nnginx\nnode backend/app.js' > /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"] 