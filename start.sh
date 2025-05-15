#!/bin/sh

echo "Démarrage du serveur..."
echo "Contenu du répertoire /usr/share/nginx/html :"
ls -la /usr/share/nginx/html

echo "Configuration Nginx :"
cat /etc/nginx/http.d/default.conf

echo "Démarrage de Nginx..."
nginx -t
nginx

echo "Démarrage du backend Node.js..."
cd /app
node backend/app.js 