const monggose = require('mongoose');
const TransporteModel = require("../Colecoes/Transportador");
const conexao = require('../../conexao');
// const bcrypt = require('bcrypt');


async function criarTransportador(email, caminhos, veiculo){
    await conexao;

    await TransporteModel.create(
        {
            _id: email,
            caminhos: caminhos,
            veiculo: veiculo
        }
    )
}
// criarTransportador("Duartee@gmail.com", [], "AS-12-AS")


async function getByNome(email){
    await conexao;

    const transportador = await TransporteModel.findOne({_id: email})
    console.log(transportador)
    return transportador
}

async function updateCaminhos(email, caminhos){
    await conexao;

    await TransporteModel.updateOne({_id:email},{caminhos: caminhos})
}

async function updateVeiculo(email, veiculo){
    await conexao;

    await TransporteModel.updateOne({_id:email},{veiculo: veiculo})
}

async function deleteByEmail(email){
    await conexao;

    await TransporteModel.deleteOne({email: email})
}

