const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
});

UsuarioSchema.method('toJSON', function() {
    // Lo primero del array es lo que no quiero ver del usuario.
    const { __v, _id, password, ...object } = this.toObject();
    // Solo para mostrar en postman se cambia "_id" por "uid" pero en la bd sigue igual con _ .
    object.uid = _id;
    return object;
});

module.exports = model( 'Usuario', UsuarioSchema);