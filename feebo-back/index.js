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

// Armazem
app.post("/armazem", ArmazemController.criarArmazem)
app.get("/armazem/nome", ArmazemController.getByNome)
app.get("/armazem/morada", ArmazemController.getByMorada)
app.get("/armazem/telemovel", ArmazemController.getByTelemovel)
app.delete("/armazem", ArmazemController.deleteByNome)
app.delete("/armazem/:id", ArmazemController.deleteById)


// Utilizador
app.post("/utilizador", UtilizadorControler.registar);
app.delete("/utilizador", UtilizadorControler.apagarUtilizadores);
app.delete("/utilizador/:id", UtilizadorControler.apagarUtilizadores_byID);
app.post("/utilizador/login", UtilizadorControler.login);
app.put("/utilizador/:id", UtilizadorControler.editarConta);
app.put("/utilizador/:id/password", UtilizadorControler.alterarPassword);
app.get("/utilizador", async(req, res) => {
    UtilizadorModel.find({}, (err, result)=> {
        if(err){
            res.status(400).send(err);
        }
        if (result.length == 0) {
            res.status(404).send("No users found");
        }
        res.status(200).send(result);
    });
});





app.listen(3001, () => {
    console.log('Server running on port 3001...')
});
