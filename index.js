require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config');
const cuantaroutes = require('./routes/Ahorroroute');

const app = express();

// Conexion a la base de datos
dbConnection();

// Middleware para el parsing de JSON
app.use(express.json());

// Rutas
app.use('/api', cuantaroutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Servidor corriendo en el puerto ${PORT})`); 
});