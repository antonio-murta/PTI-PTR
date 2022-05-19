const monggose = require('mongoose');

const ProdutoSchema = new monggose.Schema({
    nome: {
        type: String,
        required: true,
    },
    preco: {
        type: Number,
        required: true,
    },
    cadeiaLogistica: {
        type: String,
        required: true,
    },
    recursos: {                // [id dos recursos utilizados, qnd de recursos]
        type: [],
        required: true,
    },
    poluicao: {
        type: Number,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    subtipo: {
        type: String,
        required: true,
    },
    quantidade: {
        type: Number,
        required: true,
    },
    fornecedorId: {
        type: String,
        required: true,
    }
});

const produto = monggose.model("produto", ProdutoSchema);
module.exports = produto;