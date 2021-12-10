const { Schema, model } = require('mongoose');

// Hospital.
var ContratoSchema =	new Schema({
    numero_contrato: { 
        type: String,
        required: String,
    },
    img: {
        type: String,
    },
    usuario: {	
        required: String,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    timestamp: { 
        type: Date, 
        default: Date.now
    },
});

ContratoSchema.method('toJSON', function() {
    // Lo primero del array es lo que no quiero ver del usuario.
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model( 'Contrato', ContratoSchema);