const monggose = require('mongoose');
const FornecedorModel = require("../Colecoes/Fornecedor");
const ProdutoModel = require("../Colecoes/Produto");
const conexao = require('../../conexao');




const get_all = (req, res) => {
    ProdutoModel.find({})
    .then(result => {
        if (result.length == 0) {
            res.status(404).send("Nao existem produto registados");
        } else {
            res.status(200).send(result);
        }
    })
    .catch(err => {
        res.status(400).send(err);
    })
}

const getById = (req, res) => {
    const id = req.params.id;

    ProdutoModel.findOne({_id: id})
    .then(result => {
        if (result.length == 0) {
            res.status(404).send("Produto nao encontrado");
        } else {
            res.status(200).send(result);
        }
    })
    .catch(err => {
        res.status(400).send(err);
    });
}

const getByNome = (req, res) => {
    const nome = req.body.nome;

    ProdutoModel.find({nome: nome})
    .then(result => {
        if (result.length == 0) {
            res.status(404).send("Produto nao encontrado");
        } else {
            res.status(200).send(result);
        }
    })
    .catch(err => {
        res.status(400).send(err);
    });
}

const getByPreco = (req, res) => {
    const preco = req.body.preco;

    ProdutoModel.find({preco: preco})
    .then(result => {
        if (result.length == 0) {
            res.status(404).send("Produto nao encontrado");
        } else {
            res.status(200).send(result);
        }
    })
    .catch(err => {
        res.status(400).send(err);
    });
}

const getByCadeiaLogistica = (req, res) => {
    const cadeiaLogistica = req.body.cadeiaLogistica;

    ProdutoModel.find({cadeiaLogistica: cadeiaLogistica})
    .then(result => {
        if (result.length == 0) {
            res.status(404).send("Produto nao encontrado");
        } else {
            res.status(200).send(result);
        }
    })
    .catch(err => {
        res.status(400).send(err);
    });
}

const getByRecursos = (req, res) => {
    const recursos = req.body.recursos;

    ProdutoModel.find({recursos: recursos})
    .then(result => {
        if (result.length == 0) {
            res.status(404).send("Produto nao encontrado");
        } else {
            res.status(200).send(result);
        }
    })
    .catch(err => {
        res.status(400).send(err);
    });
}

const getByPoluicao = (req, res) => {
    const poluicao = req.body.poluicao;

    ProdutoModel.find({poluicao: poluicao})
    .then(result => {
        if (result.length == 0) {
            res.status(404).send("Produto nao encontrado");
        } else {
            res.status(200).send(result);
        }
    })
    .catch(err => {
        res.status(400).send(err);
    });
}

const getByTipo = (req, res) => {
    const tipo = req.body.tipo;

    ProdutoModel.find({tipo: tipo})
    .then(result => {
        if (result.length == 0) {
            res.status(404).send("Produto nao encontrado");
        } else {
            res.status(200).send(result);
        }
    })
    .catch(err => {
        res.status(400).send(err);
    });
}

const getBySubtipo = (req, res) => {
    const subtipo = req.body.subtipo;

    ProdutoModel.find({subtipo: subtipo})
    .then(result => {
        if (result.length == 0) {
            res.status(404).send("Produto nao encontrado");
        } else {
            res.status(200).send(result);
        }
    })
    .catch(err => {
        res.status(400).send(err);
    });
}








// NAO FIZ -------------------------------------------


async function visualizarProdutosFornecedor (emailFornecedor)
{
    await conexao;
    const fornecedor = await FornecedorModel.findOne({_id: emailFornecedor});
    const produtosID = fornecedor["produtos"];
    const produtos = [];


    for (let i = 0; i < produtosID.length; i++) {
        console.log(produtosID[i])
        const p = await ProdutoModel.findOne({_id: produtosID[i]});
        produtos.push(p);
    }
    // console.log(produtos)
    return produtos
}
// visualizarProdutosFornecedor("catarina@gmail.com")

module.exports = {get_all, getById, getByNome, getByCadeiaLogistica, getByPoluicao, getByPreco, getByRecursos, getBySubtipo, getByTipo};
