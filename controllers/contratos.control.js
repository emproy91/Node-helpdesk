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

const actualizarContrato = ( req, response ) => {
    response.json({
        ok: true,
        msg: 'actualizarContrato'
    })
}

const borrarContrato = ( req, response ) => {
    response.json({
        ok: true,
        msg: 'borrarContrato'
    })
}
module.exports = { getContratos, crearContrato, actualizarContrato, borrarContrato }