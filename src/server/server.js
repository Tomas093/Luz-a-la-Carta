const express = require('express');
const connectDB = require('./db'); // Asegúrate de tener la ruta correcta

const app = express();

// Conectar a la base de datos PostgreSQL
connectDB();

// Aquí el resto de tu configuración de Express (rutas, middlewares, etc.)

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});