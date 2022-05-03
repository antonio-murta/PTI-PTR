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
    produtos: {
        type: [],
        required: true,
    }
});

//fornecedorCollection.update_one(
//    {"_id": emailFornecedor},
//    {"$push": {"armazens": idArmazem} }
//)

const armazem = monggose.model("armazen", ArmazemSchema);
module.exports = armazem;