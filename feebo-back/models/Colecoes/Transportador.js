const monggose = require('mongoose');

const TransportadorSchema = new monggose.Schema({
    _id: {
        type: String,
        required: true,
    },
    caminhos: {
        type: [],
        required: true,
    },
    veiculo: {
        type: String,
        required: false,
    }
});

const transportador = monggose.model("transportadore", TransportadorSchema);
module.exports = transportador;