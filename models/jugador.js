// se hacen las importaciones de mongoose
const { Schema, model, SchemaTypes } = require('mongoose');

const EsquemaJugador = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    anoNacimiento: {
        type: Number,
    },
});

EsquemaJugador.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
});

module.exports = model('Jugadores', EsquemaJugador);