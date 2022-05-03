const monggose = require('mongoose');
const ArmazemModel = require("../Colecoes/Armazem");
const conexao = require('../../conexao');
// const bcrypt = require('bcrypt');


async function criarArmazem(nome, morada, telemovel, produtos){
    await conexao;

    await ArmazemModel.create(
        {
            nome: nome,
            morada: morada,
            telemovel: telemovel,
            produtos: [],
        }
    )
}

async function getByNome(nome){
    await conexao;

    const armazem = await ArmazemModel.findOne({nome: nome})
    //console.log(armazem)
    return armazem
}

async function getByMorada(morada){
    await conexao;

    const armazem = await ArmazemModel.findOne({morada: morada})
    //console.log(armazem)
    return armazem
}

async function getByTelemovel(telemovel){
    await conexao;

    const armazem = await ArmazemModel.findOne({telemovel: telemovel})
    //console.log(armazem)
    return armazem
}

async function deleteByNome(nome){
    await conexao;

    await ArmazemModel.deleteOne({nome: nome})
}

