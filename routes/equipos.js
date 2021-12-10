/* Ruta: 'api/equipos' */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEquipos, crearEquipo, actualizarEquipo, borrarEquipo } = require('../controllers/equipos.control')
const router = Router();

router.get( '/', getEquipos);
    // En estas llaves van Middlewares
router.post( '/',
    [   
        validarJWT,
        check('nombre','El nombre del equipo es obligatorio').not().isEmpty(),
        check('contrato','El numero de contrato es obligatorio').isMongoId(),
        validarCampos
    ] ,
    crearEquipo );

router.put( '/:id',
    [], 
    actualizarEquipo );

router.delete( '/:id',
    borrarEquipo );


module.exports = router;