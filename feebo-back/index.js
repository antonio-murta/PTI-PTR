const express = require('express');
const monggose = require('mongoose');
const cors = require('cors');
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UtilizadorControler = require("./models/Funcoes/F_Utilizador")
const TransporteControler = require("./models/Funcoes/F_Tranporte")
const UtilizadorModel = require("./models/Colecoes/Utilizador");
const FornecedorController = require("./models/Funcoes/F_Fornecedor")
const ProdutoController = require("./models/Funcoes/F_Produto")

app.use(express.json());
app.use(cors());

monggose.connect("mongodb+srv://grupo16:123@basedados.rthod.mongodb.net/Loja?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
});





// Fornecedor
app.post("/produto", FornecedorController.criarProduto)
app.delete("/produto", FornecedorController.removerProdutos)
app.delete("/produto/:id", FornecedorController.removerProduto)

// Produto
app.get("/produto", ProdutoController.get_all)
app.get("/produto/:id", ProdutoController.getById)
app.get("/produto/nome", ProdutoController.getByNome)
app.get("/produto/preco", ProdutoController.getByPreco)
app.get("/produto/cadeialogistica", ProdutoController.getByCadeiaLogistica)
app.get("/produto/tipo", ProdutoController.getByTipo)
app.get("/produto/subtipo", ProdutoController.getBySubtipo)
app.get("/produto/poluicao", ProdutoController.getByPoluicao)
app.get("/produto/recursos", ProdutoController.getByRecursos);

// Transportador
app.put("/utilizador/:id/veiculo", TransporteControler.updateVeiculo)
app.put("/utilizador/:id/caminhos", TransporteControler.updateCaminhos)
// app.delete("/utilizador/:id", UtilizadorControler.deleteByEmail);







app.listen(3001, () => {
    console.log('Server running on port 3001...')
});
