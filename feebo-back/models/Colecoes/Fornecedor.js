const monggose = require('mongoose');

const FornecedorSchema = new monggose.Schema({
    _id: {
        type: String,
        required: true,
    },
    armazens: {
        type: [],
        required: true,
    },
    produtos: {
        type: [],
        required: true,
    }
});

const fornecedor = monggose.model("fornecedore", FornecedorSchema);
module.exports = fornecedor;