const { response } = require('express');
const Contrato = require('../models/contrato');
const Equipo = require('../models/equipo');
// Medico.
const getEquipos = async( req, res = response ) => {

    const equipos = await Equipo.find()
                                    .populate('usuario','nombre img')
                                    .populate('contrato','numero_contrato img')
    res.json({
        ok: true,
        equipos,
        msg: 'getMEquipos'
    });
}

const crearEquipo = async( req, res = response ) => {
/*
    const { nombre, numero_contrato } = req.body;
    console.log( req.body );

        // Verificar Número Contrato
        const existeContrato = await Contrato.findOne({ numero_contrato });
        console.log(existeContrato);
        if ( !existeContrato ) {
            // console.log(existeContrato);
            return res.status(404).json({
                ok: false,
                msg: 'no se encontró ese Número de Contrato' 
            });
            

        }//else{const nContrato = existeContrato.numero_contrato;}
        console.log(existeContrato);
*/
    const uid = req.uid;
    const equipo = new Equipo( {
        usuario: uid,
        ...req.body
    // },{contrato: req.body.numero_contrato
});

    try {

        const equipoDB = await equipo.save();

        res.json({
            ok: true,
            equipo: equipoDB
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }

}

const actualizarEquipo = async( req, res = response ) => {
    
    const id  = req.params.id;
    const uid = req.uid; 

    try {

        const equipo = await Equipo.findById( id );

        if ( !equipo ) {
            return res.status(400).json({
                ok: true,
                msg: 'No se encontró el equipo por ID'
            });
        }

        const cambiosEquipo = {
            ...req.body,
            usuario: uid
        }

        const equipoActualizado = await Equipo.findByIdAndUpdate( id, cambiosEquipo, { new: true } );

        res.json({
            ok: true,
            Equipo: equipoActualizado
        });
        
    } catch (error) {

        console.log( error );

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }
}

const borrarEquipo = async( req, res = response ) => {
    
    const id  = req.params.id;
    // const uid = req.uid;

    try {

        const equipo = await Equipo.findById( id );

        if ( !equipo ) {
            return res.status(400).json({
                ok: true,
                msg: 'No se encontró el equipo por ID'
            });
        }

        await Equipo.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Equipo borrado'
        });
        
    } catch (error) {

        console.log( error );

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }
}
module.exports = { getEquipos, crearEquipo, actualizarEquipo, borrarEquipo }