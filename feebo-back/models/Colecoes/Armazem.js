const monggose = require('mongoose');


const ArmazemSchema = new monggose.Schema({
    nome: {
        type: String,
        required: true,
    },
    morada: {
        type: String,
        required: true,
    },
    telemovel: {
        type: Number,
        required: true,
    },
    produtos: {                   // [id produto, qnd, fornecedor do produto]
        type: [],
        required: true,
    }
});



const armazem = monggose.model("armazen", ArmazemSchema);
module.exports = armazem;