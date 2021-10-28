const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('BD Online');
        
    } catch (error) {
        console.log('Error');
        console.log(error);
        throw new Error('Error en la base de datos - Pidele ayuda al todopoderoso desarrollador');
    }
}

module.exports = {
    dbConnection
}