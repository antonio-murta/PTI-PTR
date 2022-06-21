const monggose = require('mongoose');

const TransportadorSchema = new monggose.Schema({
    _id: {
        type: String,
        required: true,
    },
    veiculos: {
        type: [],
        required: true,
    },
    transportes: {
        type: [],
        required: true,
    }
});

const transportador = monggose.model("transportadore", TransportadorSchema);
module.exports = transportador;