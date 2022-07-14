const { ObjectId } = require("mongodb");
const monggose = require("mongoose");

const EncomendaSchema = new monggose.Schema({
  cliente: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  morada: {
    type: String,
    required: true,
  },
  cidade: {
    type: String,
    required: true,
  },
  distrito: {
    type: String,
    required: true,
  },
  codigo_postal: {
    type: String,
    required: true,
  },
  pais: {
    type: String,
    required: true,
  },
  produtos: {
    // [id produto, qnd]
    type: [],
    required: true,
  },
  poluicao: {
    type: Number,
    required: true,
  },
  pagamento: {
    // nome do titular, numero do cartao, validade, cvv
    type: [],
    required: true,
  },
  data_inicio: {
    type: Date,
    required: true,
  },
  //   recursos: {
  //     // [id dos recursos utilizados, qnd de recursos]
  //     type: [],
  //     required: true,
  //   },
});

const encomenda = monggose.model("encomenda", EncomendaSchema);
module.exports = encomenda;
