/* Ruta: 'api/uploads/:busqueda' */

const { Router } = require('express');
// Hay más documentacion con esa función de la librería así.
const fileUpload = require( 'express-fileupload' );

// La "c" es de control para no confundir la de la librería.
const { cFileUpload, retornaImagen } = require('../controllers/uploads.control'); 
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.use(fileUpload());

router.put ('/:tipo/:id', validarJWT, cFileUpload );

router.get ('/:tipo/:foto', retornaImagen ); // foto = img en BD.

/*
    // https://github.com/expressjs/serve-index 
    var serveIndex = require('serve-index');
    app.use(express.static(__dirname + '/'))
    app.use('/uploads', serveIndex(__dirname + '/uploads'));
 */

module.exports = router;    