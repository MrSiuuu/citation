// src/services/authService.js

const db = require('../dataBase/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fonction utilitaire pour promisifier les requêtes SQLite
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

const register = async (username, password) => {
  // Vérifier si l'utilisateur existe déjà
  const [existing] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  if (existing.length > 0) throw new Error('Utilisateur déjà existant');

  // Hacher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insérer dans la BDD
  const [result] = await db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword]
  );

  // Générer un token JWT
  const token = jwt.sign({ id: result.insertId, username }, process.env.JWT_SECRET, { expiresIn: '1d' });

  return {
    id: result.insertId,
    username,
    token
  };
};

const login = async (username, password) => {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  const user = rows[0];
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, { expiresIn: '1d' });

  return {
    id: user.id,
    username: user.username,
    token
  };
};

module.exports = {
  register,
  login
};
