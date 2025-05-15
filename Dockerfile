FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"] 