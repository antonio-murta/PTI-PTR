const monggose = require('mongoose');

const ConsumidorSchema = new monggose.Schema({
    _id: {
        type: String,
        required: true,
    },
    metodoPagamento: {
        type: [],
        required: true,
    },
    cesto: {
        type: [],
        required: true,
    },
    recursosCesto: {
        type: [],
        required: true,
    },
    poluicaoCesto: {
        type: Number,
        required: true,
    }
});

const consumidor = monggose.model("consumidore", ConsumidorSchema);
module.exports = consumidor;