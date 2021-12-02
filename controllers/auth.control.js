const { response } = require('express');
const usuario = require('../models/usuario');
const becrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res) => {
    

    const { email, password } = req.body;

    try {
// Para evitar bombardeo de ataques aquí es bueno poner un retardo de 1 segundo.
// setTimeout(() => { console.log("1 Segundo esperado") }, 1000);

        // Verificar email
        const usuarioDB = await usuario.findOne({ email }); 
        if ( !usuarioDB ) {
            return res.status(404).json({ // No se encontró el Email
                ok: false,
                msg: 'Email o Contraseña invalida' 
// Se pone ese msg para no dar pistas de qué no salió el Email en un ataque.
            });

        }
        
        // Verificar contraseña
        const validPassword = becrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg:'Contraseña o Email invalida' 
            });
        }

        // Generae el TOKEN - JWT 
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok:true,
            token
        }); 
        // Para mas detalles pegar el token en: https://jwt.io/ .


        res.json({
            ok: true,
            msg: 'Hi hi !'
        });
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Hable con el Admin'
        });
        
    }
}



module.exports = { login }