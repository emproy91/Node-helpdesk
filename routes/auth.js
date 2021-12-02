/* Ruta: /api/login */

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.control');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post( '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La clave es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login );





module.exports = router;