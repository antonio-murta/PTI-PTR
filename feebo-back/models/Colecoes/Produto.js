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
  fornecedor: {
    type: String,
    required: true,
  },
  armazem: {
    type: String,
    required: true,
  },
  coverImage: {
    type: Buffer,
    required: true,
  },
  coverImageType: {
    type: String,
    required: true,
  },
});

const produto = monggose.model('produto', ProdutoSchema);
module.exports = produto;
