const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Reemplaza estos valores con los de tu instancia privada de MongoDB
const dbUri = 'mongodb://<usuario>:<contraseña>@<host_private_instance>:27017/<nombre_base_de_datos>';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch((error) => {
    console.error('Error de conexión a MongoDB:', error);
  });

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Conectado a la base de datos MongoDB!');
});

// Configura el puerto donde tu servidor escuchará
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});