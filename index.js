
// Importar el archivo de variables de entorno.
require('dotenv').config();

const express = require('express');
const cors = require('cors');


// Importar destructurado el metodo de conección.
const { dbConnection } = require('./database/config')

 // Crear el servidor de express.
 const app = express(); 
 
 // Configurar CORS.
 app.use(cors());// use es el midelware que se ejecuta desde esta linea para abajo.

 // Base de datos.
 dbConnection();

  // console.log( process.env );

 // Rutas.
 app.get( '/', (req, res) => {
     res.json({
         ok: true,
         msg: 'en linea'
     });
 });
// Pass mongo: HOtusHCKSPwq4BAl; User: MEAN-user
 // Asignando puerto desde el archivo ".env".
app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en el puerto ' + process.env.PORT );
});