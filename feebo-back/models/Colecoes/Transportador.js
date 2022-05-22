const monggose = require('mongoose');

const TransportadorSchema = new monggose.Schema({
    _id: {
        type: String,
        required: true,
    },
    caminhos: {         // [partida, chegada, data_inicio, data_chegada]
        type: [],
        required: true,
    },
    veiculo: {
        type: [],
        required: false,
    }
});

const transportador = monggose.model("transportadore", TransportadorSchema);
module.exports = transportador;