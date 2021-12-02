
// Importar el archivo de variables de entorno.
require('dotenv').config();

const express = require('express');
const cors = require('cors');


// Importar destructurado el metodo de conección.
const { dbConnection } = require('./database/config')

 // Crear el servidor de express.
 const app = express(); 
 
 // Configurar CORS.
 app.use(cors()); // Use es el Middleware que se ejecuta desde esta linea para abajo.

 // Lectura y parseo del body.
 app.use( express.json() );

 // Base de datos.
 dbConnection();

  // console.log( process.env );

 // Rutas.
 app.use('/api/usuarios', require('./routes/usuarios'));
 app.use('/api/login', require('./routes/auth'));

 /*
 app.get( '/', (req, res) => {
     res.json({
         ok: true,
         msg: 'en linea'
     });
 });
 */
// Pass mongo: HOtusHCKSPwq4BAl; User: MEAN-user
 // Asignando puerto desde el archivo ".env".
app.listen( process.env.PORT, () => {
    console.log('servidor corriendo en el puerto ' + process.env.PORT );
});