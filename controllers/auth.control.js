const { response } = require('express');
const usuario = require('../models/usuario');
const becrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async( req, res = response ) => {

    const googleToken = req.body.token;


    try {

        const { name, email, picture } = await googleVerify( googleToken );

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if  ( !usuarioDB ) {
            // si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@@',
                img: picture,
                google: true
            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            // Fué un usuario con contraseña y ahora va a ser de google.
            usuario.google = true;
            // Si se deja la siguiente linea no se cambia la contraseña y el usuario tendrá los 2 métodos de autenticación.
            // usuario.password = '@@@@'; 
            // Si se comenta la anterior linea el usuario pierde el metodo de autenticación por contraseña.
        }

        //Guardar en DB 
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            // msg: 'Google signin',
            // name, email, picture
            token
        });
        
    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
        });
        
    }

}

const renewToken = async( req, res = response ) => {
    const uid = req.uid;

    // Generae el TOKEN - JWT 
    var token = await generarJWT( uid );

    res.json({
        ok: true,
        uid
    });
}


module.exports = { login, googleSignIn, renewToken }