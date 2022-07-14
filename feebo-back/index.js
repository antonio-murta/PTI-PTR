const express = require("express");
const monggose = require("mongoose");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UtilizadorControler = require("./models/Funcoes/F_Utilizador");
const TransportadorControler = require("./models/Funcoes/F_Tranportador");
const UtilizadorModel = require("./models/Colecoes/Utilizador");
const FornecedorController = require("./models/Funcoes/F_Fornecedor");
const ProdutoController = require("./models/Funcoes/F_Produto");
const ArmazemController = require("./models/Funcoes/F_Armazem");
const ConsumidorController = require("./models/Funcoes/F_Consumidor");
const TransporteController = require("./models/Funcoes/F_Transporte");
app.use(express.json());
app.use(cors());

monggose.connect(
  "mongodb+srv://grupo16:123@basedados.rthod.mongodb.net/Loja?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

// Fornecedor
app.post("/produto", FornecedorController.criarProduto);
app.delete("/produto", FornecedorController.removerProdutos);
app.delete("/produto/:id", FornecedorController.removerProduto);

app.put("/updateArmazem/:id", ArmazemController.updateArmazem);
app.get(
  "/armazens/fornecedor/:id",
  ArmazemController.get_all_armazens_Fornecedor
);


// Produto
app.get("/produto", ProdutoController.get_all);
app.get("/produto/nome", ProdutoController.getByNome);
app.get("/produto/preco", ProdutoController.getByPreco);
app.get("/produto/cadeialogistica", ProdutoController.getByCadeiaLogistica);
app.get("/produto/tipo", ProdutoController.getByTipo);
app.get("/produto/subtipo", ProdutoController.getBySubtipo);
app.get("/produto/poluicao", ProdutoController.getByPoluicao);
app.get("/produto/recursos", ProdutoController.getByRecursos);
app.post("/produto", FornecedorController.criarProduto);
app.delete("/produto", FornecedorController.removerProdutos);
app.delete("/produto/:id", FornecedorController.removerProduto);

// Transportador
app.post('/utilizador/veiculo', TransportadorControler.criarVeiculo);
app.get('/veiculos', TransportadorControler.get_all_veiculos);
app.delete('/veiculo/:id', TransportadorControler.deleteVeiculoById);
app.put('/utilizador/:id/veiculo', TransportadorControler.updateVeiculo);
app.get('/veiculos/transportador/:id', TransportadorControler.get_all_veiculos_Transportador);
app.get('/veiculo/:id', TransportadorControler.getById_veiculos);


// Armazem
app.post('/armazem', ArmazemController.criarArmazem);
app.get('/armazem/nome', ArmazemController.getByNome);
app.get('/armazem', ArmazemController.get_all);
app.get('/armazem/:id', ArmazemController.getById);
app.get('/armazem/morada', ArmazemController.getByMorada);
app.get('/armazem/telemovel', ArmazemController.getByTelemovel);
app.delete('/armazem', ArmazemController.deleteByNome);
app.delete('/armazem/:id', ArmazemController.deleteById);


// Consumidor
app.get("/consumidor", ConsumidorController.get_all);
app.post("/encomenda", ConsumidorController.encomendarCesto);

app.get("/encomendas", ConsumidorController.get_all_Encomendas);
app.get("/encomenda/:id", ConsumidorController.getById_Encomendas);
app.delete("/encomenda/:id", ConsumidorController.deleteEncomendaById);

app.get("/encomendas", ConsumidorController.get_all_Encomendas);
app.get("/encomenda/:id", ConsumidorController.getById_Encomendas);

// Utilizador
app.post("/utilizador", UtilizadorControler.registar);
app.delete("/utilizadores", UtilizadorControler.apagarUtilizadores);
app.delete("/utilizadores/:id", UtilizadorControler.apagarUtilizadores_byID);
app.delete("/utilizador/:id", UtilizadorControler.apagarConta);
app.put("/utilizador/:id", UtilizadorControler.editarConta);

app.post("/utilizador/login", UtilizadorControler.login);
app.put("/utilizador/:id/password", UtilizadorControler.alterarPassword);
app.get("/utilizador/:id", UtilizadorControler.getByDados);

app.get("/utilizador", async (req, res) => {
  UtilizadorModel.find({}, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    if (result.length == 0) {
      res.status(404).send("No users found");
    }
    res.status(200).send(result);
  });
});

// Transporte
app.get("/transporteProdEnco", TransporteController.obterIDsProdutosEncomenda);
app.get("/transporteProdArm", TransporteController.obterIDsProdutosArmazem);
app.get("/transporteCaminho", TransporteController.verificarMorada);

// // Fornecedor
// app.post("http://localhost:3001/produto", FornecedorController.criarProduto)
// app.delete("http://localhost:3001/produto", FornecedorController.removerProdutos)
// app.delete("http://localhost:3001/produto/:id", FornecedorController.removerProduto)

// // Produto

// app.get("http://localhost:3001/produto", ProdutoController.get_all)
// app.get("http://localhost:3001/produto/nome", ProdutoController.getByNome)
// app.get("http://localhost:3001/produto/preco", ProdutoController.getByPreco)
// app.get("http://localhost:3001/produto/cadeialogistica", ProdutoController.getByCadeiaLogistica)
// app.get("http://localhost:3001/produto/tipo", ProdutoController.getByTipo)
// app.get("http://localhost:3001/produto/subtipo", ProdutoController.getBySubtipo)
// app.get("http://localhost:3001/produto/poluicao", ProdutoController.getByPoluicao)
// app.get("http://localhost:3001/produto/recursos", ProdutoController.getByRecursos);
// app.post("http://localhost:3001/produto", FornecedorController.criarProduto)
// app.delete("http://localhost:3001/produto", FornecedorController.removerProdutos)
// app.delete("http://localhost:3001/produto/:id", FornecedorController.removerProduto)

// // ainda n vi
// app.put("http://localhost:3001/utilizador/:id/veiculo", TransportadorControler.updateVeiculo)
// // app.put("http://localhost:3001/utilizador/:id/caminhos", TransportadorControler.updateCaminhos)

// app.post("http://localhost:3001/armazem", ArmazemController.criarArmazem)
// app.get("http://localhost:3001/armazem/nome", ArmazemController.getByNome)

// // ver
// app.get("http://localhost:3001/armazem", ArmazemController.get_all)
// app.get("http://localhost:3001/armazem/:id", ArmazemController.getById)
// app.get("http://localhost:3001/armazem/morada", ArmazemController.getByMorada)
// app.get("http://localhost:3001/armazem/telemovel", ArmazemController.getByTelemovel)

// app.delete("http://localhost:3001/armazem", ArmazemController.deleteByNome)
// app.delete("http://localhost:3001/armazem/:id", ArmazemController.deleteById)

// app.get("http://localhost:3001/consumidor", ConsumidorController.get_all)
// app.get("http://localhost:3001/consumidor/:id", ConsumidorController.encomendarCesto);

// app.post("http://localhost:3001/utilizador", UtilizadorControler.registar);
// app.delete("http://localhost:3001/utilizadores", UtilizadorControler.apagarUtilizadores);
// app.delete("http://localhost:3001/utilizadores/:id", UtilizadorControler.apagarUtilizadores_byID);
// app.delete("http://localhost:3001/utilizador/:id", UtilizadorControler.apagarConta);
// app.put("http://localhost:3001/utilizador/:id", UtilizadorControler.editarConta);

// // falta ver
// app.post("http://localhost:3001/utilizador/login", UtilizadorControler.login);
// app.put("http://localhost:3001/utilizador/:id/password", UtilizadorControler.alterarPassword);
// app.get("http://localhost:3001/utilizador/:id", UtilizadorControler.getByDados)

// app.get("http://localhost:3001/utilizador", async(req, res) => {
//     UtilizadorModel.find({}, (err, result)=> {
//         if(err){
//             res.status(400).send(err);
//         }
//         if (result.length == 0) {
//             res.status(404).send("No users found");
//         }
//         res.status(200).send(result);
//     });
// });

app.listen(3001, () => {
  console.log("Server running on port 3001...");
});
