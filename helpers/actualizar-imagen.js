const fs = require('fs');

const Usuario = require('../models/usuario');
const Equipo = require('../models/equipo');
const Contrato = require('../models/contrato');

const borrarImagen = ( path ) => {
    if ( fs.existsSync(path) ) {
        // borrar imagen anterior
        fs.unlinkSync( path );
    }

}

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por ID');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            
        break;
        case 'equipos':
            const equipo = await Equipo.findById(id);
            if ( !equipo ) {
                console.log('No es un equipo por ID');
                return false;
            }

            pathViejo = `./uploads/equipos/${ equipo.img }`;
            // Las siguientes impresiones por consola forzan el metodo existSync por primera vez Node 14.18.1.
            // console.log(fs.existsSync( pathViejo )); // true
            // console.log(pathViejo);
            borrarImagen( pathViejo );

            equipo.img = nombreArchivo;
            await equipo.save();
            return true;
            
        break;
        case 'contratos':
            const contrato = await Contrato.findById(id);
            if ( !contrato ) {
                console.log('No es un contrato por ID');
                return false;
            }

            pathViejo = `./uploads/contratos/${ contrato.img }`;
            borrarImagen( pathViejo );

            contrato.img = nombreArchivo;
            await contrato.save();
            return true;
                
        break;

        /*default:
            break;*/
    }


}


module.exports = { actualizarImagen }