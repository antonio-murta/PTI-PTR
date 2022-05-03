const monggose = require('mongoose');
const UtilizadorModel = require("../Colecoes/Utilizador");
const ConsumidorModel = require("../Colecoes/Consumidor");
const FornecedorModel = require("../Colecoes/Fornecedor");
const TransportadorModel = require("../Colecoes/Transportador");
const ProdutoModel = require("../Colecoes/Produto");
const conexao = require('../../conexao');
const recursosPoluicao = require('../Colecoes/RecursosPoluicao');



async function criarProduto (nome, preco, cadeiaLogistica, recursos, /*poluicao,*/ tipo, subtipo, email)
{
    await conexao;
    let poluicao = 0;
    recursos.forEach(recurso => {
        poluicao += recurso["poluicao"];
    });
    const a = await ProdutoModel.create (
        {
            nome: nome,
            preco: preco,
            cadeiaLogistica: cadeiaLogistica,
            recursos: recursos,
            poluicao: poluicao,
            tipo: tipo,
            subtipo: subtipo
        }
    )

    idProduto = a["_id"];

    await FornecedorModel.updateOne(
        {_id: email},
        {
            $push: {produtos: idProduto}
        }
    )
}
// criarProduto ("Martelo", "14.50", "Cadeia logistica", [{"material":"madeira","poluicao":100},{"material":"metal","poluicao":250}], /*"Poluicao",*/ "Ferramentas", "Ferramentas de mao", "catarina@gmail.com")
// criarProduto ("Bananas", "2.38", "Cadeia logistica", [], /*"Poluicao",*/ "Alimentação", "Fruta", "catarina@gmail.com")
// criarProduto ("Peras", "1.59", "Cadeia logistica", [],/*"Poluicao",*/ "Alimentação", "Fruta", "catarina@gmail.com")
criarProduto ("Laranjas", "2.80", "Cadeia logistica", [], /*"Poluicao",*/ "Alimentação", "Fruta", "catarina@gmail.com")
criarProduto ("Pessegos", "1.48", "Cadeia logistica", [], /*"Poluicao",*/ "Alimentação", "Fruta", "catarina@gmail.com")
criarProduto ("melancia", "1.20", "Cadeia logistica", [], /*"Poluicao",*/ "Alimentação", "Fruta", "catarina@gmail.com")



async function removerProduto (id, email)
{
    await conexao;
    await ProdutoModel.deleteOne({_id: id})
    await FornecedorModel.updateOne(
        {_id: email},
        {$set: {produtos: id}}
    )

}
removerProduto ("624d7798aedbc0e6656914da", "catarina@gmail.com")



// db.getCollection('compras').update({}, {
//     $pull: { "lista_compras": { 
//     "_id": ObjectId("5983bb21834000b1b8e7978a"))
//      }}})