const monggose = require('mongoose');
const TransporteModel = require("../Colecoes/Transportador");
const conexao = require('../../conexao');
// const bcrypt = require('bcrypt');




const criarTransportador = (req, res) => {
    const transportador = new TransporteModel(req.body);
    transportador.save()
    .then(() => {
        res.status(201).send("Transportador criado com sucesso");
    })
    .catch(err => {
        res.status(400).send(err);
    });
}

const getByNome = (req, res) => {
    const nome = req.body.nome;

    TransporteModel.find({nome: nome})
    .then(result => {
        if (result.length == 0) {
            res.status(404).send("nao encontrado");
        } else {
            res.status(200).send(result);
        }
    })
    .catch(err => {
        res.status(400).send(err);
    });
}




const updateCaminhos = (req, res) => {
    const email = req.params.id;
    TransporteModel.updateOne(
        { _id: email },
        {
            caminhos: req.body.caminhos
        }
    )
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        res.status(400).send(err);
    });
}




const updateVeiculo = (req, res) => {
    const email = req.params.id;
    TransporteModel.updateOne(
        { _id: email },
        {
            veiculo: req.body.veiculo
        }
    )
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        res.status(400).send(err);
    });
}


const deleteByEmail = (req, res) => {
    TransporteModel.findByIdAndDelete(req.body.email)
    .then(() => {
        res.status(200).send("Utilizador apagado com sucesso");
    })
    .catch(() => {
        res.status(404).send("Utilizador nao existe");
    })
}


module.exports = {/*getByNome, */updateCaminhos, updateVeiculo, deleteByEmail};
