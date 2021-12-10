const { Schema, model } = require('mongoose');

// Medico.
const EquipoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
	contrato: {	type: Schema.Types.ObjectId,
    	ref: 'Contrato',
        required: true
    },
    timestamp: { type: Date, 
        default: Date.now
    },
});

EquipoSchema.method('toJSON', function() {
    // Lo primero del array es lo que no quiero ver del usuario.
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model( 'Equipo', EquipoSchema);