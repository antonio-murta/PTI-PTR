const monggose = require('mongoose');

const UtilizadorSchema = new monggose.Schema({
    _id: {
        type: String,
        required: true,
    },
    nome: {
        type: String,
        required: true,
    },
    dataNasc: {
        type: Date,
        required: true,
    },
    nif: {
        type: Number,
        required: false,
    },
    morada: {
        type: String,
        required: true,
    },
    telemovel: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    utipo: {
        type: String,
        required: false,
    }
});
const Utilizador = monggose.model("utilizadore", UtilizadorSchema);
module.exports = Utilizador;