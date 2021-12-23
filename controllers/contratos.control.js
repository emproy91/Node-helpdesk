const { response } = require('express');
const Contrato = require('../models/contrato');

// Hospital.
const getContratos = async( req, res = response ) => {

    const contratos = await Contrato.find()
                                    .populate('usuario','nombre img')

    res.json({
        ok: true,
        contratos,
        msg: 'getHContratos'
    })
}

const crearContrato = async( req, res = response ) => {
    
    const uid = req.uid;
    const contrato = new Contrato( {
        usuario: uid,
        ...req.body 
    });

    try {
        const contratoDB = await contrato.save();

        res.json({
            ok: true,
            contrato: contratoDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }

    
}

const actualizarContrato = async( req, res = response ) => {

    const id  = req.params.id;
    const uid = req.uid; 

    try {

        const contrato = await Contrato.findById( id );

        if ( !contrato ) {
            return res.status(400).json({
                ok: true,
                msg: 'No se encontró el contrato por ID'
            });
        }

        const cambiosContrato = {
            ...req.body,
            usuario: uid
        }

        const contratoActualizado = await Contrato.findByIdAndUpdate( id, cambiosContrato, { new: true } );

        res.json({
            ok: true,
            Contrato: contratoActualizado
        });
        
    } catch (error) {

        console.log( error );

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }

   
}

const borrarContrato = async( req, res = response ) => {

    const id  = req.params.id;
    // const uid = req.uid; 

    try {

        const contrato = await Contrato.findById( id );

        if ( !contrato ) {
            return res.status(400).json({
                ok: true,
                msg: 'No se encontró el contrato por ID'
            });
        }

        await Contrato.findByIdAndDelete( id );
        
        res.json({
            ok: true,
            msg: 'Contrato Eliminado'
            // Para no eliminar, mejor desactivar de BD, cambiar propiedad del objeto enla BD "Activo = false".
        });
        
    } catch (error) {

        console.log( error );

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }

}
module.exports = { getContratos, crearContrato, actualizarContrato, borrarContrato }