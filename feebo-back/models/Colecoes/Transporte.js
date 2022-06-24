const monggose = require('mongoose');

const TransporteSchema = new monggose.Schema({
    dataInicio: {        
        type: Date,
        required: true,
    },
    dataChegada: {         
        type: Date,
        required: true,
    },
    encomendas: {
        type: [],                       // [id encomendas a entregar]
        required: true,
    },
    caminhos: {
        type: [],                       // [o caminho que o transportador vai fazer] ---- ou seja passa pelo armazem x (morada) depois pelo y (morada) depois casa do cliente z (morada)
        required: true,
    },   
    veiculo: {
        type: String,
        required: true,
    }, 
    transportador: {
        type: String,
        required: true,
    }
});

const transporte = monggose.model("transporte", TransporteSchema);
module.exports = transporte;