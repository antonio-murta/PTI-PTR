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
        
        res.status(201).send("Produto apagado com sucesso");
    })
    .catch(err => {
        res.status(400).send(err);
    });
}

const getById = (req, res) => {
    const id = req.params.id;

    FornecedorModel.findOne({_id: id})
    .then(result => {
        if (result.length == 0) {
            res.status(404).send("Fornecedor nao encontrado");
        } else {
            res.status(200).send(result);
        }
    })
    .catch(err => {
        res.status(400).send(err);
    });
}




const get_all_fornecedores = (req, res) => {
    FornecedorModel.find({})
    .then(result => {
        if (result.length == 0) {
            res.status(400).send("Nao existem fornecedores registados");
        } else {
            res.status(200).send(result);
        }
    })
    .catch(err => {
        res.status(400).send(err);
    })
}


const getById = (req, res) => {
    const email = req.params.id;
    // const email = "doce@gmail.com" ;

    FornecedorModel.findOne({_id: email})
    .then(result => {
        if (result.length == 0) {
            res.status(404).send("Fornecedor nao encontrado");
        } else {
            res.status(200).send(result);
        }
    })
    .catch(err => {
        res.status(400).send(err);
    });
}







module.exports = {criarProduto, removerProduto, removerProdutos, getById, get_all_fornecedores};

