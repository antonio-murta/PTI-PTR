const monggose = require('mongoose');

const PagamentoSchema = new monggose.Schema({
    nome: {
        type: String,
        required: true,
    },
    numero: {
        type: Number,
        required: false,
    },
    validade: {
        type: Number,
        required: true,
    },
    cvv: {
        type: Number,
        required: true,
    },
    
});
const Pagamentos = monggose.model("pagamento", PagamentoSchema);
module.exports = Pagamentos;