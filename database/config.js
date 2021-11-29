const mongoose = require ('mongoose');

// Establecer conección.
const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.DB_CNN , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true // Ya viene por defecto.
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error iniciando BD, ver logs');
    }

}

module.exports = { dbConnection }