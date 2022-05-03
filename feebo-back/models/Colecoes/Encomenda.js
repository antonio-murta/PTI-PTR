const { ObjectId } = require('mongodb');
const monggose = require('mongoose');

const EncomendaSchema = new monggose.Schema({
    cliente: {
        type: String,
        required: true,
    },
    data_inicio: {
        type: Date,
        required: true,
    },
    produtos: {
        type: [],
        required: true,
    },
    transporte: {
        type: String,
        required: true,
    },
    pagamento: {
        type: [],
        required: true,
    }
});

const encomenda = monggose.model("encomenda", EncomendaSchema);
module.exports = encomenda;