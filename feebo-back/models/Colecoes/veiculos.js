const monggose = require('mongoose');

const VeiculoSchema = new monggose.Schema({
    _id: {
        type: String,
        required: true,
    },
    marca: {
        type: String,
        required: true,
    },
    modelo: {
        type: String,
        required: true,
    },
    poluicao: {
        type: String,
        required: true,
    }
});

const veiculo = monggose.model("veiculo", VeiculoSchema);
module.exports = veiculo;