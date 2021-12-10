const mongoose = require ('mongoose');

// Establecer conección.
const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true // Ya viene por defecto.
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw Error('Error iniciando BD, ver logs');
        /* si no carga la BD Atlas hay que agregar la ip en Atlas https://www.youtube.com/watch?v=qFSpJX0c2QU */
    }

}

module.exports = { dbConnection }