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

colocarNoCesto("ricardo@gmail.com", 2, "624dc135724e6b66286ed2b8")
