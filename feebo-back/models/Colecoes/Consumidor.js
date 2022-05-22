const monggose = require('mongoose');


const ConsumidorSchema = new monggose.Schema({
    _id: {
        type: String,
        required: true,
    },
    metodoPagamento: {         // [tipo de pagamento, dados necessarios para cada tipo de pagamento]
        type: [],
        required: true,
    },
    cesto: {                   // [produto, qnd]
        type: [],
        required: true,
    }, 
    recursosCesto: {          // [id dos recursos utilizados, qnd de recursos]
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