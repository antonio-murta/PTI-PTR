const monggose = require('mongoose');
const UtilizadorModel = require("../Colecoes/Utilizador");
const ConsumidorModel = require("../Colecoes/Consumidor");
const FornecedorModel = require("../Colecoes/Fornecedor");
const TransportadorModel = require("../Colecoes/Transportador");
const ProdutoModel = require("../Colecoes/Produto");
const conexao = require('../../conexao');
const recursosPoluicao = require('../Colecoes/RecursosPoluicao');




const criarProduto = (req, res) => {
    const emailFornecedor = req.params.id;

    // const poluicao = 0;
    const recursos = req.body.recursos;
    // let poluicao = 0;
    // recursos.forEach(recurso => {
    //     poluicao += recurso["poluicao"];
    // });
    // req.body.poluicao = poluicao;

    const produto = new ProdutoModel(req.body);
    produto.save()
    .then(() => {
        res.status(201).send("Produto criado com sucesso");
    })
    .catch(err => {
        res.status(400).send(err);
    });
}



const removerProdutos = (req, res) => {
    ProdutoModel.deleteMany({})
    .then(() => {
        res.status(200).send("Produtos apagados com sucesso");
    })
    .catch(err => {
        res.status(400).send(err);
    })
}



const removerProduto = (req, res) => {
    //const emailFornecedor = req.params.idF;
    const idProduto = req.params.idP;

    ProdutoModel.deleteOne({_id: idProduto})
    .then(() => {
        // FornecedorModel.updateOne(
        //     {_id: emailFornecedor},
        //     {
        //         $set: {produtos: idProduto}
        //     }
        // )
        res.status(201).send("Produto apagado com sucesso");
    })
    .catch(err => {
        res.status(400).send(err);
    });
}
// async function removerProduto (id, email)
// {
//     await conexao;
//     await ProdutoModel.deleteOne({_id: id})
//     await FornecedorModel.updateOne(
//         {_id: email},
//         {$set: {produtos: id}}
//     )

// }

module.exports = {criarProduto, removerProduto, removerProdutos};