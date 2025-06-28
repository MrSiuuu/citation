const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'mysql', // nom du service docker-compose
  user: process.env.DB_USER || 'citation_user',
  password: process.env.DB_PASS || 'citation_password',
  database: process.env.DB_NAME || 'citation_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
