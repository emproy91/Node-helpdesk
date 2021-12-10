const { response } = require('express');
const Usuario = require('../models/usuario');
const Equipo = require('../models/equipo');
const Contrato = require('../models/contrato');

const getBTodo = async(req, res = response ) =>{

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i'); // Expresión regular, 'i' = insensible o no estricta .

    const [ usuarios, equipos, contratos] = await Promise.all([
        Usuario.find({ nombre: regex}),
        Equipo.find({ nombre: regex}),
        Contrato.find({ numero_contrato: regex}),

    ])

    res.json({
        ok: true,
        busqueda,
        usuarios,
        equipos,
        contratos
    })

}
// Buscar en una colección específica.
const getCollEspecifica = async(req, res = response ) =>{

    const especifica = req.params.especifica;
    const busqueda   = req.params.busqueda;
    const regex      = new RegExp( busqueda, 'i'); // Expresión regular, 'i' = insensible o no estricta .

    let data = [];

    switch (especifica) {
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });        
            break;

        case 'equipos':
            data = await Equipo.find({ nombre: regex})
                                .populate('usuario', 'nombre img')
                                .populate('contrato', 'nombre img');     
            break;

        case 'contratos':
            data = await Contrato.find({ numero_contrato: regex})
                                .populate('usuario', 'nombre img');
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'Especifique por usuarios o equipos o contratos '
            });
    }

    res.json({
        ok: true,
        resultados: data
    })

}

module.exports = { getBTodo, getCollEspecifica }