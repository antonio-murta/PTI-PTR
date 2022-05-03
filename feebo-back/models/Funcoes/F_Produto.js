const monggose = require('mongoose');
const FornecedorModel = require("../Colecoes/Fornecedor");
const ProdutoModel = require("../Colecoes/Produto");
const conexao = require('../../conexao');



// async function pesquisarProdutosTipo (tipo) {
//     await conexao;
//     const produtos = await ProdutoModel.find({tipo: tipo})
//     console.log (produtos)
//     // return produtos
// }
// pesquisarProdutosTipo ("Alimentação")

// async function pesquisarProdutosTipoSubtipo (tipo, subtipo) {
//     await conexao;
//     const produtos = await ProdutoModel.find({tipo: tipo, subtipo: subtipo})
//     return produtos
// }

// pesquisar produtos campos comuns


// getsss
async function getById (id)
{
    await conexao;
    const produto = await ProdutoModel.findOne({_id: id});
    console.log(produto);
}
// getById("624b826ed81071ff92bee2a6")

async function getByNome (nome)
{
    await conexao;
    const produto = await ProdutoModel.findOne({nome: nome});
    console.log(produto)
    // return produto
}
// getByNome("Maças")

async function getByPreco (preco)
{
    await conexao;
    const produto = await ProdutoModel.findOne({preco: preco});
    console.log(produto)
    // return produto
}
// getByPreco(1.2)

async function getByCadeiaLogistica (cadeiaLogistica)
{
    await conexao;
    const produto = await ProdutoModel.findOne({cadeiaLogistica: cadeiaLogistica});
    console.log(produto)
    // return produto
}
// getByCadeiaLogistica("Cadeira logistica");
// console.log(a)

async function getByRecursos (recursos)
{
    await conexao;
    const produto = await ProdutoModel.findOne({recursos: recursos});
    // return 
    console.log(produto)
}
// getByRecursos("recursos")

async function getByPoluicao (poluicao)
{
    await conexao;
    const produto = await ProdutoModel.findOne({poluicao: poluicao});
    // return produto
    console.log(produto)
}
// getByPoluicao("Poluicao")

async function getByTipo (tipo)
{
    await conexao;
    const produtos = await ProdutoModel.find({tipo: tipo});
    // return produto
    console.log(produtos)
}
// getByTipo("Alimentação")

async function getBySubtipo (subtipo)
{
    await conexao;
    const produtos = await ProdutoModel.find({subtipo: subtipo});
    // return produto
    console.log(produtos)
}
// getBySubtipo("Fruta")
// ---------------



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