const db = require('mongoose');

const dbConnection = async() => {

    try {

        await db.connect('mongodb://127.0.0.1:27017/jugadoresFutbol',{
            
        });

        console.log('Db online');

    } catch (error) {

        console.log(error);
        throw new Error('Error a la hora de iniciar bd, ver logs');

    }


}

module.exports = {
    dbConnection
}