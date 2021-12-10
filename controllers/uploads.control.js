const path = require( 'path' );
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4} = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const cFileUpload = ( req, res = response) =>{

    const tipo = req.params.tipo;
    const id   = req.params.id;
    const tiposValidos = ['usuarios', 'equipos', 'contratos'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok:false,
            msg: 'No es un usuario o equipo o contrato'
        });
        
    }
    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
        
    }

    // Procesar la imagen...
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.'); // mypic.2.3.jpg
    const extensionArchivo = nombreCortado[ nombreCortado.length -1 ];

    // Validar extención
    const extencionesValidas = [ 'png', 'jpg', 'jpeg', 'gif'];
    if (!extencionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok:false,
            msg: 'No es una extensión permitida'
        });
        
    }

    // Genear el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Mover la imagen
    file.mv( path, (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'

            });
        }

    // Actualizar Base de datos

    actualizarImagen( tipo, id, nombreArchivo);

        res.json({
            ok: true,
            nombreArchivo
        });
    });

    
}

const retornaImagen = ( req, res = response) => {
    const { tipo, foto } = req.params;
    // const foto = req.params.foto // foto = img en BD.
    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }`);
    // imagen por defecto 
    if (fs.existsSync(pathImg) ) {
        res.sendFile( pathImg );
    }else{
        const pathImgD = path.join( __dirname, `../uploads/no-img.png`);
        res.sendFile( pathImgD );

    }
    
}

module.exports = { cFileUpload, retornaImagen }