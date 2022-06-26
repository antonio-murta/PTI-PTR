// import App from "../feebo-front/my-app/src/App.js";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="/*" element={<App />} />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

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

// ainda n vi
app.post("/utilizador/veiculo", TransportadorControler.criarVeiculo);
app.put("/utilizador/:id/veiculo", TransportadorControler.updateVeiculo);
// app.put("/utilizador/:id/caminhos", TransportadorControler.updateCaminhos)

app.post("/armazem", ArmazemController.criarArmazem);
app.get("/armazem/nome", ArmazemController.getByNome);

// ver
app.get("/armazem", ArmazemController.get_all);
app.get("/armazem/:id", ArmazemController.getById);
app.get("/armazem/morada", ArmazemController.getByMorada);
app.get("/armazem/telemovel", ArmazemController.getByTelemovel);

app.delete("/armazem", ArmazemController.deleteByNome);
app.delete("/armazem/:id", ArmazemController.deleteById);

app.get("/consumidor", ConsumidorController.get_all);
app.get("/consumidor/:id", ConsumidorController.encomendarCesto);

app.post("/utilizador", UtilizadorControler.registar);
app.delete("/utilizadores", UtilizadorControler.apagarUtilizadores);
app.delete("/utilizadores/:id", UtilizadorControler.apagarUtilizadores_byID);
app.delete("/utilizador/:id", UtilizadorControler.apagarConta);
app.put("/utilizador/:id", UtilizadorControler.editarConta);

// falta ver
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

app.get("/transporteProdEnco", TransporteController.obterIDsProdutosEncomenda);
app.get("/transporteProdArm", TransporteController.obterIDsProdutosArmazem);
app.get("/transporteCaminho", TransporteController.verificarMorada);

// // Fornecedor
// app.post("http://api.feeboo.me/produto", FornecedorController.criarProduto)
// app.delete("http://api.feeboo.me/produto", FornecedorController.removerProdutos)
// app.delete("http://api.feeboo.me/produto/:id", FornecedorController.removerProduto)

// // Produto

// app.get("http://api.feeboo.me/produto", ProdutoController.get_all)
// app.get("http://api.feeboo.me/produto/nome", ProdutoController.getByNome)
// app.get("http://api.feeboo.me/produto/preco", ProdutoController.getByPreco)
// app.get("http://api.feeboo.me/produto/cadeialogistica", ProdutoController.getByCadeiaLogistica)
// app.get("http://api.feeboo.me/produto/tipo", ProdutoController.getByTipo)
// app.get("http://api.feeboo.me/produto/subtipo", ProdutoController.getBySubtipo)
// app.get("http://api.feeboo.me/produto/poluicao", ProdutoController.getByPoluicao)
// app.get("http://api.feeboo.me/produto/recursos", ProdutoController.getByRecursos);
// app.post("http://api.feeboo.me/produto", FornecedorController.criarProduto)
// app.delete("http://api.feeboo.me/produto", FornecedorController.removerProdutos)
// app.delete("http://api.feeboo.me/produto/:id", FornecedorController.removerProduto)

// // ainda n vi
// app.put("http://api.feeboo.me/utilizador/:id/veiculo", TransportadorControler.updateVeiculo)
// // app.put("http://api.feeboo.me/utilizador/:id/caminhos", TransportadorControler.updateCaminhos)

// app.post("http://api.feeboo.me/armazem", ArmazemController.criarArmazem)
// app.get("http://api.feeboo.me/armazem/nome", ArmazemController.getByNome)

// // ver
// app.get("http://api.feeboo.me/armazem", ArmazemController.get_all)
// app.get("http://api.feeboo.me/armazem/:id", ArmazemController.getById)
// app.get("http://api.feeboo.me/armazem/morada", ArmazemController.getByMorada)
// app.get("http://api.feeboo.me/armazem/telemovel", ArmazemController.getByTelemovel)

// app.delete("http://api.feeboo.me/armazem", ArmazemController.deleteByNome)
// app.delete("http://api.feeboo.me/armazem/:id", ArmazemController.deleteById)

// app.get("http://api.feeboo.me/consumidor", ConsumidorController.get_all)
// app.get("http://api.feeboo.me/consumidor/:id", ConsumidorController.encomendarCesto);

// app.post("http://api.feeboo.me/utilizador", UtilizadorControler.registar);
// app.delete("http://api.feeboo.me/utilizadores", UtilizadorControler.apagarUtilizadores);
// app.delete("http://api.feeboo.me/utilizadores/:id", UtilizadorControler.apagarUtilizadores_byID);
// app.delete("http://api.feeboo.me/utilizador/:id", UtilizadorControler.apagarConta);
// app.put("http://api.feeboo.me/utilizador/:id", UtilizadorControler.editarConta);

// // falta ver
// app.post("http://api.feeboo.me/utilizador/login", UtilizadorControler.login);
// app.put("http://api.feeboo.me/utilizador/:id/password", UtilizadorControler.alterarPassword);
// app.get("http://api.feeboo.me/utilizador/:id", UtilizadorControler.getByDados)

// app.get("http://api.feeboo.me/utilizador", async(req, res) => {
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
