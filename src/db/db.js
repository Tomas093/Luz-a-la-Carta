const { Client } = require('pg');
require('dotenv').config();  // Asegúrate de cargar el archivo .env

const connectDB = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL, // Usa la variable de entorno DATABASE_URL
  });

  try {
    await client.connect();
    console.log('Conectado a PostgreSQL');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;