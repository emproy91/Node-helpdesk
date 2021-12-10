/* Ruta: 'api/contratos' */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { getContratos, crearContrato, actualizarContrato, borrarContrato } = require('../controllers/contratos.control')
const router = Router();

router.get( '/', getContratos);

router.post( '/',
    [
        validarJWT,
        check('numero_contrato','El numero de contrato es obligatorio').not().isEmpty(),
        validarCampos
    ] ,
    crearContrato );

router.put( '/:id',
    [], 
    actualizarContrato );

router.delete( '/:id',
    borrarContrato );


module.exports = router;