const monggose = require('mongoose');
const ConsumidorModel = require("../Colecoes/Consumidor");
const ProdutoModel = require("../Colecoes/Produto");
const conexao = require('../../conexao');
// const bcrypt = require('bcrypt');


async function colocarNoCesto(email, quantidade, produtoID){
    await conexao;
    
    const produto = await ProdutoModel.findOne({_id: produtoID});
    // recursos [material, qntKg]
    const recursos = produto["recursos"]; // string com varios recursos
    const poluicao = produto["poluicao"]*quantidade;

    await ConsumidorModel.updateOne(
        {_id: email},
        {
            $push: {cesto:[quantidade, produtoID],recursosCesto:recursos},
            $inc: {poluicaoCesto:poluicao},
        }
    )
}


const colocarNoCesto = (req, res) => {
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