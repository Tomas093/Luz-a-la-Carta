const express = require('express');
const path = require('path');
const axios = require('axios'); // You'll need to install this: npm install axios
const connectDB = require('./db'); // Asegúrate de tener la ruta correcta

const app = express();

// Conectar a la base de datos PostgreSQL
connectDB();

// Middleware para analizar JSON
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../../')));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../HTML/Login.html'));
});

// Ruta para la página de inicio tras login
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../HTML/Home.html'));
});

// API proxy para Open Meteo (para evitar problemas de CORS)
app.get('/api/weather', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    
    // Valores predeterminados si no se proporcionan
    const lat = latitude || -34.4587; // Pilar, Argentina
    const lon = longitude || -58.9175;
    
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
      params: {
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,relative_humidity_2m,wind_speed_10m',
        daily: 'temperature_2m_max,temperature_2m_min',
        timezone: 'auto'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Aquí el resto de tu configuración de Express (rutas, middlewares, etc.)

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});