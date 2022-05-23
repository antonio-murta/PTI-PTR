const { ObjectId } = require('mongodb');
const monggose = require('mongoose');

const EncomendaSchema = new monggose.Schema({
    cliente: {
        type: String,
        required: true,
    },
    fornecedor: {
        type: String,
        required: true,
    },
    veiculo: {
        type: String,
        required: true,
    },
    transportador: {
        type: String,
        required: true,
    },
    produtos: {               // [id produto, qnd]
        type: [],
        required: true,
    },
    recursos: {               // [id dos recursos utilizados, qnd de recursos]
        type: [],
        required: true,
    },
    poluicao: {
        type: Number,
        required: true,
    },
    pagamento: {              // tipo de pagamento, dados necessarios para cada tipo de pagamento
        type: [],
        required: true,
    },
    data_inicio: {
        type: Date,
        required: true,
    }
});

const encomenda = monggose.model("encomenda", EncomendaSchema);
module.exports = encomenda;