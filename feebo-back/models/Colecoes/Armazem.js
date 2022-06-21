const monggose = require("mongoose");

const ArmazemSchema = new monggose.Schema({
  nome: {
    type: String,
    required: true,
  },
  morada: {
    type: String,
    required: true,
  },
  poluicao: {
    type: Number,
    required: true,
  },
  telemovel: {
    type: Number,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  produtos: {
    // [id produto, qntd, fornecedor do produto]
    type: [],
  },
});

// Armazem model
const armazem = monggose.model("armazen", ArmazemSchema);
module.exports = armazem;
