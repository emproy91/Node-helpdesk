const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
    const desde = Number(req.query.desde) || 0;
    /*
    console.log(desde);
    const usuarios = await Usuario
                                    .find({}, 'nombre email role google')
                                    .skip( desde )
                                    .limit( 5 );

    const total = await Usuario.count();
    */

    // De esta forma se ace el limite y el total al tiempo y antes de lanzar la respuestadel res.json evitando bloqueos.
    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip( desde )
            .limit( 5 ),
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        msg: 'get Usuarios',
        usuarios,
        total
        // uid: req.uid // Muestra el ID dsel token del usuario que hace la petición.
    });
}

const crearUsuario = async(req, res = response) => {
     // console.log( req.body ); // Ver los datos enviados al modelo y la BD por el usuario.
    const { nombre, password, email } = req.body;


    try {
        const existeEmail = await Usuario.findOne({ email });
        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario( req.body );

        // Encriptar Contraseña.
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);

        // Guardar Usuario.
        await usuario.save();

        // Generae el TOKEN - JWT 
        const token = await generarJWT( usuario.id );

        // Para mas detalles pegar el token en: https://jwt.io/ .
    
        res.json({
            ok: true,
            usuario,
            token,
            
            // msg: 'Creando Usuario',
            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... ver logs'
        });

    }

}

const actualizarUsuario = async(req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {

         const usuarioDB = await Usuario.findById( uid );

         if ( !usuarioDB ) {
             return res.status(404).json({
                 ok: false,
                 msg: 'No exite un usuario por ese ID'
             });
         }

         // Actualizaciónes
         const { password, google, email, ...campos } = req.body;

         if ( usuarioDB.email !== email ){
             const existeEmail = await Usuario.findOne({ email });
             if ( existeEmail ) {
                 return res.status(400).json({
                     ok: false,
                     msg: 'Ya existe un usuario con ese email'
                 });
             }
         }
         
         campos.email = email;
         const usuarioActualizado = await Usuario.findByIdAndUpdate( uid,campos, { new: true} );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
        
    }
}

const borrarUsuario = async (req, res = response ) => {
    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No exite un usuario por ese ID'
            });
        }

        await Usuario.findByIdAndDelete( uid ); // Borrar de la BD.
        
        res.json({
            ok: true,
            // uid,
            msg: 'Usuario Eliminado !'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
        
    }

}

module.exports = { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario}