const { Pool } = require('pg');

const pool = new Pool({
  user: 'syscetuser',
  host: 'localhost',
  database: 'cfetogo',
  password: 'syscetuser',
  port: 5432,
});

async function enregistrerMessage(numero, message, reponse) {
  try {
    await pool.query(
      'INSERT INTO messages_whatsapp(numero, message, reponse, date_envoi) VALUES ($1, $2, $3, NOW())',
      [numero, message, reponse]
    );
  } catch (err) {
    console.error('Erreur insertion message :', err);
  }
}

module.exports = { enregistrerMessage };
