/* Ruta: 'api/todo/:busqueda' */

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getBTodo, getCollEspecifica} = require('../controllers/busquedas.control');
const router = Router();

router.get('/:busqueda', validarJWT, getBTodo);
router.get('/coleccion/:especifica/:busqueda', validarJWT, getCollEspecifica);



module.exports = router;    